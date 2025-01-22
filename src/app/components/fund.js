'use client'
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Box,
  Stack,
  Text,
  Heading,
  Button,
  Flex,
  Center,
  Hide,
  Wrap,
  WrapItem,
  Progress,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  ButtonGroup,
  OrderedList,
  ListItem
} from "@chakra-ui/react";
import Image from 'next/image'
import { BiSolidUserCircle } from "react-icons/bi";

export default function Fund(props) {
  const {
    w,
    fundraiserName,
    Description,
    Amount,
    TimeRemaining,
    Percent,
    coverImage
  } = props;
    
  return (
    <Card minW={w} maxW={w} m={'auto'} bg={'none'} border={'none'} boxShadow={'none'}>
      <CardBody>
        <Image
          width={'348'}
          height={'232'}
          src={coverImage || '/images/donate.png'}
          alt={fundraiserName}
        />
        <Stack mt='6' spacing='10px'>
          <Heading 
            fontSize={'15px'}
            fontWeight={'700'}
            lineHeight={'24px'}
          >
            {fundraiserName}
          </Heading>
          <Progress borderRadius={'6px'} size='sm' value={Percent} />
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            w={'100%'}
            h={'auto'}
            alignItems={'center'}
          >
            <Text>
              ${Amount?.toLocaleString()} Goal
            </Text>
            <Text>
              {TimeRemaining} days left
            </Text>
          </Box>
          <Text
            color={'#767676'}
            fontSize={'14px'}
            fontStyle={'italic'}
            fontWeight={'300'}
            lineHeight={'21px'}
          >
            {Description}
          </Text>
          
          <Button
            borderRadius={'20px'}
            bg={'#FFBE37'}
            color={'#fdfdfd'}
          >
            Donate now
          </Button>
        </Stack>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}