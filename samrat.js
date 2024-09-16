var questions = [
    { question: "1) Who is the head of the Executive branch at the Union level?", options: ["Prime Minister", "Chief Justice of India", "Governor", "President"], correct: 3 },
    { question: "2) How many Houses does the Indian Parliament have?", options: ["One", "Two", "Three", "Four"], correct: 1 },
    { question: "3) Who presides over the meetings of the Lok Sabha?", options: ["Vice President", "President", "Prime Minister", "Speaker"], correct: 3 },
    { question: "4) In which year was the Constitution of India adopted?", options: ["1945", "1947", "1950", "1952"], correct: 2 },
    { question: "5) Which of the following is a function of the Comptroller and Auditor-General?", options: ["Formulate government policies", "Audit government accounts", "Execute laws", "Elect the President"], correct: 1 },
    { question: "6) What is the maximum term of the Lok Sabha?", options: ["3 years", "4 years", "5 years", "6 years"], correct: 2 },
    { question: "7) Who has the power to declare a financial emergency in India?", options: ["Prime Minister", "President", "Chief Justice of India", "Finance Minister"], correct: 1 },
    { question: "8) What type of majority is required to impeach the President of India?", options: ["Simple majority", "Two-thirds majority of members present and voting", "Absolute majority", "Unanimous majority"], correct: 1 },
    { question: "9) Which Article of the Indian Constitution gives the Parliament the power to amend the Constitution?", options: ["Article 368", "Article 356", "Article 370", "Article 324"], correct: 0 },
    { question: "10) What is the primary role of the Union Judiciary?", options: ["To execute laws", "To interpret laws", "To create laws", "To audit government finances"], correct: 1 },
    { question: "11) Which body has the authority to establish new courts in India?", options: ["Parliament", "President", "Supreme Court", "Law Ministry"], correct: 0 },
    { question: "12) Who was the first Comptroller and Auditor-General of independent India?", options: ["V. Narahari Rao", "T. N. Chaturvedi", "Rajendra Prasad", "K. M. Munshi"], correct: 0 },
    { question: "13) Which Article of the Indian Constitution allows the President to issue ordinances?", options: ["Article 123", "Article 324", "Article 356", "Article 360"], correct: 0 },
    { question: "14) What is the minimum age required to be elected as the President of India?", options: ["25 years", "30 years", "35 years", "40 years"], correct: 2 },
    { question: "15) Who has the power to appoint the Chief Justice of India?", options: ["Parliament", "President", "Prime Minister", "Supreme Court"], correct: 1 }
];

var currentQuestion = 0;
var lifelinesUsed = {
    fiftyFifty: false,
    audiencePoll: false,
    expertPoll: false,
    best3: false
};

function loadQuestion() {
    var q = questions[currentQuestion];
    document.getElementById("question").textContent = q.question;
    document.getElementById("option0").textContent = q.options[0];
    document.getElementById("option1").textContent = q.options[1];
    document.getElementById("option2").textContent = q.options[2];
    document.getElementById("option3").textContent = q.options[3];

    // Reset visibility for all options
    var optionElements = [0, 1, 2, 3].map(i => document.getElementById("option" + i));
    optionElements.forEach(option => option.style.visibility = 'visible');
}

function checkAnswer(optionIndex) {
    var correctOption = questions[currentQuestion].correct;
    if (optionIndex === correctOption) {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showPopup("Congratulations! You won the game!");
        }
    } else {
        showPopup("Kiddo, you still need to learn a lot");
        setTimeout(function() {
            window.location.href = "learn.html";
        }, 2000);
    }
}

function useLifeline(lifelineType) {
    if (lifelinesUsed[lifelineType]) return;
    lifelinesUsed[lifelineType] = true;

    var correct = questions[currentQuestion].correct;
    var options = [0, 1, 2, 3];
    var optionElements = options.map(i => document.getElementById("option" + i));

    switch (lifelineType) {
        case 'fiftyFifty':
            // Remove two incorrect options
            var incorrectOptions = options.filter(i => i !== correct);
            var removedOptions = [];
            while (removedOptions.length < 2) {
                var index = Math.floor(Math.random() * incorrectOptions.length);
                var option = incorrectOptions.splice(index, 1)[0];
                removedOptions.push(option);
                optionElements[option].style.visibility = 'hidden';
            }
            break;

        case 'audiencePoll':
            // Show the correct answer with a message
            showPopup(`Audience Poll: Option ${correct + 1} is the correct answer.`);
            break;

        case 'expertPoll':
            // Show the correct answer with a message
            showPopup(`Expert Poll: Option ${correct + 1} is the correct answer.`);
            break;

        case 'best3':
            // Remove one incorrect option
            var incorrectOptions = options.filter(i => i !== correct);
            var optionToRemove = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];
            document.getElementById("option" + optionToRemove).style.visibility = 'hidden';
            break;
    }
}

function showPopup(message) {
    var popup = document.getElementById("popup");
    document.getElementById("popup-message").textContent = message;
    popup.style.display = 'block';
    setTimeout(function() {
        popup.style.display = 'none';
    }, 2000);
}

// Load the first question
loadQuestion();
