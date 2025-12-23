import { RoundedBox } from '@react-three/drei'
import { useTexture } from '@react-three/drei'
// Esto evita que la textura se vea estirada
import { RepeatWrapping } from 'three'

export default function Mesa(props) {
  const texture = useTexture({
    map: '/textures/mesa/mesa_albedo.jpg',
    normalMap: '/textures/mesa/mesa_normal.jpg', // Da relieve a las vetas
    roughnessMap: '/textures/mesa/mesa_roughness.jpg', // Define qué partes brillan
  })
  
  Object.values(texture).forEach((t) => {
  t.wrapS = t.wrapT = RepeatWrapping
  t.repeat.set(2, 2) // Repite la imagen 2 veces a lo ancho y largo
})
  return (
    <group {...props}>
      {/* TABLA DE LA MESA */}
      <RoundedBox
        args={[3, 0.15, 2]} // Ancho, Alto, Profundidad (igual que boxGeometry)
        radius={0.05}       // El "radio" del redondeo. ¡No lo pongas muy alto!
        smoothness={4}      // Cuántos segmentos tiene la curva (4-8 está bien)
        castShadow
        position={[0, 1, 0]}
      >
        <meshStandardMaterial {...texture} color="#ffd3af" />
      </RoundedBox>

      {/* PATAS (Usamos cilindros para que sean redondas de por sí) */}
      <mesh position={[-1.3, 0.5, -0.8]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[1.3, 0.5, -0.8]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[-1.3, 0.5, 0.8]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[1.3, 0.5, 0.8]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  )
}

