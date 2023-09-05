
import {Box,useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,SimpleGrid} from '../utils/chakra'

  import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';


  import NavBar from "../components/user/navBar";
  export default async function User(){
    const cookieStore = cookies()
    const supabase = createServerComponentClient({  cookies: () => cookieStore });

    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      redirect('/sign-in');
    }
  
    return(
      <Box minH="100vh" bg={'#edf2f7'}>
    <NavBar/>
    <Box ml={{ base: 0, md: 60 }} p="4">
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
    <Stat 
    backdropFilter={'blur(17.01149559020996px)'}
    borderRadius={'10px'}
    p={'20px'}
    h={'auto'} bg={'#FFF'} >
  <StatLabel display={'flex'} alignItems={'center'}>
    <Box mr={'13px'}>
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.563232" y="0.562988" width="37.4253" height="36.5747" rx="6.8046" fill="#2F80ED" fill-opacity="0.2"/>
<path d="M28.6323 13.1356V10.8496C28.6323 9.58896 27.5832 8.56372 26.2932 8.56372H11.0892C9.15477 8.56372 7.58057 10.1021 7.58057 11.9926V25.7081C7.58057 28.2238 9.67872 29.137 11.0892 29.137H28.6323C29.9223 29.137 30.9714 28.1118 30.9714 26.8511V15.4215C30.9714 14.1608 29.9223 13.1356 28.6323 13.1356ZM26.2932 23.4222H23.9541V18.8504H26.2932V23.4222ZM11.0892 13.1356C10.7881 13.1224 10.5037 12.9962 10.2954 12.7833C10.0871 12.5704 9.97079 12.2872 9.97079 11.9926C9.97079 11.698 10.0871 11.4148 10.2954 11.2019C10.5037 10.989 10.7881 10.8628 11.0892 10.8496H26.2932V13.1356H11.0892Z" fill="#3380FF"/>
</svg>
    </Box>
 
    Total Donation</StatLabel>
  <StatNumber
  mt={'20px'}
  fontSize={'24.709px'}
  >&#8358;123,987</StatNumber>
  <StatHelpText
    mt={'10px'}
    fontSize={'11.057px'}
  
  >Feb 12 - Feb 28</StatHelpText>
</Stat>




<Stat 
    backdropFilter={'blur(17.01149559020996px)'}
    borderRadius={'10px'}
    p={'20px'}
    h={'auto'} bg={'#FFF'} >
  <StatLabel display={'flex'} alignItems={'center'}>
    <Box mr={'13px'}>
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.475098" y="0.444824" width="37.4253" height="36.5747" rx="6.8046" fill="#FF9C07" fill-opacity="0.2"/>
<path d="M23.3179 8.85571H14.6905C10.943 8.85571 8.70898 11.1001 8.70898 14.8475V23.4646C8.70898 27.2121 10.943 29.4462 14.6905 29.4462H23.3076C27.0551 29.4462 29.2891 27.2121 29.2891 23.4646V14.8475C29.2994 11.1001 27.0654 8.85571 23.3179 8.85571ZM18.5615 24.0824C18.5615 24.3912 18.4071 24.6692 18.1394 24.8339C17.9953 24.9266 17.8409 24.9677 17.6761 24.9677C17.5423 24.9677 17.4085 24.9369 17.2746 24.8751L13.6713 23.0734C13.1565 22.8057 12.8271 22.2807 12.8271 21.6939V18.2861C12.8271 17.9773 12.9815 17.6993 13.2492 17.5346C13.5169 17.3699 13.836 17.3596 14.114 17.4934L17.7173 19.2951C18.2424 19.5627 18.5718 20.0878 18.5718 20.6746V24.0824H18.5615ZM18.3453 18.5744L14.4743 16.4845C14.1963 16.33 14.0213 16.0315 14.0213 15.6917C14.0213 15.3623 14.1963 15.0534 14.4743 14.899L18.3453 12.8091C18.7571 12.5929 19.241 12.5929 19.6528 12.8091L23.5238 14.899C23.8018 15.0534 23.9768 15.352 23.9768 15.6917C23.9768 16.0315 23.8018 16.33 23.5238 16.4845L19.6528 18.5744C19.4469 18.6877 19.2204 18.7391 18.9939 18.7391C18.7674 18.7391 18.5512 18.6877 18.3453 18.5744ZM25.1813 21.6939C25.1813 22.2807 24.8519 22.816 24.3268 23.0734L20.7235 24.8751C20.6 24.9369 20.4661 24.9677 20.322 24.9677C20.1573 24.9677 20.0028 24.9266 19.8587 24.8339C19.591 24.6692 19.4366 24.3912 19.4366 24.0824V20.6746C19.4366 20.0878 19.7661 19.5525 20.2911 19.2951L23.8944 17.4934C24.1724 17.3596 24.4916 17.3699 24.7592 17.5346C25.0269 17.6993 25.1813 17.9773 25.1813 18.2861V21.6939Z" fill="#FFB849"/>
</svg>

    </Box>
 
    Today’s Donation</StatLabel>
  <StatNumber
  mt={'20px'}
  fontSize={'24.709px'}
  >&#8358;123,987</StatNumber>
  <StatHelpText
    mt={'10px'}
    fontSize={'11.057px'}
  
  >Feb 12 - Feb 28</StatHelpText>
</Stat>

<Stat 
    backdropFilter={'blur(17.01149559020996px)'}
    borderRadius={'10px'}
    p={'20px'}
    h={'auto'} bg={'#FFF'} >
  <StatLabel display={'flex'} alignItems={'center'}>
    <Box mr={'13px'}>
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.00732422" y="0.444824" width="37.4253" height="36.5747" rx="6.8046" fill="#4D21FF" fill-opacity="0.2"/>
<path d="M24.6206 17.4935H21.4394V10.0809C21.4394 8.35131 20.5025 8.00128 19.3597 9.29847L18.5361 10.2353L11.5662 18.1627C10.6088 19.2437 11.0103 20.1291 12.4516 20.1291H15.6329V27.5416C15.6329 29.2712 16.5697 29.6213 17.7125 28.3241L18.5361 27.3872L25.506 19.4599C26.4634 18.3789 26.0619 17.4935 24.6206 17.4935Z" fill="#9181DB"/>
</svg>

    </Box>
 
    Avg Campaign Rate</StatLabel>
  <StatNumber
  mt={'20px'}
  fontSize={'24.709px'}
  >&#8358;123,987</StatNumber>
  <StatHelpText
    mt={'10px'}
    fontSize={'11.057px'}
  
  >Feb 12 - Feb 28</StatHelpText>
</Stat>
</SimpleGrid>
      </Box>
    </Box>)
  };
  