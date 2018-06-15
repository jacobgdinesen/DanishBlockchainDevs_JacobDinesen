var firstContract = artifacts.require("./firstContract.sol");

contract('testFirstContact', function(accounts) {
  
    // basic assert tests
    it("should assert true", function(done) {
        assert.isTrue(true);
        done();
    });

    it("should assert false", function(done) {
        assert.isFalse(false);
        done();
    });

      //////////////////////////////////////////
     // TEST FOR PAYMENT AND ETHER TRANSFERS //
    //////////////////////////////////////////
    
    it("should return 0 since no ether has been donated to contract", function() {
        return firstContract.deployed().then(function(instance) {
            return instance.checkBalance.call();
        }).then(function(balance){
            assert.equal(balance, 0, balance+" should be 0");
        });
    });

    it("should return a transaction", function() {
        return firstContract.deployed().then(function(instance) {
            return instance.donate({value:10});
        }).then(function(response){
            //console.log("successful transaction");
            assert.isTrue(true);
        }).catch(function(result){
            //console.log("caught the exception");
            assert.isTrue(false);
        });
    });
  
    it("should return 10 since we just donated 10 ether to contract", function() {
        return firstContract.deployed().then(function(instance) {
            return instance.checkBalance.call();
        }).then(function(balance){
            assert.equal(balance, 10, balance+" should be 10");
        });
    });

      //////////////////////////////////
     // TEST FOR MAPPINGS AND VOTING //
    //////////////////////////////////

    it("should return 0 since no votes have been cast (accounts[0])", function() {
        return firstContract.deployed().then(function(instance) {
            return instance.getNumberOfVotes.call(accounts[0]);
        }).then(function(numberOfVotes){
            assert.equal(numberOfVotes, 0, numberOfVotes+" should be 0");
        });
    });

    it("should return 1 we have cast one vote accounts[0]", function() {
        return firstContract.deployed().then(function(instance) {
            instance.castVote(accounts[0]);
            return instance.getNumberOfVotes.call(accounts[0]);
        }).then(function(numberOfVotes){
            assert.equal(numberOfVotes, 1, numberOfVotes+" should be 1");
        });
    });

    it("should return 0 since no votes have been cast (accounts[1])", function() {
        return firstContract.deployed().then(function(instance) {
            return instance.getNumberOfVotes.call(accounts[1]);
        }).then(function(numberOfVotes){
            assert.equal(numberOfVotes, 0, numberOfVotes+" should be 0");
        });
    });


      /////////////////////////////////
     // tests for owner of contract //
    /////////////////////////////////
  
    it("should return the owner address of the contract and check that it's equal to accounts[0]", function() {
        return firstContract.deployed().then(function(instance) {
            return instance.getOwner.call();
        }).then(function(owner){
            assert.equal(owner, accounts[0],"owner is NOT accounts[0]");
        });
    });

    it("should return the owner address of the contract and check that it's NOT equal to accounts[1]", function() {
        return firstContract.deployed().then(function(instance) {
            return instance.getOwner.call();
        }).then(function(owner){
            assert.notEqual(owner, accounts[1],"owner is IS accounts[1] ??? WTF ???");
        });
    });

      //////////////////////
     // test for strings //
    //////////////////////

    it("should call the getPublicMessage function which returns 'this is a public message'", function() {  
        return firstContract.deployed().then(function(instance) {
            return instance.getPublicMessage.call();
        }).then(function(message){
            assert.equal(message, "this is a public message", message + " not equal to 'this is a public message'");
        });
    });

    it("should call the getInternalMessage function which returns 'this is an internal message'", function() {  
        return firstContract.deployed().then(function(instance) {
            return instance.getInternalMessage.call();
        }).then(function(message){
            assert.equal(message, "this is an internal message", message + " not equal to 'this is an internal message'");
        });
    });

    it("should call the getPrivateMessage function which returns 'this is a private message'", function() {  
        return firstContract.deployed().then(function(instance) {
            return instance.getPrivateMessage.call();
        }).then(function(message){
            assert.equal(message, "this is a private message", message + " not equal to 'this is a private message'");
        });
    });

      //////////////////////
     // test for numbers //
    //////////////////////

    it("should add two numbers and return the sum", function() {
        var x = 5;
        var y = 4;
        return firstContract.deployed().then(function(instance) {
            return instance.addition.call(x, y);
        }).then(function(sum){
            assert.equal(sum, x+y, "x="+x+" y="+y+" sum="+sum+" but should be "+x+y);
        });
    });

    it("should subtract one number from another, and return the difference", function() {
        var x = 5;
        var y = 4;
        return firstContract.deployed().then(function(instance) {
            return instance.subtraction.call(x, y);
        }).then(function(difference){
            assert.equal(difference, x-y, "x="+x+" y="+y+" difference="+difference+" but should be "+(x-y));
        });
    });

    it("should multiply two numbers and return the product", function() {
        var x = 5;
        var y = 4;
        return firstContract.deployed().then(function(instance) {
            return instance.multiply.call(x, y);
        }).then(function(product){
            assert.equal(product, x*y, "x="+x+" y="+y+" product="+product+" but should be "+x*y);
        });
    });

    it("should multiply two numbers (one being negative) and return the product", function() {
        var x = -5;
        var y = 4;
        return firstContract.deployed().then(function(instance) {
            return instance.multiply.call(x, y);
        }).then(function(product){
            assert.equal(product, x*y, "x="+x+" y="+y+" product="+product+" but should be "+x*y);
        });
    });

      ///////////////////////////////////////////////////
     // tests for function modifiers and selfdestruct //
    ///////////////////////////////////////////////////

    it("should NOT be able to call selfdestruct on contract", function() {
        return firstContract.deployed().then(function(instance) {
            return instance.kill({ from: accounts[1] });
        }).then(function(result){
            //console.log("contract was destroyed");
            assert.isTrue(false);
        }).catch(function(result){
            //console.log("caught the exception");
            assert.isTrue(true);
        });
    });

    it("should call selfdestruct on contract", function() {
        return firstContract.deployed().then(function(instance) {
            return instance.kill({ from: accounts[0] });
        }).then(function(result){
            //console.log("contract was destroyed");
            assert.isTrue(true);
        }).catch(function(result){
            //console.log("caught the exception");
            assert.isTrue(false);
        });
    });

    it("should NOT be able to call ANY functions (test with getpublicMessage) because contract is destroyed", function() {  
        return firstContract.deployed().then(function(instance) {
            return instance.getPublicMessage.call();
        }).then(function(result){
            //console.log("contract was NOT destroyed");
            assert.isTrue(false);
        }).catch(function(){
            //console.log("contract WAS destroyed - just as expected");
            assert.isTrue(true);
        });
    });

});