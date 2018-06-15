pragma solidity ^0.4.4;


contract firstContract {

    //owner of the contrct
    address private owner;

    //voting on users (addresses)
    mapping(address=>uint) private votes;

    //string messages of different visibility
    string public publicMessage = "this is a public message";
    string internal internalMessage = "this is an internal message";
    string private privateMessage = "this is a private message";
    /* state variables cannot be external
    string external message = "this is an external message";
    */

    //events for debugging (fireing events is one way to return info in transaction log)
    event killDebug(bool destroyed);

      ////////////////////
     // CONSTRUCTOR(S) //
    ////////////////////


    //  function firstContract() public {
    //    owner = msg.sender;
    //  }  

    constructor() public {    
        owner = msg.sender;
    }

    function getOwner() public view returns(address) {
        return owner;
    }

      ////////////////////////
     // CONTRACT MODIFIERS //
    ////////////////////////

    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only owner can call this function."
        );
        _;
    }

      ///////////////////////
     // RETURNING STRINGS //
    ///////////////////////

    function getPublicMessage() public view returns(string result) {
        return publicMessage;
    }

    function getInternalMessage() public view returns(string result) {
        return internalMessage;
    }

    function getPrivateMessage() public view returns(string result) {
        return privateMessage;
    }
  
      ////////////////////////
     // returning integers //
    ////////////////////////
  
    function addition(int256 x, int256 y) public pure returns(int256 result) {
        return x + y;
    }

    function subtraction(int256 x, int256 y) public pure returns(int256 result) {
        return x - y;
    }

    function multiply(int256 x, int256 y) public pure returns(int256 result) {
        return x * y;
    }

      /////////////////////////////////
     // PAYMENT AND ETHER TRANSFERS //
    /////////////////////////////////

    function donate() public payable returns(string) {
        return "thank you for your donation :)";
    }

    function checkBalance() public view returns(uint balance){
        return this.balance;
    }

      ///////////////////
     // MAPPING VOTES //
    ///////////////////

    function castVote(address user) public {
        votes[user] = getNumberOfVotes(user) + 1;
    }

    function getNumberOfVotes(address user) public view returns(uint) {
        return votes[user];
    }

      ////////////////////
     // KILL KILL KILL //
    ////////////////////

    function kill() public onlyOwner {
        emit killDebug(true);
        selfdestruct(owner);
    }

}
