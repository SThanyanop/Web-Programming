var count = 0;
var display = document.getElementById('display');
var hint    = document.getElementById('displayHint');

var hints = {
    positive: ['going up!', 'nice one', 'keep adding', 'more and more'],
    negative: ['going down...', 'into the negatives', 'below zero now', 'that\'s a lot of subtracting'],
    zero:     ['back to zero', 'fresh start', 'all clear!']
};

function randomHint(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function updateCounter(value) {
    count += value;
    display.innerText = count;

    display.classList.remove('positive', 'negative');

    if (count > 0) {
        display.classList.add('positive');
        hint.textContent = randomHint(hints.positive);
    } else if (count < 0) {
        display.classList.add('negative');
        hint.textContent = randomHint(hints.negative);
    } else {
        hint.textContent = randomHint(hints.zero);
    }
}

function resetCounter() {
    count = 0;
    display.innerText = count;
    display.classList.remove('positive', 'negative');
    hint.textContent = randomHint(hints.zero);
}