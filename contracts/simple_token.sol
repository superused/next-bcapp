pragma solidity ^0.8.0;
// SPDX-License-Identifier: GPL-3.0-or-later
contract SimpleToken {
    string public name = 'SimpleToken';
    string public symbol = 'SMT';
    uint public totalSupply;
    mapping(address => uint) balances;

    constructor(uint _total) {
        balances[msg.sender] = _total;
        totalSupply = _total;
    }

    function getTokenBalanceOf(address _owner) view public returns (uint) {
        return (balances[_owner]);
    }

    function transferToken(address _to, uint256 _value) public {
        require(_value <= balances[msg.sender]);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
    }
}
