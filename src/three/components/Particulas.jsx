import { Float, Stars, Sparkles } from '@react-three/drei'

export default function Particulas() {
    return (
        <Sparkles 
            count={100} 
            scale={5} 
            size={5} 
            speed={0.5} 
            opacity={0.5} 
            color="white" 
            />
    )
}
