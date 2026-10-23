import { ok, err } from '../lib/result'
import type { Result } from '../lib/result'

export const DEFAULT_JPEG_QUALITY = 0.9
export const MIN_JPEG_QUALITY = 0.1
export const MAX_JPEG_QUALITY = 1

// ISO BMFF major brands used by HEIC/HEIF stills and sequences (iPhone photos are "heic")
const HEIF_BRANDS = new Set(['heic', 'heix', 'heim', 'heis', 'hevc', 'hevx', 'mif1', 'msf1'])

const HEIC_EXTENSION = /\.(heic|heif)$/i

/**
 * Checks the ISO BMFF header: bytes 4-7 must be "ftyp" and bytes 8-11 a HEIF brand.
 * Pass at least the first 12 bytes of the file.
 */
export function isHeicHeader(bytes: Uint8Array): boolean {
  if (bytes.length < 12) return false
  const ascii = (start: number, end: number) => String.fromCharCode(...bytes.slice(start, end))
  return ascii(4, 8) === 'ftyp' && HEIF_BRANDS.has(ascii(8, 12))
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
