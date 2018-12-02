// Declaring Variables

var result = document.querySelector('#result'); 
var result_operator = document.querySelector('#result_operator');
var operation = document.querySelector('#operation');
var result_history = document.querySelector('#resultHistory');
var num1 = 0;
var num2 = 0;
var temp = '';
var tempDot = '';
var isDone = false;
var count = 0;
// Array of operation History
var results = [];
// Array of Numbers
var numbers=['zero','one','two','three','four','five','six','seven','eight','nine','dot'];
var numbersObj=[{number:'zero',keyCode1:96,keyCode2:48},{number:'one',keyCode1:97,keyCode2:49},{number:'two',keyCode1:98,keyCode2:50},{number:'three',keyCode1:99,keyCode2:51},{number:'four',keyCode1:100,keyCode2:52},{number:'five',keyCode1:101,keyCode2:53},{number:'six',keyCode1:102,keyCode2:54},{number:'seven',keyCode1:103,keyCode2:55},{number:'eight',keyCode1:104,keyCode2:56},{number:'nine',keyCode1:105,keyCode2:57},{number:'dot',keyCode1:110,keyCode2:190}];
var operators=[{name:'plus',symbol:'+'},{name:'minus',symbol:'-'},{name:'multiply',symbol:'*'},{name:'divide',symbol:'/'},{name:'ac',symbol:''},{name:'ce',symbol:''},{name:'equals',symbol:'='},]; 
var operatorsObj=[{name:'plus',keyCode:107},{name:'minus',keyCode:109},{name:'multiply',keyCode:106},{name:'divide',keyCode:111},{name:'ac',keyCode:46},{name:'ce',keyCode:8},{name:'equals',keyCode:187},{name:'equals',keyCode:13}];
document.onkeydown = function  get_number_keyboard(event){
	var key_code = event.keyCode;
	for(var i = 0; i < numbersObj.length; i++){
		if(key_code == numbersObj[i].keyCode1 || key_code == numbersObj[i].keyCode2){
			get_number(numbersObj[i].number);
		}
	}

	for(var i = 0; i < operatorsObj.length; i++){
		if(key_code == operatorsObj[i].keyCode){
			get_operator(operatorsObj[i].name);
		}
	}
	// alert(typeof(event.keyCode));
}
function get_number(id) {
	// Checking the Operation has been performed or not?
	if (isDone) {
		result.value = '';
		isDone = false;
	}
	// Getting Number Value and Assigning to display
	for (var i = 0; i < numbers.length; i++) {
		if (id === 'dot') {
			// Checking Dots in display String
			var dots = getDotLength(tempDot);
			if (dots < 1) {
				result.value += '.';
				tempDot += '.';
			} else {
				result.value += '';
			}
		} else if (id === numbers[i]) {
			result.value += i;
			tempDot += i;
		}
	}
}

function get_operator(id) {
	// Resetting TempDot String to blank & dot count to zero
	tempDot = '';
	count = 0;
	// Getting Operator and assigning to Result Operator
	for (var i = 0; i < operators.length; i++) {
		var ch = operators[i].name;
		// Checking if operator is AC or Not
		if(ch === 'ac' && ch === id){
			
			result_operator.textContent = 'Result';
			result.value = '';
			temp = '';
			tempDot = '';
			operation.textContent = '';

		}
		// Checking Operator is = or Not
		else if(ch === 'equals' && ch === id){
			
			num2 = parseFloat(result.value);
			temp += num2;
			operation.textContent = temp;
			temp += ' = ';

			if (!isNaN(num1) && !isNaN(num2)) {
				switch (result_operator.textContent.trim()) {
				case '+':
					var final_result = num1 + num2;
					result.value = final_result;
					results.push(temp + final_result);
					break;
				case '-':
					var final_result = num1 - num2;
					result.value = final_result;
					results.push(temp + final_result);
					break;
				case '*':
					var final_result = num1 * num2;
					result.value = final_result;
					results.push(temp + final_result);
					break;
				case '/':
					var final_result = num1 / num2;
					result.value = final_result;
					results.push(temp + final_result);
					break;
				}
			} else {
				result.value = '';
				operation.textContent = '';
			}

			result_operator.textContent = 'Result';
			temp = '';
			isDone = true;
			getResults();
		}else if(ch === 'ce' && ch === id){
			
			var res = result.value;
			res = res.substring(0, res.length - 1);
			result.value = res;
		}
		// If Operator is not AC And also Not = then Perform this
		else if(ch === id && ch !== 'ac' && ch !== 'equals' && ch !== 'ce')
		{
			result_operator.textContent = operators[i].symbol;
			num1 = parseFloat(result.value);
			temp += num1 + ' '+operators[i].symbol+' ';
			result.value = '';
			operation.textContent = temp;
		}
	}
}
// Function to get history of operations
function getResults() {
	if (results.length > 0) {
		tempResult = '<ul class="list-group"><h4>Operation History</h4>';
		for (var i = 0; i < results.length; i++) {
			tempResult += "<li class='list-group-item'>" + results[i] + "</li>";
		}
		tempResult += '</ul>';
		result_history.innerHTML = tempResult;
	}
}
// Function to Get Dot length in NumberString
function getDotLength(str) {
	for (var i = 0; i < str.length; i++) {
		if (str.charAt(i) === '.') {
			count++;
		}
	}
	return count;
}