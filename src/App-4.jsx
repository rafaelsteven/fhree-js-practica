import { useRef } from 'react'
import { Canvas,useFrame } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Float } from '@react-three/drei'
import { useState } from 'react'
import Laptop from './three/components/Laptop'
import { Level } from './three/components/scene'

function Box(props) {
  return (
    <mesh {...props} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={props.color || "orange"} />
    </mesh>
  )
}
function InteractiveBox(props) {
  // 1. Creamos estados para el hover y el click
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  return (
    <mesh
      {...props}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      castShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  )
}
function Fan(props) {
  // 1. Creamos una referencia para poder "tocar" el objeto 3D directamente
  const fanRef = useRef()

  // 2. El useFrame se ejecuta 60 veces por segundo
  useFrame((state, delta) => {
    // Rotamos las aspas en el eje Y
    if (fanRef.current) {
      fanRef.current.rotation.y += delta * 5 // delta asegura que la velocidad sea constante en cualquier PC
    }
  });

  return (
    <group {...props}>
      {/* Soporte */}
      <mesh castShadow position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.8]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      
      {/* Aspas (las que rotan) */}
      <group ref={fanRef}>
        <mesh castShadow rotation={[0, 0, 0]}>
          <boxGeometry args={[2, 0.02, 0.2]} />
          <meshStandardMaterial color="#555" />
        </mesh>
        <mesh castShadow rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[2, 0.02, 0.2]} />
          <meshStandardMaterial color="#555" />
        </mesh>
      </group>
    </group>
  )
}


function Lamp(props) {
  const [activeLam, setActive] = useState(false)
  return (
    <group {...props}>
      {/* Base de la lámpara */}
      <mesh castShadow position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      {/* Poste */}
      <mesh castShadow position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 3, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Pantalla (Cabeza)
       -castShadow: Si la pantalla recibe sombras
       -position: Posicion de la pantalla
       -emissive: Color de la pantalla
       -emissiveIntensity: Intensidad de la pantalla
      */}
      <mesh 
      castShadow position={[0, 3, 0]}
      onClick={() => setActive(!activeLam)}>
        <cylinderGeometry args={[0.4, 0.6, 0.8, 32]} />
        <meshStandardMaterial color="white" emissive="yellow" emissiveIntensity={activeLam ? 0.4 : 0} />
      </mesh>

      {/* Luz real que sale de la lámpara */}
      <pointLight position={[0, 3, 0]} intensity={activeLam ? 2 : 0} color="yellow" distance={5} />
    </group>
  )
}

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#ececec' }}>
      <Canvas 
        shadows 
        orthographic // El secreto del look "Diorama"
        camera={{ zoom: 100, position: [5, 5, 5] }}
      >
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

        {/* --- GRUPO DE LA HABITACIÓN --- */}
        <group position-y={-0.5}>
          
          {/* Suelo */}
          <mesh receiveShadow position={[0, -0.1, 0]}>
            <boxGeometry args={[5, 0.3, 5]} /> {/* 5x5 de base y 0.5 de grosor */}
            <meshStandardMaterial color="#d1d1d1" />
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
        
        <group>
          <Box position={[0, 1, 0]} color="hotpink" />
          <Box position={[0, 0, 0]} color="lightblue" />
        </group>
        <group>
          <Lamp position={[2, -0.5, -2]} />
        </group>
        <group>
          <Fan position={[0, 4, 0]} />
        </group>
        <group>
          <InteractiveBox position={[0, 2, 0]} />
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
    </div>
  )
}

export default App