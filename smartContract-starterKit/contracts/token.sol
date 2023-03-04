
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.8;

// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract token is ERC20 {
    constructor(uint _initialSupply) ERC20("Token", "PLU") {
        require(_initialSupply > 0, "Cant be zero");
        _mint(msg.sender, _initialSupply);
    }
}
