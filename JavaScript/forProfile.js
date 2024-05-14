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

            addProduct(product.id, product.name, product.description, product.price, deadlineTime);
            
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

            // Create paragraph element for product price
            const price = document.createElement("p");
            price.textContent = "Min Bidding Amount: ETH " + product.price;
            productDiv.appendChild(price);

            // Create paragraph element for time left
            const timeLeft = document.createElement("p");
            const timeRemaining = calculateTimeRemaining(deadlineTime);
            timeLeft.textContent = "Time Left: " + timeRemaining;
            productDiv.appendChild(timeLeft);

            // Create "Edit" button
            const buttonEdit = document.createElement("button");
            buttonEdit.textContent = "Edit";
            buttonEdit.classList.add("redButton");

            // Event listener for edit button click
            buttonEdit.addEventListener("click", () => {
                // Call a function to handle editing for this product
                handleEditProduct(product);
            });

            // Append "Edit" button to the product container
            productDiv.appendChild(buttonEdit);

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
function handleBidPlacement(product) {
    // Implement bid placement logic here...
    console.log("Placing bid for product:", product);
}

// Function to handle adding a new product
function handleAddProduct() {
    // Create a form for adding the product
    const form = document.createElement("form");
    form.classList.add("form-container");
    form.innerHTML = `
    <h2>Add Product</h2>
    <label for="add_name">Name:</label>
    <input type="text" id="add_name" required><br>

    <label for="add_description">Description:</label>
    <textarea id="add_description" required></textarea><br>

    <label for="add_price">Price:</label>
    <input type="number" id="add_price" required><br>

    <label for="add_deadline">Deadline:</label>
    <input type="datetime-local" id="add_deadline"><br>    

    <label for="add_image">Image URL:</label>
    <input type="text" id="add_image" required><br>

    <button type="greenButton" id="add_product_btn">Add Product</button>
    `;

    // Add event listener for the form submission
    form.addEventListener("redButton", event => {
        event.preventDefault(); // Prevent form submission
        
        // Get the values entered in the form fields
        const newName = document.getElementById("add_name").value.trim();
        const newDescription = document.getElementById("add_description").value.trim();
        const newPrice = parseFloat(document.getElementById("add_price").value.trim());
        const newDeadline = document.getElementById("add_deadline").value.trim();
        const newImage = document.getElementById("add_image").value.trim();

        // Create a new product object
        const newProduct = {
            "name": newName,
            "description": newDescription,
            "price": newPrice,
            "deadline": newDeadline,
            "image": newImage
        };

        // Add the new product to the featured products array
        jsonData.featured_products.push(newProduct);

        // Log the updated jsonData
        console.log("Updated jsonData:", jsonData);

        // Clear the form fields
        form.reset();

        // Optionally, you can update the UI to display the newly added product
        
        // Close the form
        form.remove();
    });

    // Append the form to the document body or a specific container
    document.body.appendChild(form);
}

// Event listener for the "Add Product" button
document.getElementById("add_product_button").addEventListener("click", handleAddProduct);


// Function to handle editing a product
function handleEditProduct(product) {
    // Create a form for editing the product
    const form = document.createElement("form");
    form.classList.add("form-container");
    form.innerHTML = `
    <h2>Edit Product</h2>
    <label for="edit_name">Name:</label>
    <input type="text" id="edit_name" value="${product.name}" required><br>

    <label for="edit_description">Description:</label>
    <textarea id="edit_description" required>${product.description}</textarea><br>

    <label for="edit_price">Price:</label>
    <input type="number" id="edit_price" value="${product.price}" required><br>

    <label for="edit_deadline">Deadline:</label>
    <input type="datetime-local" id="edit_deadline" value="${product.deadline}"><br>    

    <label for="edit_image">Image URL:</label>
    <input type="text" id="edit_image" value="${product.image}" required><br>

    <button type="greenButton" id="save_changes_btn">Save Changes</button>
    `;

    // Add event listener for the save button
    const saveButton = form.querySelector("#save_changes_btn");

    // Event listener for form submission
    saveButton.addEventListener("click", event => {
        
        // Get the updated values from the input fields
        const newName = document.getElementById("edit_name").value.trim();
        const newDescription = document.getElementById("edit_description").value.trim();
        const newPrice = parseFloat(document.getElementById("edit_price").value.trim());
        const newDeadline = document.getElementById("edit_deadline").value.trim();
        const newImage = document.getElementById("edit_image").value.trim();

        // Update the product information
        product.name = newName;
        product.description = newDescription;
        product.price = newPrice;
        product.deadline = newDeadline;
        product.image = newImage;

        // Log the updated product information
        console.log("Updated product:", product);

        // Remove the edit form from the DOM
        form.remove();
    });

    // Append the form to the document body or a specific container
    document.body.appendChild(form);

}

// Function to handle search form submission
function handleSearch(event) {
    event.preventDefault(); // Prevent form submission

    // Get the value entered in the search input field
    const keywords = document.getElementById("search_input").value.trim();

    // Call the function to fetch and filter featured products
    fetchAndFilterFeaturedProducts(keywords);
}

async function addProduct() {
    const currentTimestamp = Math.floor(Date.now() / 1000);

    const currentDate = new Date(currentTimestamp * 1000).toISOString().split('T')[0];

    try {
        //Calculate the new product id as the length of featured_products array + 1
        const productId = (await biddingSystemContract.methods.getFeaturedProductIds.call()).length + 1;

        //Call the method to add the product
        await biddingSystemContract.methods.addProduct(productId, productName, productDescription, productPrice, currentDate, endDate);

        //Display success msg
        console.log("Product added successfully!");
    } catch(error) {
        console.log("Error adding product: ", error);
    }
}

async function addProduct(productId, productName, productDescription, productPrice, endDate) {
    const currentTimestamp = Math.floor(Date.now() / 1000);

    const currentDate = new Date(currentTimestamp * 1000).toISOString().split('T')[0];

    try {
        //Call the method to add the product
        await biddingSystemContract.methods.addProduct(productId, productName, productDescription, productPrice, currentDate, endDate);

        //Display success msg
        console.log("Product added successfully!");
    } catch(error) {
        console.log("Error adding product: ", error);
    }
}

async function registerBidder() {
    const bidderName = prompt("Enter your name: ");
    const password = prompt("Enter your password: ");

    if(!bidderName || !password) {
        alert("Please enter your name and password.");
        return;
    }

    try {
        await bidderRegistryContract.methods.registerBidderAcc(bidderName, password).send({ from: account });
        alert("Registration successful! Please log in to proceed.");
    } catch(error) {
        console.error("Error registering bidder: ", error);
        alert("Registration failed. Please try again.");
    }
}

async function loginBidder() {
    const password = prompt("Enter your password: ");

    if(!password) {
        alert("Please enter your password");
        return;
    }

    try {
        const loggedIn = await bidderRegistryContract.methods.loginBidderAcc(password).call({ from: account });
        if(loggedIn) {
            alert("Login successful!");
        }else {
            alert("Invalid password. Please try again.");
        }
    } catch(error) {
        console.error("Error logging in: ", error);
        alert("Login failed. Please try again. Error: " + JSON.stringify(error));
    }
}

async function proceedAsAdmin() {

	try {
		const isAdmin = await bidderRegistryContract.methods.isAdmin().call({ from: account });
		if(isAdmin) {
			// Redirect the user to the admin page
			window.location.href = "admin.html";
			console.log("Processing as an Admin");
			alert("Processing as an Admin");
		}else {
			console.log("You are not an Admin");
			alert("You are not an Admin");
		}
	} catch(error) {
		console.error("Error procceed as Admin: ", error);
		alert("Failed to proceed as Admin. Please try again. Error: " + JSON.stringify(error));
	}
    

   
}

async function proceedAsMember() {
	try {
		const isMember = await bidderRegistryContract.methods.isNormalMember().call({ from: account })

		if(isMember) {
			// Redirect the user to the admin page
			window.location.href = "home.html";
			console.log("Processing as a Member");
			alert("Processing as a Member");
		}else {
			console.log("You are not a Member");
			alert("You are not a Member");
		}
	} catch(error) {
		console.error("Error procceed as Member: ", error);
		alert("Failed to proceed as Member. Please try again. Error: " + JSON.stringify(error));
	}
    

    
}

// Event listener for search form submission
document.getElementById("search_form").addEventListener("submit", handleSearch);

// Call the function initially to display all featured products
fetchAndFilterFeaturedProducts("");