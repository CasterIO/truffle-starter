var Rental = artifacts.require("./Rental.sol");

module.exports = function(deployer) {
    deployer.deploy(Rental);
};
