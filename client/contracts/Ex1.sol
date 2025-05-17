// Ex1.sol
pragma solidity >=0.4.22 <0.9.0;

contract Ex1 {
    uint256 public num1;
    uint256 public num2;

    // Constructor that initializes num1 and num2
    constructor(uint256 _num1, uint256 _num2) {
        num1 = _num1;
        num2 = _num2;
    }

    // View function to calculate sum
    function addition1() public view returns (uint256) {
        return num1 + num2;
    }

    // Pure function to calculate sum
    function addition2(uint256 _num1, uint256 _num2) public pure returns (uint256) {
        return _num1 + _num2;
    }
}
