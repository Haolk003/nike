const btnSign=document.getElementById('btn-sign');
const login=document.getElementById('login');
const signUp=document.getElementById('sign-up');
const btnLogin=document.getElementById('btn-login');
const form=document.getElementById('form');
const nameInput=document.getElementById('name');
const emailInput=document.getElementById('email');
const passInput=document.getElementById('password');
const email2=document.getElementById('email2');
const password2=document.getElementById('password2');
const content=document.getElementById('content');
const form2=document.getElementById('form2');
const products=document.querySelector('.products ul');
const content2=document.getElementById('Content2');
const cart=document.querySelector('.cart-products');
const totalProduct=document.querySelector('.cart-icon span');
let tt=0;
let logins=true;
let names="";
const data=[
    {name:"Nike Air Force 1 Mid x Off-White",type:"Men's Shoes",price:5279000,image:"https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/cd621b0a-87fd-4441-aaa4-f2efb4e68e08/air-force-1-mid-off-white-shoes-7LDx46.png"},
    {name:"Zion 2 PF",type:"Men's Basketball Shoes",price:3519000,image:"https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/w_467,c_limit/6d3cccec-e483-433d-a45d-45a49945100a/zion-2-pf-basketball-shoes-pwN2Q4.png"},
    {name:"Jordan Essential",type:"Men's Graphic Knit Shorts",price:1279000,image:"https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/w_467,c_limit/ee7510f7-50d3-4f5c-a788-01c50cc30646/jordan-essential-graphic-knit-shorts-9DHSMV.png"},
    {name:"Air Jordan 3 Retto",type:"Shoe",image:"https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/w_467,c_limit/c5d677b4-d0a4-4013-a58d-6b48d6d15185/air-jordan-3-retro-shoe-TJf2lm.png",price:5589000}    
]
   
    let requestLogin=true;
let requestSignUp=false;
function SignIn(){
    console.log(form);
btnSign.addEventListener('click',function(){
requestSignUp=true;
requestLogin=false;
show()
})
btnLogin.addEventListener('click',function(){
    requestLogin=true;
    requestSignUp=false;
    show()
})
}
SignIn();
function show(){
if(requestLogin===true){
    login.style.display="block";
signUp.style.display="none";
}
else if(requestSignUp===true){
    login.style.display="none";
signUp.style.display="block";
}
else{
    login.style.display="none";
    signUp.style.display="none";
}
}
function ShowError(item,message){
    document.querySelector(`.${item}`).style.display="block";
    document.querySelector(`.${item} small`).innerHTML=message;
}
show();
let requestname=true;
let requestEmail=true;

 let loginStorage=[];
function addSignUp(){ 
   loginStorage=JSON.parse(localStorage.getItem('login'));
form.addEventListener('submit',function(e){
    e.preventDefault();
    let name=nameInput.value.trim();
    let email=emailInput.value.trim();
    let password=passInput.value.trim();
    loginStorage.map((item)=>{
        if(item.name===name){
            requestname=false;
            
        }
        if(item.email===email || requestEmailFunc(emailInput)){
            requestEmail=false;
            
        }
     
    })
    console.log(name);
    requestEmailFunc(emailInput);
    if(requestname==true && requestEmail==true && password.length>=8){
          loginStorage.push({name,email,password});
    }
    if(requestname==false){
        ShowError('err-name',"Sai");
    }
    if(requestEmail==false){
       ShowError('err-email',"Sai");
    }
    if(password.length <8){
        ShowError('err-pass',"Sai");
    }
 localStorage.setItem('login',JSON.stringify(loginStorage));
    requestname=true;
    requestEmail=true;  
})

} 
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
function removeCommas(x){
   
    const remove=x.split(",");
    const string=remove.join('');
 return Number(string);
}

function requestEmailFunc(input){
    const re=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!re.test(input.value.trim())){
        ShowError('err-email','Email is not valid');
    }
}  

function LoginsFunc(){
  if(logins){
        content.style.display="none";
        console.log("login");
        content2.style.display="block";
    }
form2.addEventListener('submit',function(e){
    e.preventDefault();
    const dataSignUp=JSON.parse(localStorage.getItem('login')); 
    console.log(email2.value.trim());
    dataSignUp.map((item)=>{
        if(item.email==email2.value.trim() && item.password==password2.value.trim()){
           logins=true;
           names=item.name;
        }
       
    })
  
})
}
function addProducts(){
    data.forEach((item)=>{
        const li=document.createElement('li');
        li.innerHTML=`<img src="${item.image}" alt="">
                        <span class="shopping-icon"><i class="fas fa-shopping-cart"></i></span>
                        <div class="position-relative p-2">
                        <h4>${item.name}</h4>
                        <p>${item.type}</p>
                        <span class="price">${numberWithCommas(item.price)}đ</span>
                        </div>`
        products.appendChild(li);
    })


}
function addCart(){
   document.querySelectorAll('.shopping-icon').forEach((item,index)=>{
        item.addEventListener('click',()=>{
            CartItem(index);
        })
    })
 
    
}
function CartItem(index){
    let request=true;
    const li=document.createElement('li');
    li.innerHTML=`<div class="img-product">
                <img src="${data[index].image}" alt>
                    </div>
                   <div class="content-name">
                    <p>${data[index].name}</p>
                    <input type="number" value='1'>
                    </div>
                    <div class="price-content">
                    <span class="icon-remove"><i class="fas fa-trash"></i></span> 
                    <span class="price-cart">${numberWithCommas(data[index].price)}</span>
                    </div>
                   `
    cart.querySelectorAll('p').forEach((item)=>{
        if(item.innerText.trim()===data[index].name){
            request=false;
          
        }
   })
 
    li.querySelector('.icon-remove').addEventListener('click',()=>{ 
         tt--;
       
        li.remove(); 
        totalPrice();
   })
   if(request){
    tt++;
     cart.appendChild(li);
     totalPrice();
     
   }
  
  li.querySelectorAll('input').forEach((item)=>{
    item.addEventListener('change',totalPrice);
  })
    request=true;
}
 const total=document.querySelector('.total-price');
function totalPrice(){
      let totals=0;
   
   
document.querySelectorAll('.price-cart').forEach((item)=>{
    let amount= item.parentElement.previousElementSibling.children[1].value;
        totals+=+removeCommas(item.textContent)*amount;
       
    })
   
    total.innerHTML=numberWithCommas(totals)+ ' đ';
    totalProduct.innerHTML=tt;
}
document.querySelector('.checkout').addEventListener('click',()=>{ 
     tt=0;
    document.querySelectorAll('.cart li').forEach((item)=>{
        item.remove()
        totalPrice();
    })
  
})
function toggleCart(){
    document.querySelector('.cart-icon').addEventListener('click',()=>{
        document.querySelector('.cart').classList.toggle('active');
    })
    document.querySelector('.close-icon').addEventListener('click',()=>{
        document.querySelector('.cart').classList.remove('active');
    })
}
addProducts();
LoginsFunc();
addSignUp();
addCart();
toggleCart();
    
