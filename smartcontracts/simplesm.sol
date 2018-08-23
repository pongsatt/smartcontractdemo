pragma solidity ^0.4.0;
contract MyCurrency {
    
    string public name;
    mapping(address => uint) public balanceOf;
    
    constructor(string _name, uint _initialAmount) public {
        name = _name;
        balanceOf[msg.sender] = _initialAmount;
    }
    
    function transfer(uint _amount, address _to) public {
        require (balanceOf[msg.sender] >= _amount, "You don't have enough amount.");
        
        balanceOf[_to] += _amount;
        balanceOf[msg.sender] -= _amount;
    }
}