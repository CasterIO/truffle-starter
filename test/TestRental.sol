pragma solidity ^0.4.18;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Rental.sol";

contract TestRental {
    Rental rental = Rental(DeployedAddresses.Rental());

    // Test the rent() function
    function testUserCanRent() public {
        uint returnedId = rental.rent(1);

        uint expected = 1;

        Assert.equal(returnedId, expected, "Rental of vehicle 1 should be recorded.");
    }

    // Test the renter of a single vehicle
    function testGetRenterAddressByRentalId() public {
        address expected = this;

        address renter = rental.rentals(1);

        Assert.equal(renter, expected, "Renter of vehicle 1 should be recorded.");
    }

    // Test the retrieval of all rentals
    function testAllRentals() public {
        address expected = this;

        address[16] memory rentals = rental.getRentals();

        Assert.equal(rentals[1], expected, "Renter of vehicle 1 should be recorded.");
    }
}