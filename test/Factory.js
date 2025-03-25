// default - const Factory = require("@/ignition/modules/Factory")
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers")
const { expect } = require("chai")
const { ethers } = require("hardhat")

const path = require('path');
const Factory = require(path.resolve(__dirname, '../ignition/modules/Factory'));



describe("Factory", function () { //fixture

    const FEE = ethers.parseUnits("0.01", 18)

    async function deployFactoryFixture() {

        //fetch accounts
        const [ deployer, creator ] = await ethers.getSigners();
    
        //FETCH THE CONTRACT
        const Factory = await ethers.getContractFactory("Factory");

        //DEPLOY THE CONTRACT
        const factory = await Factory.deploy(FEE); //runs our constructor

        //create token 
        const transaction = await factory.connect(creator).create("reemas token", "REEMA",{ value: FEE } )
        await transaction.wait()

        //get token address 
        const tokenAddress = await factory.tokens(0)
        const token = await ethers.getContractAt("Token", tokenAddress)
        return { factory , token,  deployer , creator }
    }

    describe("Deployment", function() {
        
        it("should set the fee" , async function() {

            const { factory } = await loadFixture(deployFactoryFixture)
            expect(await factory.fee()).to.equal(FEE)
        })

        it("should set the owner" , async function() {

            const { factory, deployer } = await loadFixture(deployFactoryFixture)
            expect(await factory.owner()).to.equal(deployer.address)
        })
    })

    describe("Creating", function (){
        it("Should set the owner", async function(){
            const { factory , token } = await loadFixture(deployFactoryFixture)
            expect (await token.owner()).to.equal(await factory.getAddress())

        })

        it("Should set the creator",  async function (){
            const { token, creator } = await loadFixture(deployFactoryFixture)
            expect(await token.creator()).to.equal(creator.address)
        })

        it("Should set the supply", async function(){
            const { factory, token } = await loadFixture(deployFactoryFixture)

            const totalSupply = ethers.parseUnits("1000000", 18)

            expect(await token.balanceOf(await factory.getAddress())).to.equal(totalSupply)
        })


        it("Should update ETH balance", async function() {
            const { factory } = await loadFixture(deployFactoryFixture)

            const balance = await ethers.provider.getBalance(await factory.getAddress())

            expect(balance).to.equal(FEE)
        })

    })


})
