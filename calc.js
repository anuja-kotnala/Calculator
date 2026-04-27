let first="";
let second="";
let op="";
let step=1;


const display=document.getElementById('display');
const grid=document.querySelector('.buttons');

grid.addEventListener('click', (e)=>{
    
    if(!e.target.classList.contains('btn'))return;

    const val=e.target.getAttribute('data-val');
    console.log("clicked:", val, "| step:", step, "| first:", first, "| second:", second);

    // if(!isNaN(val) || val==='.'){
    //     currInput+=val;
    //     display.innerText=currInput;
    // }

    if(val==='C'){
        first="";
        second="";
        op="";
        display.innerText="0";
        return;
    }
    if(val==='del'){
        if(step==1){
            first=first.slice(0,-1);
            display.innerText=first||"0";
        }
        else if(step==2){
            second=second.slice(0,-1);
            display.innerText=second|| "0";
        }
        return;
    }

    if(step==1){
        if(!isNaN(val) || val==='.'){
            first+=val;
            display.innerText=first;
        }
        else if(['+','-','*','/'].includes(val)){
            op=val;
            second="";
            step=2;
        }
    }

    else if(step==2){
       if(!isNaN(val) || val==='.'){
            second+=val;
            display.innerText=second;
        }
        else if(val==='='){
            const result=calculate(parseFloat(first),parseFloat(second),op);
            if(result==="Error"){
                display.innerText="Error";
                first=""; 
                step=1;
                op="";}
            else {
                display.innerText=result;
                first=result.toString();}

            
            second="";
            step=1;
        } 
    }
});


function calculate(a, b, op){
    let result;

    switch(op){
        case'+':
            result=a+b;
            break;
        case'-':
            result=a-b;
            break;
        case'*':
            result=a*b;
            break;
        case'/':
            if(b===0)return "Error";
            result=a/b;
            break;
        default:
            result="Invalid op";
    }
    return result;
}