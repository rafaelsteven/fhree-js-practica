
import { useGLTF } from '@react-three/drei'
export function Level() {
  const { nodes } = useGLTF('/level-react-draco.glb')
  return <mesh geometry={nodes.Level.geometry} material={nodes.Level.material} position={[-0.38, 0.69, 0.62]} rotation={[Math.PI / 2, -Math.PI / 9, 0]} />
}