import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react'
import { useRef, type ReactNode } from 'react'

interface Tilt3DFrameProps {
  children: ReactNode
  className?: string
  intensity?: number
  glare?: boolean
}

export function Tilt3DFrame({
  children,
  className = '',
  intensity = 6,
  glare = true,
}: Tilt3DFrameProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]),
    { stiffness: 210, damping: 24 }
  )
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]),
    { stiffness: 210, damping: 24 }
  )

  const specularGradient = useMotionTemplate`radial-gradient(460px circle at ${glareX}% ${glareY}%, rgba(212, 175, 55, 0.11), transparent 72%)`

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    mouseX.set(px - 0.5)
    mouseY.set(py - 0.5)
    glareX.set(px * 100)
    glareY.set(py * 100)
  }

  const handlePointerLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    glareX.set(50)
    glareY.set(50)
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ perspective: 1200 }}
      className={className}
    >
      <motion.div
        style={
          reduceMotion
            ? undefined
            : {
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }
        }
        className="relative h-full w-full"
      >
        {children}
        {glare && !reduceMotion && (
          <motion.div
            aria-hidden="true"
            style={{ background: specularGradient }}
            className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
          />
        )}
      </motion.div>
    </div>
  )
}
