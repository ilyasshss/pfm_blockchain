pragma solidity >=0.4.22 <0.9.0;

contract Ex6 {
    uint[] public nombres;  // Declare a dynamic array of uint

    constructor() {
        nombres.push(1);
        nombres.push(2);
        nombres.push(3);
    }

    function ajouterNombre(uint _nombre) public {
        nombres.push(_nombre);
    }

    function getElement(uint index) public view returns (uint) {
        require(index < nombres.length, "Index does not exist");
        return nombres[index];
    }

    function afficheTableau() public view returns (uint[] memory) {
        return nombres;
    }

    function calculerSomme() public view returns (uint) {
        uint somme = 0;
        for (uint i = 0; i < nombres.length; i++) {
            somme += nombres[i];
        }
        return somme;
    }
}
