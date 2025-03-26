"use client"

import { useEffect, useState } from "react"
import { ethers } from 'ethers'

// Components
import Header from "./components/Header"
import List from "./components/List"
import Token from "./components/Token"
import Trade from "./components/Trade"

// ABIs & Config
import Factory from "./abis/Factory.json"
import config from "./config.json"
import images from "./images.json"

export default function Home() {

  const [ provider, setProvider] = useState(null)
  const [ account, setAccount] = useState("")


  async function loadBlockchainData(){

    const provider = new ethers.BrowserProvider(window.ethereum)
    setProvider(provider)

    console.log(config["31337"].factory.address)
    console.log(accounts[0]);
    //console.log("provider" ,provider)

  }
  useEffect(()=> {
    loadBlockchainData()
  }, []  )

  return (
    <div className="page">
      <Header account = {account} setAccount={setAccount} />

    </div>
  );
}
