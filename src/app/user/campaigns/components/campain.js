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
  Text,
  Button,
  Card,
  CardBody,
  Stack,
  Heading,
  Progress,
  CardFooter,
  Skeleton
} from "@chakra-ui/react";
import Image from "next/image";


import { ReactNode } from "react";
import { BsPerson } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { GoLocation } from "react-icons/go";

export default function Campaigns(props) {
    console.log( props.campaign)
  const {  loading } = props;
  if(loading){
    return(
      <Skeleton w={"full"} borderRadius={"20px"} h={"450"} >
       
      </Skeleton>
    )
  }
  else{

 
  return (
    <Box h={"auto"} w={"full"} bg={"#fff"} borderRadius={'20px'}>
    <Card m={"auto"} bg={"none"} border={"none"} boxShadow={"none"}>
      <CardBody>
        <Box
          width={"full"}
          display={"flex"}
          justifyContent={"center"}
        >
          <Image
            width={"400"}
            height={"150"}
            src="/images/donate.png"
            alt="Green double couch with wooden legs"
          />
        </Box>

        <Stack mt="6" spacing="10px">
          <Heading
            fontSize={"15px"}
            fontWeight={"700"}
            lineHeight={"24px"}
            textAlign={"center"}
          >
            {props.campaign.title}
          </Heading>
          <Progress borderRadius={"6px"} size="sm" value={45} />

          <Text
            color={"#767676"}
            fontSize={"14px"}
            fontStyle={"italic"}
            fontWeight={"300"}
            lineHeight={"21px"}
          >
             {props.campaign.description}
          </Text>

          <Button
            borderRadius={"20px"}
            bg={"#F68A50"}
            color={"#fdfdfd"}
          >
            Review
          </Button>
        </Stack>
      </CardBody>

      <CardFooter></CardFooter>
    </Card>
  </Box>
  );
}
}
