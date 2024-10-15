// Get elements from the DOM
const contributionsList = document.getElementById("contributions");
const balanceList = document.getElementById("balance-list");
const users = [];

// Event listener for adding contributions
document.getElementById("add-btn").addEventListener("click", function() {
    const username = document.getElementById("username").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);

    // Validate input
    if (username && !isNaN(amount) && amount > 0) {
        users.push({ name: username, contribution: amount });
        displayContributions();
        clearInputs(); // Clear input fields after adding contribution
    } else {
        alert("Please enter a valid name and a positive contribution amount.");
    }
});

// Event listener for calculating balances
document.getElementById("calculate-btn").addEventListener("click", function() {
    if (users.length > 0) {
        calculateBalances();
    } else {
        alert("No contributions to calculate.");
    }
});

// Function to display contributions in the list
function displayContributions() {
    contributionsList.innerHTML = ""; // Clear the list before displaying

    users.forEach(user => {
        const li = document.createElement("li");
        li.innerHTML = `${user.name}: $${user.contribution.toFixed(2)}`;
        contributionsList.appendChild(li);
    });
}

// Function to calculate and display balances
function calculateBalances() {
    balanceList.innerHTML = ""; // Clear balance list before calculating

    const totalAmount = users.reduce((sum, user) => sum + user.contribution, 0);
    const perPersonShare = totalAmount / users.length;

    users.forEach(user => {
        const balance = user.contribution - perPersonShare;
        const li = document.createElement("li");

        if (balance < 0) {
            li.innerHTML = `${user.name} owes $${Math.abs(balance).toFixed(2)}`;
        } else if (balance > 0) {
            li.innerHTML = `${user.name} is owed $${balance.toFixed(2)}`;
        } else {
            li.innerHTML = `${user.name} is settled up.`;
        }

        balanceList.appendChild(li);
    });
}

// Clear input fields after adding contribution
function clearInputs() {
    document.getElementById("username").value = ""; // Reset username input
    document.getElementById("amount").value = ""; // Reset amount input
}
