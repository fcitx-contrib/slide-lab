<script setup lang="ts">
import type { StyleValue } from 'vue'
import type { KeyAppearanceAltText } from '../../types/KeyDef'

import type { ThemePreference } from '../../types/ThemePreference'
import type { ThemeProperties } from '../../types/ThemeProperties'
import { computed } from 'vue'
import { KeyAppearanceVariant, KeyTextTypeface } from '../../types/KeyDef'

const props = defineProps<{
  preference: ThemePreference
  appearance: KeyAppearanceAltText
  theme: ThemeProperties
}>()

const fgColor = computed(() => {
  switch (props.appearance.variant) {
    case KeyAppearanceVariant.Normal:
      return props.theme.keyTextColor
    case KeyAppearanceVariant.AltForeground:
    case KeyAppearanceVariant.Alternative:
      return props.theme.altKeyTextColor
    case KeyAppearanceVariant.Accent:
      return props.theme.accentKeyTextColor
    default:
      return props.theme.keyTextColor
  }
})

const mainTextStyle = computed<StyleValue>(() => ({
  color: fgColor.value,
  fontSize: `${props.appearance.textSize}px`,
  fontWeight: props.appearance.typeface === KeyTextTypeface.Bold ? 'bold' : 'normal',
}))

const altFgColor = computed(() => {
  switch (props.appearance.variant) {
    case KeyAppearanceVariant.Normal:
    case KeyAppearanceVariant.AltForeground:
    case KeyAppearanceVariant.Alternative:
      return props.theme.altKeyTextColor
    case KeyAppearanceVariant.Accent:
      return props.theme.accentKeyTextColor
    default:
      return props.theme.altKeyTextColor
  }
})

const altTextStyle = computed<StyleValue>(() => ({
  color: altFgColor.value,
  fontSize: '10.7px',
  fontWeight: 'bold',
  transform: 'translateY(-2px)',
}))
</script>

<template>
  <div class="keyview__fg" :style="mainTextStyle" v-text="appearance.displayText" />
  <div class="keyview__fg" :style="altTextStyle" v-text="appearance.altText" />
</template>
