<template>
  <canvas ref="canvas" class="fullscreen canvas" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  AmbientLight,
  // OrbitControls,
  Scene,
  PerspectiveCamera,
  MeshBasicMaterial,
  Mesh,
  BoxGeometry,
  WebGLRenderer,
  Vector3,
  Object3D
} from "three";
import Stats from "stats-js";

@Component({})
export default class Game extends Vue {
  private scene!: Scene;
  private camera!: PerspectiveCamera;
  private renderer!: WebGLRenderer;
  // private controls!: OrbitControls;
  private stats!: any;

  $refs!: {
    canvas: HTMLCanvasElement;
  };

  created() {
    this.scene = new Scene();
    this.scene.add(new AmbientLight(0x999999));
    Object3D.DefaultUp = new Vector3(0, 0, 1);
  }

  mounted() {
    this.camera = new PerspectiveCamera(
      75,
      this.$refs.canvas.clientWidth / this.$refs.canvas.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(5, 5, 5);
    this.camera.updateProjectionMatrix,
      (this.renderer = new WebGLRenderer({
        canvas: this.$refs.canvas,
        antialias: true
      }));
    this.renderer.setPixelRatio(window.devicePixelRatio);
    // this.controls = new OrbitControls(this.camera, this.$refs.canvas);
    this.stats = new Stats();
    this.stats.showPanel(0);
    this.stats.dom.style.position = "absolute";
    document.body.appendChild(this.stats.dom);
    this.renderer.setSize(
      this.$refs.canvas.clientWidth,
      this.$refs.canvas.clientHeight
    );
    this.renderer.setClearColor(0x222222);

    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0x4444ff });
    const cube = new Mesh(geometry, material);
    this.scene.add(cube);
    this.camera.lookAt(cube.position);

    this.animate();
  }

  animate() {
    this.stats.begin();
    // this.controls.update();
    this.stats.end();
    this.renderer.render(this.scene, this.camera);
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
