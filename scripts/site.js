const data = [
    
    {
        "questionText": "What is the capital of France?",
        "options": ["Paris", "Berlin", "Madrid", "Rome"],
        "answer": "Paris",
        "category": "Geography",
        "time":20
    },
    {
        "questionText": "Which mountain is the tallest in the world?",
        "options": ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
        "answer": "Mount Everest",
        "category": "Geography"
    },
    {
        "questionText": "In which ocean is the Bermuda Triangle located?",
        "options": ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"],
        "answer": "Atlantic Ocean",
        "category": "Geography"
    },
    {
        "questionText": "Which country hosted the 2016 Summer Olympics?",
        "options": ["Brazil", "USA", "Russia", "China"],
        "answer": "Brazil",
        "category": "Sports"
    },
    {
        "questionText": "Who holds the record for the most goals scored in a single FIFA World Cup tournament?",
        "options": ["Just Fontaine", "Pele", "Miroslav Klose", "Diego Maradona"],
        "answer": "Just Fontaine",
        "category": "Sports"
    },
    {
        "questionText": "Which sport is known as the 'King of Sports'?",
        "options": ["Soccer", "Cricket", "Tennis", "Basketball"],
        "answer": "Soccer",
        "category": "Sports"
    },
    {
        "questionText": "In which city did the first modern Olympic Games take place in 1896?",
        "options": ["Athens", "London", "Paris", "Rome"],
        "answer": "Athens",
        "category": "Sports"
    },
    {
        "questionText": "Who is often referred to as 'The Greatest' in the sport of boxing?",
        "options": ["Muhammad Ali", "Mike Tyson", "Floyd Mayweather Jr.", "Sugar Ray Robinson"],
        "answer": "Muhammad Ali",
        "category": "Sports"
    },    
    
    {
        "questionText": "What is JavaScript?",
        "options": ["A programming language", "A type of coffee", "A design framework", "A markup language"],
        "answer": "A programming language",
        "category": "JavaScript"
    },
    {
        "questionText": "Who developed JavaScript?",
        "options": ["Netscape Communications Corporation", "Microsoft Corporation", "Google Inc.", "Apple Inc."],
        "answer": "Netscape Communications Corporation",
        "category": "JavaScript"
    },
    {
        "questionText": "Which keyword is used to declare variables in JavaScript?",
        "options": ["var", "array", "const", "variable"],
        "answer": "var",
        "category": "JavaScript"
    },
    {
        "questionText": "What is the purpose of the 'typeof' operator in JavaScript?",
        "options": ["To determine the data type of a variable", "To concatenate strings", "To create a loop", "To declare a function"],
        "answer": "To determine the data type of a variable",
        "category": "JavaScript"
    }
]


const totalQuestion = 3;
const timerValueCofig = 100;
let timerValue = timerValueCofig;
let questionTime = timerValueCofig * 1000;
let currentQuestionIndex = 0;
let questionCount = 1;
let oldInterval = null;
let category = null;

let totalPoints = 0

function checkAnswer(){
    if(document.querySelectorAll('input[value="true"][type="radio"]:checked').length > 0){
        totalPoints++
    }
}

function showTimer(){
    document.querySelector(".timer").style.display = 'block'
}
function hideTimer(){
    document.querySelector(".timer").style.display = 'none'

}

function showQuestionsContainer(){    
    document.querySelector(".question-container").style.display = 'block';

}

function hideQuestionsContainer(){
    document.querySelector(".question-container").style.display = 'none'
}


function showOptionsContainer(){
    // get distinct categories
    let catgories = [...new Set(data.map(x=>x.category))];
    document.querySelector('.option-buttons-container').innerHTML = ''
    for (const category of catgories) {
        document.querySelector('.option-buttons-container').innerHTML += 
        `<button onclick="startQuiz('${category}')">${category}</button>`
    }

    document.querySelector(".options-contianer").style.display = 'block'
}

function hideOptionsContainer(){
    document.querySelector(".options-contianer").style.display = 'none'
}

hideTimer();
hideQuestionsContainer();
showOptionsContainer()

function startQuiz(cat){
    category = cat;
    showTimer();
    showQuestionsContainer();
    hideOptionsContainer();
    nextQuestion()
}

function nextQuestion(){ 
    checkAnswer()
    timerValue = timerValueCofig
    if(oldInterval){
        clearInterval(oldInterval)
    }
    if(questionCount>totalQuestion){
        // show total marks obtained
        hideTimer();
        document.querySelector('.question-container').innerHTML = `<div class="question"><h1>Total Points : ${totalPoints}</h1></div>`;
        return;
    }
    
    document.querySelector('.timer').innerHTML = timerValue;
    
    oldInterval = setInterval(()=>{
        document.querySelector('.timer').innerHTML = timerValue;
        if(timerValue == 0){
            clearInterval(oldInterval);
            
            timerValue = timerValueCofig
             (category)
        }
        timerValue--;
    },1000)
    
    let {question,index} = getQuestionBasedonCategory(currentQuestionIndex);
    document.querySelector('.question-container').innerHTML = getQuestionHtml(question);
    questionCount++;
    currentQuestionIndex = index + 1;    

}

function getQuestionBasedonCategory(currentQuestionIndex){
    for (let index = currentQuestionIndex; index < data.length; index++) {
       if(data[index].category == category){
        return {question:data[index],index}
       }        
    }
    return {question:null,index:data.length-1}
}


function getQuestionHtml(question){
    return `
        <div class="question">
            <h4>${question.questionText}</h4>
            <ul class="options-list" type="none">
                <li><input type="radio" value="${question.options[0] == question.answer}" name="anything"/>${question.options[0]}</li>
                <li><input type="radio" value="${question.options[1] == question.answer}" name="anything"/>${question.options[1]}</li>
                <li><input type="radio" value="${question.options[2] == question.answer}" name="anything"/>${question.options[2]}</li>
                <li><input type="radio" value="${question.options[3] == question.answer}" name="anything"/>${question.options[3]}</li>
            </ul>
            <div class="button-container">
                <button class="continue-btn" onclick="nextQuestion('${category}')">Continue</button>
            </div>
        </div>    
    `
}

