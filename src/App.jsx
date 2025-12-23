import { useRef,useState,useEffect } from 'react'
import { Canvas,useFrame,useThree } from '@react-three/fiber'
import { ContactShadows, Float, KeyboardControls,useKeyboardControls,OrbitControls, Environment } from '@react-three/drei'

import Laptop from './three/components/Laptop'
import Mesa from './three/components/Mesa'
import Cuarto from './three/components/Cuarto'
import Ventana from './three/components/Ventana'
import Monitor from './three/components/Monitor'
import Mouse from './three/components/Mouse'
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

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#005780ff' }}>
      <KeyboardControls
      map={[
        { name: 'toggleLight', keys: ['KeyL'] },
        { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
      ]}
      >
        <Canvas shadows camera={{ position: [0, 2, 3], fov: 75 }}>
          <RoomLight />
          {/* Luz suave que viene de todos lados (Relleno) */}
          <Environment preset="city" background blur={1} />

          <OrbitControls 
            makeDefault
            // No dejamos que el usuario se aleje más allá de las paredes (ej. si el cuarto mide 10x10)
            maxDistance={4.5} 
            minDistance={0.5}
            
            // Evitamos que la cámara atraviese el suelo
            maxPolarAngle={Math.PI / 1.8} 
            minPolarAngle={Math.PI / 2}

            // Suaviza el movimiento (le da ese toque "pro")
            enableDamping={true}
            dampingFactor={0.05}
          />
          <Cuarto />
          <Ventana position={[0, 2.5, -4.9]} />
          <Mesa position={[0, 0, -3.5]} />
          <Laptop position={[0, 1.1, -2.8]} scale={0.5}/>
          <group>
            <Monitor position={[-0.9, 1.1, -2.8]} encendido={true}/>
          </group>
          <Mouse position={[1, 1.1, -2.8]} />
        </Canvas>
      </KeyboardControls>
    </div>
  )
}

export default App