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
        const [ deployer, creator , buyer ] = await ethers.getSigners();
    
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
        return { factory , token,  deployer , creator , buyer}
    }

    async function buyTokenFixture() {
        const { factory , token , creator , buyer } = await deployFactoryFixture()
    
        const AMOUNT = ethers.parseUnits("10000", 18)
        const COST  = ethers.parseUnits("1", 18)
    
        //buy tokens 

        const transaction = await factory.connect(buyer).buy(await token.getAddress(), AMOUNT, {value : COST})
        await transaction.wait()

        return { factory , token , creator , buyer }
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

        it("Should create the sale" , async function(){
            const { factory , token , creator} = await loadFixture(deployFactoryFixture)

            const count = await factory.totalTokens()
            expect(count).to.equal(1)

            const sale = await factory.getTokenSale(0)

            expect(sale.token).to.equal(await token.getAddress())
            expect(sale.creator).to.equal(await creator.address)
            expect(sale.sold).to.equal(0)
            expect(sale.raised).to.equal(0)
            expect(sale.isOpen).to.equal(true)

        })

    })

    describe("Buying" , function(){

            
        const AMOUNT = ethers.parseUnits("10000", 18)
        const COST  = ethers.parseUnits("1", 18)

        //check if contract recieved ETH 
        it("Should update ETH balance" , async function(){
            const { factory } = await loadFixture(buyTokenFixture)

            const balance = await ethers.provider.getBalance(await factory.getAddress())
            expect(balance).to.equal(FEE + COST)
        })

        //check that buyer recieved tokens
        it("Should update token balances" , async function(){
            const { token,buyer } = await loadFixture(buyTokenFixture)  

            const balance = await token.balanceOf(buyer.address)

            expect(balance).to.equal(AMOUNT)
        })



    })

})
