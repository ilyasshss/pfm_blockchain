pragma solidity >=0.4.22 <0.9.0;

contract Ex2 {

    function etherEnWei(uint amountEther) public pure returns (uint) {
        return amountEther * 1 ether;
    }

    function weiEnEther(uint amountWei) public pure returns (uint) {
        return amountWei / 1 ether;
    }
}
