let card = document.querySelector('#card-container');
let nextButton = document.querySelector('#next-btn');
let contentWord = document.querySelector('#content-word');
let contentType = document.querySelector('#content-type');
let contentExample = document.querySelector('#content-example');
let contentMeaning = document.querySelector('#content-meaning');
let contents = []
var cardIdx = 0;
var flipSound = new Audio('assets/flip.mp3'); // Replace with the actual path to your beep sound file

fetchAndProcessData();

card.addEventListener('click', (event) => {
    card.classList.toggle('flipped');
    console.log('flip');
    console.log(card.classList);
    playFlipSound(); // Play flip sound when card is flipped
});

nextButton.addEventListener("click", (event) => {
    cardIdx = (cardIdx + 1) % contents.length;
    populateCard();

});

function populateCard() {
    var content = contents[cardIdx];
    contentWord.innerHTML = content['question'];
    contentMeaning.innerHTML = content['answer'];
}
function fetchAndProcessData() {
    const url = 'flashcards.txt'; // Replace with the actual path to your text file

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('JSON data:', data);
            contents = data;
            populateCard();
            // Process the JSON array as needed
            data.forEach(item => {
                console.log(`Item ID: ${item}`);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
function playFlipSound() {
    if (!flipSound.muted) {
        flipSound.currentTime = 0; // Reset sound to the beginning
        flipSound.play();
    }
}

// Share to Facebook function
function shareToFacebook() {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href), '_blank');
}

// Share to Twitter function
function shareToTwitter() {
    window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(window.location.href), '_blank');
}