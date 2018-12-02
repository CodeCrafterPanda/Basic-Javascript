var progressbar = document.querySelector('#progressbar');
var displaySeconds = document.querySelector('#displaySeconds');
var originalText = document.querySelector('.lead');
var totalWords = document.querySelector('#wordsTotal');
var wordsPerMinute = document.querySelector('#wordsPerMinute');
var accuracy = document.querySelector('#accuracy');
var efficiency = document.querySelector('#efficiency');
var input = document.querySelector('#input');
var reset = document.querySelector('#reset');
var givenText = '';
var givenTextLength = 0;
var textEnteredLength = 0;
var seconds = 0;
var timer = 0;
var minutes = 0;
var interval;
var isStart = false;
input.style.boxShadow = '0 0 0px black';
// Array
var array = [];
array[0] = "page was first attracted to computers when he was six years old as he was able to play with the stuff lying around first generation personal computers that had been left by his parents he became the kid in his elementary school to turn in an assi";
array[1] = "fashion mostly refers to the style of clothing worn at a particular time clothing at its most basic is to keep us warm but it serves many other functions it needs to fit the customs and norms of society clothing needs to be accepted";
array[2] = "the bermuda triangle also known as the devils triangle is a loosely defined region in the western part of the north atlantic ocean where a number of aircraft and ships are said to have disappeared and the name is not recognized by";
array[3] = "social media has come a long way in India and its penetration is growing rapidly  while there were 86 million social network users in india in 2013 this number is expected to touch 197 million active shop at many indian stores at one country";
array[4] = "in this section you describe where you grew up what impact your family and community had on you your first and best friends your education and early work experiences this is not a resume type of listing  but focuses on the aha moments of insights";
array[5] = "this is also about indian business and thinking processes he adds pointing to the frameworks and case studies of jugaad and frugal innovation business writers in india will have the world reading them he believes that the only way to solve this";
array[6] = "the venture plans to take off with its consumer marketplace in phases with the app to be launched this october the company is also planning to go global with its partnerships and has commenced work with but there has been a major shift in their";
array[7] = "it was after completing a two year stint at sapient that the desire to start a start up grew even stronger even while at sapient she made sure that she had a know how of different things so she got down gone are the days when three generations";
// Array end
originalText.textContent = array[0];
givenText = originalText.textContent.split(' ');
givenTextLength = givenText.length;
totalWords.textContent = givenTextLength;


input.addEventListener('keypress', function() {
    textEnteredLength = input.value.length;
    if (textEnteredLength === 0 && !isStart) {
        interval = setInterval(startTimer, 10);
        isStart = true;
    }
});

input.addEventListener('keyup', function(event) {
    if(event.keyCode == '32'){
    	textEnteredLength = wordCount(input.value);
        if (textEnteredLength === givenTextLength) {
            progressbar.textContent = 'Completed!';
            displaySeconds.textContent = 60 - seconds;
            // progressbar.style.width = '100%';
            clearInterval(interval);
            input.setAttribute('disabled', 'true');
            reset.removeAttribute('disabled');
            stringCheck(originalText.textContent);
        }
        event.preventDefault();
    }
});


reset.addEventListener('click', function() {
    seconds = 0;
    timer = 0;
    minutes = 0;
    displaySeconds.textContent = 60;
    input.value = '';
    input.removeAttribute('disabled');
    reset.setAttribute('disabled', 'true');
    progressbar.style.width = '0%';
    progressbar.textContent = '';
    var count = 0;
    var randomIndex = Math.round(Math.random() * 7);
    var str = array[randomIndex];
    originalText.textContent = str;
    givenText = originalText.textContent.split(' ');
    givenTextLength = givenText.length;
    totalWords.textContent = givenTextLength;
});

function startTimer() {
    minutes = Math.floor((timer / 100) / 60);
    seconds = Math.floor((timer / 100) - (minutes * 60));
    displaySeconds.textContent = 60 - seconds;
    timer++;
    var width = 0;
    width += Math.round((seconds / 60) * 100);
    progressbar.style.width = width + '%';
    progressbar.textContent = seconds;

    if (minutes === 1) {
        progressbar.textContent = 'Time Up!';
        displaySeconds.textContent = seconds;
        progressbar.style.width = '100%';
        clearInterval(interval);
        input.setAttribute('disabled', 'true');
        reset.removeAttribute('disabled');
        stringCheck(originalText.textContent);
    }
    isStart = false;
}

function stringCheck(str) {
    var enteredText = input.value.split(' ');
    var enteredTextLength = wordCount(input.value);
    wordsPerMinute.textContent = enteredTextLength;
    var correctCount = 0;
    for (var i = 0; i < enteredTextLength; i++) {
        if (enteredText[i] === givenText[i]) {
            correctCount++;
        }
    }
    var accuracyCount = 100 - Math.round(((enteredTextLength - correctCount) / enteredTextLength) * 100);
    var efficiencyCount = 100 - Math.round(((givenTextLength - enteredTextLength) / givenTextLength) * 100);
    accuracy.textContent = accuracyCount + '%';
    efficiency.textContent = efficiencyCount + '%';
    if (accuracyCount >= 80 && efficiencyCount >= 60) {
        var success = document.querySelector('#success');
        success.style.display = 'block';
        setTimeout(function() {
            success.style.display = 'none';
        }, 10000);
    } else if (accuracyCount >= 80 && efficiencyCount <= 60) {
        var warning = document.querySelector('#warning');
        warning.style.display = 'block';
        setTimeout(function() {
            warning.style.display = 'none';
        }, 10000);
    } else {
        var danger = document.querySelector('#danger');
        danger.style.display = 'block';
        setTimeout(function() {
            danger.style.display = 'none';
        }, 10000);
    }
}

function no_backspaces(event) {
    backspace = 8;
    if (event.keyCode == backspace){ 
    	event.preventDefault();
    }
}

function wordCount(str) {
    var count = 0;
    var words = str.split(' ');
    for (var i = 0; i < words.length; i++) {
        if (words[i] != '') {
            count += 1;
        }
    }
    return count;
}