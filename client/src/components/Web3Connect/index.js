import React, { useContext, useEffect, useState } from 'react'
import { MyContext} from '../../store/store'

import {
  Box,
  Card,
  Form,
  Flex,
  Input,
  Select,
  Field,
  Button,
  Text,
  Checkbox,
  Radio,
  Heading,
  MetaMaskButton,
  EthAddress
} from "rimble-ui";


export default function Web3Connect() {
  const { state, actions } = useContext(MyContext)
  const [web3Context, setWeb3Context] = useState();



  useEffect(() => {
    setWeb3Context(state.web3Context)
  }, [state.web3Connected]);


  return (

    <div>

        {web3Context ? (
          <h1>{web3Context.networkId}</h1>
        ) : (
          <MetaMaskButton.Outline size="small"> Connect with MetaMask </MetaMaskButton.Outline>
        )}

    </div>
  )
}
