import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

type OutfitStyle = {
  color: string;
  accent: string;
  roughness: number;
  metalness: number;
  fabric?: "gradient" | "denim";
};

const outfitStyles: Record<string, OutfitStyle> = {
  BODYSHIRT: {
    color: "#7c3aed",
    accent: "#fb923c",
    roughness: 0.45,
    metalness: 0.1,
    fabric: "gradient",
  },
  Pant: {
    color: "#3d5a80",
    accent: "#25384f",
    roughness: 0.85,
    metalness: 0.03,
    fabric: "denim",
  },
  Shoe: {
    color: "#141416",
    accent: "#33333a",
    roughness: 0.3,
    metalness: 0.2,
  },
  Sole: {
    color: "#2a2a2a",
    accent: "#3a3a3a",
    roughness: 0.6,
    metalness: 0,
  },
};

// Diagonal two-tone gradient with a faint weave overlay, for a vibrant,
// dye-sublimation-style shirt instead of a flat colour.
function createGradientFabricTexture(colorA: string, colorB: string) {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, colorA);
  gradient.addColorStop(0.55, "#ec4899");
  gradient.addColorStop(1, colorB);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  ctx.strokeStyle = "#ffffff";
  ctx.globalAlpha = 0.12;
  ctx.lineWidth = 1;
  for (let i = -size; i < size * 2; i += 5) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + size, size);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 6);
  return texture;
}

// Fine twill crosshatch plus light flecks, for a denim look on the pants.
function createDenimTexture(baseColor: string, weaveColor: string) {
  const size = 96;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, size, size);

  ctx.strokeStyle = weaveColor;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.35;
  for (let i = -size; i < size * 2; i += 3) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + size, size);
    ctx.stroke();
  }
  ctx.globalAlpha = 0.18;
  for (let i = -size; i < size * 2; i += 3) {
    ctx.beginPath();
    ctx.moveTo(i, size);
    ctx.lineTo(i + size, 0);
    ctx.stroke();
  }

  ctx.globalAlpha = 0.25;
  ctx.fillStyle = "#e8eef7";
  for (let i = 0; i < 40; i++) {
    ctx.fillRect(Math.random() * size, Math.random() * size, 1, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(10, 10);
  return texture;
}

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                const style = outfitStyles[mesh.name];
                if (style) {
                  const baseMaterial = Array.isArray(mesh.material)
                    ? mesh.material[0]
                    : mesh.material;
                  const material = (
                    baseMaterial as THREE.MeshStandardMaterial
                  ).clone();
                  material.color = new THREE.Color(style.color);
                  material.roughness = style.roughness;
                  material.metalness = style.metalness;
                  if (style.fabric === "gradient") {
                    material.map = createGradientFabricTexture(
                      style.color,
                      style.accent
                    );
                  } else if (style.fabric === "denim") {
                    material.map = createDenimTexture(
                      style.color,
                      style.accent
                    );
                  }
                  mesh.material = material;
                }

                if (mesh.name === "hair") {
                  const baseMaterial = Array.isArray(mesh.material)
                    ? mesh.material[0]
                    : mesh.material;
                  const material = (
                    baseMaterial as THREE.MeshStandardMaterial
                  ).clone();
                  material.color = new THREE.Color("#0d0e16");
                  material.roughness = 0.28;
                  material.metalness = 0.15;
                  mesh.material = material;
                }
              }
            });

            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
