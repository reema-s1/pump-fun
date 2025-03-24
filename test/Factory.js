// default - const Factory = require("@/ignition/modules/Factory")
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers")
const { expect } = require("chai")
const { ethers } = require("hardhat")

const path = require('path');
const Factory = require(path.resolve(__dirname, '../ignition/modules/Factory'));



describe("Factory", function () {

    const FEE = ethers.parseUnits("0.01", 18)

    async function deployFactoryFixture() {

        //fetch accounts
        const [deployer] = await ethers.getSigners();
    
        //FETCH THE CONTRACT
        const Factory = await ethers.getContractFactory("Factory");

        //DEPLOY THE CONTRACT
        const factory = await Factory.deploy(FEE); //runs our constructor

        return { factory , deployer }
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
})
