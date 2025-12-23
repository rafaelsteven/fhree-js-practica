import { useRef,useState,useEffect } from 'react'
import { Canvas,useFrame,useThree } from '@react-three/fiber'
import { ContactShadows, Float, KeyboardControls,useKeyboardControls,OrbitControls, Environment } from '@react-three/drei'

import Laptop from './three/components/Laptop'
import Mesa from './three/components/Mesa'
import Cuarto from './three/components/Cuarto'
import Ventana from './three/components/Ventana'
import Monitor from './three/components/Monitor'
import Mouse from './three/components/Mouse'
import AdornoFlotante from './three/components/AdornoFlotante'
import EstanLibros from './three/components/EstanLibros'
import CuboRubik from './three/components/CuboRubik'
import TazaCafe from './three/components/TazaCafe'
import DinoSeguidor from './three/components/Dinosaurio'
import Teclado from './three/components/Teclado'
  
function RoomLight() {
  const [lightOn, setLightOn] = useState(true)
  
  // Suscribirse a la tecla 'toggleLight' (la L)
  const [subscribeKeys, getKeys] = useKeyboardControls()

  useEffect(() => {
    return subscribeKeys(
      (state) => state.toggleLight,
      (value) => {
        if (value) setLightOn(prev => !prev)
      }
    )
  }, [])

  return (
    <pointLight 
      position={[0, 3, 0]} 
      intensity={lightOn ? 2 : 0} 
      color="#ffccaa" 
      castShadow 
    />
  )
}

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#005780ff' }}>
      <KeyboardControls
        map={[
          { name: 'toggleLight', keys: ['KeyL'] },
          { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
        ]}
      >
        {/* 1. AJUSTE DE CÁMARA: Acercamos la cámara al eje Z negativo donde está la mesa */}
        <Canvas 
          shadows 
          camera={{ position: [0, 2, 1], fov: 60 }} // Bajamos FOV para menos distorsión
        >
          <RoomLight />
          <Environment preset="city" background blur={1} />
          
          <directionalLight
            castShadow
            position={[5, 10, 5]}
            intensity={1.5}
            shadow-bias={-0.0001}
            shadow-mapSize={[1024, 1024]}
          />

          <OrbitControls 
            makeDefault
            // 2. AJUSTE DE TARGET: La cámara debe rotar alrededor de la mesa
            target={[0, 1, -3.5]} 
            
            // 3. LIMITES DE DISTANCIA: Ajustados para el nuevo target
            maxDistance={8} 
            minDistance={1}
            
            // 4. LIMITES POLARES: Permitimos un poco más de rango vertical
            // para que no se sienta bloqueada al inicio
            maxPolarAngle={Math.PI / 1.7} 
            minPolarAngle={Math.PI / 3}

            enableDamping={true}
            dampingFactor={0.05}
          />

          <Cuarto />
          <Ventana position={[0, 2.5, -4.9]} noche={true}/>
          
          {/* Tu mesa está en Z: -3.5, por eso el target de arriba es -3.5 */}
          <Mesa position={[0, 0, -3.5]} />
          <Laptop position={[0, 1.1, -3.2]} scale={0.7}/>
          <Monitor position={[-0.9, 1.1, -3.2]} rotation={[0, Math.PI / 5, 0]} encendido={true}/>
          <Mouse position={[1, 1.1, -3.2]} rotation={[0, Math.PI / 1, 0]}/>
          <Teclado position={[0, 1.1, -2.6]} />
          
          <AdornoFlotante position={[1.3, 1.1, -3.9]} /> 
          
          <EstanLibros position={[-3.5, 2, -4.5]} pisos={2} adorno={<DinoSeguidor scale={0.6} position={[0, -0.2, 0]} />}/>
          <EstanLibros position={[3.5, 2, -4.5]} pisos={2} adorno={<CuboRubik scale={0.4} />}/>
          <TazaCafe position={[1.5, 1.1, -3]} scale={0.5}/>
          
        </Canvas>
      </KeyboardControls>
    </div>
  )
}
export default App