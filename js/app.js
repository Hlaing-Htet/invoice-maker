//selector
const items = document.getElementById("items");
const fromElement = document.getElementById("formElement");
const tbody = document.getElementById("tbody");
const quantity = document.getElementById("quantity");
const total = document.getElementById("total");
const date = document.getElementById("date");
const printBtn = document.getElementById("print");
let totalCost = 0;
//function
const multiplie = (x,y)=>x*y;

const reduceValue = (x)=>{
    totalCost -= Number(x);
    total.innerHTML=totalCost;
};
const increaseValue = (x)=>{
    totalCost += Number(x);
        total.innerHTML=totalCost;
}


//process
//To Add option tag to the select element
products.forEach((product)=>{
    let option = new Option(product.name,product.id);
    items.append(option)
})

//click Add btn and to add one row
fromElement.addEventListener("submit",(even)=>{
    even.preventDefault();

    let tr = document.createElement("tr");
    tr.classList = "animate__animated animate__backInLeft"
    let product =products.find((product)=>product.id==items.value);
    let cost =multiplie(product.price,quantity.value);
    
    //creating td element Function
    const createTd = ()=>document.createElement("td");
    //creating span element Function
    const createSpan = ()=>document.createElement("span");


    //create td
    let nameTd = createTd();
    let priceTd = createTd();
    let quantityTd = createTd();
    let costTd = createTd();

    //create span
    let delSpan = createSpan();
    let plusSpan = createSpan();
    let dashSpan = createSpan();
    let quantityValueSpan = createSpan();

    //data inset into delSpan
    delSpan.classList="btn btn-danger me-1 btn-sm delBtn animate__animated animate__headShake";
    delSpan.innerHTML=`<i class=" bi bi-trash"></i>`;
    //data inset into nameTd
    nameTd.append(delSpan,product.name);
    //data inset into priceTd
    priceTd.append(product.price);
    //data inset into plusSpan
    plusSpan.classList="btn btn-sm btn-outline-success plusBtn animate__animated animate__headShake";
    plusSpan.innerHTML=`<i class=" bi bi-plus"></i>`;
    //data inset into dashSpan
    dashSpan.classList="btn btn-sm btn-outline-danger dashBtn animate__animated animate__headShake";
    dashSpan.innerHTML=`<i class=" bi bi-dash"></i>`;
    //data inset into quantityValueSpan
    quantityValueSpan.classList="mx-1";
    quantityValueSpan.append(quantity.value);
    //data inset into quantityTd
    quantityTd.classList="text-center";
    quantityTd.append(plusSpan,quantityValueSpan,dashSpan);
    //data inset into costTd
    costTd.classList="text-end cost";
    costTd.append(cost);
    //data inset into tr
    tr.append(nameTd,priceTd,quantityTd,costTd);
    
    

    tbody.append(tr);
    setTimeout(() => {
        
        increaseValue(cost);
    }, 1000);
    fromElement.reset();
    //to Edit 
    //to delete row
    delSpan.addEventListener("click",()=>{
        tr.classList.replace("animate__backInLeft","animate__backOutRight");
            setTimeout(() => {
                tr.remove();
                reduceValue(costTd.innerHTML);
            }, 500);
    });
    //code reduce Function
    const defaultValueFun = ()=>Number(quantityValueSpan.innerHTML);

    const changeCost = (x,multiplie)=>{
        costTd.innerHTML= multiplie(product.price,x);
        quantityValueSpan.innerHTML = x;
    };
    //add value
    plusSpan.addEventListener("click",()=>{
        let defaultValue = defaultValueFun();
        defaultValue++;

        changeCost(defaultValue,multiplie);
        
        //increase Cost Value
        increaseValue(product.price);

    });
    dashSpan.addEventListener("click",()=>{
        let defaultValue = defaultValueFun();
        if (defaultValue == 0) {
            return;
        }
        defaultValue--;

        changeCost(defaultValue,multiplie);
        
        //reduce Cost Value
        reduceValue(product.price);
    })
    
});


//print procss

printBtn.addEventListener("click",_=>{
    
//add date
let todayDate = new Date().toLocaleString();
date.innerHTML = todayDate;
window.print();
})