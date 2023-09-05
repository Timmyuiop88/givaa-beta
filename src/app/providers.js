
'use client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'
import { useState, useEffect } from "react";
import '@fontsource-variable/rubik';
import '@fontsource/dm-sans';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { inputTheme } from './utils/input.js'
const theme = extendTheme({
    fonts: {
        heading: `'Rubik Variable', sans-serif`,
        body: `'Rubik Variable', sans-serif`,
      },
    components: {
      Progress: {
        baseStyle: {
          filledTrack: {
            bg: '#FFBE37'
          }
        }
      },
  
       Input: inputTheme ,
    }
    
  
  })
export default function ThemeProvider({ children }) {
    useEffect(() => {
        AOS.init({
        
             duration: 800,
             once: false,
         
           })
     }, [])
  return (
    <CacheProvider>
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider >
    </CacheProvider>
  );
}
