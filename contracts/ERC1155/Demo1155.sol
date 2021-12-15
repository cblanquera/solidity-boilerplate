// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Demo1155 is ERC1155 {
  constructor(string memory uri) ERC1155(uri) {}

  function mint(address to, uint256 id, uint256 amount) public virtual {
    _mint(to, id, amount, "");
  }
}