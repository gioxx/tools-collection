import { describe, it, expect } from 'vitest'
import {
  isHeicHeader,
  hasHeicExtension,
  validateHeicHeader,
  toJpgFileName,
  clampJpegQuality,
  uniqueFileNames,
  DEFAULT_JPEG_QUALITY,
  MIN_JPEG_QUALITY,
} from '../../src/tools/heic-to-jpg'

function header(brand: string, box = 'ftyp'): Uint8Array {
  return new Uint8Array([0, 0, 0, 24, ...[...box, ...brand].map((c) => c.charCodeAt(0))])
}

describe('isHeicHeader', () => {
  it('accepts iPhone HEIC files', () => {
    expect(isHeicHeader(header('heic'))).toBe(true)
  })

  it('accepts generic HEIF brands', () => {
    for (const brand of ['heix', 'hevc', 'mif1', 'msf1']) {
      expect(isHeicHeader(header(brand))).toBe(true)
    }
  })

  it('rejects other ISO BMFF files such as MP4 and AVIF', () => {
    expect(isHeicHeader(header('isom'))).toBe(false)
    expect(isHeicHeader(header('avif'))).toBe(false)
  })

  it('rejects files without an ftyp box', () => {
    expect(isHeicHeader(header('heic', 'moov'))).toBe(false)
  })

  it('rejects JPEG data', () => {
    expect(isHeicHeader(new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0, 16, 74, 70, 73, 70, 0, 1]))).toBe(false)
  })

  it('rejects truncated input', () => {
    expect(isHeicHeader(new Uint8Array([0, 0, 0, 24]))).toBe(false)
  })
})

describe('validateHeicHeader', () => {
  it('returns ok for HEIC data', () => {
    expect(validateHeicHeader(header('heic')).ok).toBe(true)
  })

  it('returns NOT_HEIC for anything else', () => {
    const result = validateHeicHeader(new Uint8Array(12))
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.error.code).toBe('NOT_HEIC')
  })
})

describe('hasHeicExtension', () => {
  it('matches .heic and .heif in any case', () => {
    expect(hasHeicExtension('IMG_1234.HEIC')).toBe(true)
    expect(hasHeicExtension('photo.heif')).toBe(true)
  })

  it('does not match other extensions', () => {
    expect(hasHeicExtension('photo.jpg')).toBe(false)
    expect(hasHeicExtension('heic.png')).toBe(false)
  })
})

describe('toJpgFileName', () => {
  it('replaces the HEIC extension', () => {
    expect(toJpgFileName('IMG_1234.HEIC')).toBe('IMG_1234.jpg')
    expect(toJpgFileName('holiday.photo.heif')).toBe('holiday.photo.jpg')
  })

  it('appends .jpg when there is no HEIC extension', () => {
    expect(toJpgFileName('IMG_1234')).toBe('IMG_1234.jpg')
  })

  it('falls back to a default name when nothing is left', () => {
    expect(toJpgFileName('.heic')).toBe('image.jpg')
  })
})

describe('clampJpegQuality', () => {
  it('keeps values in range', () => {
    expect(clampJpegQuality(0.75)).toBe(0.75)
  })

  it('clamps out-of-range values', () => {
    expect(clampJpegQuality(0)).toBe(MIN_JPEG_QUALITY)
    expect(clampJpegQuality(2)).toBe(1)
  })

  it('uses the default for non-numeric values', () => {
    expect(clampJpegQuality(Number.NaN)).toBe(DEFAULT_JPEG_QUALITY)
  })
})

describe('uniqueFileNames', () => {
  it('leaves distinct names unchanged', () => {
    expect(uniqueFileNames(['a.jpg', 'b.jpg'])).toEqual(['a.jpg', 'b.jpg'])
  })

  it('numbers duplicates before the extension', () => {
    expect(uniqueFileNames(['a.jpg', 'a.jpg', 'a.jpg'])).toEqual(['a.jpg', 'a (2).jpg', 'a (3).jpg'])
  })

  it('treats names differing only by case as duplicates', () => {
    expect(uniqueFileNames(['IMG.jpg', 'img.jpg'])).toEqual(['IMG.jpg', 'img (2).jpg'])
  })

  it('does not collide with an existing numbered name', () => {
    expect(uniqueFileNames(['a (2).jpg', 'a.jpg', 'a.jpg'])).toEqual(['a (2).jpg', 'a.jpg', 'a (3).jpg'])
  })
})
