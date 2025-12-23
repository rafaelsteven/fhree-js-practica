import { useTexture } from '@react-three/drei'

export default function PictureFrame({ url, ...props }) {
  const image = useTexture(url)
  return (
    <group {...props}>
      {/* El Marco */}
      <mesh castShadow>
        <boxGeometry args={[1.2, 1.6, 0.05]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* La Foto */}
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[1, 1.4]} />
        <meshStandardMaterial map={image} />
      </mesh>
    </group>
  )
}

// Úsalo pegado a tu pared:
// <PictureFrame url="/mi-foto.jpg" position={[-2.45, 2.5, 0]} rotation-y={Math.PI / 2} />