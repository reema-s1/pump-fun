// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.27;

contract Factory {

    uint256 public immutable fee; //state var - written to bc
    address public owner; 


    constructor(uint256 _fee){
        fee = _fee; //local var - can't acess in bc
        owner = msg.sender; 
    }
}



