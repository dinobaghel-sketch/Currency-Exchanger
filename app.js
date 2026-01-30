const BASE_URL= "https://v6.exchangerate-api.com/v6/932448e83186118d82b7473e/latest";

const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("#submit-btn");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const output=document.querySelector(".output-msg");
const convMsg=document.querySelector(".msg");


for (let selectElement of dropdown){
    for (currCode in countryList){
      let newOption=document.createElement("option");
      newOption.innerText=currCode;
      newOption.value=currCode;
      if(selectElement.name==="from" && currCode==="USD"){
        newOption.selected="selected";
      } else if(selectElement.name==="to" && currCode==="INR"){
        newOption.selected="selected";
      }
      selectElement.append(newOption);
    }

    selectElement.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag =(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src=newSrc;
}

btn.addEventListener("click", async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".input input");
    let amtVal=amount.value;
    console.log(amtVal);
    if(amtVal === "1" || amtVal<1 ){
        amtVal=1;
        amount.value="1";
    }
    //console.log(fromCurr.value,toCurr.value);
    const URL=(`${BASE_URL}/${fromCurr.value}`)
    let response= await fetch(URL);
    let data=await response.json();
    console.log(data.conversion_rates);
    const rate=data.conversion_rates;
    console.log(rate);


    fetch(`${BASE_URL}/${fromCurr.value}`)
        .then(res => res.json())
        .then(data =>{
          // console.log(data.conversion_rates)
          const rate=data.conversion_rates[toCurr.value];
          console.log(rate);

          let finalAmt= amtVal*rate;
          output.innerText=(`${finalAmt} ${toCurr.value}`)
          convMsg.innerText=(`1 ${fromCurr.value}=${rate} ${toCurr.value}`);
        });
});



