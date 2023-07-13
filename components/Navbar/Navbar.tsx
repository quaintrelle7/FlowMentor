import { Flex, Box } from '@chakra-ui/layout';
// import { Box } from '@chakra-ui/react/dist';
import React from 'react';
import { Button, Input } from '@chakra-ui/react'


type NavbarProps = {

    user: any,
    handleLogIn: () => void,
    handleLogOut: () => void,
};

const Navbar: React.FC<NavbarProps> = (props) => {

    return (

        <Flex backgroundColor={"brand.100"} height={"50px"} justifyContent={"flex-end"}>

            {props.user.addr ? props.user.addr : ""}

            {props.user.addr ? <Button onClick={props.handleLogOut}>Log Out</Button> :
                <Button onClick={props.handleLogIn}>Log In</Button>
            }



        </Flex>
    )
}
export default Navbar;