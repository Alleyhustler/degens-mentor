// Initialize the connection to the Solana cluster
const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'));

// Connect Wallet function
async function connectWallet() {
    const provider = window.solana;

    if (provider && provider.isPhantom) {
        try {
            const response = await provider.connect();
            const publicKey = response.publicKey.toString();
            document.getElementById('wallet-status').innerText = `Wallet Status: Connected (${publicKey})`;

            // Fetch wallet data after connecting
            const walletData = await fetchWalletData(publicKey);
            updateWalletData(walletData);
        } catch (err) {
            console.error(err);
            document.getElementById('wallet-status').innerText = "Wallet Status: Not Connected";
        }
    } else {
        alert("Please install Phantom Wallet!");
    }
}

// Placeholder function to fetch wallet data (you will need to implement actual API calls)
async function fetchWalletData(publicKey) {
    try {
        // Fetch the actual balance from the blockchain
        const balance = await connection.getBalance(new solanaWeb3.PublicKey(publicKey));
        const balanceInSol = solanaWeb3.lamportsToSol(balance); // Convert lamports to SOL

        // For demonstration purposes, using random data for holdings and transactions
        return {
            balance: balanceInSol,
            holdings: [{ name: "Solana", amount: (Math.random() * 100).toFixed(2) }],
            transactions: [{ id: "tx1", amount: 0.5, date: "2024-10-28" }],
        };
    } catch (error) {
        console.error("Error fetching wallet data:", error);
        return {
            balance: 0,
            holdings: [],
            transactions: [],
        };
    }
}

// Update the wallet data display
function updateWalletData(data) {
    document.getElementById('wallet-balance').innerText = `Balance: ${data.balance.toFixed(2)} SOL`;
    document.getElementById('token-holdings').innerText = `Holdings: ${data.holdings.length ? data.holdings.map(h => `${h.name}: ${h.amount}`).join(', ') : 'None'}`;
    document.getElementById('recent-transactions').innerText = `Recent Transactions: ${data.transactions.length ? data.transactions.map(t => `ID: ${t.id}, Amount: ${t.amount} SOL on ${t.date}`).join('; ') : 'None'}`;
}

// Function to send messages
function sendMessage() {
    const inputField = document.getElementById("user-input");
    const userMessage = inputField.value.trim();
    
    if (userMessage) {
        // Display user's message
        const chatWindow = document.getElementById("chat-window");
        const userMsgElement = document.createElement("div");
        userMsgElement.className = "chat-message user-message animate";
        userMsgElement.innerText = userMessage;
        chatWindow.appendChild(userMsgElement);

        // Simulate AI response
        setTimeout(() => {
            const botMsgElement = document.createElement("div");
            botMsgElement.className = "chat-message bot-message animate";
            botMsgElement.innerText = "🔮 AI response goes here.";
            chatWindow.appendChild(botMsgElement);
            chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to the bottom
        }, 1000);
        
        inputField.value = ""; // Clear input
    }
}

// Add event listener for wallet connection on page load
window.onload = () => {
    if (window.solana && window.solana.isPhantom) {
        window.solana.on('connect', connectWallet);
        window.solana.on('disconnect', () => {
            document.getElementById('wallet-status').innerText = `Wallet Status: Not Connected`;
            document.getElementById('wallet-balance').innerText = `Balance: 0 SOL`;
            document.getElementById('token-holdings').innerText = `Holdings: None`;
            document.getElementById('recent-transactions').innerText = `Recent Transactions: None`;
        });
    }
};
