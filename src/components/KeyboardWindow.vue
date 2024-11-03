<script setup lang="ts">
import type { StyleValue } from 'vue'
import type { KeyAppearance } from '../types/KeyDef'

import type { ThemePreference } from '../types/ThemePreference'
import type { ThemeProperties } from '../types/ThemeProperties'
import { computed } from 'vue'

import KeyView from './KeyView/KeyView.vue'

const props = defineProps<{
  preference: ThemePreference
  layout: KeyAppearance[][]
  theme: ThemeProperties
}>()

const keyboardStyle = computed<StyleValue>(() => ({
  backgroundColor: props.preference.border ? props.theme.backgroundColor : props.theme.keyboardColor,
}))

let startTime = 0
let track: Track = []
let x = 0
let y = 0
let width = 0

function rainbowColor(velocity: number) {
  const ratio = 2
  const hue = 270 * Math.min(velocity * ratio, 1)
  return `hsl(${hue}, 100%, 50%)`
}

function draw() {
  const canvas = document.getElementById('trackCanvas') as HTMLCanvasElement
  const ctx = canvas.getContext('2d')!
  ctx.lineWidth = 1

  for (let i = 0; i < track.length - 1; i++) {
    ctx.beginPath()
    ctx.moveTo(track[i][0], track[i][1])
    ctx.lineTo(track[i + 1][0], track[i + 1][1])
    const v = Math.sqrt((track[i + 1][0] - track[i][0]) ** 2 + (track[i + 1][1] - track[i][1]) ** 2) / (track[i + 1][2] - track[i][2])
    ctx.strokeStyle = rainbowColor(v)
    ctx.stroke()
  }
}

function touchMove(event: TouchEvent) {
  track.push([(event.changedTouches[0].clientX - x) / width * 100, (event.changedTouches[0].clientY - y) / width * 100, event.timeStamp - startTime])
}

function touchStart(event: TouchEvent) {
  const canvas = document.getElementById('trackCanvas')! as HTMLCanvasElement
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const rect = document.querySelector('.keyboard')!.getBoundingClientRect()
  x = rect.x
  y = rect.y
  width = rect.width
  startTime = event.timeStamp
  track = []
  touchMove(event)
}

function touchEnd(event: TouchEvent) {
  touchMove(event)
  draw()
}
</script>

<template>
  <div class="keyboard" :style="keyboardStyle" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
    <div v-for="(keyRow, rowIndex) of layout" :key="rowIndex" class="keyrow">
      <KeyView v-for="(key, keyIndex) of keyRow" :key="`row${rowIndex}key${keyIndex}`" :preference="preference" :appearance="key" :theme="theme" />
    </div>
  </div>
  <canvas id="trackCanvas" style="position: absolute; width: 100%" width="100" />
</template>

<style>
.keyboard {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    user-select: none;
}

.keyrow {
    display: flex;
    flex-grow: 1;
    justify-content: center;
}
</style>
