export default function Teclado(props) {
  return (
    <group {...props}>
      {/* Base del teclado */}
      <mesh castShadow>
        <boxGeometry args={[0.8, 0.05, 0.3]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Simulamos teclas con un grid de cajitas pequeñas */}
      {[...Array(5)].map((_, row) => 
        [...Array(10)].map((_, col) => (
          <mesh 
            key={`${row}-${col}`} 
            position={[-0.35 + col * 0.078, 0.04, -0.12 + row * 0.06]}
          >
            <boxGeometry args={[0.06, 0.03, 0.05]} />
            <meshStandardMaterial color={Math.random() > 0.8 ? "#00ffff" : "#444"} />
          </mesh>
        ))
      )}
    </group>
  )
}