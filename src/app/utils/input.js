'use client'
import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const xl = defineStyle({
 
  w: '100%',
  h: '75px',
  pl:'20px',
  pr: '20px',
  borderRadius: '158px',

})

const sizes = {
  xl: definePartsStyle({ field: xl, addon: xl }),
}

export const inputTheme = defineMultiStyleConfig({ sizes })

export default function Home1() {
  return <>{/* nothing */}</>;
}