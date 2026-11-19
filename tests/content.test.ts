import { describe, expect, it } from "vitest";
import { experience, identity, projects } from "@/content";
import {
  getFeaturedProjects,
  getIncomingExperience,
  getProjectBySlug,
} from "@/lib/content";

const slugPattern = /^[a-z0-9]+(-[a-z0-9]+)*$/;

describe("project records", () => {
  it("has unique, well-formed slugs and names", () => {
    const slugs = projects.map((project) => project.slug);
    const names = projects.map((project) => project.name);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(names).size).toBe(names.length);
    for (const slug of slugs) {
      expect(slug).toMatch(slugPattern);
    }
  });

  it("has unique evidence and metric ids", () => {
    const evidenceIds = projects.flatMap((project) =>
      project.evidence.map((record) => record.id),
    );
    const metricIds = projects.flatMap((project) =>
      project.evidence.flatMap((record) => record.metrics.map((metric) => metric.id)),
    );
    expect(new Set(evidenceIds).size).toBe(evidenceIds.length);
    expect(new Set(metricIds).size).toBe(metricIds.length);
  });

  it("requires domains and a summary on every record", () => {
    for (const project of projects) {
      expect(project.domains.length).toBeGreaterThan(0);
      expect(project.summary.length).toBeGreaterThan(0);
    }
  });

  it("orders featured work AEGIS, Paradox, Synapse, Bettr", () => {
    expect(getFeaturedProjects().map((project) => project.name)).toEqual([
      "AEGIS",
      "Paradox",
      "Synapse",
      "Bettr",
    ]);
  });

  it("gives featured projects distinct consecutive ranks", () => {
    const ranks = getFeaturedProjects().map((project) => project.featuredRank);
    expect(ranks).toEqual([1, 2, 3, 4]);
  });

  it("does not invent source or live URLs", () => {
    for (const project of projects) {
      expect(project.repositoryUrl).toBeNull();
      expect(project.liveUrl).toBeNull();
    }
  });

  it("does not provide individual contribution breakdowns yet", () => {
    for (const project of projects) {
      expect(project.individualContribution).toBeNull();
    }
  });
});

describe("evidence and provenance", () => {
  it("marks every claim, metric, and evidence record as owner-supplied", () => {
    for (const project of projects) {
      for (const claim of project.claims) {
        expect(claim.source).toBe("owner-supplied");
      }
      for (const record of project.evidence) {
        expect(record.source).toBe("owner-supplied");
        for (const metric of record.metrics) {
          expect(metric.source).toBe("owner-supplied");
          expect(metric.context.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("never reports independent verification", () => {
    for (const project of projects) {
      expect(project.evidenceStatus).not.toBe("independently-verified");
    }
  });

  it("keeps evidence status consistent with evidence presence", () => {
    for (const project of projects) {
      if (project.evidenceStatus === "none-provided") {
        expect(project.evidence).toHaveLength(0);
      }
      if (project.evidence.length > 0) {
        expect(project.evidenceStatus).toBe("owner-supplied-unverified");
      }
    }
  });

  it("keeps Paradox SDK-backed run and scripted NASA demo separate", () => {
    const paradox = getProjectBySlug("paradox");
    expect(paradox).toBeDefined();
    const sdk = paradox?.evidence.find(
      (record) => record.id === "paradox-sdk-validation",
    );
    const nasa = paradox?.evidence.find(
      (record) => record.id === "paradox-nasa-firms-demo",
    );
    expect(sdk?.generationMethod).toBe("factory-droid-sdk");
    expect(nasa?.generationMethod).toBe("scripted");
    expect(sdk?.metrics.map((metric) => metric.value)).toEqual(["26", "6"]);
    expect(nasa?.metrics.map((metric) => metric.value)).toContain("1,198");
    const sdkMetricIds = new Set(sdk?.metrics.map((metric) => metric.id));
    for (const metric of nasa?.metrics ?? []) {
      expect(sdkMetricIds.has(metric.id)).toBe(false);
    }
    expect(nasa?.limitations.join(" ")).toMatch(/did not use the Factory Droid SDK/);
  });

  it("does not claim awards for AEGIS or Paradox", () => {
    for (const slug of ["aegis", "paradox"]) {
      const project = getProjectBySlug(slug);
      expect(project?.limitations.join(" ")).toMatch(/no (award|prize)/i);
    }
  });

  it("records owner-supplied benchmark values without extension", () => {
    const synapse = getProjectBySlug("synapse");
    const values = synapse?.evidence[0]?.metrics.map((metric) => metric.value);
    expect(values).toEqual(["0.840", "0.840", "0.820"]);
    expect(getProjectBySlug("aegis")?.evidence[0]?.metrics[0]?.value).toBe("455");
  });

  it("leaves unknown research status review-required", () => {
    for (const slug of [
      "blackbox",
      "autonomous-drone-mapping",
      "cognispeech",
      "architectural-drift-benchmark",
      "qforge",
    ]) {
      const project = getProjectBySlug(slug);
      expect(project?.implementationStatus).toBe("review-required");
      expect(project?.evidence).toHaveLength(0);
    }
  });
});

describe("experience", () => {
  it("records Accenture as incoming Summer 2027, not completed", () => {
    const incoming = getIncomingExperience();
    expect(incoming).toHaveLength(1);
    const [accenture] = incoming;
    expect(accenture?.organization).toBe("Accenture");
    expect(accenture?.title).toBe("Technology Summer Analyst");
    expect(accenture?.period).toBe("Summer 2027");
    expect(accenture?.completed).toBe(false);
    expect(accenture?.endDate).toBeNull();
    expect(accenture?.notes.join(" ")).toMatch(/No Forward Deployed Engineer/);
  });

  it("never marks any role completed", () => {
    for (const record of experience) {
      expect(record.completed).toBe(false);
    }
  });

  it("keeps unconfirmed roles pending with no invented titles or dates", () => {
    const pending = experience.filter(
      (record) => record.status === "pending-resume-details",
    );
    expect(pending).toHaveLength(3);
    for (const record of pending) {
      expect(record.title).toBeNull();
      expect(record.organization).toBeNull();
      expect(record.period).toBeNull();
      expect(record.startDate).toBeNull();
      expect(record.endDate).toBeNull();
      expect(record.ownerMention).not.toBeNull();
    }
  });

  it("has unique experience slugs", () => {
    const slugs = experience.map((record) => record.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("identity and unresolved contact fields", () => {
  it("records confirmed identity facts", () => {
    expect(identity.name).toBe("Prince Mohapatra");
    expect(identity.institution).toBe("Purdue University");
    expect(identity.degree).toBe("B.S. Computer Science + Artificial Intelligence");
    expect(identity.expectedGraduation).toBe("2028");
    expect(identity.roleLine).toEqual([
      "Software Engineer",
      "AI Builder",
      "Undergraduate Researcher",
    ]);
    expect(identity.github).toBe("https://github.com/princerm06");
  });

  it("leaves LinkedIn, email, and resume PDF unresolved", () => {
    expect(identity.linkedin).toBeNull();
    expect(identity.email).toBeNull();
    expect(identity.resumePdf).toBeNull();
  });
});
