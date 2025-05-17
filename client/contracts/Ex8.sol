pragma solidity >=0.4.22 <0.9.0;

contract Ex8 {
    address public recipient;

    constructor(address _recipient) {
        recipient = _recipient;
    }

    receive() external payable {
        require(msg.value > 0, "Payment must be greater than 0");
    }

    function withdraw() public {
        require(msg.sender == recipient, "Only the recipient can withdraw the funds");
        payable(recipient).transfer(address(this).balance);
    }
}
