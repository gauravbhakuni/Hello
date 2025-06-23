import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Text3D, Center } from "@react-three/drei";

const GRID_SIZE = 30;

const Hero = () => {
  const centerRef = useRef();
  const [gridMap, setGridMap] = useState({});

  const rippleOffsets = [
    [0, 0],
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ];

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = e.clientX;
    const y = e.clientY;

    const rotateX = (y - innerHeight / 2) / innerHeight;
    const rotateY = (x - innerWidth / 2) / innerWidth;
    if (centerRef.current) {
      centerRef.current.rotation.y = rotateY * 0.2;
      centerRef.current.rotation.x = rotateX * 0.2;
    }

    const gridX = Math.floor(x / GRID_SIZE);
    const gridY = Math.floor(y / GRID_SIZE);

    rippleOffsets.forEach(([dx, dy], index) => {
      const x = (gridX + dx) * GRID_SIZE;
      const y = (gridY + dy) * GRID_SIZE;
      const key = `${gridX + dx},${gridY + dy}`;

      if (!gridMap[key]) {
        setTimeout(() => {
          setGridMap((prev) => ({
            ...prev,
            [key]: {
              x,
              y,
              hue: Math.floor(Math.random() * 360),
            },
          }));

          setTimeout(() => {
            setGridMap((prev) => {
              const updated = { ...prev };
              delete updated[key];
              return updated;
            });
          }, 1000);
        }, index * 40);
      }
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="hero-container h-screen w-screen bg-zinc-900 overflow-hidden relative"
      style={{
        cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>👋</text></svg>") 16 0, auto`,
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
      }}
    >
      <Canvas className="z-10" camera={{ position: [0, 0, 20], fov: 50 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[0, 0, 5]} intensity={1.5} />
        <Center ref={centerRef}>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={3}
            height={1}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.1}
            bevelSize={0.05}
            bevelSegments={5}
          >
            HELLO
            <meshStandardMaterial
              color="orange"
              metalness={1.7}
              roughness={0.2}
            />
          </Text3D>
        </Center>
      </Canvas>

      {Object.entries(gridMap).map(([key, pos]) => (
        <span
          key={key}
          className="absolute text-[0.4rem] font-thin pointer-events-none animate-hello-cell"
          style={{
            top: pos.y + GRID_SIZE / 2,
            left: pos.x + GRID_SIZE / 2,
            transform: "translate(-50%, -50%)",
            color: `hsl(${pos.hue}, 100%, 75%)`,
          }}
        >
          HELLO👋
        </span>
      ))}

      <style>{`
        @keyframes hello-cell {
          0% {
            opacity: 0;
            transform: scale(0.7) translateY(10px);
          }
          10% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: scale(0.9) translateY(-10px);
          }
        }

        .animate-hello-cell {
          animation: hello-cell 1s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Hero;
