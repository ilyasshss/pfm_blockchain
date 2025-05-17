pragma solidity >=0.4.22 <0.9.0;

abstract contract Forme {
    uint public x;
    uint public y;

    constructor(uint _x, uint _y) {
        x = _x;
        y = _y;
    }

    function deplacerForme(uint dx, uint dy) public {
        x += dx;
        y += dy;
    }

    function afficheXY() public view returns (uint, uint) {
        return (x, y);
    }

    function afficheInfos() public virtual view returns (string memory);

    function surface() public virtual view returns (uint);
}

contract Ex7 is Forme {
    uint public lo;  // Length of the rectangle
    uint public la;  // Width of the rectangle

    constructor(uint _x, uint _y, uint _lo, uint _la) Forme(_x, _y) {
        lo = _lo;
        la = _la;
    }

    function afficheInfos() public override view returns (string memory) {
        return "Je suis Rectangle";
    }

    function surface() public override view returns (uint) {
        return lo * la;
    }

    function afficheLoLa() public view returns (uint, uint) {
        return (lo, la);
    }
}
