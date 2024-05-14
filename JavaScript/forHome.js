// Function to fetch JSON data and filter products by keywords
function fetchAndFilterFeaturedProducts(keywords) {
    // Mock JSON data (replace this with actual API call)
    const jsonData = {
        "featured_products": [
            {
                "id": 1,
                "name": "Smartphone X",
                "description": "The latest flagship smartphone with advanced features.",
                "price": 10,
                "deadline": getDeadlineDate(1),
                "image": "./Pictures/smartphone_x.jpg"
            },
            {
                "id": 2,
                "name": "Designer Watch",
                "description": "Luxury watch crafted with precision and elegance.",
                "price": 8,
                "deadline": getDeadlineDate(2),
                "image": "./Pictures/designer_watch.jpg"
            },
            {
                "id": 3,
                "name": "Vintage Camera",
                "description": "Classic camera from the 1960s, perfect for photography enthusiasts.",
                "price": 6,
                "deadline": getDeadlineDate(3),
                "image": "./Pictures/vintage_camera.jpg"
            },
            {
                "id": 4,
                "name": "Gaming Console",
                "description": "Next-gen gaming console with immersive gaming experience.",
                "price": 5,
                "deadline": getDeadlineDate(0),
                "image": "./Pictures/gaming_console.jpg"
            },
            
            {
                "id": 5,
                "name": "Wireless Headphones",
                "description": "High-quality wireless headphones for immersive music experience.",
                "price": 3,
                "deadline": getDeadlineDate(3),
                "image": "./Pictures/wireless_headphones.jpg"
              },
              {
                "id": 6,
                "name": "Fitness Tracker",
                "description": "Track your daily activities and fitness goals with this smart fitness tracker.",
                "price": 0.7,
                "deadline": getDeadlineDate(4),
                "image": "./Pictures/fitness_tracker.jpg"
              },
              {
                "id": 7,
                "name": "Portable Bluetooth Speaker",
                "description": "Compact and portable Bluetooth speaker for on-the-go music.",
                "price": 0.4,
                "deadline": getDeadlineDate(5),
                "image": "./Pictures/bluetooth_speaker.jpg"
              },
              {
                "id": 8,
                "name": "Electric Toothbrush",
                "description": "Advanced electric toothbrush for superior dental care.",
                "price": 0.5,
                "deadline": getDeadlineDate(6),
                "image": "./Pictures/electric_toothbrush.jpg"
              }
        ]
    };

    // Access the featured products array
    const featuredProducts = jsonData.featured_products;

    // Get the current time
    const currentTime = new Date().getTime();

    // Get the container element to append products
    const container = document.getElementById("featured_products_list");

    // Clear previous product listings
    container.innerHTML = "";

    // Loop through each product and filter by keywords
    featuredProducts.forEach(product => {
        // Check if product name or description contains keywords
        if (product.name.toLowerCase().includes(keywords.toLowerCase()) || 
            product.description.toLowerCase().includes(keywords.toLowerCase())) {
            
            // Parse deadline date
            const deadlineTime = new Date(product.deadline).getTime();
            
            // Create a div element for each product
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");

            // Create image element
            const img = document.createElement("img");
            img.src = product.image;
            img.alt = product.name;
            productDiv.appendChild(img);

            // Create heading element for product name
            const heading = document.createElement("h3");
            heading.textContent = product.name;
            productDiv.appendChild(heading);

            // Create paragraph element for product description
            const description = document.createElement("p");
            description.textContent = product.description;
            productDiv.appendChild(description);

            const highestBid = getHighestBid(product.id);

            // Create paragraph element for product price
            const price = document.createElement("p");
            if(highestBid > product.price) {
                price.textContent = "Current Highest Bid: ETH " + highestBid;
            }else {
                price.textContent = "Starting Price: ETH " + product.price;
            }
            //price.textContent = "Min Bidding Amount: ETH " + product.price;
            productDiv.appendChild(price);

            // Create paragraph element for time left
            const timeLeft = document.createElement("p");
            const timeRemaining = calculateTimeRemaining(deadlineTime);
            timeLeft.textContent = "Time Left: " + timeRemaining;
            productDiv.appendChild(timeLeft);

            // Create "Place Bid" button
            const buttonPlaceBid = document.createElement("button");
            buttonPlaceBid.textContent = "Place Bid";
            buttonPlaceBid.classList.add("bid-button");

            // Event listener for bid button click
            buttonPlaceBid.addEventListener("click", () => {
                // Call a function to handle bid placement for this product
                handleBidPlacement(product.id);
            });

            // Append "Place Bid" button to the product container
            productDiv.appendChild(buttonPlaceBid);

            // Append product div to the container
            container.appendChild(productDiv);

            //Create "Withdraw Bid" button
            const buttonWithdrawBid = document.createElement("button");
            buttonWithdrawBid.textContent = "Withdraw Bid";
            buttonWithdrawBid.classList.add("bid-button2");

            //Event listener for withdraw bid button click
            buttonWithdrawBid.addEventListener("click", () => {
                //Call the function to handle withdraw bid for this product
                handleBidWithdrawal(product.id);
            });

            // Append "Withdraw Bid" button to the product container
            productDiv.appendChild(buttonWithdrawBid);

            // Append product div to the container
            container.appendChild(productDiv);
        }
    });

    // If no products match the filter, display a message
    if (container.children.length === 0) {
        container.innerHTML = "<p>No products found matching the search criteria.</p>";
    }
}

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

};

const contractAddresses = {
    biddingSystem: '0x7023699711C2a0C764733d11a06BfB0767ed853e',
	bidderRegistry: '0x54b2511650B5aCB42391AF907b5892e26051b0E8',
};

const web3 = new Web3(window.ethereum);

const bidderRegistryContract = new web3.eth.Contract(contractABIs.bidderRegistry, contractAddresses.bidderRegistry);
const biddingSystemContract = new web3.eth.Contract(contractABIs.biddingSystem, contractAddresses.biddingSystem);

// Function to calculate time remaining until a deadline
function calculateTimeRemaining(deadline) {
    const currentTime = new Date().getTime();
    const timeDiff = deadline - currentTime;

    if (timeDiff <= 0) {
        return "End Bid";
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return days + "d " + hours + "h " + minutes + "m " + seconds + "s";
}

// Function to get deadline date
function getDeadlineDate(days) {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + days); // Add days to current date
    return deadline.toISOString(); // Return deadline date in ISO format
}

// Function to handle bid placement for a specific product
async function handleBidPlacement(productId) {
	const bidAmount = prompt("Enter the bid amount: ");
    try {
        await biddingSystemContract.methods.placeBid(productId, bidAmount).send({
            from: account, //user's address
            value: bidAmount //amount of ether to bid
        });
        console.log("Bid place successfully: ", bidAmount);
    } catch(error) {
        console.error("Error placing bid: ", error);
    }
}

async function getHighestBid(productId) {
    try {
        const currentHighestBid = await biddingSystemContract.methods.getHighestBid(productId).call();
        return currentHighestBid;
    } catch(error) {
        console.error("Error fetching highest bid: ", error);
        return 0;
    }
}

async function handleBidWithdrawal(productId) {
    try {
        await biddingSystemContract.methods.withdrawBid(productId).send({ from: account });
        alert("Withdraw Bid successful!");
    } catch(error){
        console.error("Error withdraw bid: ", error);
        alert("Withdraw bid failed. Please try again.");
    }
}

// Function to handle search form submission
function handleSearch(event) {
    event.preventDefault(); // Prevent form submission

    // Get the value entered in the search input field
    const keywords = document.getElementById("search_input").value.trim();

    // Call the function to fetch and filter featured products
    fetchAndFilterFeaturedProducts(keywords);
}

// Event listener for search form submission
document.getElementById("search_form").addEventListener("submit", handleSearch);

// Call the function initially to display all featured products
fetchAndFilterFeaturedProducts("");