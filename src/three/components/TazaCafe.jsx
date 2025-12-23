import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ParticulaHumo({ delay }) {
  const ref = useRef()
  const randomX = useMemo(() => (Math.random() - 0.5) * 0.15, [])
  const randomZ = useMemo(() => (Math.random() - 0.5) * 0.15, [])
  const speed = useMemo(() => 0.005 + Math.random() * 0.01, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y += speed
      ref.current.position.x = randomX + Math.sin(state.clock.elapsedTime + delay) * 0.03
      
      if (ref.current.position.y > 0.8) {
        ref.current.position.y = 0
        ref.current.material.opacity = 0.4
      } else {
        ref.current.material.opacity -= 0.003
      }
      const s = 1 + ref.current.position.y * 2
      ref.current.scale.set(s, s, s)
    }
  })

  return (
    <mesh ref={ref} position={[randomX, 0, randomZ]}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshStandardMaterial color="#ffffff" transparent opacity={0.4} depthWrite={false} />
    </mesh>
  )
}

export default function TazaCafe(props) {
  const particulas = useMemo(() => Array.from({ length: 12 }, (_, i) => i), [])

  return (
    <group {...props}>
      {/* --- PLATO --- */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.38, 0.03, 32]} />
        <meshStandardMaterial color="#474747" />
      </mesh>

      {/* --- GRUPO TAZA --- */}
      <group position={[0, 0.2, 0]}>
        {/* Cuerpo de la taza */}
        <mesh castShadow>
          <cylinderGeometry args={[0.22, 0.18, 0.4, 32]} />
          <meshStandardMaterial color="#5e7288" />
        </mesh>
        
        {/* ASA CORREGIDA: Rotada para que sea visible hacia afuera */}
        <mesh position={[0.2, 0.05, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <torusGeometry args={[0.1, 0.025, 12, 24, Math.PI]} />
          <meshStandardMaterial color="#5e7288" />
        </mesh>

        {/* EL CAFÉ: Subido un poco más para evitar que se tape */}
        <mesh position={[0, 0.19, 0]}>
          <cylinderGeometry args={[0.19, 0.19, 0.01, 32]} />
          <meshStandardMaterial color="#3d1f14" roughness={0.2} />
        </mesh>

        {/* HUMO SOBRE EL LÍQUIDO */}
        <group position={[0, 0.22, 0]}>
          {particulas.map((i) => (
            <ParticulaHumo key={i} delay={i * 0.8} />
          ))}
        </group>
      </group>
    </group>
  )
}