<script setup lang="ts">
import type { StyleValue } from 'vue'
import type { KeyAppearanceImage } from '../../types/KeyDef'

import type { ThemePreference } from '../../types/ThemePreference'
import type { ThemeProperties } from '../../types/ThemeProperties'
import { computed } from 'vue'
import { KeyAppearanceVariant, KeyImageResourceIcon } from '../../types/KeyDef'

const props = defineProps<{
  preference: ThemePreference
  appearance: KeyAppearanceImage
  theme: ThemeProperties
}>()

const icon = computed(() => KeyImageResourceIcon[props.appearance.src] ?? 'question_mark')

const fgColor = computed(() => {
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

const fgStyle = computed<StyleValue>(() => ({
  color: fgColor.value,
  fontFamily: 'Material Icons',
  fontSize: '24px',
}))
</script>

<template>
  <div class="keyview__fg" :style="fgStyle" v-text="icon" />
</template>
