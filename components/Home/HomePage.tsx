import React from 'react';
import { Flex, Box, Center, Stack } from '@chakra-ui/layout';
import { Card, Text } from '@chakra-ui/react';

type HomePageProps = {

};

const HomePage: React.FC<HomePageProps> = () => {

    return (
        <Box backgroundColor={"brand.300"} height={"100vh"} p={10}>
            <Flex justifyContent={"space-around" } marginTop={20} width={"50%"} mx={"25%"}>
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

        </Box>
    )
}
export default HomePage;