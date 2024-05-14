//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Membership{
    // Structure to represent a member
    struct Member {
        bool exists;
        //uint256 expirationDate;
    }

    // Mapping to store members
    mapping(address => Member) public members;

    // Owner of the contract
    address public owner;

    // Event to log membership status changes
    event MemberStatusChanged(address indexed member, bool isMember); //, uint256 expirationDate

    // Modifier to restrict access to the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can perform this action");
        _;
    }

    // Constructor to set the owner
    constructor() {
        owner = msg.sender;
    }

    // Function to register a new member
    function registerMember() public { //uint256 durationInDays
        //require(durationInDays > 0, "Duration should be greater than 0");
        members[msg.sender].exists = true; //Member(true, block.timestamp + durationInDays * 1 days);
        emit MemberStatusChanged(msg.sender, true); //, block.timestamp + durationInDays * 1 days
    }

    // Function to check if an address is a member
    function isMember(address _address) public view returns (bool) {
        return members[_address].exists; //&& (members[_address].expirationDate > block.timestamp);
    }

    // Function to add a member by the owner
    function addMember(address _address) public onlyOwner { //, uint256 durationInDays
        require(!isMember(_address), "Address is already a member");
        members[_address].exists = true; //Member(true, block.timestamp + durationInDays * 1 days);
        emit MemberStatusChanged(_address, true); //, block.timestamp + durationInDays * 1 days
    }

    // Function to remove a member by the owner
    function removeMember(address _address) public onlyOwner {
        require(isMember(_address), "Address is not a member");
        delete members[_address];
        emit MemberStatusChanged(_address, false); //, 0
    }
}
