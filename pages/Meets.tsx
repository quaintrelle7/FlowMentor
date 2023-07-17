import { Heading } from '@chakra-ui/react';
import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
    Center, Box
} from '@chakra-ui/react'
import ReScheduleCall from '@/components/PopUp/RescheduleCall';

type MeetsProps = {

};


const Meets: React.FC<MeetsProps> = () => {
    const handleReschedule = () => { }
    const handleCancel = () => { }
    return (<Box >
        <Center mt={10}>
            <Heading>Scheduled Meets</Heading>
        </Center>

        <Center > <TableContainer bg="gray.200" border={"1px solid gray"} mt={10} rounded={'md'}>
            <Table variant='simple'>
                <TableCaption>Scheduled Meets

                </TableCaption>
                <Thead>
                    <Tr>
                        <Th>Scheduled time</Th>
                        <Th>Mentor</Th>
                        <Th>Mentee</Th>
                        <Th>Hour</Th>
                        <Th>Total Price</Th>
                        <Th>Reschedule</Th>
                        <Th> Cancel</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>12:34</Td>
                        <Td> Emily</Td>
                        <Td> Raju </Td>
                        <Td>2</Td>
                        <Td>200</Td>
                        <Td><ReScheduleCall/></Td>
                        <Td><Button fontSize={"15"}
                            rounded={'md'} bg={'red.500'}  _hover={{bg:"red.700"}}
                            onClick={handleCancel}> Cancel</Button></Td>
                    </Tr>

                </Tbody>

            </Table>
        </TableContainer></Center>





    </Box>)
}
export default Meets;