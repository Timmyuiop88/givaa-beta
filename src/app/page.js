'use client'
import { Box } from '@chakra-ui/react'
import Hero from './components/hero'
import Campaign from './components/campaign'
import Featured from './components/featured'
import Services from './components/services'
import Partners from './components/partners'
import StartFund from './components/startFund'
import Around from './components/FundraisingAround'
import Blog from './components/Blog'
import Ready from './components/ready'
import Footer from './components/footer'
export default function Home() {
  return (
    <div>
 <Box
      bg={'#FDFDFD'}
      >
      <Hero />
 <Campaign />
  <Featured/> 
  <Services/>

  <StartFund/>
  <Around/>
  <Blog/>
  <Ready/>
  <Footer/>
      </Box>
    </div>
  )
}
