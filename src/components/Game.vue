<template>
  <canvas ref="canvas" class="fullscreen canvas" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  AmbientLight,
  Scene,
  PerspectiveCamera,
  MeshBasicMaterial,
  PointLight,
  Mesh,
  BoxGeometry,
  WebGLRenderer,
  Group,
  Vector3,
  Object3D
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import FBXLoader from "three-fbx-loader";
import GLTFLoader from "three-gltf-loader";
import Stats from "stats-js";

@Component({})
export default class Game extends Vue {
  private scene!: Scene;
  private camera!: PerspectiveCamera;
  private renderer!: WebGLRenderer;
  private controls!: OrbitControls;
  private stats!: any;

  $refs!: {
    canvas: HTMLCanvasElement;
  };

  buildStadiumLights() {
    const d = 5;
    const height = 10;
    console.log(height);
    const redLight = new PointLight(0xdd3333, 0.4, 100);
    redLight.position.set(d * 0.2, d * 0.1, height);
    this.scene.add(redLight);
    const blueLight = new PointLight(0x3333dd, 0.4, 100);
    blueLight.position.set(d * 0.2, d * -0.1, height);
    this.scene.add(blueLight);
    const greenLight = new PointLight(0x33dd33, 0.4, 100);
    greenLight.position.set(d * -0.1, 0, height);
    this.scene.add(greenLight);
  }

  created() {
    this.scene = new Scene();
    this.scene.add(new AmbientLight(0x999999));
    this.buildStadiumLights();
    Object3D.DefaultUp = new Vector3(0, 0, 1);
  }

  mounted() {
    this.camera = new PerspectiveCamera(
      75,
      this.$refs.canvas.clientWidth / this.$refs.canvas.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(1, 1, 1);
    this.camera.updateProjectionMatrix,
      (this.renderer = new WebGLRenderer({
        canvas: this.$refs.canvas,
        antialias: true
      }));
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.controls = new OrbitControls(this.camera, this.$refs.canvas);
    this.stats = new Stats();
    this.stats.showPanel(0);
    this.stats.dom.style.position = "absolute";
    document.body.appendChild(this.stats.dom);
    this.renderer.setSize(
      this.$refs.canvas.clientWidth,
      this.$refs.canvas.clientHeight
    );
    this.renderer.setClearColor(0x222222);

    const gltfloader = new GLTFLoader();
    const loadGlb = (uri: string) => {
      gltfloader.load(uri, (gltf: any) => {
        console.log(gltf);
        const obj = gltf.scene;
        // obj.up.set(0, 0, 1);
        obj.scale.set(0.01, 0.01, 0.01);
        obj.rotation.set(Math.PI / 2, 0, 0);
        this.scene.add(obj);
      });
    };
    loadGlb("Hands_Test.glb");
    loadGlb("Stadium_Section_GLTF.glb");

    // const fbxloader = new FBXLoader();
    // fbxloader.load('/Stadium_ENV_v01.fbx', (obj: any) => {
    //   console.log(obj);
    //   this.scene.add(obj.children[0]);
    // });
    // const geometry = new BoxGeometry(1, 1, 1);
    // const material = new MeshBasicMaterial({ color: 0x4444ff });
    // const cube = new Mesh(geometry, material);
    // this.scene.add(cube);
    // this.camera.lookAt(cube.position);

    this.animate();
  }

  animate() {
    this.stats.begin();
    this.controls.update();
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
