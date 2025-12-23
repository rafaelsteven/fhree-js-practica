import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Mouse(props) {
  const ledRef = useRef()
  const [colorIndex, setColorIndex] = useState(0)
  
  // Lista de colores para el LED
  const colores = ['#00ff00', '#1900ff', '#00ffff', '#ffcc00', '#ff0000']

  useFrame((state) => {
    // Cambiar color cada 2 segundos basado en el tiempo transcurrido
    const nuevoIndex = Math.floor(state.clock.elapsedTime / 2) % colores.length
    if (nuevoIndex !== colorIndex) {
      setColorIndex(nuevoIndex)
    }
    
    // Suavizar el brillo del LED (efecto respiración)
    if (ledRef.current) {
      ledRef.current.emissiveIntensity = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.5
    }
  })

  return (
    <group {...props}>
      {/* CUERPO DEL MOUSE (Usamos una esfera escalada para forma de huevo) */}
      <mesh castShadow position={[0, 0.05, 0]} scale={[1, 0.6, 1.4]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
      </mesh>

      {/* LÍNEA LED (Ajustada sobre la superficie) */}
      <mesh position={[0, 0.06, -0.05]} rotation={[-Math.PI / 2, 0, 0]}>
        {/* Un anillo muy delgado que abraza el lomo del mouse */}
        <torusGeometry args={[0.09, 0.005, 16, 100, Math.PI]} />
        <meshStandardMaterial 
          ref={ledRef}
          color={colores[colorIndex]} 
          emissive={colores[colorIndex]} 
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* BOTONES (Un corte sutil) */}
      <mesh position={[0, 0.105, 0.06]}>
        <boxGeometry args={[0.005, 0.01, 0.08]} />
        <meshStandardMaterial color="#000" />
      </mesh>

      {/* RUEDITA (Scroll wheel) */}
      <mesh position={[0, 0.11, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.02, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh>
        <boxGeometry args={[0.5, 0.02, 0.5]} position={[0, 0, 0.1]} />
        <meshStandardMaterial color="#424242" />
      </mesh>
    </group>
  )
}