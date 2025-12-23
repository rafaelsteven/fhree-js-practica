export default function Cuarto() {
  return (
    <group>
      {/* Suelo */}
      <mesh receiveShadow rotation-x={-Math.PI / 2}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      {/* Techo */}
      <mesh receiveShadow rotation-x={Math.PI / 2} position-y={5}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      {/* Paredes (Frente, Atrás, Izquierda, Derecha) */}
      <mesh position={[0, 2.5, -5]} receiveShadow>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="lightgray" />
      </mesh>
      <mesh position={[0, 2.5, 5]} rotation-y={Math.PI} receiveShadow>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="lightgray" />
      </mesh>
      <mesh position={[-5, 2.5, 0]} rotation-y={Math.PI / 2} receiveShadow>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="lightgray" />
      </mesh>
      <mesh position={[5, 2.5, 0]} rotation-y={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="lightgray" />
      </mesh>
    </group>
  )
}