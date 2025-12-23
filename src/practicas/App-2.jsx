import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows } from '@react-three/drei'

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#ececec' }}>
      <Canvas 
        shadows 
        orthographic // El secreto del look "Diorama"
        camera={{ zoom: 100, position: [5, 5, 5] }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
        <ContactShadows position={[0, -0.49, 0]} opacity={0.4} scale={10} blur={2} far={1} />

        {/* --- GRUPO DE LA HABITACIÓN --- */}
        <group position-y={-0.5}>
          
          {/* Suelo */}
          <mesh receiveShadow rotation-x={-Math.PI / 2}>
            <planeGeometry args={[5, 5]} />
            <meshStandardMaterial color="#e2e2e2" />
          </mesh>

          {/* Pared Izquierda */}
          <mesh receiveShadow position={[-2.5, 2.5, 0]} rotation-y={Math.PI / 2}>
            <planeGeometry args={[5, 5]} />
            <meshStandardMaterial color="#d1d1d1" />
          </mesh>

          {/* Pared Derecha (Fondo) */}
          <mesh receiveShadow position={[0, 2.5, -2.5]}>
            <planeGeometry args={[5, 5]} />
            <meshStandardMaterial color="#c5c5c5" />
          </mesh>

        </group>
      </Canvas>
    </div>
  )
}

export default App