// Simulated messages for fake AI responses
const messages = [
    "Hmm, I see a promising future for your memecoins...",
    "The energy of your wallet is strong today.",
    "Beware of market volatility! Fortune favors the cautious.",
    "I sense greatness in your tokens. Choose wisely!",
    "A new opportunity awaits. Seize it... or not."
];

// Connect to Phantom Wallet
async function connectWallet() {
    if (window.solana && window.solana.isPhantom) {
        try {
            const response = await window.solana.connect();
            document.getElementById("wallet-status").innerText = `Wallet Connected: ${response.publicKey.toString()}`;
            addMessage("bot", "Connected! Now ask your question, oh wise holder.");
        } catch (err) {
            console.error(err);
            addMessage("bot", "Connection failed. Do you have Phantom installed?");
        }
    } else {
        addMessage("bot", "Please install the Phantom wallet extension to continue.");
    }
}

// Handle user messages and responses
function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim()) {
        addMessage("user", userInput);
        document.getElementById("user-input").value = "";  // Clear input
        setTimeout(() => generateResponse(), 1000);  // Delay for realism
    }
}

// Generate a random response from the fake AI
function generateResponse() {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    addMessage("bot", randomMessage);
}

// Append a new message to the chat window
function addMessage(sender, message) {
    const chatWindow = document.getElementById("chat-window");
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message", sender === "user" ? "user-message" : "bot-message");
    messageElement.innerText = message;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;  // Scroll to bottom
}
