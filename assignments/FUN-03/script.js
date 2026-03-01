// Initialize the counter at 0
let count = 0;
const display = document.getElementById('display');

// Function to handle UP and DOWN
function updateCounter(value) {
    count += value;
    display.innerText = count;
    
    // Simple visual feedback: change color if negative
    if (count < 0) {
        display.style.color = '#ff4444';
    } else if (count > 0) {
        display.style.color = '#00ff88';
    } else {
        display.style.color = 'white';
    }
}

// Function to reset the counter to 0
function resetCounter() {
    count = 0;
    display.innerText = count;
    display.style.color = 'white';
}