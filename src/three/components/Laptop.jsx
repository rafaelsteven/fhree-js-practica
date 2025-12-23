import { useState } from 'react'
import { Text } from '@react-three/drei'
import { useRef } from 'react'

export default function Laptop(props) {
  const [open, setOpen] = useState(false)
  const groupRef = useRef()

  return (
    <group {...props} onClick={(e) => (e.stopPropagation(), setOpen(!open))}>
      {/* Base de la laptop (keyboard base) */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.08, 1]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Keyboard area (darker inset) */}
      <mesh position={[0, 0.041, 0.05]} receiveShadow>
        <boxGeometry args={[1.2, 0.002, 0.7]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Touchpad */}
      <mesh position={[0, 0.042, 0.35]} receiveShadow>
        <boxGeometry args={[0.35, 0.001, 0.22]} />
        <meshStandardMaterial color="#151515" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Keyboard Keys - Grid layout */}
      {/* Row 1 (top row) */}
      {Array.from({ length: 10 }).map((_, i) => (
        <Key key={`row1-${i}`} position={[-0.45 + i * 0.1, 0.043, -0.25]} />
      ))}
      
      {/* Row 2 */}
      {Array.from({ length: 10 }).map((_, i) => (
        <Key key={`row2-${i}`} position={[-0.45 + i * 0.1, 0.043, -0.15]} />
      ))}
      
      {/* Row 3 - Con teclas especiales */}
      <CtrlKey position={[-0.5, 0.043, -0.05]} />
      {Array.from({ length: 7 }).map((_, i) => (
        <Key key={`row3-${i}`} position={[-0.3 + i * 0.1, 0.043, -0.05]} />
      ))}
      <Key position={[0.45, 0.043, -0.05]} label="C" />
      
      {/* Row 4 (bottom row) */}
      {Array.from({ length: 3 }).map((_, i) => (
        <Key key={`row4-${i}`} position={[-0.45 + i * 0.1, 0.043, 0.05]} />
      ))}
      <Key position={[0, 0.043, 0.05]} label="V" wide />
      {Array.from({ length: 3 }).map((_, i) => (
        <Key key={`row4-end-${i}`} position={[0.25 + i * 0.1, 0.043, 0.05]} />
      ))}

      {/* Pantalla - Back panel */}
      <group position={[0, 0.04, -0.5]} rotation-x={0}>
        {/* Screen frame/bezel */}
        <mesh castShadow position={[0, 0.45, 0.02]}>
          <boxGeometry args={[1.4, 0.95, 0.04]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
        </mesh>
        
        {/* Display content - only when open */}
        {open && (
          <>
            {/* Screen background with gradient effect */}
            <mesh position={[0, 0.45, 0.041]}>
              <planeGeometry args={[1.3, 0.85]} />
              <meshStandardMaterial 
                color="#1e1e2e" 
                emissive="#2d3748"
                emissiveIntensity={0.6}
              />
            </mesh>

            {/* Gradient overlay simulation */}
            <mesh position={[0, 0.65, 0.042]}>
              <planeGeometry args={[1.3, 0.4]} />
              <meshStandardMaterial 
                color="#4a5568" 
                emissive="#667eea"
                emissiveIntensity={0.3}
                transparent
                opacity={0.4}
              />
            </mesh>

            {/* <dev/> text on screen */}
            <Text
              position={[0, 0.45, 0.043]}
              fontSize={0.15}
              color="#48bb78"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.005}
              outlineColor="#2d3748"
            >
              {'<dev/>'}
            </Text>

            {/* Screen light emission */}
            <pointLight position={[0, 0.45, 0.1]} intensity={0.8} color="#667eea" distance={1.5} />
          </>
        )}

        {/* Laptop back cover */}
        <mesh position={[0, 0.45, -0.02]} receiveShadow>
          <boxGeometry args={[1.4, 0.95, 0.02]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.4} />
        </mesh>
      </group>
    </group>
  )
}

// Individual key component
function Key({ position, label, wide = false }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[wide ? 0.18 : 0.08, 0.006, 0.08]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.6} />
      </mesh>
      {label && (
        <Text
          position={[0, 0.004, 0]}
          fontSize={0.03}
          color="#aaaaaa"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      )}
    </group>
  )
}

// Ctrl key (wider)
function CtrlKey({ position }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.12, 0.006, 0.08]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.6} />
      </mesh>
      <Text
        position={[0, 0.004, 0]}
        fontSize={0.025}
        color="#aaaaaa"
        anchorX="center"
        anchorY="middle"
      >
        Ctrl
      </Text>
    </group>
  )
}