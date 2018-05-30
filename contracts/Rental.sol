pragma solidity ^0.4.0;

contract Rental {
    address public owner;
    address[16] public rentals;

    constructor() {
        owner = msg.sender;
    }

    function rent(uint rentalId) public payable returns (uint) {
        require(rentalId >= 0 && rentalId <= 15);

        rentals[rentalId] = msg.sender;
        return rentalId;
    }

    function getRentals() public view returns (address[16]) {
        return rentals;
    }

    function getBalance() public view returns (uint) {
        return this.balance;
    }

    function payday() public {
        require(msg.sender == owner);
        owner.transfer(this.balance);
    }
    
}