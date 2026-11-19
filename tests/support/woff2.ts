import { brotliDecompressSync } from "node:zlib";

export interface FontAxis {
  tag: string;
  min: number;
  default: number;
  max: number;
}

export interface Woff2Font {
  names: Map<number, string>;
  axes: FontAxis[];
  codePoints: Set<number>;
  isFixedPitch: boolean;
}

interface TableEntry {
  tag: string;
  length: number;
  transformed: boolean;
}

const woff2Signature = 0x774f4632;
const woff2HeaderSize = 48;
const headMagicNumber = 0x5f0f3cf5;
const arbitraryTagIndex = 0x3f;

const knownTableTags = [
  "cmap", "head", "hhea", "hmtx", "maxp", "name", "OS/2", "post", "cvt ", "fpgm",
  "glyf", "loca", "prep", "CFF ", "VORG", "EBDT", "EBLC", "gasp", "hdmx", "kern",
  "LTSH", "PCLT", "VDMX", "vhea", "vmtx", "BASE", "GDEF", "GPOS", "GSUB", "EBSC",
  "JSTF", "MATH", "CBDT", "CBLC", "COLR", "CPAL", "SVG ", "sbix", "acnt", "avar",
  "bdat", "bloc", "bsln", "cvar", "fdsc", "feat", "fmtx", "fvar", "gvar", "hsty",
  "just", "lcar", "mort", "morx", "opbd", "prop", "trak", "Zapf", "Silf", "Glat",
  "Gloc", "Feat", "Sill",
];

function readUIntBase128(bytes: Buffer, start: number): [number, number] {
  let value = 0;
  for (let index = 0; index < 5; index += 1) {
    const byte = bytes.readUInt8(start + index);
    if (index === 0 && byte === 0x80) {
      throw new Error("UIntBase128 value has a leading zero byte");
    }
    if (value > 0x1ffffff) {
      throw new Error("UIntBase128 value overflows 32 bits");
    }
    value = value * 128 + (byte & 0x7f);
    if ((byte & 0x80) === 0) {
      return [value, start + index + 1];
    }
  }
  throw new Error("UIntBase128 value exceeds five bytes");
}

function readTableDirectory(
  bytes: Buffer,
  numTables: number,
): { entries: TableEntry[]; end: number } {
  const entries: TableEntry[] = [];
  let offset = woff2HeaderSize;
  for (let index = 0; index < numTables; index += 1) {
    const flags = bytes.readUInt8(offset);
    offset += 1;
    const tagIndex = flags & 0x3f;
    const transformVersion = flags >> 6;
    let tag = knownTableTags[tagIndex];
    if (tagIndex === arbitraryTagIndex) {
      tag = bytes.toString("latin1", offset, offset + 4);
      offset += 4;
    }
    if (tag === undefined) {
      throw new Error(`Unknown WOFF2 table tag index ${tagIndex}`);
    }
    const [originalLength, afterOriginalLength] = readUIntBase128(bytes, offset);
    offset = afterOriginalLength;
    const isGlyphTable = tag === "glyf" || tag === "loca";
    const transformed = isGlyphTable ? transformVersion !== 3 : transformVersion !== 0;
    let length = originalLength;
    if (transformed) {
      const [transformLength, afterTransformLength] = readUIntBase128(bytes, offset);
      length = transformLength;
      offset = afterTransformLength;
    }
    entries.push({ tag, length, transformed });
  }
  return { entries, end: offset };
}

function readNames(name: Buffer): Map<number, string> {
  const count = name.readUInt16BE(2);
  const stringOffset = name.readUInt16BE(4);
  const names = new Map<number, string>();
  for (let index = 0; index < count; index += 1) {
    const record = 6 + index * 12;
    const platformId = name.readUInt16BE(record);
    const encodingId = name.readUInt16BE(record + 2);
    const languageId = name.readUInt16BE(record + 4);
    const nameId = name.readUInt16BE(record + 6);
    const length = name.readUInt16BE(record + 8);
    const start = stringOffset + name.readUInt16BE(record + 10);
    if (platformId === 3 && encodingId === 1 && languageId === 0x409) {
      const utf16be = Buffer.from(name.subarray(start, start + length));
      names.set(nameId, utf16be.swap16().toString("utf16le"));
    }
  }
  return names;
}

function readAxes(fvar: Buffer): FontAxis[] {
  const axesOffset = fvar.readUInt16BE(4);
  const axisCount = fvar.readUInt16BE(8);
  const axisSize = fvar.readUInt16BE(10);
  return Array.from({ length: axisCount }, (_, index) => {
    const record = axesOffset + index * axisSize;
    return {
      tag: fvar.toString("latin1", record, record + 4),
      min: fvar.readInt32BE(record + 4) / 65536,
      default: fvar.readInt32BE(record + 8) / 65536,
      max: fvar.readInt32BE(record + 12) / 65536,
    };
  });
}

function readFormat4(cmap: Buffer, offset: number): Set<number> {
  const codePoints = new Set<number>();
  const segmentCount = cmap.readUInt16BE(offset + 6) / 2;
  const endCodes = offset + 14;
  const startCodes = endCodes + segmentCount * 2 + 2;
  const idDeltas = startCodes + segmentCount * 2;
  const idRangeOffsets = idDeltas + segmentCount * 2;
  for (let segment = 0; segment < segmentCount; segment += 1) {
    const end = cmap.readUInt16BE(endCodes + segment * 2);
    const start = cmap.readUInt16BE(startCodes + segment * 2);
    const delta = cmap.readInt16BE(idDeltas + segment * 2);
    const rangeOffsetPosition = idRangeOffsets + segment * 2;
    const rangeOffset = cmap.readUInt16BE(rangeOffsetPosition);
    for (let codePoint = start; codePoint <= end && codePoint !== 0xffff; codePoint += 1) {
      let glyph = (codePoint + delta) & 0xffff;
      if (rangeOffset !== 0) {
        const raw = cmap.readUInt16BE(
          rangeOffsetPosition + rangeOffset + (codePoint - start) * 2,
        );
        glyph = raw === 0 ? 0 : (raw + delta) & 0xffff;
      }
      if (glyph !== 0) {
        codePoints.add(codePoint);
      }
    }
  }
  return codePoints;
}

function readFormat12(cmap: Buffer, offset: number): Set<number> {
  const codePoints = new Set<number>();
  const groupCount = cmap.readUInt32BE(offset + 12);
  for (let group = 0; group < groupCount; group += 1) {
    const record = offset + 16 + group * 12;
    const start = cmap.readUInt32BE(record);
    const end = cmap.readUInt32BE(record + 4);
    const startGlyph = cmap.readUInt32BE(record + 8);
    for (let codePoint = start; codePoint <= end; codePoint += 1) {
      if (startGlyph + codePoint - start !== 0) {
        codePoints.add(codePoint);
      }
    }
  }
  return codePoints;
}

function readCodePoints(cmap: Buffer): Set<number> {
  const subtables = Array.from({ length: cmap.readUInt16BE(2) }, (_, index) => {
    const record = 4 + index * 8;
    const offset = cmap.readUInt32BE(record + 4);
    return {
      platformId: cmap.readUInt16BE(record),
      encodingId: cmap.readUInt16BE(record + 2),
      offset,
      format: cmap.readUInt16BE(offset),
    };
  });
  const isUnicode = (platformId: number, encodingId: number, windowsEncoding: number) =>
    platformId === 0 || (platformId === 3 && encodingId === windowsEncoding);
  const full = subtables.find(
    (subtable) => subtable.format === 12 && isUnicode(subtable.platformId, subtable.encodingId, 10),
  );
  if (full) {
    return readFormat12(cmap, full.offset);
  }
  const basic = subtables.find(
    (subtable) => subtable.format === 4 && isUnicode(subtable.platformId, subtable.encodingId, 1),
  );
  if (basic) {
    return readFormat4(cmap, basic.offset);
  }
  throw new Error("Font has no Unicode cmap subtable");
}

export function readWoff2(bytes: Buffer): Woff2Font {
  if (bytes.readUInt32BE(0) !== woff2Signature) {
    throw new Error("File is not WOFF2");
  }
  if (bytes.toString("latin1", 4, 8) === "ttcf") {
    throw new Error("WOFF2 font collections are not supported");
  }
  const { entries, end } = readTableDirectory(bytes, bytes.readUInt16BE(12));
  const totalCompressedSize = bytes.readUInt32BE(20);
  const data = brotliDecompressSync(bytes.subarray(end, end + totalCompressedSize));
  const tables = new Map<string, Buffer>();
  let offset = 0;
  for (const entry of entries) {
    if (!entry.transformed) {
      tables.set(entry.tag, data.subarray(offset, offset + entry.length));
    }
    offset += entry.length;
  }
  if (offset !== data.length) {
    throw new Error("WOFF2 table lengths do not match the decompressed font data");
  }
  const table = (tag: string): Buffer => {
    const found = tables.get(tag);
    if (!found) {
      throw new Error(`WOFF2 font has no untransformed ${tag} table`);
    }
    return found;
  };
  const head = table("head");
  if (head.readUInt32BE(12) !== headMagicNumber) {
    throw new Error("WOFF2 font has an invalid head table");
  }
  return {
    names: readNames(table("name")),
    axes: tables.has("fvar") ? readAxes(table("fvar")) : [],
    codePoints: readCodePoints(table("cmap")),
    isFixedPitch: table("post").readUInt32BE(12) !== 0,
  };
}
