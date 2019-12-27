<template>
  <canvas ref="canvas" class="fullscreen canvas" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Scene, PerspectiveCamera, WebGLRenderer } from "three";
import Stats from "stats-js";

@Component({})
export default class Game extends Vue {
  private scene!: Scene;
  private camera!: PerspectiveCamera;
  private renderer!: WebGLRenderer;
  private stats!: any;

  $refs!: {
    canvas: HTMLCanvasElement;
  };

  mounted() {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new WebGLRenderer({
      canvas: this.$refs.canvas,
      antialias: true
    });
    console.log(this.$refs.canvas);
    this.stats = new Stats();
    this.stats.showPanel(0);
    this.stats.dom.style.position = "absolute";
    document.body.appendChild(this.stats.dom);
  }

  created() {
    this.renderer.setSize(
      this.$refs.canvas.clientWidth,
      this.$refs.canvas.clientHeight
    );
    this.renderer.setClearColor(0x222222);
  }

  animate() {
    this.stats.begin();
    this.stats.end();
    requestAnimationFrame(this.animate);
  }
}
</script>

<style scoped>
.fullscreen {
  height: 100%;
  width: 100%;
}
.canvas {
  position: absolute;
}
</style>
