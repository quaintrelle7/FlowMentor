import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import { Button, Input } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar/Navbar'
import HomePage from '@/components/Home/HomePage'

fcl.config({

  //Emulator
  "accessNode.api": "http://localhost:8888",
  "app.detail.title": "Sharayu's Flow Wallet",

  //wallet to interact with emulator
  "discovery.wallet": "http://localhost:8701/fcl/authn",
  "0xStuff": "0xf8d6e0586b0a20c7"
})


export default function Home() {

  const [user, setUser] = useState({ addr: "" })
  const [name, setName] = useState();
  const [newName, setNewName] = useState();

  useEffect(() => {
    fcl.currentUser.subscribe(setUser);

  }, [])

  const handleLogIn = () => {
    fcl.authenticate();
  }

  const handleLogOut = () => {
    fcl.unauthenticate();
  }

  const handleGetName = async () => {
    const response = await fcl.send([
      fcl.script`
      import Stuff from 0xStuff

      pub fun main(): String{
        return Stuff.name
      }
      `
    ])

    //(response).then(fcl.decode())

    const decodedResponse = await fcl.decode(response);

    setName(decodedResponse)
  }

  const handleChangeName = async () => {


    const txId = await fcl.send([
      fcl.transaction`
      
      import Stuff from 0xStuff
      transaction(newName: String){
        prepare(signer: AuthAccount){

        }

        execute{
          Stuff.changeName(newName: newName)
        }
      }`,

      fcl.args([
        fcl.arg(newName, t.String)
      ]),

      fcl.proposer(fcl.authz),
      fcl.payer(fcl.authz),
      fcl.authorizations([fcl.authz])


    ])



  }

  return (
    <>
      <Navbar user={user} handleLogIn={handleLogIn} handleLogOut={handleLogOut} />

      <HomePage />
      <div>



        <div>
          <Button onClick={handleGetName}>Get Name</Button>
          <h1>{name}</h1>
          <Button onClick={handleChangeName}>Change Name</Button>
          <Input type="text" onChange={(e) => setNewName(e.target.value)} />
        </div>
      </div>
    </>
  )
}
