function appendFormData() {
    // Gather input values
    var question = document.getElementById('question').value;
    var answer = document.getElementById('answer').value;

    // Create a JSON object with new data
    var newData = {
        question: question,
        answer: answer
    };

    // Fetch the existing JSON data from the server
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'flashcards.txt', true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                // Parse the existing JSON data
                var existingData = JSON.parse(xhr.responseText);

                // Append the new data
                existingData.push(newData);

                // Convert the updated JSON to string
                var updatedData = JSON.stringify(existingData);

                // Create AJAX request to save the updated data
                var saveXhr = new XMLHttpRequest();
                saveXhr.open('POST', 'savedata.php', true);
                saveXhr.setRequestHeader('Content-Type', 'application/json');

                // Send the updated JSON data to the server
                saveXhr.send(updatedData);

                // Handle the response from the server
                saveXhr.onreadystatechange = function () {
                    if (saveXhr.readyState == 4 && saveXhr.status == 200) {
                        alert('Question added successfully!');
                        location.reload(true);

                    }
                };
            } else {
                alert('Error fetching existing data');
            }
        }
    };

    // Send the GET request to fetch existing data
    xhr.send();
}

// Fetch and display existing flashcards
function fetchAndDisplayFlashcards() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'flashcards.txt', true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var existingData = JSON.parse(xhr.responseText);
                displayFlashcards(existingData);
            } else {
                console.error('Error fetching existing data');
            }
        }
    };

    xhr.send();
}

// Display flashcards in the container
function displayFlashcards(data) {
    var container = document.getElementById('flashcardsContainer');
    container.innerHTML = ''; // Clear previous content

    data.forEach(function (flashcard, index) {
        var cardDiv = document.createElement('div');
        cardDiv.className = 'flashcard';

        var cardContent = '<strong>Question:</strong> ' + flashcard.question + '<br>';
        cardContent += '<strong>Answer:</strong> ' + flashcard.answer;

        var deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger delete-btn';
        deleteBtn.innerHTML = 'Delete';
        deleteBtn.onclick = function () {
            deleteFlashcard(index);
        };

        cardDiv.innerHTML = cardContent;
        cardDiv.appendChild(deleteBtn);

        container.appendChild(cardDiv);
    });
}

// Delete a flashcard
function deleteFlashcard(index) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'flashcards.txt', true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var existingData = JSON.parse(xhr.responseText);
                existingData.splice(index, 1);

                var updatedData = JSON.stringify(existingData);

                var saveXhr = new XMLHttpRequest();
                saveXhr.open('POST', 'savedata.php', true);
                saveXhr.setRequestHeader('Content-Type', 'application/json');

                saveXhr.send(updatedData);

                saveXhr.onreadystatechange = function () {
                    if (saveXhr.readyState == 4 && saveXhr.status == 200) {
                        fetchAndDisplayFlashcards(); // Refresh the displayed flashcards
                        alert('Flashcard deleted successfully!');
                        location.reload(true);
                    }
                };
            } else {
                console.error('Error fetching existing data for deletion');
            }
        }
    };

    xhr.send();
}

// Fetch and display flashcards on page load
fetchAndDisplayFlashcards();
