import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Teclado(props) {
  const groupRef = useRef()

  // 1. Generamos los datos de las teclas una sola vez
  const keysData = useMemo(() => {
    const rows = 5
    const cols = 14 // Más columnas para un look TKL real
    const temp = []
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Determinamos colores según la imagen (algunas blancas, otras oscuras)
        let colorKey = "#ffffff" // Mayoría blancas
        if (row === 0 || col === 0 || col === 13 || row === 4) colorKey = "#222" // Bordes oscuros
        
        temp.push({
          id: `${row}-${col}`,
          x: -0.46 + col * 0.072, 
          z: -0.16 + row * 0.08,
          color: colorKey
        })
      }
    }
    return temp
  }, [])

  // 2. Animación RGB Rainbow
  const lightRef = useRef()
  useFrame((state) => {
    // Cambia el color del emissive suavemente con el tiempo
    const hue = (state.clock.elapsedTime * 0.2) % 1
    const rgbColor = new THREE.Color().setHSL(hue, 0.8, 0.5)
    if (lightRef.current) {
      lightRef.current.color.copy(rgbColor)
    }
  })

  return (
    <group {...props} ref={groupRef}>
      {/* CUERPO DEL TECLADO (Base Blanca/Gris con borde) */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.05, 0.07, 0.45]} />
        <meshStandardMaterial color="#d1d5db" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* PLACA INTERNA (Donde sale la luz RGB) */}
      <mesh position={[0, 0.036, 0]}>
        <boxGeometry args={[0.98, 0.01, 0.38]} />
        <meshStandardMaterial 
          ref={lightRef}
          emissiveIntensity={5} 
          toneMapped={false} 
        />
      </mesh>

      {/* RENDERIZADO DE TECLAS MECÁNICAS */}
      {keysData.map((key) => (
        <mesh 
          key={key.id} 
          position={[key.x, 0.05, key.z]} 
          castShadow
        >
          <boxGeometry args={[0.065, 0.05, 0.07]} />
          <meshStandardMaterial color={key.color} roughness={0.3} />
        </mesh>
      ))}

      {/* TECLA ESPACIADORA (Larga y Gris Azulada como la imagen) */}
      <mesh position={[-0.03, 0.05, 0.16]} castShadow>
        <boxGeometry args={[0.45, 0.06, 0.075]} />
        <meshStandardMaterial color="#4a5568" />
      </mesh>

      {/* DETALLE MSI (Pequeño recuadro en la esquina superior derecha) */}
      <mesh position={[0.37, 0.05, -0.16]} castShadow>
        <boxGeometry args={[0.14, 0.06, 0.08]} />
        <meshStandardMaterial color="#000" metalness={1} />
      </mesh>
    </group>
  )
}