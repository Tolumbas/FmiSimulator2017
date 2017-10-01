
var $ = a => document.getElementById(a)

var myConsole = $("console");
var myProffesor = $("proffesor");
var myAnswer = $("answer");
var input = $("input");

var database, scorePodmazvane = 0, scoreOtkloni = 0, scorePriznanie = 0, happiness = 50, currentQuestion, index = 0; 

window.onload = function(){
	myConsole.innerHTML+=`Професор Скръц: ... и понеже днеска сме 1ри Окромви за това, днес ще изпитвам <span class="red">номер 10</span>.<br>`
	myConsole.innerHTML+=`Професор Скръц: Хайде ставай!<br>`
	updateEmotion();
	fetch("Question_database.json")
	.then(e => e.json())
	.then(t=>{
		database = t;
		console.log(t);
		setTimeout(askQuesiton,3000);
	})
};

function askQuesiton(){
	currentQuestion = database.questions[index];
	setQuery(currentQuestion.questionText,[currentQuestion.podmazvane,currentQuestion.naluchkai,currentQuestion.otkloni, currentQuestion.priznanie]);
	myConsole.scrollTop = myConsole.scrollHeight;
}



input.addEventListener("keyup",e=>{
	if (e.keyCode == 13) {
	   	e.preventDefault();
       	var value = input.value;
       	if (value == 'а'){
       		scorePodmazvane +=10;
       		myConsole.innerHTML+= `Ти: ${currentQuestion.podmazvane}<br>`;
       		input.disable = true;
       		myConsole.scrollTop = myConsole.scrollHeight;
       		setTimeout(()=>{
       			input.disable = false;

       			myConsole.innerHTML+= `<br>Професор Скръц: ${currentQuestion.podmazvaneOtgovor}<br>`;
       			myConsole.scrollTop = myConsole.scrollHeight;
       			nextQuestion();
       		},2000);
       	}
       	if (value == 'б'){
       		if (currentQuestion.naluchkaiBool == false){
       			happiness -= 10;
       		}
       		else{
       			happiness += 20;
       		}
       		myConsole.innerHTML+= `Ти: ${currentQuestion.naluchkai}<br>`;
       		input.disable = true;
       		myConsole.scrollTop = myConsole.scrollHeight;
       		setTimeout(()=>{
       			input.disable = false;
       			myConsole.innerHTML+= `<br>Професор Скръц: ${currentQuestion.naluchkaiOtgovor}<br>`;
       			myConsole.scrollTop = myConsole.scrollHeight;
       			nextQuestion();
       		},2000);
       	}
       	if (value == 'в'){
       		scoreOtkloni +=10;
       		myConsole.innerHTML+= `Ти: ${currentQuestion.otkloni}<br>`;
       		input.disable = true;
       		myConsole.scrollTop = myConsole.scrollHeight;
       		setTimeout(()=>{
       			input.disable = false;
       			myConsole.innerHTML+= `<br>Професор Скръц: ${currentQuestion.otkloniOtgovor}<br>`;
       			myConsole.scrollTop = myConsole.scrollHeight;
       			nextQuestion();
       		},2000);
       	}
       	if (value == 'г'){
       		scorePriznanie +=10;
       		myConsole.innerHTML+= `Ти: ${currentQuestion.priznanie}<br>`;
       		input.disable = true;
       		myConsole.scrollTop = myConsole.scrollHeight;
       		setTimeout(()=>{
       			input.disable = false;
       			myConsole.innerHTML+= `<br>Професор Скръц: ${currentQuestion.priznanieOtgovor}<br>`;
       			myConsole.scrollTop = myConsole.scrollHeight;
       			nextQuestion();
       		},2000);
       	}
       	updateEmotion();
       	
       	input.value = "";
    }
});


function nextQuestion(){
	if (index < 9){
		index ++;
		myConsole.innerHTML+="<br><br>"
		setTimeout(askQuesiton,3000);	

	} 
	else{
		var overall = happiness + (scorePriznanie<=30 ? scorePriznanie : 20-scorePriznanie) + (scoreOtkloni<=30 ? scoreOtkloni : 20-scoreOtkloni) +(scorePodmazvane<=30 ? scorePodmazvane : 20-scorePodmazvane)
		if (overall> 0 && overall <= 30 ){
			myConsole.innerHTML+="<br>Професор Скръц: OK, Виждам че се имаш нещо в главата, но това не са знания. <span class='red'>Получаваш оценка 3<br> GAME OVER</span>"
		}
		if (overall <= 0){
			myConsole.innerHTML+="<br>Професор Скръц: Подиграваш се с мен. <span class='red'>ДВОЙКА!<br> GAME OVER</span>"

		}
		if (overall> 30 && overall <= 70){
			myConsole.innerHTML+="<br>Професор Скръц: Стегни се! <span class='red'>Получаваш оценка 4<br> GAME OVER</span>"

		}
		if (overall> 70 && overall <= 100){
			myConsole.innerHTML+="<br>Професор Скръц: Виждам че си се трудил, но има на къде да се развиваш. <span class='red'>Получаваш оценка 5<br> GAME OVER</span>"

		}
		if (overall> 100){
			myConsole.innerHTML+="<br>Професор Скръц: Браво! Просто невероятно! <span class='red'>Чиста 6ца!<br> GAME OVER</span>"

		}
		myConsole.scrollTop = myConsole.scrollHeight;
	}
}



function setQuery(question, answers){
myConsole.innerHTML += 
`Професор Скръц: "${question}"<br>
<span class="red">A</span>) ${answers[0]}<br>
<span class="red">Б</span>) ${answers[1]}<br>
<span class="red">В</span>) ${answers[2]}<br>
<span class="red">Г</span>) ${answers[3]}<br><br>
`;

}
function updateEmotion(){
	var overall = happiness + (scorePriznanie<=30 ? scorePriznanie : 20-scorePriznanie) + (scoreOtkloni<=30 ? scoreOtkloni : 20-scoreOtkloni) +(scorePodmazvane<=30 ? scorePodmazvane : 20-scorePodmazvane)
	console.log("overall",overall);
	if (overall> 0 && overall <= 30 ){
		myProffesor.src = "skryc_annoyed.png";
	}
	if (overall <= 0){
		myProffesor.src = "skryc_angry.png";
	}
	if (overall> 30 && overall <= 70){
		myProffesor.src = "skryc_normal.png";
	}
	if (overall> 70 && overall <= 100){
		myProffesor.src = "skryc_happy.png";
	}
	if (overall> 100){
		myProffesor.src = "skryc_very_happy.png";
	}
}