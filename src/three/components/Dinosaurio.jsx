import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function DinoSeguidor(props) {
  const cabezaRef = useRef()
  const grupoRef = useRef()

  useFrame((state) => {
    if (cabezaRef.current) {
      // 1. Obtener la posición del mouse en coordenadas de escena
      // state.mouse.x y y van de -1 a 1
      const x = (state.mouse.x * Math.PI) / 4 // Limitar rotación a 45 grados
      const y = (state.mouse.y * Math.PI) / 4

      // 2. Aplicar rotación suave (Lerp) para que no sea brusco
      cabezaRef.current.rotation.y = THREE.MathUtils.lerp(
        cabezaRef.current.rotation.y,
        x,
        0.1
      )
      cabezaRef.current.rotation.x = THREE.MathUtils.lerp(
        cabezaRef.current.rotation.x,
        -y,
        0.1
      )
    }
  })

  return (
    <group {...props} ref={grupoRef}>
      {/* CUERPO (Una cápsula gorda) */}
      <mesh castShadow position={[0, 0.2, 0]}>
        <capsuleGeometry args={[0.2, 0.4, 4, 16]} />
        <meshStandardMaterial color="#4ade80" />
      </mesh>

      {/* PATAS */}
      <mesh position={[-0.15, 0.05, 0.1]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#4ade80" />
      </mesh>
      <mesh position={[0.15, 0.05, 0.1]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#4ade80" />
      </mesh>

      {/* CABEZA (Este es el grupo que rotará) */}
      <group ref={cabezaRef} position={[0, 0.5, 0.1]}>
        {/* Hocico */}
        <mesh position={[0, 0, 0.15]}>
          <boxGeometry args={[0.25, 0.2, 0.3]} />
          <meshStandardMaterial color="#4ade80" />
        </mesh>
        
        {/* Cráneo */}
        <mesh position={[0, 0.1, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#4ade80" />
        </mesh>

        {/* OJOS */}
        <mesh position={[-0.08, 0.15, 0.12]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="white" />
          <mesh position={[0, 0, 0.02]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshStandardMaterial color="black" />
          </mesh>
        </mesh>
        <mesh position={[0.08, 0.15, 0.12]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="white" />
          <mesh position={[0, 0, 0.02]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshStandardMaterial color="black" />
          </mesh>
        </mesh>
      </group>

      {/* COLA */}
      <mesh position={[0, 0.1, -0.25]} rotation={[Math.PI / 4, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.15, 0.4, 16]} />
        <meshStandardMaterial color="#4ade80" />
      </mesh>
    </group>
  )
}