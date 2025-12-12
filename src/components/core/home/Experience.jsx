import { Environment, Float, OrbitControls } from "@react-three/drei";
import { useWindowWidth } from "@react-hook/window-size";

import { Book } from "./Book";
import { useEffect, useState } from "react";

const Experience = () => {

  const windowWidth = useWindowWidth();

  const [bookScale, setBookScale] = useState(1.2);

  useEffect(() => {
    const scale = getBookScale();
    setBookScale(scale);
  }, [windowWidth]);

  // book size according to screen width
  const getBookScale = () => {
    // desktop screen
    if(windowWidth > 1440) {
      return 1.2;
    }
    // laptop screen
    if(windowWidth > 1024) {
      return 1.05;
    }
    // tablet screen
    if(windowWidth > 768) {
      return 1.02;
    }
    // phone Large
    if(windowWidth > 425) {
      return 0.80;
    }
    // phone medium
    if(windowWidth > 375) {
      return 0.70;
    }
    // phone small
    return 0.65;
  }

  return (
    <>
      <Float 
        rotation-x={-Math.PI / 4}
        floatIntensity={1}
        speed={2}
        rotationIntensity={2}
        scale={bookScale}
      >
        <Book/>
      </Float>
        
      <OrbitControls />

      <Environment preset="studio"></Environment>

      <directionalLight
        position={[2, 5, 2]}
        intensity={2.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      <mesh position-y={-1.5} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>

    </>
  );
};

export default Experience