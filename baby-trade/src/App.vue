<script setup lang="ts">
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import { sharedState } from "./game/gameStore";
import { getClockTimeFormatted } from "./game/clock";
</script>

<template>
  <div class="main-ui">
    <Header />
    <Sidebar />
  </div>
</template>
