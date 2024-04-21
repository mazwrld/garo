'use client'

import { motion } from 'framer-motion'

export default function ShinyButton({
  children,
  type = 'button', // Default to "button" type
}: {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset' // Define the optional type prop
}) {
  return (
    <motion.button
      type={type} // Use the type prop
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error SHUT UP ALREADY
      initial={{ '--x': '100%', scale: 1 }}
      // @ts-expect-error TRUST ME THIS WORKS
      animate={{ '--x': '-100%' }}
      whileTap={{ scale: 0.88 }}
      transition={{
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 1,
        type: 'spring',
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
          type: 'spring',
          stiffness: 10,
          damping: 5,
          mass: 0.1,
        },
      }}
      className="radial-gradient relative rounded-md px-6 py-2"
    >
      <span className="linear-mask relative block h-full w-full tracking-wide">
        {children}
      </span>
      <span className="linear-overlay absolute inset-0 block rounded-md p-px" />
    </motion.button>
  )
}
