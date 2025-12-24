import { useState, useMemo } from 'react'
import { Text } from '@react-three/drei'

function LaptopStand() {
  const materialMetal = <meshStandardMaterial color="#8a8a8a" metalness={0.8} roughness={0.2} />

  return (
    <group position={[0, 0, 0]}>
      {/* Patas base que tocan la mesa */}
      <mesh position={[-0.45, 0.02, 0]} castShadow>
        <boxGeometry args={[0.06, 0.04, 0.8]} />
        {materialMetal}
      </mesh>
      <mesh position={[0.45, 0.02, 0]} castShadow>
        <boxGeometry args={[0.06, 0.04, 0.8]} />
        {materialMetal}
      </mesh>

      {/* Brazos inclinados: Ajustados para recibir la laptop */}
      <mesh position={[-0.45, 0.18, -0.05]} rotation={[0.4, 0, 0]} castShadow>
        <boxGeometry args={[0.05, 0.03, 0.85]} />
        {materialMetal}
      </mesh>
      <mesh position={[0.45, 0.18, -0.05]} rotation={[0.4, 0, 0]} castShadow>
        <boxGeometry args={[0.05, 0.03, 0.85]} />
        {materialMetal}
      </mesh>

      {/* Estructura en X central */}
      <mesh position={[0, 0.18, -0.1]} rotation={[Math.PI / 1.6, 0, Math.PI / 4]} castShadow>
        <boxGeometry args={[0.02, 0.7, 0.02]} />
        {materialMetal}
      </mesh>
      <mesh position={[0, 0.18, -0.1]} rotation={[Math.PI / 1.6, 0, -Math.PI / 4]} castShadow>
        <boxGeometry args={[0.02, 0.7, 0.02]} />
        {materialMetal}
      </mesh>

      {/* Ganchos frontales ajustados para que coincidan con el borde de la laptop */}
      <mesh position={[-0.45, 0.08, 0.38]} castShadow>
        <boxGeometry args={[0.06, 0.12, 0.04]} />
        {materialMetal}
      </mesh>
      <mesh position={[0.45, 0.08, 0.38]} castShadow>
        <boxGeometry args={[0.06, 0.12, 0.04]} />
        {materialMetal}
      </mesh>
    </group>
  )
}

export default function Laptop(props) {
  const [open, setOpen] = useState(false)

  return (
    <group {...props}>
      <LaptopStand />

      {/* CUERPO DE LA LAPTOP: Alineado con la inclinación del soporte (0.4 rad) */}
      <group 
        position={[0, 0.28, -0.1]} // Subimos la laptop para que esté sobre el stand
        rotation={[Math.PI / 8, 0, 0]} // Inclinamos la laptop hacia adelante
        onClick={(e) => (e.stopPropagation(), setOpen(!open))}
      >
        {/* Base de la laptop */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.4, 0.08, 1]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Área del teclado y touchpad */}
        <mesh position={[0, 0.041, 0.05]} receiveShadow>
          <boxGeometry args={[1.2, 0.002, 0.7]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0, 0.042, 0.35]} receiveShadow>
          <boxGeometry args={[0.35, 0.001, 0.22]} />
          <meshStandardMaterial color="#151515" metalness={0.3} roughness={0.7} />
        </mesh>

        {/* Teclas (Simplificadas para el ejemplo) */}
        <group position={[0, 0.043, 0]}>
             {/* Aquí van tus bucles de teclas que ya tenías */}
             <Key position={[-0.45, 0, -0.25]} label="Esc" />
             <Key position={[0, 0, 0.1]} label="Space" wide />
        </group>

        {/* Pantalla */}
        <group position={[0, 0.04, -0.5]} rotation-x={Math.PI * 1.9}>
          <mesh castShadow position={[0, 0.45, 0.02]}>
            <boxGeometry args={[1.4, 0.95, 0.04]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
          </mesh>
          
          {open && (
            <>
              <mesh position={[0, 0.45, 0.041]}>
                <planeGeometry args={[1.3, 0.85]} />
                <meshStandardMaterial color="#1e1e2e" emissive="#2d3748" emissiveIntensity={0.6} />
              </mesh>
              <Text position={[0, 0.45, 0.043]} fontSize={0.15} color="#48bb78">{'<dev/>'}</Text>
              <pointLight position={[0, 0.45, 0.1]} intensity={0.8} color="#667eea" distance={1.5} />
            </>
          )}

          {/* Tapa trasera */}
          <mesh position={[0, 0.45, -0.02]} receiveShadow>
            <boxGeometry args={[1.4, 0.95, 0.02]} />
            <meshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.4} />
          </mesh>
        </group>
      </group>
    </group>
  )
}

function Key({ position, label, wide = false }) {
    return (
      <group position={position}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[wide ? 0.18 : 0.08, 0.006, 0.08]} />
          <meshStandardMaterial color="#3a3a3a" roughness={0.6} />
        </mesh>
        {label && <Text position={[0, 0.005, 0]} rotation={[-Math.PI/2, 0, 0]} fontSize={0.03} color="#aaaaaa">{label}</Text>}
      </group>
    )
}