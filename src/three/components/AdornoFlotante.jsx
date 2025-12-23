import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text } from '@react-three/drei'

export default function AdornoFlotante(props) {
  const grupoRef = useRef()
  const adornoRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    
    // Movimiento circular (órbita)
    if (adornoRef.current) {
      // Rotación constante para que se vea dinámico
      adornoRef.current.rotation.y += 0.01
    }
  })

  return (
    <group {...props} ref={grupoRef}>
      {/* 1. BASE DEL ADORNO */}
      <mesh castShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.05, 32]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* 2. SOPORTE (PALITO) */}
      <mesh castShadow position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.3, 16]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      {/* 3. EL ICONO FLOTANTE </> */}
      <group ref={adornoRef} position={[0, 0.5, 0]}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          
          {/* Símbolo < */}
          <group position={[-0.2, 0, 0]}>
            <mesh castShadow position={[0, 0.07, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.15, 0.03, 0.03]} />
              <meshStandardMaterial color="#1f5afc" emissive="#0044ff" emissiveIntensity={2} toneMapped={false} />
              <pointLight position={[0, 0, 0]} intensity={1.5} color="#0030b4" distance={0.8} />
            </mesh>
            <mesh position={[0, -0.07, 0]} rotation={[0, 0, -Math.PI / 4]}>
              <boxGeometry args={[0.15, 0.03, 0.03]} />
              <meshStandardMaterial color="#1f5afc" emissive="#0044ff" emissiveIntensity={2} toneMapped={false} />
            </mesh>
          </group>

          {/* Símbolo / */}
          <mesh rotation={[0, 0, Math.PI / 8]}>
            <boxGeometry args={[0.03, 0.3, 0.03]} />
            <meshStandardMaterial color="#ff0077" emissive="#ff0077" emissiveIntensity={2} toneMapped={false} />
            <pointLight position={[0, 0, 0.05]} intensity={2} color="#ff0077" distance={1.2} />
          </mesh>

          {/* Símbolo > */}
          <group position={[0.2, 0, 0]}>
            <mesh position={[0, 0.07, 0]} rotation={[0, 0, -Math.PI / 4]}>
              <boxGeometry args={[0.15, 0.03, 0.03]} />
              <meshStandardMaterial color="#1f5afc" emissive="#0044ff" emissiveIntensity={2} toneMapped={false} />
              <pointLight position={[0, 0, 0]} intensity={1.5} color="#0030b4" distance={0.8} />
            </mesh>
            <mesh position={[0, -0.07, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.15, 0.03, 0.03]} />
              <meshStandardMaterial color="#1f5afc" emissive="#0044ff" emissiveIntensity={2} toneMapped={false} />
            </mesh>
          </group>

        </Float>
      </group>

      {/* LUZ DE NEÓN PEQUEÑA BAJO EL ICONO */}
      <pointLight position={[0, 0.5, 0]} distance={1} intensity={1} color="#0030b4" />
    </group>
  )
}