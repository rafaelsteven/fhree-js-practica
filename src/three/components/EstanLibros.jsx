import { useMemo } from 'react'
import * as THREE from 'three'

function Libro({ x, z, color }) {
  // Generamos las dimensiones una sola vez para que no cambien al re-renderizar
  const { width, height, depth } = useMemo(() => ({
    width: 0.1 + Math.random() * 0.05,
    height: 0.3 + Math.random() * 0.3, // Altura variable
    depth: 0.5 + Math.random() * 0.2
  }), [])

  // CÁLCULO CLAVE: Para que la base toque el estante, 
  // la posición Y debe ser la mitad de su propia altura.
  const yPos = height / 2

  return (
    <mesh castShadow position={[x, yPos, z]}>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

export default function EstanLibros({ pisos, adorno, ...props }) {
  // Memorizamos el piso donde va el adorno para que no cambie de lugar
  const pisoConAdorno = useMemo(() => Math.floor(Math.random() * pisos), [pisos])

  return (
    <group {...props}>
      {[...Array(pisos)].map((_, i) => (
        <CuadroLibros 
          key={i} 
          position={[0, i * 0.8, 0]} 
          adorno={i === pisoConAdorno ? adorno : null} 
        />
      ))}
    </group>
  )
}

function CuadroLibros({ adorno, ...props }) {
  const colorMadera = "#ffae00"
  const gruesoMadera = 0.07
  const profundidad = 0.9
  const distanciaTrasera = -0.17

  const librosData = useMemo(() => {
    const lista = []
    // Si hay adorno, menos libros para que no se amontonen
    const cantidad = adorno ? Math.floor(Math.random() * 3) + 2 : Math.floor(Math.random() * 5) + 4
    const colores = ["#e63946", "#f1faee", "#a8dadc", "#457b9d", "#1d3557"]
    
    let xActual = adorno ? 0.1 : -0.6 

    for (let i = 0; i < cantidad; i++) {
      const anchoLibro = 0.08 + Math.random() * 0.05
      lista.push({ x: xActual, color: colores[Math.floor(Math.random() * colores.length)] })
      xActual += anchoLibro + 0.02
    }
    return lista
  }, [adorno])

  return (
    <group {...props}>
      {/* BASE DEL CUADRO */}
      <mesh castShadow position={[0, 0, distanciaTrasera]}>
        <boxGeometry args={[1.5, gruesoMadera, profundidad]} />
        <meshStandardMaterial color={colorMadera} />
      </mesh>


      {/* GRUPO DE LIBROS Y ADORNOS */}
      {/* Ajustamos la altura inicial del grupo sumando la mitad del grosor de la madera */}
      <group position={[0, gruesoMadera / 2, 0]}>
        {librosData.map((libro, index) => (
          <Libro 
            key={index} 
            x={libro.x} 
            z={distanciaTrasera} 
            color={libro.color} 
          />
        ))}

        {/* Renderizado del Adorno (Cubo Rubik, etc) */}
        {adorno && (
          <group position={[-0.4, 0.33, distanciaTrasera]}>
            {adorno}
          </group>
        )}
      </group>
    </group>
  )
}