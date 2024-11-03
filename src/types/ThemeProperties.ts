export interface RawThemeProperties {
  version: string
  name: string

  // TODO: theme background image
  backgroundImage?: unknown

  backgroundColor: number
  barColor: number
  keyboardColor: number

  keyBackgroundColor: number
  keyTextColor: number

  altKeyBackgroundColor: number
  altKeyTextColor: number

  accentKeyBackgroundColor: number
  accentKeyTextColor: number

  keyPressHighlightColor: number
  keyShadowColor: number

  popupBackgroundColor: number
  popupTextColor: number

  spaceBarColor: number
  dividerColor: number
  clipboardEntryColor: number

  genericActiveBackgroundColor: number
  genericActiveForegroundColor: number

  isDark: boolean
}

export type ThemeProperties = {
  [k in keyof RawThemeProperties]: RawThemeProperties[k] extends number ? string : RawThemeProperties[k];
}

export enum ThemePropertyType {
  Unknown,
  UUID,
  Color,
  Boolean,
}

export const ThemePropertiesTypes: {
  [k in keyof RawThemeProperties]: ThemePropertyType;
} = {
  version: ThemePropertyType.Unknown,
  name: ThemePropertyType.UUID,
  backgroundImage: ThemePropertyType.Unknown,
  backgroundColor: ThemePropertyType.Color,
  barColor: ThemePropertyType.Color,
  keyboardColor: ThemePropertyType.Color,
  keyBackgroundColor: ThemePropertyType.Color,
  keyTextColor: ThemePropertyType.Color,
  altKeyBackgroundColor: ThemePropertyType.Color,
  altKeyTextColor: ThemePropertyType.Color,
  accentKeyBackgroundColor: ThemePropertyType.Color,
  accentKeyTextColor: ThemePropertyType.Color,
  keyPressHighlightColor: ThemePropertyType.Color,
  keyShadowColor: ThemePropertyType.Color,
  popupBackgroundColor: ThemePropertyType.Color,
  popupTextColor: ThemePropertyType.Color,
  spaceBarColor: ThemePropertyType.Color,
  dividerColor: ThemePropertyType.Color,
  clipboardEntryColor: ThemePropertyType.Color,
  genericActiveBackgroundColor: ThemePropertyType.Color,
  genericActiveForegroundColor: ThemePropertyType.Color,
  isDark: ThemePropertyType.Boolean,
}

const buffer = new ArrayBuffer(4)
const view = new DataView(buffer)

export function uint2int32(colorInt: number): number {
  view.setUint32(0, colorInt)
  return view.getInt32(0)
}

/**
 * @param colorInt 0xAARRGGBB
 * @returns #RRGGBBAA
 */
export function int32torgba(colorInt: number): string {
  view.setInt32(0, colorInt)
  const rgba = [
    view.getUint8(1),
    view.getUint8(2),
    view.getUint8(3),
    view.getUint8(0),
  ].map(i => i.toString(16).padStart(2, '0')).join('')
  return `#${rgba}`
}

/**
 * @param uint 0xAARRGGBB
 * @returns #RRGGBBAA
 */
export function uint32torgba(uint: number): string {
  const str = uint.toString(16).padStart(8, '0')
  return `#${str.substring(2)}${str.substring(0, 2)}`
}
