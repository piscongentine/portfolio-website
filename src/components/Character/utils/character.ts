import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

type OutfitStyle = {
  color: string;
  accent: string;
  roughness: number;
  metalness: number;
  fabric?: boolean;
};

const outfitStyles: Record<string, OutfitStyle> = {
  BODYSHIRT: {
    color: "#3355a8",
    accent: "#8fb0ff",
    roughness: 0.5,
    metalness: 0.12,
    fabric: true,
  },
  Pant: {
    color: "#1c1c24",
    accent: "#33333f",
    roughness: 0.7,
    metalness: 0.05,
    fabric: true,
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

function createFabricTexture(baseColor: string, accent: string) {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = accent;
  ctx.globalAlpha = 0.3;
  ctx.lineWidth = 1;
  for (let i = -size; i < size * 2; i += 4) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + size, size);
    ctx.stroke();
  }
  for (let i = -size; i < size * 2; i += 4) {
    ctx.beginPath();
    ctx.moveTo(i, size);
    ctx.lineTo(i + size, 0);
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(12, 12);
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
                  if (style.fabric) {
                    material.map = createFabricTexture(
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
