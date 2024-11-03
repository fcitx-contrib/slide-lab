import type { RawThemeProperties, ThemeProperties } from './types/ThemeProperties'
import { uint32torgba } from './types/ThemeProperties'

type ColorProperties = Omit<RawThemeProperties, 'version' | 'name' | 'isDark' | 'backgroundImage'>

function makePreset(name: string, isDark: boolean, properties: ColorProperties): ThemeProperties {
  const theme: Partial<ThemeProperties> = { version: '2.0', name, isDark }
  for (const [k, v] of Object.entries(properties)) {
    // @ts-expect-error Object.entries is the best wtf
    theme[k] = uint32torgba(v)
  }
  return theme as ThemeProperties
}

export const PixelDark = makePreset('PixelDark', true, {
  backgroundColor: 0xFF2D2D2D,
  barColor: 0xFF373737,
  keyboardColor: 0xFF2D2D2D,
  keyBackgroundColor: 0xFF464646,
  keyTextColor: 0xFFFAFAFA,
  altKeyBackgroundColor: 0xFF373737,
  altKeyTextColor: 0xFFACACAC,
  accentKeyBackgroundColor: 0xFF5E97F6,
  accentKeyTextColor: 0xFFFFFFFF,
  keyPressHighlightColor: 0x33FFFFFF,
  keyShadowColor: 0xFF252525,
  popupBackgroundColor: 0xFF373737,
  popupTextColor: 0xFFFAFAFA,
  spaceBarColor: 0xFF4A4A4A,
  dividerColor: 0x1FFFFFFF,
  clipboardEntryColor: 0xFF464646,
  genericActiveBackgroundColor: 0xFF5E97F6,
  genericActiveForegroundColor: 0xFFFAFAFA,
})

export const PixelLight = makePreset('PixelLight', false, {
  backgroundColor: 0xFFEEEEEE,
  barColor: 0xFFEEEEEE,
  keyboardColor: 0xFFFAFAFA,
  keyBackgroundColor: 0xFFFFFFFF,
  keyTextColor: 0xFF212121,
  altKeyBackgroundColor: 0xFFE1E1E1,
  altKeyTextColor: 0xFF6E6E6E,
  accentKeyBackgroundColor: 0xFF4285F4,
  accentKeyTextColor: 0xFFFFFFFF,
  keyPressHighlightColor: 0x1F000000,
  keyShadowColor: 0xFFC2C2C2,
  popupBackgroundColor: 0xFFEEEEEE,
  popupTextColor: 0xFF212121,
  spaceBarColor: 0xFFDBDBDB,
  dividerColor: 0x1F000000,
  clipboardEntryColor: 0xFFFFFFFF,
  genericActiveBackgroundColor: 0xFF5E97F6,
  genericActiveForegroundColor: 0xFFFFFFFF,
})
