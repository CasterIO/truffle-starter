pragma solidity ^0.4.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Rental.sol";

contract TestRental {
    Rental rental = Rental(DeployedAddresses.Rental());

    function testUserCanRent() public {
        uint returnedId = rental.rent(1);
        uint expected = 1;

        Assert.equal(returnedId, expected, "Rental of vehicle 1 should be recorded");

    }

    function testAllRentals() public {
        address expected = this;
        address[16] memory rentals = rental.getRentals();

        Assert.equal(rentals[1], expected, "Renter of vehicle 1 should be recorded");
    }

    function testContractBalance() public {
        uint expected = 0;
        Assert.equal(rental.getBalance(), expected, "Contract should have a zero balance");
        
    }
}