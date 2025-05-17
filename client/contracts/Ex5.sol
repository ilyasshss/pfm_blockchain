pragma solidity >=0.4.22 <0.9.0;

contract Ex5 {
    function estPair(uint256 number) public pure returns (bool) {
        return number % 2 == 0;
    }
}
