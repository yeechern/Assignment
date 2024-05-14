// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./auctionManagement.sol";

contract BiddingSystem {
    AuctionManager auctionManager;

    constructor() {
        auctionManager = new AuctionManager();
    }

    event BidPlaced(uint productId, address bidder, uint amount);
    event BidWithdrawn(uint productId, address bidder, uint256 amount);

    modifier auctionExists(uint _productId) {
        AuctionManager.Product memory product = auctionManager.getProduct(_productId);
        require(product.id != 0, "Auction does not exist");
        _;
    }

    modifier auctionNotEnded(uint _productId) {
        AuctionManager.Product memory product = auctionManager.getProduct(_productId);
        require(product.status == AuctionManager.AuctionStatus.Active, "Auction has already ended or cancelled");
        _;
    }

    function placeBid(uint _productId, uint _value) public payable auctionExists(_productId) auctionNotEnded(_productId) {
        AuctionManager.Product memory product = auctionManager.getProduct(_productId);

        //Check the bid amount is greater than zero or not to prevent zero-value bids
        require(_value > 0, "Bid amount must be greater than zero");

        //Define and retrieve the highest bid as currentHighestBid
        uint256 currentHighestBid = product.highestBid;

        //Allow overbidding if the bidding is higher than the current highest bid
        require(_value > currentHighestBid, "Bid amount must be higher than current highest bid");

        //Refund the previous highest bidder
        payable(product.highestBidder).transfer(currentHighestBid);

        //Store the new values
        product.highestBid = _value;
        product.highestBidder = msg.sender;
        emit BidPlaced(_productId, msg.sender, _value);
    }

    function withdrawBid(uint _productId) public auctionExists(_productId) {
        //Assigns the stored value in the mapping auction at specified Id
       AuctionManager.Product memory product = auctionManager.getProduct(_productId);

        //Notify the person if the auction has ended and end the function
        require(product.status == AuctionManager.AuctionStatus.Active , "Auction has ended");

        //Check the person who call the function is the highest bidder or not
        require(msg.sender == product.highestBidder, "Only the highest bidder can withdraw their bid"); 

        //Assign the highest bid into withdrawAmount
        uint256 withdrawAmount = product.highestBid;
        require(withdrawAmount > 0, "There is no bid to withdraw");

        //Set the highest bid to zero to prevent re-entrancy attacks
        product.highestBid = 0;

        //Transfer the bid amount back to the bidder
        payable(msg.sender).transfer(withdrawAmount);

        //Emit event
        emit BidWithdrawn(_productId, msg.sender, withdrawAmount);
    }

    function getHighestBid(uint _productId) public view returns (uint) {
         //Assigns the stored value in the mapping auction at specified Id
        AuctionManager.Product memory product = auctionManager.getProduct(_productId);
        return product.highestBid;
    }

    function addProduct(uint _id, string memory _name, string memory _description, uint _startPrice, uint _startDate, uint _endDate) public {
        auctionManager.addProduct(_id, _name, _description, _startPrice, _startDate, _endDate);
    }

    function getFeaturedProductIds() public view returns (uint[] memory) {
        return auctionManager.getFeaturedProductIds();
    }
}