<template>
  <div id="app">
    <Game style="height: 100%; width: 100%;" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Game from "@/components/Game.vue";

@Component({
  components: {
    Game
  }
})
export default class App extends Vue {}
</script>

<style>
body {
  margin: 0 !important;
}
</style>
