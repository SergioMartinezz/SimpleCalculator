let total = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

// Checkear si el ASCII de los simbolos funcionan
// UPDATE: No funciona el codigo ASCII (&larr;) aquí
// Es necesario insertar el símbolo (←, − , × , ÷ , +) directamente

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            total = 0;
            break;
        case '=':
            if(previousOperator == null){
                return;
            }
            funcOperation(parseInt(buffer));
            previousOperator = null;
            buffer = total;
            total = 0;
            break;
        case '←':
            if(buffer.length === 1){
                buffer = '0';
            }else{
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
            
    }
}

function handleMath(symbol){
    if(buffer === '0'){
        return;
    }

    const intBuffer = parseInt(buffer);

    if(total === 0){
        total = intBuffer;
    }else{
        funcOperation(intBuffer);
    }

    previousOperator = symbol;
    buffer = '0';
}

function funcOperation(intBuffer){
    if(previousOperator === '+'){
        total += intBuffer;
    }else if(previousOperator === '−'){
        total -= intBuffer;
    }else if(previousOperator === '×'){
        total *= intBuffer;
    }else if(previousOperator === '÷'){
        total /= intBuffer;
    }
}

function handleNumber(numberString){
    if(buffer === '0'){
        buffer = numberString;
    }else{
        buffer += numberString;
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();