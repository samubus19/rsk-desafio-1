// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Qatar is ERC20 {
    constructor() ERC20("Qatar", "qtr") {
        _mint(msg.sender, 100 * (10 ** 18));
    }
}

contract TokenConsumer {
    ERC20 token;

    constructor(ERC20 _token) {
        token = _token;
    }

    function deposit(uint amount) external {
        token.transferFrom(msg.sender, address(this), amount);
    }

    function withdraw(uint amount) external {
        token.transfer(msg.sender, amount);
    }
}