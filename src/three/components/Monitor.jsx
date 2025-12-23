import { useTexture } from '@react-three/drei'
import { LayerMaterial, Gradient } from 'lamina'
import * as THREE from 'three'

export default function Monitor({ encendido, imagen, ...props }) {
  // Cargamos la textura solo si existe una URL, si no, devolvemos null
  const texturaPantalla = imagen ? useTexture(imagen) : null

  return (
    <group {...props}>
      {/* 1. ESTRUCTURA (MARCO TRASERO) */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[0.75, 1.25, 0.12]} /> {/* Un poco más grande para que sea el marco */}
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* 2. PANTALLA (LA PARTE QUE SE ENCIENDE) */}
      <mesh position={[0, 1, 0.02]}>
        <boxGeometry args={[0.7, 1.2, 0.1]} />
        
        {/* Si está apagado, mostramos el degradado oscuro. 
            Si está encendido, usamos un material básico que brilla */}
        {!encendido ? (
          <LayerMaterial lighting="standard">
            <Gradient colorA="#222" colorB="#444" axes="y" start={-1} end={1} />
          </LayerMaterial>
        ) : (
          <meshStandardMaterial 
            map={texturaPantalla} // Muestra la imagen si existe
            color={!texturaPantalla ? "#80c1ff" : "white"} // Si no hay imagen, un azul claro
            emissive={!texturaPantalla ? "#80c1ff" : "white"} 
            emissiveIntensity={texturaPantalla ? 0.5 : 1.5}
            toneMapped={false}
          />
        )}
      </mesh>

      {/* 3. LUZ QUE EMITE LA PANTALLA (Solo si está encendido) */}
      {encendido && (
        <pointLight position={[0, 1, 0.5]} distance={3} intensity={2} color="#80c1ff" />
      )}

      {/* 4. BASE Y PATA (Tu código original corregido) */}
      <mesh position={[0, 0.5, -0.1]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.7, 14]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      {/* Soporte circular base */}
      <mesh position={[0, 0, -0.1]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry   args={[
            0.2,        // radioTop
            0.2,        // radioBottom
            0.4,        // altura
            14,         // segmentos radiales
            1,          // segmentos de altura
            false,      // openEnded (falso para que tenga tapas)
            0,          // thetaStart (donde empieza)
            Math.PI     // thetaLength (extensión: PI es media vuelta, PI*2 es vuelta entera)
        ]} />
        <meshStandardMaterial color="#333" side={THREE.DoubleSide} />
       </mesh>
    </group>
  )
}