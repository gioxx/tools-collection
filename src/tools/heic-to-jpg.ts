import { ok, err } from '../lib/result'
import type { Result } from '../lib/result'

export const DEFAULT_JPEG_QUALITY = 0.9
export const MIN_JPEG_QUALITY = 0.1
export const MAX_JPEG_QUALITY = 1

// HEVC-coded HEIF brands (iPhone photos are "heic")
const HEVC_BRANDS = new Set(['heic', 'heix', 'heim', 'heis', 'hevc', 'hevx'])
// Generic HEIF structural brands: also used by AVIF, so they only count with an HEVC brand alongside
const STRUCTURAL_BRANDS = new Set(['mif1', 'mif2', 'msf1'])

/** Bytes to read from the start of a file to cover a typical ftyp box. */
export const HEADER_BYTES = 512

const HEIC_EXTENSION = /\.(heic|heif)$/i

/**
 * Checks the leading ISO BMFF "ftyp" box: the major brand must be an HEVC HEIF
 * brand, or a generic HEIF brand (mif1/mif2/msf1) with an HEVC brand among the
 * compatible brands. Pass the first HEADER_BYTES bytes of the file.
 */
export function isHeicHeader(bytes: Uint8Array): boolean {
  if (bytes.length < 12) return false
  const ascii = (start: number) => String.fromCharCode(...bytes.slice(start, start + 4))
  if (ascii(4) !== 'ftyp') return false
  const boxSize = ((bytes[0]! << 24) | (bytes[1]! << 16) | (bytes[2]! << 8) | bytes[3]!) >>> 0
  const end = Math.min(boxSize >= 16 ? boxSize : 12, bytes.length)
  const major = ascii(8)
  if (HEVC_BRANDS.has(major)) return true
  if (!STRUCTURAL_BRANDS.has(major)) return false
  // Compatible brands follow the 4-byte minor version
  for (let offset = 16; offset + 4 <= end; offset += 4) {
    if (HEVC_BRANDS.has(ascii(offset))) return true
  }
  return false
}

export function hasHeicExtension(fileName: string): boolean {
  return HEIC_EXTENSION.test(fileName)
}

export function validateHeicHeader(bytes: Uint8Array): Result<true> {
  if (!isHeicHeader(bytes)) {
    return err('NOT_HEIC', 'The file is not a HEIC/HEIF image')
  }
  return ok(true)
}

/** IMG_1234.HEIC -> IMG_1234.jpg; names without a HEIC extension just get ".jpg" appended. */
export function toJpgFileName(fileName: string): string {
  const base = fileName.replace(HEIC_EXTENSION, '').trim()
  return `${base || 'image'}.jpg`
}

export function clampJpegQuality(quality: number): number {
  if (!Number.isFinite(quality)) return DEFAULT_JPEG_QUALITY
  return Math.min(MAX_JPEG_QUALITY, Math.max(MIN_JPEG_QUALITY, quality))
}

/**
 * Makes file names unique for a ZIP archive: duplicates get " (2)", " (3)"...
 * before the extension, case-insensitively (archives are often extracted on
 * case-insensitive file systems).
 */
export function uniqueFileNames(fileNames: readonly string[]): string[] {
  const used = new Set<string>()
  return fileNames.map((name) => {
    const dot = name.lastIndexOf('.')
    const stem = dot > 0 ? name.slice(0, dot) : name
    const ext = dot > 0 ? name.slice(dot) : ''
    let candidate = name
    for (let n = 2; used.has(candidate.toLowerCase()); n++) {
      candidate = `${stem} (${n})${ext}`
    }
    used.add(candidate.toLowerCase())
    return candidate
  })
}
