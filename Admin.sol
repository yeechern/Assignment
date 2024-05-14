//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Admin {
    // Mapping to store admin status
    mapping(address => bool) public admins;

    // Owner of the contract
    address public owner;

    // Event to log admin status changes
    event AdminStatusChanged(address indexed admin, bool isAdmin);

    // Modifier to restrict access to admins
    modifier onlyAdmin() {
        require(admins[msg.sender], "Only admins can perform this action");
        _;
    }

    // Modifier to restrict access to the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can perform this action");
        _;
    }

    // Constructor to set the owner
    constructor() {
        owner = msg.sender;
    }

    // Function to add a new admin
    function addAdmin(address _address) public onlyOwner {
        require(!admins[_address], "Address is already an admin");
        admins[_address] = true;
        emit AdminStatusChanged(_address, true);
    }

    // Function to remove an admin
    function removeAdmin(address _address) public onlyOwner {
        require(admins[_address], "Address is not an admin");
        admins[_address] = false;
        emit AdminStatusChanged(_address, false);
    }

    function isAdmin(address _address) public view returns (bool) {
        return admins[_address];
    }
}
