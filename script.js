const questions=[
    {
        question: "Which tag is used to create a hyperlink in HTML?",
        answers:[
            {text:"img tag",correct:false},
            {text:"a tag",correct:true},
            {text:"link tag",correct:false},
            {text:"href tag",correct:false},
            
        ]
    },
   
    {
        question: "Which CSS property is used to change the text color of an element?",
        answers:[
            {text:"font-color",correct:false},
            {text:"text-color",correct:false},
            {text:"background-color",correct:false},
            {text:"color",correct:true},
            
        ]
    },

    {
        question: "Which keyword is used to declare a constant variable in JavaScript?",
        answers:[
            {text:"let",correct:false},
            {text:"var",correct:false},
            {text:"const",correct:true},
            {text:"int",correct:false},
            
        ]
    },
    
    {
        question: "Which HTML tag is used to define a table row?",
        answers:[
            {text:"th tag",correct:false},
            {text:"td tag",correct:false},
            {text:"tr tag",correct:true},
            {text:"table tag",correct:false},
            
        ]
    }

];

const questionElement=document.querySelector("#question");
const AnsBtn=document.querySelector(".answer-btn");
const nextBtn=document.querySelector("#next");

let currentQuestionIndx=0;
let score=0;

function startQuize(){
    currentQuestionIndx=0;
    score=0;
    nextBtn.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currQuestion=questions[currentQuestionIndx];
    let questionNum=currentQuestionIndx+1;
    questionElement.innerHTML=questionNum +"."+ currQuestion.question;


    currQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        AnsBtn.appendChild(button);

        if(answer.correct){
            button.dataset.correct=answer.correct;
        }

        button.addEventListener("click",selectAnswer);

    });
}

function resetState(){
    nextBtn.style.display="none";
    while(AnsBtn.firstChild){
        AnsBtn.removeChild(AnsBtn.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const iscorrect=selectedBtn.dataset.correct=="true";

    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(AnsBtn.children).forEach(button=> {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");

        }
        button.disabled=true;
    });

    nextBtn.style.display="block";
} 

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML="Play Again";
    nextBtn.style.display="block";
}

function handlenextButton(){
    currentQuestionIndx++;
    if(currentQuestionIndx < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}


nextBtn.addEventListener("click",()=>{
    if(currentQuestionIndx < questions.length){
        handlenextButton();
    }else{
        startQuize();
    }
});



startQuize();