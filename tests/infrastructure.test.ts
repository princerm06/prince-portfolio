import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), "utf8");
const pkg = JSON.parse(read("package.json")) as {
  packageManager: string;
  engines: { node: string };
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
};

describe("toolchain pinning", () => {
  it("pins pnpm exactly", () => {
    expect(pkg.packageManager).toMatch(/^pnpm@\d+\.\d+\.\d+$/);
  });

  it("aligns .nvmrc, engines, and CI on one Node version", () => {
    const nvmrc = read(".nvmrc").trim();
    expect(nvmrc).toMatch(/^\d+\.\d+\.\d+$/);
    expect(pkg.engines.node).toContain(nvmrc);
    expect(read(".github/workflows/ci.yml")).toContain("node-version-file: .nvmrc");
  });

  it("pins runtime dependencies exactly", () => {
    for (const version of Object.values(pkg.dependencies)) {
      expect(version).toMatch(/^\d+\.\d+\.\d+$/);
    }
  });
});

describe("scope guards", () => {
  it("excludes database, auth, analytics, and AI packages", () => {
    const names = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies });
    const forbidden = /prisma|drizzle|supabase|next-auth|clerk|auth0|analytics|openai|anthropic|three|trpc|mongoose|firebase/i;
    expect(names.filter((name) => forbidden.test(name))).toEqual([]);
  });

  it("does not ship an env example without actual variables", () => {
    expect(() => readFileSync(join(root, ".env.example"))).toThrow();
  });
});
