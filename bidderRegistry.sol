//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Membership.sol";
import "./Admin.sol";

contract BidderRegistry {
    //Define the roles
    enum Role {Bidder, Admin}

    //Instances of the imported contracts
    Membership public membershipContract;
    Admin public adminContract;

    struct Bidder {
        uint bidderId;
        string bidderName;
        string password;
        address bidder;
        Role role;
    }

    mapping(address => Bidder) public bidders;
    //Counter for generating bidder IDs
    uint public nextBidderId;

    event BidderRegistered(address bidder, uint bidderId, string bidderName, Role role);
    event AccountDetailsUpdated(address bidder, string bidderNewName);
    event BidderAccRemoved(address bidder);
    event AccRoleChanged(address bidder, Role role);

    constructor(address _membershipAddress, address _adminAddress) {
        membershipContract = Membership(_membershipAddress);
        adminContract = Admin(_adminAddress);
        //declare the starting bidderId
        nextBidderId = 100; 
    }

    //Function to check if the bidder is registered or not
    function isRegistered(address _bidder) public view returns (bool) {
        return bidders[_bidder].bidderId != 0;
    }

    //Function to register a new bidder account
    function registerBidderAcc(string memory _bidderName, string memory _password) public {
        require(!isRegistered(msg.sender), "Bidder already registered");


        //Register the bidder as a member
        membershipContract.registerMember();

        uint uniqueId = nextBidderId;

        Role defaultRole = Role.Bidder;

        bidders[msg.sender] = Bidder(uniqueId, _bidderName, _password, msg.sender, defaultRole);

        emit BidderRegistered(msg.sender, nextBidderId, _bidderName, defaultRole);

        nextBidderId++;

    }

    function loginBidderAcc(string memory _password) public view returns (bool) {
        require(isRegistered(msg.sender), "Bidder not registered");

        return keccak256(abi.encodePacked(bidders[msg.sender].password)) == keccak256(abi.encodePacked(_password));
    }

    //Function to update the bidder's account
    function updateAccDetails(address _bidder, string memory _bidderNewName) public {
        require(isRegistered(_bidder), "Bidder not registered");

        bidders[_bidder].bidderName = _bidderNewName;

        emit AccountDetailsUpdated(_bidder, _bidderNewName);
    }

    function changeAccRole(address _bidder) public {
        require(isRegistered(_bidder), "Bidder not registered");

        require(adminContract.isAdmin(msg.sender), "Only admins can perform this action");

        if (bidders[_bidder].role == Role.Admin) {
            bidders[_bidder].role = Role.Bidder;
        } else {
            bidders[_bidder].role = Role.Admin;
        }

        emit AccRoleChanged(_bidder, bidders[_bidder].role);
    }

    function deleteBidderAcc(address _bidder) public {
        require(isRegistered(_bidder), "Bidder not registered");

        if (membershipContract.isMember(_bidder) == true) {
            membershipContract.removeMember(_bidder);
        } else {
            adminContract.removeAdmin(_bidder);
        }

        emit BidderAccRemoved(_bidder);

        delete bidders[_bidder];
    }

    function isNormalMember() public view returns (bool) {
        return membershipContract.isMember(msg.sender);
    }

    function isAdmin() public view returns (bool) {
        return adminContract.isAdmin(msg.sender);
    }
}