import { useRef } from 'react'
import { Canvas,useFrame } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Float } from '@react-three/drei'
import { useState,useEffect } from 'react'
import Laptop from '../three/components/Laptop'
import Mesa from '../three/components/Mesa'
import Particulas from '../three/components/Particulas'
import { Grid, Stats } from '@react-three/drei'

import { KeyboardControls } from '@react-three/drei'
import { useKeyboardControls } from '@react-three/drei'
function RoomLight() {
  const [lightOn, setLightOn] = useState(true)
  
  // Suscribirse a la tecla 'toggleLight' (la L)
  const [subscribeKeys, getKeys] = useKeyboardControls()

  useEffect(() => {
    return subscribeKeys(
      (state) => state.toggleLight,
      (value) => {
        if (value) setLightOn(prev => !prev)
      }
    )
  }, [])

  return (
    <pointLight 
      position={[0, 3, 0]} 
      intensity={lightOn ? 2 : 0} 
      color="#ffccaa" 
      castShadow 
    />
  )
}

function Rig() {
  return useFrame((state) => {
    // La cámara se mueve suavemente siguiendo al mouse o de forma automática
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 2 + 5
    state.camera.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 2 + 5
    state.camera.lookAt(0, 0, 0) // Siempre mirando al centro del diorama
  })
}


function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#005780ff' }}>
      <KeyboardControls
      map={[
        { name: 'toggleLight', keys: ['KeyL'] },
        { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
      ]}
    >
      <Canvas 
        shadows 
        orthographic // El secreto del look "Diorama"
        camera={{ zoom: 100, position: [5, 5, 5] }}
      >
        <RoomLight />
        {/* Luz suave que viene de todos lados (Relleno) */}
        <ambientLight intensity={0.6} color="#ffffff" />

        {/* Luz principal que crea sombras (Sol)*/}
        <directionalLight 
          position={[8, 12, 5]} 
          intensity={1.2} 
          castShadow 
          shadow-mapSize={[1024, 1024]} // Mejora la calidad de la sombra
        />

        {/* Luz de acento (Luz cálida que rebota del suelo) */}
        <hemisphereLight args={["#ffffff", "#60666a", 0.5]} />
        <Particulas />
        {/* --- GRUPO DE LA HABITACIÓN --- */}
        <group position-y={-0.5}>
          
          {/* Suelo */}
          <mesh receiveShadow position={[0, -0.1, 0]}>
            <boxGeometry args={[5, 0.3, 5]} /> {/* 5x5 de base y 0.5 de grosor */}
            <meshStandardMaterial color="#d1d1d1"
  roughness={0.1} // Lo hace un poco reflectante
  metalness={0.2} // Le da un toque de material sólido 
  />
          </mesh>

          {/* Pared Izquierda */}
          <mesh receiveShadow position={[-2.5, 2.5, 0]} rotation-y={Math.PI / 2}>
            <planeGeometry args={[5, 5]} />
            <meshStandardMaterial color="#d1d1d1" />
          </mesh>

          {/* Pared Derecha (Fondo) */}
          <mesh receiveShadow position={[0, 2.5, -2.5]}>
            <planeGeometry args={[5, 5]} />
            <meshStandardMaterial color="#ffeded" />
          </mesh>

        </group>
        
        {/* Ayudantes visuales */}
        <axesHelper args={[5]} /> {/* En minúsculas, funciona directo */}
        <Stats />
        <Grid infiniteGrid fadeDistance={50} sectionColor="#444" />
        <group>
          <Mesa position={[0, 2, 0]} />
        </group>
        <group position={[2, 0, 0]}>

          {/* Sombras de contacto: El secreto del realismo */}
          <ContactShadows 
            opacity={0.4} 
            scale={10} 
            blur={2.4} 
            far={0.8} 
          />

          {/* Usamos Float para que la laptop flote un poquito antes de ponerla en la mesa */}
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Laptop position={[0, 0.1, 0]} />
          </Float>
        </group>

  
        <OrbitControls makeDefault /> {/* Control de la cámara */}
      </Canvas>
      </KeyboardControls>
    </div>
  )
}

export default App