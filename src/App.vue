<script setup lang="ts">
import type { ThemePreference } from './types/ThemePreference'

import type { ThemeProperties } from './types/ThemeProperties'
import { ref } from 'vue'

import KeyboardWindow from './components/KeyboardWindow.vue'

import { TextKeyboard } from './layouts'
import { PixelDark } from './theme-preset'
import { PunctuationPosition } from './types/ThemePreference'

const preference = ref<ThemePreference>({
  border: false,
  horizontalMargin: 3,
  verticalMargin: 7,
  radius: 4,
  puncPosition: PunctuationPosition.Bottom,
})

const theme = ref<ThemeProperties>(PixelDark)
</script>

<template>
  <div class="input-view">
    <KeyboardWindow :preference="preference" :layout="TextKeyboard" :theme="theme" />
  </div>
</template>

<style>
body {
    margin: 0; /* Content fills 100% width on phone. */
}

.input-view {
    height: 230px;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 0;
}
</style>
