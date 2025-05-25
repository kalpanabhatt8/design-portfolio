import { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";

export default function Home() {
  const canvasRef = useRef(null);
  const words = [
    "overthinker",
    "builder",
    "dreamer",
    "designer",
    "debugger",
    "communicator"
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const textMeshes = [];
    const loader = new THREE.FontLoader();

    loader.load("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", function (font) {
      words.forEach((word, i) => {
        const geometry = new THREE.TextGeometry(word, {
          font: font,
          size: 1,
          height: 0.1
        });
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const textMesh = new THREE.Mesh(geometry, material);
        textMesh.position.x = (Math.random() - 0.5) * 10;
        textMesh.position.y = (Math.random() - 0.5) * 10;
        textMesh.position.z = (Math.random() - 0.5) * 10;
        scene.add(textMesh);
        textMeshes.push(textMesh);
      });

      camera.position.z = 10;

      function animate() {
        requestAnimationFrame(animate);
        textMeshes.forEach((mesh, i) => {
          mesh.rotation.y += 0.005;
        });
        renderer.render(scene, camera);
      }

      animate();
    });

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }, []);

  return (
    <div className="relative w-full h-screen bg-black">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl font-bold font-bricolage text-center z-10">
        Kalpana Bhatt<br />
        <span className="text-base font-outfit">clarity through interface</span>
      </div>
    </div>
  );
}
