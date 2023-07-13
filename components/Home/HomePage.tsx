import React from 'react';
import {
    Flex, Box, 
  
    Stack,
    Heading,
    Text,
    Container,
} from '@chakra-ui/layout';
import { Card } from '@chakra-ui/react';
import CaptionCarousel from './CaptionCarousel';
import WithSpeechBubbles from './Testimonial';


type HomePageProps = {

};



const HomePage: React.FC<HomePageProps> = () => {
   

    return (
        <Box backgroundColor={"brand.300"} p={10}>
           

          <CaptionCarousel/>
            <Flex justifyContent={"space-around"} my={20} width={"50%"} mx={"25%"}>
                <Card p={2} backgroundColor={"brand.200"} width={"200px"} height={"80px"}>
                    <Stack alignItems={"center"} >

                        <Text> Join as</Text>

                        <Text fontSize={"25px"}>A Mentor</Text>
                    </Stack>
                </Card>

                <Card p={2} backgroundColor={"brand.200"} width={"200px"} height={"80px"}>
                    <Stack alignItems={"center"} >

                        <Text> Join as</Text>

                        <Text fontSize={"25px"}>A Mentee</Text>
                    </Stack>
                </Card>
            </Flex>
          <WithSpeechBubbles/>

        </Box>
    )
}


export default HomePage;



