'use client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'
import { useState, useEffect } from "react";
import '@fontsource-variable/rubik';
import '@fontsource/dm-sans';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { inputTheme } from './utils/input.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { EdgeStoreProvider } from './lib/edgestore';
import { SessionProvider } from 'next-auth/react';

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)"
};
const theme = extendTheme({
    fonts: {
        heading: `'Rubik Variable', sans-serif`,
        body: `'Rubik Variable', sans-serif`,
      },
    components: {
   
      Form: {
        variants: {
          floating: {
            container: {
              _focusWithin: {
                label: {
                  ...activeLabelStyles
                }
              },
              "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label": {
                ...activeLabelStyles
              },
              label: {
                top: 0,
                left: 0,
                zIndex: 2,
                position: "absolute",
                backgroundColor: "white",
                pointerEvents: "none",
                mx: 3,
                px: 1,
                my: 2,
                transformOrigin: "left top"
              }
            }
          }
        }
      },
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

const queryClient = new QueryClient();

export function Providers({ children, session }) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    })
  }, [])

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <EdgeStoreProvider>
          <ChakraProvider theme={theme}>
            {children}
          </ChakraProvider>
        </EdgeStoreProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
