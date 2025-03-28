# fun.pump - clone


## Why? 

I took up this project to understand the basics of blockchain development, smart contracts, and decentralized applications. I learned how to write and deploy smart contracts using Solidity, interact with them using Ethers.js, and build a frontend with Next.js. This helped me grasp key concepts like contract deployment, blockchain transactions, and integrating Web3 into applications.

## Technology Stack & Tools

- Solidity (Writing Smart Contracts & Tests)
- Javascript (Next.js & Testing)
- [Hardhat](https://hardhat.org/) (Development Framework)
- [Ethers.js](https://docs.ethers.io/v5/) (Blockchain Interaction)
- [Next.js](https://nextjs.org/) (Frontend Framework)

## Requirements For Initial Setup
- Install Nodejs LTS version

## Setting Up
### 1. Clone/Download the Repository

### 2. Install Dependencies:
`$ npm install`

### 3. Run tests
`$ npx hardhat test`

### 4. Start Hardhat node
`$ npx hardhat node`

### 5. Run deployment script
In a separate terminal execute:

`$ npx hardhat ignition deploy ignition/modules/Factory.js --network localhost`

If you have previously deployed you may want to append `--reset` at the end:

`$ npx hardhat ignition deploy ignition/modules/Factory.js --network localhost --reset`

### 6. Start frontend
`$ npm run dev`

## To-Do List

1. **Metamask Setup** - Just turn on and add `Account 0` (default for deployer in the network). [hardhat node]

