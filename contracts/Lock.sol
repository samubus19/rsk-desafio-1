// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract Qatar is ERC20 {
  uint public unlockTime;

  constructor (uint _unlockTime) ERC20("Qatar", "QTR") {
    require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
    );
    unlockTime = _unlockTime;
  }

  function mintear(address cuenta, uint monto) public {
    require(block.timestamp >= unlockTime, "You can't mint yet");
    _mint(cuenta, monto);
    console.log("Tokens minteados");
    // _mint(cuenta, monto * (10 ** 18));
  }

  function cambiarUnlockTime(uint newUnlockTime, address cuenta) public {
    require(msg.sender == cuenta, "You are not the owner");
    unlockTime = newUnlockTime;
  }

  function getUnlockTime() public view returns (uint) {
    return unlockTime;
  }

}


