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
        {/* Luces 
         -intensity: Intensidad de la luz
         -position: Posicion de la luz
         -castShadow: Si la luz proyecta sombras
         */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

        {/* El Suelo del Diorama 
         -receiveShadow: Si el suelo recibe sombras
         -rotation-x: Rotacion del suelo
         -position-y: Posicion del suelo
         */}
        <mesh receiveShadow rotation-x={-Math.PI / 2} position-y={-0.5}>
          <planeGeometry args={[10, 10]} /> {/* tamaño del suelo */}
          <meshStandardMaterial color="#f0f0f0" />
        </mesh>

        {/* Objeto de prueba aplicar sombras a un objeto
             position={[0, 5, 0] posicion del objeto x,y,z
             castShadow activa la sombra
        */}
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#09cf55" />
        </mesh>

        {/* Sombras suaves en el suelo 
         -position: Posicion de la sombra
         -opacity: Opacidad de la sombra
         -scale: Escala de la sombra
         -blur: Desenfoque de la sombra
         -far: Distancia de la sombra
         */}
        <ContactShadows position={[0, -0.49, 0]} opacity={0.4} scale={10} blur={2} far={1} />

        <OrbitControls makeDefault />
      </Canvas>
    </div>
  )
}

export default App