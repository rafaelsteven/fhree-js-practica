import { RoundedBox } from '@react-three/drei'
import { useTexture } from '@react-three/drei'
// Esto evita que la textura se vea estirada
import { RepeatWrapping } from 'three'

export default function Mesa(props) {
  return (
    <group {...props}>
      {/* TABLA DE LA MESA */}
      <RoundedBox
        args={[4, 0.15, 2]} // Ancho, Alto, Profundidad (igual que boxGeometry)
        radius={0.05}       // El "radio" del redondeo. ¡No lo pongas muy alto!
        smoothness={4}      // Cuántos segmentos tiene la curva (4-8 está bien)
        castShadow
        receiveShadow
        position={[0, 1, 0]}
      >
        <meshStandardMaterial  color="#ffd3af" roughness={0.7} />
      </RoundedBox>

      {/* PATAS (Usamos cilindros para que sean redondas de por sí) */}
      <mesh position={[-1.5, 0.5, -0.8]} castShadow >
        <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[1.5, 0.5, -0.8]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[-1.5, 0.5, 0.8]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[1.5, 0.5, 0.8]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  )
}

