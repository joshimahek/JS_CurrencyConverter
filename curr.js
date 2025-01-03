const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
let btn=document.querySelector('#xchg');
const fromCurr=document.querySelector('.from select');
const toCurr=document.querySelector('.to select');
let dropdowns=document.querySelectorAll('.dropdown select');
let display=document.querySelector('.msg');
for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        
        if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}
const updateFlag=(elem)=>{
let ccode=elem.value;
// console.log(ccode);
let countryCode=countryList[ccode];
let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
let flag=elem.parentElement.querySelector("img");
flag.src=newSrc;
}

btn.addEventListener("click", async (evt)=>{
evt.preventDefault();
let amount=document.querySelector('.amount input');
let amtVal=amount.value;
// console.log(amtVal);
if(amtVal=="" || amtVal<0){
    amtVal=1;
    amount.value='1';
}
console.log(amtVal);
console.log(fromCurr.value,toCurr.value);
// console.log(fromCurr,toCurr);
const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
let response= await fetch(URL);
console.log(response);
let data=await response.json();
console.log(data);
console.log(Object.keys(data)[1]);

let conversionfrom=fromCurr.value.toLowerCase();
let conversionto=toCurr.value.toLowerCase();
console.log(data[conversionfrom][conversionto]);
// console.log(conversionfrom,conversionto);
let rate=data[conversionfrom][conversionto];

let finalAmt=(amtVal*rate).toFixed(2);
console.log(finalAmt);
display.innerText=`${amtVal} ${fromCurr.value}=${finalAmt} ${toCurr.value}`;

});