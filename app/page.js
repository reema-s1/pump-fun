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
  const [ account, setAccount] = useState(null)
  const [factory , setFactory ] = useState(null)
  const [fee, setFee] = useState(0)
  const [showCreate , setShowCreate] = useState(false)

  function toggleCreate(){
        showCreate ? setShowCreate(false) :  setShowCreate(true)

    //setShowCreate(true)
    //console.log("create...")
  }

  async function loadBlockchainData(){

    const provider = new ethers.BrowserProvider(window.ethereum)
    setProvider(provider)

    const network = await provider.getNetwork()

    onsole.log(config[network.chainId].factory.address) //fetching chain id directly from metamask
    
    //console.log("address", config[network.chainId].factory.address)

    console.log("factory abi", Factory)

    const factory = new ethers.Contract(config[network.chainId].factory.address, Factory , provider )
    setFactory(factory)

    const fee = await factory.fee()
    console.log("fee", fee)
    
    //console.log("provider" ,provider)

  }
  useEffect(()=> {
    loadBlockchainData()
  }, []  )

  return (
    <div className="page">
      <Header account = {account} setAccount={setAccount} />

      <main>
        <div className="=create">
          <button onClick = {toggleCreate} className="btn--fancy">
            {"[ state a new token ]"}
          </button>
        </div>
      </main>

      {showCreate && (
        <List toggleCreate = {toggleCreate} fee={fee} provider={provider} factory={factory} />

      )
      
      }
      
      </div>
  );
}
