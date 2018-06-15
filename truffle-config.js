var FirstContract = artifacts.require("firstContract");

module.exports = function(deployer) {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    deployer.deploy(FirstContract);
};
