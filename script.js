console.log('ssdsf');

let displayVal = 0;
const displayMaxLen = 8;


function add(a,b){
    return a+b;
}
function subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return a/b;
}

function operate(num1, num2, operator){
    if (operator==='+'){
        return add(num1, num2);
    }
    else if(operator==='-'){
        return subtract(num1, num2);
    }
    else if(operator==='*'){
        return multiply(num1, num2);
    }
    else if(operator==='/'){
        return divide(num1,num2);
    }
    else {
        alert("Something went wrong");
    }
}

const numberBtns = document.querySelectorAll('.number');
const numDisplay = document.querySelector('#numdisplay');
numberBtns.forEach((button) => { button.addEventListener('click', setDisplayNumber) });

function setDisplayNumber(){ //concate strings to display >1 button presses
    if (displayVal==0){ //show 0 at start, replace with firstNumButton clicked.
        numDisplay.textContent="";
        displayVal="";
    }
    if (displayVal.length>displayMaxLen){ //0 index strings;
        return;
    }
    displayVal+= this.textContent;
    numDisplay.textContent+= this.textContent;
    console.log(displayVal);
}

