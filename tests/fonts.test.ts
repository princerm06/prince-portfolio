import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { basename, join, relative, sep } from "node:path";
import { describe, expect, it } from "vitest";
import { experience, identity, projects } from "@/content";
import { readWoff2, type FontAxis } from "./support/woff2";

interface ProvenanceFile {
  path: string;
  sha256: string;
  bytes: number;
  style: string;
  subset: string;
  version: string;
  axes: FontAxis[];
  request: string;
  source: string;
}

interface ProvenanceFamily {
  family: string;
  role: string;
  cssVariable: string;
  license: {
    spdx: string;
    path: string;
    sha256: string;
    source: string;
    reservedFontName: string | null;
  };
  upstream: { repository: string; commit: string; metadata: string };
  files: ProvenanceFile[];
}

const root = process.cwd();
const fontsDir = join(root, "src/app/fonts");
const read = (path: string) => readFileSync(join(root, path), "utf8");
const sha256 = (bytes: Buffer) => createHash("sha256").update(bytes).digest("hex");
const listFiles = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? listFiles(join(dir, entry.name)) : [join(dir, entry.name)],
  );

const provenance = JSON.parse(read("src/app/fonts/provenance.json")) as {
  retrievedOn: string;
  families: ProvenanceFamily[];
};
const fontModule = read("src/app/fonts/index.ts");
const fontCalls = fontModule
  .split("localFont(")
  .slice(1)
  .map((chunk) => chunk.slice(0, chunk.indexOf("});")));
const bundled = provenance.families.flatMap((family) =>
  family.files.map((file) => {
    const bytes = readFileSync(join(fontsDir, file.path));
    return { family, file, bytes, font: readWoff2(bytes) };
  }),
);

function callFor(path: string): string {
  const call = fontCalls.find((candidate) => candidate.includes(`src: "./${path}"`));
  if (call === undefined) {
    throw new Error(`No localFont call loads ${path}`);
  }
  return call;
}

function collectStrings(value: unknown): string[] {
  if (typeof value === "string") {
    return [value];
  }
  if (Array.isArray(value)) {
    return value.flatMap(collectStrings);
  }
  if (value !== null && typeof value === "object") {
    return Object.values(value).flatMap(collectStrings);
  }
  return [];
}

describe("font provenance and licensing", () => {
  it("bundles exactly the approved families", () => {
    expect(provenance.families.map((family) => family.family)).toEqual([
      "Newsreader",
      "Inter",
      "JetBrains Mono",
    ]);
    expect(provenance.families.map((family) => family.cssVariable)).toEqual([
      "--font-serif",
      "--font-sans",
      "--font-mono",
    ]);
  });

  it("tracks every file in the font directory", () => {
    const tracked = [
      "index.ts",
      "provenance.json",
      ...provenance.families.flatMap((family) => [
        family.license.path,
        ...family.files.map((file) => file.path),
      ]),
    ];
    const present = listFiles(fontsDir)
      .filter((path) => !basename(path).startsWith("."))
      .map((path) => relative(fontsDir, path).split(sep).join("/"));
    expect(present.sort()).toEqual(tracked.sort());
  });

  it("keeps each OFL license verbatim with no reserved font name", () => {
    for (const family of provenance.families) {
      const license = readFileSync(join(fontsDir, family.license.path));
      expect(sha256(license)).toBe(family.license.sha256);
      expect(family.license.spdx).toBe("OFL-1.1");
      expect(family.license.reservedFontName).toBeNull();
      const text = license.toString("utf8");
      const bodyStart = text.indexOf("SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007");
      expect(bodyStart).toBeGreaterThan(0);
      const header = text.slice(0, bodyStart);
      expect(header).toContain(`The ${family.family} Project Authors`);
      expect(header).not.toMatch(/Reserved Font Name/i);
    }
  });

  it("matches committed font binaries to recorded provenance", () => {
    for (const { file, bytes } of bundled) {
      expect(bytes.length).toBe(file.bytes);
      expect(sha256(bytes)).toBe(file.sha256);
      expect(file.subset).toBe("latin");
      expect(file.source).toMatch(/^https:\/\/fonts\.gstatic\.com\/s\//);
    }
  });

  it("embeds the recorded family, version, axes, and OFL notice in each file", () => {
    for (const { family, file, font } of bundled) {
      expect(font.names.get(1)).toMatch(new RegExp(`^${family.family}\\b`));
      expect(font.names.get(5)).toBe(file.version);
      expect(font.names.get(0)).toContain(`The ${family.family} Project Authors`);
      expect(font.names.get(14)).toMatch(/scripts\.sil\.org\/OFL|openfontlicense\.org/);
      expect(font.axes).toEqual(file.axes);
    }
  });
});

describe("font loading", () => {
  it("loads every bundled file through next/font/local with matching axes", () => {
    expect(fontModule).toContain('import localFont from "next/font/local";');
    expect(fontCalls).toHaveLength(bundled.length);
    for (const { family, file } of bundled) {
      const call = callFor(file.path);
      const weight = file.axes.find((axis) => axis.tag === "wght");
      expect(weight).toBeDefined();
      expect(call).toContain(`weight: "${weight?.min} ${weight?.max}"`);
      expect(call).toContain(`style: "${file.style}"`);
      expect(call).toContain(`variable: "${family.cssVariable}"`);
      expect(call).toContain('display: "swap"');
    }
  });

  it("matches fallback metrics to each family's category", () => {
    const expectedFallback: Record<string, string> = {
      display: 'adjustFontFallback: "Times New Roman"',
      body: 'adjustFontFallback: "Arial"',
      "technical-labels": "adjustFontFallback: false",
    };
    for (const { family, file, font } of bundled) {
      const expected = expectedFallback[family.role];
      expect(expected).toBeDefined();
      expect(callFor(file.path)).toContain(expected);
      expect(font.isFixedPitch).toBe(family.role === "technical-labels");
    }
  });

  it("applies every font variable to the root html element", () => {
    const layout = read("src/app/layout.tsx");
    expect(layout).toContain('import { fontVariables } from "./fonts";');
    expect(layout).toMatch(/<html[^>]*className=\{fontVariables\}/);
    const exportedFonts = [...fontModule.matchAll(/export const (\w+) = localFont\(/g)].map(
      (match) => match[1],
    );
    expect(exportedFonts).toHaveLength(bundled.length);
    const variables = /export const fontVariables = \[([^\]]+)\]/.exec(fontModule)?.[1] ?? "";
    for (const name of exportedFonts) {
      expect(variables).toContain(`${name}.variable`);
    }
  });

  it("keeps Tailwind font tokens overridable by the next/font variables", () => {
    const css = read("src/app/globals.css");
    for (const [, block] of css.matchAll(/@theme\s+inline[^{]*\{([^}]*)\}/g)) {
      expect(block).not.toMatch(/--font-(sans|serif|mono)\s*:/);
    }
    const outsideTheme = css.replace(/@theme[^{]*\{[^}]*\}/g, "");
    expect(outsideTheme).not.toMatch(/--font-(sans|serif|mono)\s*:/);
  });

  it("never references a runtime font CDN", () => {
    const sources = [...listFiles(join(root, "src")), join(root, "next.config.ts")].filter(
      (path) => /\.(ts|tsx|css|mjs|js)$/.test(path),
    );
    for (const path of sources) {
      expect(readFileSync(path, "utf8"), path).not.toMatch(
        /fonts\.googleapis\.com|fonts\.gstatic\.com|next\/font\/google|use\.typekit\.net|fonts\.bunny\.net|@import\s+url\(\s*["']?https?:/,
      );
    }
  });

  it("covers every typed content character in each bundled font", () => {
    const codePoints = new Set(
      [...collectStrings([identity, projects, experience]).join("")].map(
        (character) => character.codePointAt(0) ?? 0,
      ),
    );
    for (const { family, font } of bundled) {
      const missing = [...codePoints]
        .filter((codePoint) => !font.codePoints.has(codePoint))
        .map((codePoint) => `U+${codePoint.toString(16).toUpperCase().padStart(4, "0")}`);
      expect(missing, family.family).toEqual([]);
    }
  });
});
