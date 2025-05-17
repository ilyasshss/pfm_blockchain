pragma solidity >=0.4.22 <0.9.0;

contract Ex3 {
    string public message;

    constructor() public {
        message = "Welcome to Solidity!";  // Default message
    }

    function setMessage(string memory _message) public {
        message = _message;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }

    function concatener(string memory a, string memory b) public pure returns (string memory) {
        return string(abi.encodePacked(a, b));
    }

    function concatenerAvec(string memory newMessage) public view returns (string memory) {
        return string(abi.encodePacked(message, newMessage));
    }

    function longueur() public view returns (uint) {
        return bytes(message).length;
    }

    function comparer(string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b)));
    }
}
