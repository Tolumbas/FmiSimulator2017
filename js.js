
var $ = a => document.getElementById(a)

var myConsole = $("console");
var myProffesor = $("proffesor");
var myAnswer = $("answer");
var input = $("input");

var database, scorePodmazvane = 0, scoreOtkloni = 0, scorePriznanie = 0, happiness = 50, currentQuestion, index = 0; 

window.onload = function(){
       input.disabled = true;
	myConsole.innerHTML+=`Професор Скръц: ... и понеже днеска сме 1ри Окромви за това, днес ще изпитвам <span class="red">номер 10</span>.<br>`
       myConsole.innerHTML+=`Професор Скръц: Хайде ставай!<br><br>`
	myConsole.innerHTML+=`Сега ще ти задам 10 въпроса, и ти ще отговаряш с 
       <span class="red">а</span>,<span class="red">б</span>,<span class="red">в</span> или <span class="red">г</span><br><br>`
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
       input.disabled = false;
       input.focus();
	currentQuestion = database.questions[index];
	setQuery(currentQuestion.questionText,[currentQuestion.podmazvane,currentQuestion.naluchkai,currentQuestion.otkloni, currentQuestion.priznanie]);
	myConsole.scrollTop = myConsole.scrollHeight;
}



input.addEventListener("keyup",e=>{
	if (e.keyCode == 13) {
	   	e.preventDefault();
       	var value = input.value;
       	if (value == 'а' || value == 'a' || value == 'А'){
       		scorePodmazvane +=10;
       		myConsole.innerHTML+= `Ти: ${currentQuestion.podmazvane}<br>`;
       		input.disabled = true;
       		myConsole.scrollTop = myConsole.scrollHeight;
       		setTimeout(()=>{
       			// input.disabled = false;

       			myConsole.innerHTML+= `<br>Професор Скръц: ${currentQuestion.podmazvaneOtgovor}<br>`;
       			myConsole.scrollTop = myConsole.scrollHeight;
       			nextQuestion();
       		},2000);
       	}
       	if (value == 'б' || value == 'b' || value == 'Б'){
       		if (currentQuestion.naluchkaiBool == false){
       			happiness -= 20;
       		}
       		else{
       			happiness += 10;
       		}
       		myConsole.innerHTML+= `Ти: ${currentQuestion.naluchkai}<br>`;
       		input.disabled = true;
       		myConsole.scrollTop = myConsole.scrollHeight;
       		setTimeout(()=>{
       			// input.disabled = false;
       			myConsole.innerHTML+= `<br>Професор Скръц: ${currentQuestion.naluchkaiOtgovor}<br>`;
       			myConsole.scrollTop = myConsole.scrollHeight;
       			nextQuestion();
       		},2000);
       	}
       	if (value == 'в' || value == 'v' || value == 'В'){
       		scoreOtkloni +=10;
       		myConsole.innerHTML+= `Ти: ${currentQuestion.otkloni}<br>`;
       		input.disabled = true;
       		myConsole.scrollTop = myConsole.scrollHeight;
       		setTimeout(()=>{
       			// input.disabled = false;
       			myConsole.innerHTML+= `<br>Професор Скръц: ${currentQuestion.otkloniOtgovor}<br>`;
       			myConsole.scrollTop = myConsole.scrollHeight;
       			nextQuestion();
       		},2000);
       	}
       	if (value == 'г' || value == 'g' || value == 'Г'){
       		scorePriznanie +=10;
       		myConsole.innerHTML+= `Ти: ${currentQuestion.priznanie}<br>`;
       		input.disabled = true;
       		myConsole.scrollTop = myConsole.scrollHeight;
       		setTimeout(()=>{
       			// input.disabled = false;
       			myConsole.innerHTML+= `<br>Професор Скръц: ${currentQuestion.priznanieOtgovor}<br>`;
       			myConsole.scrollTop = myConsole.scrollHeight;
       			nextQuestion();
       		},2000);
       	}
       	updateEmotion();
       	
       	input.value = "";
    }
});

addEventListener("contextmenu",e=>e.preventDefault())

function nextQuestion(){
	if (index < 9){
		index ++;
		myConsole.innerHTML+="<br><br>"
		setTimeout(askQuesiton,3000);	

	} 
	else{
		var overall = happiness + (scorePriznanie<=20 ? scorePriznanie : 20-scorePriznanie) + (scoreOtkloni<=30 ? scoreOtkloni : 20-scoreOtkloni) +(scorePodmazvane<=30 ? scorePodmazvane : 10-scorePodmazvane)
		if (overall> 0 && overall <= 30 ){
			myConsole.innerHTML+="<br>Професор Скръц: Хич, не си учил, но поне си идвал на лекции и си слушал. Днес минаваш, но ако продължаваш, другият път няма да минеш. <span class='red'>Получаваш оценка 3<br> GAME OVER</span>"
		}
		if (overall <= 0){
			myConsole.innerHTML+="<br>Професор Скръц: Подиграваш се с мен. Ще се видим пак следващата сесия. <span class='red'>ДВОЙКА!<br> GAME OVER</span>"

		}
		if (overall> 30 && overall <= 70){
			myConsole.innerHTML+="<br>Професор Скръц: Внимавал си в час, но толкова. <span class='red'>Получаваш оценка 4<br> GAME OVER</span>"

		}
		if (overall> 70 && overall <= 100){
			myConsole.innerHTML+="<br>Професор Скръц: Виждам че си се трудил, но имаш още много да учиш. Ще ти дам малко отгоре за да те насърча. <span class='red'>Получаваш оценка 5<br> GAME OVER</span>"

		}
		if (overall> 100){
			myConsole.innerHTML+="<br>Професор Скръц: Учиш, макар, да не знаеш теорията, имаш разбирането. <span class='red'>Днес ще ти пиша 6ца<br> ама другият път ще ти взема. <br> GAME OVER</span>"

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