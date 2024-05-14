// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AuctionManager {
    //Define the auction status
    enum AuctionStatus {Active, Ended, Canceled}

    //The attribute related to Auction
    struct Product {
        uint id;
        string name;
        string description;
        uint startPrice;
        uint startDate;
        uint endDate;
        address highestBidder;
        uint highestBid;
        AuctionStatus status;
    }

    mapping(uint => Product) public products;

    uint[] public featuredProductIds;

    event ProductAdded(uint id, string name, string description, uint startPrice, uint startDate, uint endDate);

    constructor() {

    }

    //Function to add a product
    function addProduct(uint _id, string memory _name, string memory _description, uint _startPrice, uint _startDate, uint _endDate) public {
        //Check if product with this ID already exists
        require(products[_id].id == 0, "Product with this ID already exists");

        //Create a new product
        Product memory newProduct = Product(_id, _name, _description, _startPrice, _startDate, _endDate, address(0), 0, AuctionStatus.Active);

        //Store the product in mapping
        products[_id] = newProduct;

        //Add ID to the array
        featuredProductIds.push(_id);

        //Emit event
        emit ProductAdded(_id, _name, _description, _startPrice, _startDate, _endDate);
    }

    //Function to cancel
    function cancelAuction(uint _productId) public {
        //Retrieve the product by ID
        Product storage product = products[_productId];

        //Update the status
        product.status = AuctionStatus.Canceled;
    }

    function endAuction(uint _productId) public {
        //Retrieve the product by ID
        Product storage product = products[_productId];

        //Check if end time has passed
        require(block.timestamp >= product.endDate, "Auction end time has not passed yet");

        //Update the status
        product.status = AuctionStatus.Ended;
    }

    function getProduct(uint _productId) public view returns (Product memory) {
        return products[_productId];
    }

    function getFeaturedProductIds() public view returns (uint[] memory) {
        return featuredProductIds;
    }
}