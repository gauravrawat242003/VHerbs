import React, { Suspense } from 'react'
import { Float, OrbitControls, PresentationControls, Stage, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber';
import CanvasLoader from './CanvasLoader';

function Model(props) {
    const { scene } = useGLTF(props.model);
    return <primitive object={scene} {...props}/>
}

const ModelViewer = ({model, isFloating=false}) => {
  return (
    <>
    {
        model ? (
        <div className='h-full w-full'>
            <Canvas>
                <Suspense fallback={<CanvasLoader/>}>
                <directionalLight
                    position={[20, 5, 2]}
                    intensity={5}
                />
                    <PresentationControls speed={2.5} global>
                        <Stage>
                            <OrbitControls 
                                enableZoom={true}
                                enablePan={false}
                                enableRotate={false}
                            />
                            {
                                isFloating ? (
                                    <Float
                                        // rotation-x={-Math.PI / 4}
                                        floatIntensity={1}
                                        speed={2}
                                        rotationIntensity={2}
                                        scale={1.2}
                                    >
                                        <Model model={model}/>
                                    </Float>
                                ) : <Model model={model}/>
                            }
                        </Stage>
                    </PresentationControls>
                </Suspense>
            </Canvas>
        </div>
        ) : (
            <div className='w-full h-full text-center flex justify-center items-center text-2xl sm:text-3xl tracking-widest'>
                <p>Model will be uploaded soon! <br/> Stay tuned :)</p>
            </div>
        )
    }
    </>
  )
}

export default ModelViewer;