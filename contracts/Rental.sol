pragma solidity ^0.4.18;

contract Rental {
    address[16] public rentals;

    // Rent a car
    function rent(uint rentalId) public returns (uint) {
        require(rentalId > 0 && rentalId < 15);
        rentals[rentalId] = msg.sender;

        return rentalId;
    }

    // Retrieve all rentals
    function getRentals() public view returns (address[16]) {
        return rentals;
    }

    
}