// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.27;
import {Token} from "./Token.sol";


contract Factory {

    uint256 public immutable fee; //state var - written to bc
    address public owner; 

    uint public totalTokens;
    address[] public tokens;  
    mapping(address => TokenSale) public tokenToSale; // key value store

    struct TokenSale{
        address token;
        string name; 
        address creator;  
        uint256 sold; 
        uint256 raised; 
        bool isOpen;
    }


    event Created(address indexed token);

    constructor(uint256 _fee){
        fee = _fee; //local var - can't acess in bc
        owner = msg.sender; 
    }


    function getTokenSale(uint256 _index) public view returns (TokenSale memory) {
            return tokenToSale[tokens[_index]];
    }
    function create(
        string memory _name, 
        string memory _symbol
        ) external payable {

        require(msg.value >= fee , "Factory : Creator fee not met");

        //create a new token 
        Token token = new Token(msg.sender,_name , _symbol, 1_000_000 ether); //here msg.sender is the creator
        
        //save the token 
        tokens.push(address(token));
        
        totalTokens ++ ; 

        //list the token for sale 
   
        TokenSale memory sale = TokenSale(
            address(token),
            _name, 
            msg.sender, 
            0, 
            0, 
            true
        );

        tokenToSale[address(token)] = sale;


        //tell people it's live

        emit Created(address(token));
        
    }
    
    function buy(address _token, uint256 _amount) external payable {

        // transferring tokens to the buyers wallet 

        Token(_token).transfer(msg.sender, _amount); 


    }


}




