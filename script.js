const numDisplay = document.querySelector('#numdisplay');

let num1;
let num2;
let displayNum = "";
let heldOperator;
let lockState = false;

document.getElementById('calcbtns').addEventListener('click', (event) => {
    //console.log(event.target.className);
    switch(event.target.className){
        case('operator'):
            checkStoreOperator(event.target.textContent);
            
            if (heldOperator && num2) {
                num2=displayNum;
                console.log(num1, num2, event.target.textContent);

                let answer = operate(num1, num2, event.target.textContent);

                if (!(isInt(answer))){
                    answer = Number.parseFloat(answer).toFixed(2);
                }

                num1 = answer;
                numDisplay.textContent = answer;

                //mini reset
                num2="";
                lockState=false;
            }

            break;
        
        case('number'):

            lockNumAndOperator(); //first number pressed after valid operator is captured
            
            if (numDisplay.textContent==='0' && event.target.textContent ==='0'){
                break;
            }
            setDisplayNumber(event.target.textContent);
            
            if (checkDisplayLength(displayNum)) //max size of screen;
            {
                numDisplay.textContent=displayNum;
            }
            break;

        case('miscbtn'):
            if(event.target.textContent==='+/-'){
                changeSign();
            }
            if(event.target.textContent==='AC'){
                resetCalc();
            }
            break;
    }
});

function operate(num1, num2, operator){
    if (operator==='=' && heldOperator) {
        operator=heldOperator;
        heldOperator="";
    }
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
            alert("BEEP BOOP. ERROR. Human, trying to divide by zero will break me. RESETTING IN 5, 4, 3, 2, 1..");
            window.location.reload();
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


function checkDisplayLength(str){
    if (str.length<=9){
        return true;
    }
    else {
        return false;
    }
}


function setDisplayNumber(textNum){ //concatenate strings to display button presses
    displayNum+=textNum;
}


function changeSign(){
    let tempVar = String(-displayNum);

    if (tempVar==='0' && !(displayNum)){ //empty calculator clause;
        return;
    }
    if(checkDisplayLength(tempVar)){ 
        //if adding a negative sign makes it over 9 length
        //do not execute
        if (num1 && lockState==false){
            //after first execution, num1 is defined and carried
            //both are valid operators til number is pressed (lockstate)
            num1=String(-num1);
            numDisplay.textContent = num1;
            return;
        }
        displayNum = String(-displayNum);
        numDisplay.textContent = displayNum;
        console.
        return;
    }
    else {
        alert("ERROR, screen size limit reached");
        return;
    }
}

function resetCalc(){
    //easier than resetting variables.
    window.location.reload();
}

function checkStoreOperator(operator){
    if(lockState){
        return;
    }
    if(!heldOperator || !num2){ 
        //if num2 doesnt exist (clicking multiple operators)
        if(operator==='='){
            console.log(heldOperator);
            return;
        }
        else {
            heldOperator = operator;
            console.log(heldOperator);
            return;
        }
    }
}


function lockNumAndOperator(){
    if (lockState){
        return;
    }
    if(heldOperator){
        if (!num1) {
            if (displayNum==""){ //clicking an operator with blank screen
                num1='0';
            }
            else {
                num1=displayNum;
            }
        }
        num2='0';
        displayNum="";
        lockState = true;
    }
}

function convertNumType(strNum){
    if (isInt(strNum)){
        return parseInt(strNum);
    }
    else {
        return parseFloat(strNum);
    }
}

function isInt(strNum){
    if (strNum==parseInt(strNum)){
        return true;
    }
    else {
        return false;
    }
}

/*
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

*/