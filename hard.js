let currentQuestion = 0;
let hearts = 2;
let totalQuestions = 10;
let correctAnswers = 0;

function checkAnswer(element, isCorrect) {
    if (isCorrect) {
        element.style.backgroundColor = 'green';
        correctAnswers++;
    } else {
        element.style.backgroundColor = 'red';
        loseHeart();
    }

    // Move to the next question
    setTimeout(() => {
        element.style.pointerEvents = 'none'; // Disable further clicks on this question
        currentQuestion++;
        checkCompletion();
    }, 500);
}

function loseHeart() {
    hearts--;
    if (hearts === 1) {
        document.getElementById('heart2').style.color = 'gray';
    } else if (hearts === 0) {
        document.getElementById('heart1').style.color = 'gray';
        showPopup("Kiddo, you still need to learn a lot", "learn.html");
    }
}

function checkCompletion() {
    if (currentQuestion === totalQuestions) {
        if (correctAnswers === totalQuestions || hearts > 0) {
            showPopup("Congratulations! You won the game!", "play.html");
        }
    }
}

function showPopup(message, redirectUrl) {
    const popup = document.getElementById('popup');
    popup.innerHTML = `<h2>${message}</h2><button onclick="closePopup('${redirectUrl}')">Ok</button>`;
    popup.style.display = 'block';
}

function closePopup(redirectUrl) {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
    window.location.href = redirectUrl;
}

// Hamburger menu toggle
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}
