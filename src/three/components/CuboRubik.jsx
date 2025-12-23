import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function Cubito({ posicionFinal, armado }) {
  const ref = useRef()

  const rotacionDesordenada = useMemo(() => [
    (Math.floor(Math.random() * 4)) * (Math.PI / 2),
    (Math.floor(Math.random() * 4)) * (Math.PI / 2),
    (Math.floor(Math.random() * 4)) * (Math.PI / 2)
  ], [])

  useFrame(() => {
    if (ref.current) {
      const targetRot = armado ? [0, 0, 0] : rotacionDesordenada
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetRot[0], 0.1)
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRot[1], 0.1)
      ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, targetRot[2], 0.1)
    }
  })

  return (
    <mesh ref={ref} position={posicionFinal} castShadow>
      <boxGeometry args={[0.27, 0.27, 0.27]} />
      <meshStandardMaterial attach="material-0" color="#ff1313" />
      <meshStandardMaterial attach="material-1" color="#00ff00" />
      <meshStandardMaterial attach="material-2" color="#ffffff" />
      <meshStandardMaterial attach="material-3" color="#ffff00" />
      <meshStandardMaterial attach="material-4" color="#0000ff" />
      <meshStandardMaterial attach="material-5" color="#df7700" />
    </mesh>
  )
}

export default function Rubik(props) {
  const [armado, setArmado] = useState(false)
  const grupoRotacionRef = useRef() // Ref para el giro constante

  const cubitos = useMemo(() => {
    const temp = []
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          temp.push([x * 0.3, y * 0.3, z * 0.3])
        }
      }
    }
    return temp
  }, [])

  useFrame((state) => {
    if (grupoRotacionRef.current) {
      // Rotación constante sobre su propio eje
      grupoRotacionRef.current.rotation.y += 0.01 
      // Balanceo sutil para que no sea un giro rígido
      grupoRotacionRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <group {...props} onClick={(e) => (e.stopPropagation(), setArmado(!armado))}>
      {/* Base */}
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.4, 0.45, 0.2, 32]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
      </mesh>

      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Este es el grupo que hace que todo el cubo gire como unidad */}
        <group ref={grupoRotacionRef}>
          {cubitos.map((pos, i) => (
            <Cubito key={i} posicionFinal={pos} armado={armado} />
          ))}
        </group>
      </Float>
    </group>
  )
}