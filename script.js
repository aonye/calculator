const numberBtns = document.querySelectorAll('.number');
const numDisplay = document.querySelector('#numdisplay');
const clearBtn = document.querySelector('#clear');
const signBtn = document.querySelector('#sign');

clearBtn.addEventListener('click', resetCalc);
signBtn.addEventListener('click', changeSign);

let displayNum = "";
let firstNumber;
let secondNumber;
let heldOperator;
let clearState = true;


function operate(num1, num2, operator){
    if (operator==='+'){ //add instead of concat strings
        return String(convertNumType(num1) + convertNumType(num2));
    }
    else if(operator==='-'){
        return String(num1-num2)
    }
    else if(operator==='*'){
        return String(num1*num2);
    }
    else if(operator==='/'){
        if (num2==0){
            return;
        }
        else {
        return String(num1/num2);
        }
    }
    else if(operator==='%'){
        return String(num1%num2);
    }
    else{
        alert("Unknown bug encountered. Dispatching force to provide support");
    }
}


numberBtns.forEach((button) => { button.addEventListener('click', setDisplayNumber) });

function setDisplayNumber(){ //concatenate strings to display button presses
    if (clearState){
        clearState=false;
        numDisplay.textContent="";
        displayNum="";
    }
    if (numDisplay.textContent.length>8){ //maximum length of display, store overflow number
        displayNum+=this.textContent;
        return;
    }
    numDisplay.textContent+= this.textContent;
    displayNum+=this.textContent;

//     if(firstNumber || firstNumber === 0){ //firstnumber exists, it means we passed the first call.
//         //this will only execute if we click a number between operator presses
//         //when changing signs, make sure to return a string 0 to not mess this up
//         numberBetweenOperator = true;
//     }
// 
}


const operatorBtns = document.querySelectorAll('.operator');
operatorBtns.forEach((operator) => { operator.addEventListener('click', executeMath)});

function executeMath(){
    let passedInOperator = this.textContent;

    if(firstNumber===undefined){ //first call only
        firstCall(passedInOperator);
        return;
    }

    if (heldOperator && heldOperator!=='=' && passedInOperator){
        secondNumber = displayNum;
    }

    console.log(firstNumber, secondNumber, heldOperator);

    if(secondNumber){
        if(passedInOperator){
            //reverse scientific notation check
            // let arr = [firstNumber, secondNumber];
            // arr = reverseSciNotation(arr);
            // firstNumber = arr[0];
            // secondNumber = arr[1];

            firstNumber = operate(firstNumber, secondNumber, heldOperator);
            
            if (firstNumber===undefined) {//divide by zero return error;
                alert("ERROR, divide by 0. Don't you dare do it again");
                resetCalc();
                return;
            }

            //truncate decimals
            firstNumber = decimalCheck(firstNumber);

            //truncate very large and small numbers with scientific notation
            //firstNumber = sciNotationCheck(firstNumber);

            if (firstNumber.length>8){
                firstNumber=NaN;
            }

            numDisplay.textContent = firstNumber;

            secondNumber = null; //vars to reset
            clearState = true;
            displayNum = "";

            if(passedInOperator=='='){
                heldOperator = null;
                return;
            }
            else { //only keep the operator if not '='
                heldOperator = passedInOperator;
            }
        }
    }
    else { //do nothing but update the operator if no additional numbers were entered between
        heldOperator = passedInOperator;
    }
}

function firstCall(passedInOperator){
    heldOperator = passedInOperator;
    if (displayNum===""){
        firstNumber = 0;
    }
    else {
        firstNumber = displayNum;
    }
    clearState = true;
    displayNum = "";
}

function convertNumType(num){
    if (num==parseInt(num)){
        return parseInt(num);
    }
    else {
        return parseFloat(num);
    }
}

function resetCalc(){
    displayNum = "";
    firstNumber = null;
    heldOperator = null;
    numberBetweenOperator = false;
    numDisplay.textContent = 0;
    clearState = true;
}

function changeSign(){
    let tempVar = convertNumType(numDisplay.textContent);
    let tempVar2 = convertNumType(numDisplay.textContent);
    // if (tempVar===0){ //return a string '0' to not cause logic bug with checking operators
    //     numDisplay.textContent = String(tempVar);
    //     displayNum = String(tempVar);
    //     if(tempVar==
    // }
    tempVar = -tempVar;
    numDisplay.textContent = String(tempVar);
    displayNum = String(tempVar);
    if(firstNumber==tempVar2){
        firstNumber=String(tempVar);
    }
}

function decimalCheck(num){
    if(num==parseInt(num)){//cant use strict because num is a string
        return num;
    }
    else {
        return Number.parseFloat(num).toFixed(3);
    }
}

function sciNotationCheck(num){
    if(num.length>9){
        let expo = 0;
        tempVar = parseFloat(num);
        while (true){
            console.log(num);
            if(num>=10){
                num=num/10;
                expo+=1;
            }
            if(num<1){
                num*=10;
                expo-=1;
            }
            if(num>=1 && num<10){
                break;
            }
        }
        num = num.toFixed(3);
        return `${num} e${expo}`;
    }
    return num;
}

function reverseSciNotation(arr){
    for (let i = 0; i < arr.length; i++){
        if(arr[i].includes('e')){
            let tempVar = arr[i].slice(0,5);
            expo = arr[i].slice((arr[i].indexOf('e')+1),arr[i].length);
            let neg;

            if (arr[i].includes('-')){
                neg = true;
            }
            console.log(tempVar, expo, neg);
            if (neg){
                expo = -expo;
                while(expo!=0){
                    expo++;
                    tempVar/=10;
                }
                arr[i]=tempVar;
            }
            else { //e.g. 1.0 e25
                while(expo!=0){
                    expo--;
                    tempVar*=10;
                }
                arr[i]=tempVar;
            }
        }
    }
    return arr;
}
