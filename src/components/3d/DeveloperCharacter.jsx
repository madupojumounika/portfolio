import { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function DeveloperCharacter(props) {
  const group = useRef()
  
  // Attempt to load the user's GLB model. 
  // This will suspend until the file is placed at public/models/developer-girl.glb
  const { scene, animations } = useGLTF('/models/developer-girl.glb')
  
  // Extract animations from the loaded model
  const { actions, names } = useAnimations(animations, group)

  useEffect(() => {
    if (!actions) return

    // Attempt to find and play common animation names for a seated developer
    const typingAnim = actions['Typing'] || actions['type'] || actions['typing']
    const idleAnim = actions['Idle'] || actions['idle'] || actions['Sitting']
    
    // Play typing animation if available, otherwise fallback to idle
    if (typingAnim) {
      typingAnim.reset().fadeIn(0.5).play()
    } else if (idleAnim) {
      idleAnim.reset().fadeIn(0.5).play()
    } else if (names.length > 0) {
      // Fallback: play the first available animation
      actions[names[0]].reset().fadeIn(0.5).play()
    }

    return () => {
      // Cleanup animations on unmount
      if (typingAnim) typingAnim.fadeOut(0.5)
      else if (idleAnim) idleAnim.fadeOut(0.5)
      else if (names.length > 0) actions[names[0]].fadeOut(0.5)
    }
  }, [actions, names])

  // Optional: Add subtle procedural breathing if the model lacks an idle animation
  useFrame(({ clock }) => {
    if (group.current && (!actions || names.length === 0)) {
      const t = clock.getElapsedTime()
      group.current.position.y = Math.sin(t * 2) * 0.01 // Subtle breathing
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      {/* 
        Render the loaded 3D character scene. 
        Adjust scale/position here if the provided model is too large or off-center 
      */}
      <primitive 
        object={scene} 
        scale={1.5} 
        position={[0, -0.2, 0.1]} 
      />
    </group>
  )
}

// Preload the model so it starts downloading immediately
useGLTF.preload('/models/developer-girl.glb')
