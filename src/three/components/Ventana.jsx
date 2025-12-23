import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles, Float } from '@react-three/drei'

// Sub-componente para una nube estilizada tipo Low-Poly
function NubeEstilizada({ position }) {
  return (
    <group position={position}>
      {/* Componemos la nube con varias esferas para que sea "esponjosa" */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="white" flatShading />
      </mesh>
      <mesh position={[0.2, 0.1, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="white" flatShading />
      </mesh>
      <mesh position={[-0.2, 0.05, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="white" flatShading />
      </mesh>
    </group>
  )
}

export default function Ventana({ noche, ...props }) {
  const nubesRef = useRef()
  const estrellaFugasRef = useRef()
  noche = false
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime

    // Movimiento de las nubes
    if (nubesRef.current) {
      nubesRef.current.position.x = Math.sin(t * 0.15) * 0.2
    }

    // Estrella fugaz lógica
    if (estrellaFugasRef.current) {
      if (t % 3 < 1.2 && noche) { // Sale cada 8 segundos
        estrellaFugasRef.current.position.x += delta * 3
        estrellaFugasRef.current.visible = true
      } else {
        estrellaFugasRef.current.position.x = -3
        estrellaFugasRef.current.visible = false
      }
    }
  })

  // Colores estilizados
  const colorCielo = noche ? "#1a1a2e" : "#a2d2ff" // Azul medianoche vs Azul pastel
  const colorEmisivo = noche ? "#0f0f1d" : "#7eb6ff"
  return (
    <group {...props}>
      {/* MARCO */}
      <mesh >
        <boxGeometry args={[4.5, 2.6, 0.0]} />
        <meshStandardMaterial color="#bb7900" /> {/* Color madera oscura */}
      </mesh>
      
      {/* FONDO DEL CIELO */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[4.3, 2.4, 0.15]} />
        <meshStandardMaterial color={noche ? "#1a1a2e" : "#80c1ffff"} emissive={colorEmisivo} emissiveIntensity={0.8} toneMapped={false}/>
      </mesh>

      {/* DÍA */}
      {!noche && (
        <group>
          {/* Sol Estilizado */}
          <mesh position={[-1.4, 0.7, 0.1]}>
            <sphereGeometry args={[0.25, 32, 32]} />
            <meshStandardMaterial color="#fff9e6" emissive="#ffea00" emissiveIntensity={1} />
            <pointLight intensity={0.5} color="#fff9e6" distance={5} />
          </mesh>

          {/* Grupo de Nubes */}
          <group ref={nubesRef}>
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
              <NubeEstilizada position={[1, 0.3, -0.03]} />
              <NubeEstilizada position={[-0.2, 0, -0.03]} scale={0.7} />
              <NubeEstilizada position={[1.8, -0.4, -0.03]} scale={0.8} />
            </Float>
          </group>
        </group>
      )}

      {/* NOCHE */}
      {noche && (
        <group>
          {/* Luna con brillo suave */}
          <mesh position={[1.3, 0.7, 0.1]}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial color="#f0f0f0" emissive="#ffffff" emissiveIntensity={0.5} />
            <pointLight intensity={0.8} color="#94a3b8" distance={5} />
          </mesh>

          {/* Estrellas parpadeantes */}
          <Sparkles 
            count={60} 
            scale={[4, 2.2, 0.1]} 
            size={2.5} 
            speed={0.5} 
            opacity={0.8} 
            color="#fff" 
          />

          {/* Estrella Fugaz */}
          <mesh ref={estrellaFugasRef} position={[-2, 0.9, -0.04]} rotation={[0, 0, -0.2]}>
            <capsuleGeometry args={[0.01, 0.4, 4, 8]} />
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={5} />
          </mesh>
        </group>
      )}
      <spotLight
        position={[0, 0, -1]} 
        angle={0.5}
        penumbra={1}
        intensity={noche ? 0.5 : 4}
        color={noche ? "#5e76bf" : "#fff2d5"}
        castShadow
        target-position={[0, -2, 5]} // Apunta hacia el centro del cuarto
        />
    </group>
  )
}