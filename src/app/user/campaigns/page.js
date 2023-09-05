import {Box} from '../../utils/chakra'
import NavBar from "../../components/user/navBar";
export default async function Campaigns(){
    
  
    return(
      <Box minH="100vh" bg={'#edf2f7'}>
    <NavBar/>
    <Box ml={{ base: 0, md: 60 }} p="4">
 Campaigns
      </Box>
    </Box>)
  };