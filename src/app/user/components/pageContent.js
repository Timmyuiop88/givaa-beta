"use client";
import {
    Box,
    useColorModeValue,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
    SimpleGrid,
  }  from "@chakra-ui/react";

  import { BsPerson } from 'react-icons/bs'
import { FiServer } from 'react-icons/fi'
import { signIn, signOut, useSession } from "next-auth/react";
import { GoLocation } from 'react-icons/go'
import { useState, useEffect } from 'react'
import axios from 'axios'
  import NavBar from "./navBar";
import StatsCard from "./stats";
  export default  function Page() {
    const { data: session } = useSession();

   
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
  
    useEffect(() => {
      const fetchStats = async () => {
        if (session) {
          
          try {
            const response = await axios.get('/api/stats')
            setStats(response.data)
          } catch (error) {
            setError(error.message)
          } finally {
            setLoading(false)
          }
        }
      }
  
      fetchStats()
    }, [session])
    return (
      <Box minH="100vh" bg={"#edf2f7"}>
        <NavBar />
        <Box px={{ base: 0, md: 50 }} p="4">

       
      
       <SimpleGrid columns={{ base: 1, md: 2 , lg: 3, xl: 4}} spacing={{ base: 3, lg: 3 }} w={'full'}>
           <StatsCard title={'Total Donation'} stat={stats?.totalDonations?._sum?.donation_amount || 0} icon={'wallet.svg'} loading={loading} error={error}/>
           <StatsCard title={'Todays Donation'} stat={stats?.totalDonations?._sum?.donation_amount || 0} icon={'today.svg'} loading={loading} error={error} />
           <StatsCard title={'Todays Donation'} stat={stats?.totalDonations?._sum?.donation_amount || 0} icon={'today.svg'} loading={loading} error={error} />
         
          </SimpleGrid>
      
       
      
        </Box>
      </Box>
    );
  }
  