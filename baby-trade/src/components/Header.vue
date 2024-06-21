<script setup lang="ts">
import Clock from './header/Clock.vue';
import News from './header/News.vue';
</script>

<template>
  <header class="header">
    <div class="left-side">
      <div class="container align-center">
        <div class="container-content">
          Baby Trade
        </div>
      </div>
      <div class="container align-center justify-center">
        <div class="container-content">
          <span class="dollar-sign">$</span>100M &bull; 95 Babies
        </div>
      </div>
    </div>
    <div class="right-side">
      <News />
      <Clock />
    </div>
  </header>
</template>