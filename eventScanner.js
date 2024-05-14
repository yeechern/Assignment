const Web3 = require('web3'); // if not found, run terminator and type 'npm install web3'

// Connect to your Ethereum node
const web3 = new Web3(new Web3.providers.WebsocketProvider('http://127.0.0.1:7545'));

// The ABI for your contract 
const contractABIs = {
	biddingSystem: [
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "productId",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "address",
					"name": "bidder",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "BidPlaced",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "productId",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "address",
					"name": "bidder",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "BidWithdrawn",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_id",
					"type": "uint256"
				},
				{
					"internalType": "string",
					"name": "_name",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_description",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "_startPrice",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_startDate",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_endDate",
					"type": "uint256"
				}
			],
			"name": "addProduct",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getFeaturedProductIds",
			"outputs": [
				{
					"internalType": "uint256[]",
					"name": "",
					"type": "uint256[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_productId",
					"type": "uint256"
				}
			],
			"name": "getHighestBid",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_productId",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_value",
					"type": "uint256"
				}
			],
			"name": "placeBid",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_productId",
					"type": "uint256"
				}
			],
			"name": "withdrawBid",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	],
	bidderRegistry: [
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_membershipAddress",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_adminAddress",
					"type": "address"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "bidder",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "enum BidderRegistry.Role",
					"name": "role",
					"type": "uint8"
				}
			],
			"name": "AccRoleChanged",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "bidder",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "string",
					"name": "bidderNewName",
					"type": "string"
				}
			],
			"name": "AccountDetailsUpdated",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "bidder",
					"type": "address"
				}
			],
			"name": "BidderAccRemoved",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "bidder",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "bidderId",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "string",
					"name": "bidderName",
					"type": "string"
				},
				{
					"indexed": false,
					"internalType": "enum BidderRegistry.Role",
					"name": "role",
					"type": "uint8"
				}
			],
			"name": "BidderRegistered",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "adminContract",
			"outputs": [
				{
					"internalType": "contract Admin",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "bidders",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "bidderId",
					"type": "uint256"
				},
				{
					"internalType": "string",
					"name": "bidderName",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "password",
					"type": "string"
				},
				{
					"internalType": "address",
					"name": "bidder",
					"type": "address"
				},
				{
					"internalType": "enum BidderRegistry.Role",
					"name": "role",
					"type": "uint8"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_bidder",
					"type": "address"
				}
			],
			"name": "changeAccRole",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_bidder",
					"type": "address"
				}
			],
			"name": "deleteBidderAcc",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "isAdmin",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "isNormalMember",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_bidder",
					"type": "address"
				}
			],
			"name": "isRegistered",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_password",
					"type": "string"
				}
			],
			"name": "loginBidderAcc",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "membershipContract",
			"outputs": [
				{
					"internalType": "contract Membership",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "nextBidderId",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_bidderName",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_password",
					"type": "string"
				}
			],
			"name": "registerBidderAcc",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_bidder",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "_bidderNewName",
					"type": "string"
				}
			],
			"name": "updateAccDetails",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	],
	auctionManagement: [
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "string",
					"name": "name",
					"type": "string"
				},
				{
					"indexed": false,
					"internalType": "string",
					"name": "description",
					"type": "string"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "startPrice",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "startDate",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "endDate",
					"type": "uint256"
				}
			],
			"name": "ProductAdded",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_id",
					"type": "uint256"
				},
				{
					"internalType": "string",
					"name": "_name",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_description",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "_startPrice",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_startDate",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_endDate",
					"type": "uint256"
				}
			],
			"name": "addProduct",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_productId",
					"type": "uint256"
				}
			],
			"name": "cancelAuction",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_productId",
					"type": "uint256"
				}
			],
			"name": "endAuction",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "featuredProductIds",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getFeaturedProductIds",
			"outputs": [
				{
					"internalType": "uint256[]",
					"name": "",
					"type": "uint256[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_productId",
					"type": "uint256"
				}
			],
			"name": "getProduct",
			"outputs": [
				{
					"components": [
						{
							"internalType": "uint256",
							"name": "id",
							"type": "uint256"
						},
						{
							"internalType": "string",
							"name": "name",
							"type": "string"
						},
						{
							"internalType": "string",
							"name": "description",
							"type": "string"
						},
						{
							"internalType": "uint256",
							"name": "startPrice",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "startDate",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "endDate",
							"type": "uint256"
						},
						{
							"internalType": "address",
							"name": "highestBidder",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "highestBid",
							"type": "uint256"
						},
						{
							"internalType": "enum AuctionManager.AuctionStatus",
							"name": "status",
							"type": "uint8"
						}
					],
					"internalType": "struct AuctionManager.Product",
					"name": "",
					"type": "tuple"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "products",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				},
				{
					"internalType": "string",
					"name": "name",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "description",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "startPrice",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "startDate",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "endDate",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "highestBidder",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "highestBid",
					"type": "uint256"
				},
				{
					"internalType": "enum AuctionManager.AuctionStatus",
					"name": "status",
					"type": "uint8"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	],
	Admin: [
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "admin",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "bool",
					"name": "isAdmin",
					"type": "bool"
				}
			],
			"name": "AdminStatusChanged",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_address",
					"type": "address"
				}
			],
			"name": "addAdmin",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "admins",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_address",
					"type": "address"
				}
			],
			"name": "isAdmin",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_address",
					"type": "address"
				}
			],
			"name": "removeAdmin",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	],
	Membership: [
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "member",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "bool",
					"name": "isMember",
					"type": "bool"
				}
			],
			"name": "MemberStatusChanged",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_address",
					"type": "address"
				}
			],
			"name": "addMember",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_address",
					"type": "address"
				}
			],
			"name": "isMember",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "members",
			"outputs": [
				{
					"internalType": "bool",
					"name": "exists",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "registerMember",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_address",
					"type": "address"
				}
			],
			"name": "removeMember",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	]

};

// The address of your deployed contract
const contractAddresses = {
	biddingSystem: '0x7023699711C2a0C764733d11a06BfB0767ed853e',
	bidderRegistry: '0x54b2511650B5aCB42391AF907b5892e26051b0E8',
	auctionManagement: '0xb26BF3502780aEc4EC58Cdb31Ca93BdB9670efbE',
	Admin: '0x2511ad7aB001a04217BB7B87513fea9dE6992b68',
	Membership: '0x3Be3df458BE93c6016150169bb4Feda788592A2c'

};

// Create a contract instance
const biddingSystemContract = new web3.eth.Contract(contractABIs.biddingSystem, contractAddresses.biddingSystem);
const bidderRegistryContract = new web3.eth.Contract(contractABIs.bidderRegistry, contractAddresses.bidderRegistry);
const auctionManagementContract = new web3.eth.Contract(contractABIs.auctionManagement, contractAddresses.auctionManagement);
const AdminContract = new web3.eth.Contract(contractABIs.Admin, contractAddresses.Admin);
const MembershipContract = new web3.eth.Contract(contractABIs.Membership, contractAddresses.Membership);

// Event listener for NewAuction
/*biddingSystemContract.events.NewAuction({
    fromBlock: 'latest'
}, function(error, event) {
    if (error) {
        console.error('Error on NewAuction event:', error);
    } else {
        console.log('New Auction Created:', event.returnValues);
    }
});*/

// Event listener for BidPlaced
biddingSystemContract.events.BidPlaced({
    fromBlock: 'latest'
}, function(error, event) {
    if (error) {
        console.error('Error on BidPlaced event:', error);
    } else {
        console.log('New Bid Placed:', event.returnValues);
    }
});

// Event listener for AuctionEnded
/*biddingSystemContract.events.AuctionEnded({
    fromBlock: 'latest'
}, function(error, event) {
    if (error) {
        console.error('Error on AuctionEnded event:', error);
    } else {
        console.log('Auction Ended:', event.returnValues);
    }
});*/

// Event listener for BidWithdrawn
biddingSystemContract.events.BidWithdrawn({
    fromBlock: 'latest'
}, function(error, event) {
    if (error) {
        console.error('Error on BidWithdrawn event:', error);
    } else {
        console.log('Bid Withdrawn:', event.returnValues);
    }
});

bidderRegistryContract.events.BidderRegistered({
	fromBlock: 'latest'
}, function(error, event) {
	if(error) {
		console.error('Error on BidderRegistered event:', error);
	} else {
		console.log('Bidder Registered:', event.returnValues);
	}
});

bidderRegistryContract.events.AccountDetailsUpdated({
	fromBlock: 'latest'
}, function(error, event) {
	if(error) {
		console.error('Error on AccountDetailsUpdated event:', error);
	} else {
		console.log('Account Details Updated:', event.returnValues);
	}
});

bidderRegistryContract.events.BidderAccRemoved({
	fromBlock: 'latest'
}, function(error, event) {
	if(error) {
		console.error('Error on BidderAccRemoved:', error);
	} else {
		console.log('Bidder Account Removed:', event.returnValues);
	}
});

bidderRegistryContract.events.AccRoleChanged({
	fromBlock: 'latest'
}, function(error, event) {
	if(error) {
		console.error('Error on AccRoleChanged event:', error);
	} else {
		console.log('Account Role Changed:', event.returnValues);
	}
});

auctionManagementContract.events.ProductAdded({
	fromBlock: 'latest'
}, function(error, event) {
	if(error) {
		console.error('Error on ProductAdded event:', error);
	} else {
		console.log('Product Added:', event.returnValues);
	}
});

/*auctionManagementContract.events.AuctionCancelled({
	fromBlock: 'latest'
}, function(error, event) {
	if(error) {
		console.error('Error on AuctionCancelled event:', error);
	} else {
		console.log('Auction Cancelled:', event.returnValues);
	}
});

auctionManagementContract.events.AuctionExtended({
	fromBlock: 'latest'
}, function(error, event) {
	if(error) {
		console.error('Error on AuctionExtended event:', error);
	} else {
		console.log('Auction Extended:', event.returnValues);
	}
});

auctionManagementContract.events.AuctionEnded({
	fromBlock: 'latest'
}, function(error, event) {
	if(error) {
		console.error('Error on AuctionEnded event:', error);
	} else {
		console.log('Auction Ended:', event.returnValues);
	}
});

auctionManagementContract.events.BidRefunded({
	fromBlock: 'latest'
}, function(error, event) {
	if(error) {
		console.error('Error on BidRefunded event:', error);
	} else {
		console.log('Bid Refunded:', event.returnValues);
	}
});*/

AdminContract.events.AdminStatusChanged({
	fromBlock: 'latest'
}, function(error, event) {
	if(error) {
		console.error('Error on AdminStatusChanged event:', error);
	} else {
		console.log('Admin Status Changed:', event.returnValues);
	}
});

MembershipContract.events.MembershipStatusChanged({
	fromBlock: 'latest'
}, function(error, event) {
	if(error) {
		console.error('Error on MembershipStatusChanged event:', error);
	} else {
		console.log('Membership Status Changed:', event.returnValues);
	}
});


// Handle disconnections
web3.currentProvider.on('end', e => {
    console.log('WebSocket disconnected!');
    // Reconnect logic here
});

