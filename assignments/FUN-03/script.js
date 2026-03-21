let count = 0;
const display = document.getElementById('display');

function updateCounter(value) {
    count += value;
    display.innerText = count;
    
    // Tactical Color Feedback
    if (count < 0) {
        display.style.color = '#ff4444'; // Red for Warning/Negative
        display.style.textShadow = '0 0 15px rgba(255, 68, 68, 0.5)';
    } else if (count > 0) {
        display.style.color = '#ffe81f'; // Yellow for Super Earth Deployment
        display.style.textShadow = '0 0 15px rgba(255, 232, 31, 0.5)';
    } else {
        display.style.color = 'white';
        display.style.textShadow = 'none';
    }
}

function resetCounter() {
    count = 0;
    display.innerText = count;
    display.style.color = 'white';
    display.style.textShadow = 'none';
}