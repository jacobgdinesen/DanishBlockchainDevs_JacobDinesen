var firstContract = artifacts.require("./firstContract.sol");

module.exports = function(deployer) {
    // Use deployer to state migration tasks.
    deployer.deploy(firstContract);
};

/*

module.exports = function(deployer, network, accounts) {
    // Use deployer to state migration tasks.
    if(network == 'local') {
        //do something;
    } else {
        //do something else;
    }
    const ownerAddress = accounts[0];
    deployer.deploy(firstContract, 1stContractArg, 2ndContractArg, 3rdContractArg...);
};

*/
