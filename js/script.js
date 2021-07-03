// User Name;
const userName = document.querySelector('input[type="text"]');
userName.focus();
// User Email and credit card element
const email = document.querySelector('#email');
const cardNumber = document.querySelector('#cc-num')
const zipCode = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const form = document.querySelector('form');

// Uset job Selection Element
const jobRole = document.querySelector('select');
const otherJobRole = document.querySelector('#other-job-role');
otherJobRole.style.display = "none";

// T-Shirt color and design selection Element
const color = document.querySelector('#color');
color.setAttribute('disabled', '');
const design = document.querySelector('#design');

// Activities Registration Element
const registerActivities = document.querySelector('#activities');
const checkBoxes = document.querySelectorAll('input[type="checkbox"]');

// payment method element 
const paymentOption = document.querySelector('#payment');
const paymentChildren = paymentOption.children[1];
paymentChildren.setAttribute('selected', '');
const creditCard = document.querySelector('#credit-card');
const payPal = document.querySelector('#paypal')
payPal.hidden = true;
const bitCoin = document.querySelector('#bitcoin');
bitCoin.hidden = true;


// function for user job role selection
function jobRoleSelection(e){
    const value = e.target.value;
    value === 'other'? otherJobRole.style.display = "": otherJobRole.style.display = "none";
    
}

// function for T-shirt and color selection;
function shirtDesign(e){
  color.removeAttribute('disabled');
  const designValue = e.target.value;
  for(let i = 0; i < color.length; i++){
      const currentColor = color[i];
      const currentTheme = color[i].dataset.theme;
      if(designValue !== currentTheme){
          currentColor.hidden = true;
      }else{
          currentColor.hidden = false;
          
      }
  }

}

// function for activites registration and payment update;

function paymentActivites(e){
    const target = e.target
    const payment = document.querySelector('#activities-cost');
    let total = 0;
    const justClicked = target.dataset.dayAndTime;
     for(let i = 0; i < checkBoxes.length; i++){
         const currentCheckbox = checkBoxes[i].dataset.dayAndTime;
         if(currentCheckbox === justClicked && target !== checkBoxes[i]){
             checkBoxes[i].disabled = true;
         }else{
             checkBoxes[i].disabled = false;
         }

         let dataCost = checkBoxes[i].getAttribute('data-cost');
         dataCost = parseInt(dataCost); 
         checkBoxes[i].checked? total += dataCost: total - dataCost;  
     }
      payment.textContent = `Total: $${total}`;
     return total;
}


// function for payment method options
function paymentMethodOption(e){
    const paymentMethod = e.target.value;
    if(paymentMethod === payPal.id){
        payPal.hidden = false; 
        creditCard.hidden = true;
    }else{
        payPal.hidden = true;
    }
    if(paymentMethod === bitCoin.id){
        bitCoin.hidden = false;
        creditCard.hidden = true;
    }else{
        bitCoin.hidden = true;
    }
    if(paymentMethod === creditCard.id){
        creditCard.hidden = false;
    }        
    
}
// function for name value validation;
function nameValidation(){    
    const nameValue = userName.value;
    const label = userName.parentElement;
    const span = userName.nextElementSibling;
    const regex = /^[a-z0-9]{2,20}$|[a-z0-9]\s[a-z]{1,20}$/ig.test(nameValue);
    if(!regex){
        label.classList.add('not-valid');
        span.classList.remove('hint');
    }
    return regex;
}
// function for user Email validation;
function userEmailValidation(){
    const useremail = email.value;
    const span = email.nextElementSibling;
    const label = email.parentElement;
    const regex = /^[^@]+@[^@.]+\.[a-z]+$/i.test(useremail);
    if(!regex){
        label.classList.add('not-valid');
        span.classList.remove('hint');
    }
  
    return regex;
}
// function for credit card validtion;
function userCardValidation(){
    let cardValue = cardNumber.value;
    const label = cardNumber.parentElement;
    const span = cardNumber.nextElementSibling;
    cardValue = parseInt(cardValue);
    const regex = /^\d{13,16}$/.test(cardValue);
    if(!regex){
        label.classList.add('not-valid');
        span.classList.remove('hint');
    }
    return regex;
}
// function for user zip code validation;
function zipCodeValidation(){
    let zipValue = zipCode.value;
    const label = zipCode.parentElement;
    const span = zipCode.nextElementSibling;
    zipValue = parseInt(zipValue);
    const regex = /^\d{5}$/.test(zipValue);
    if(!regex){
        label.classList.add('not-valid');
        span.classList.remove('hint');
    }
    return regex;
}

// credit card cvv validation;
function cvvCardValidation(){
    let card = cvv.value;
     card = parseInt(card);
    const label = cvv.parentElement;
    const span = cvv.nextElementSibling;
    const regex = /^\d{3}$/.test(card);
    
    if(!regex){
        label.classList.add('not-valid');
        span.classList.remove('hint');  
    }
   
    return regex; 
      
}


function activitiesValid(){
    const activites = document.querySelector('#activities');
    const label = activites.firstElementChild;
    label.classList.add('not-valid');
    const checked = Array.from(checkBoxes).filter(e => e.checked);
    if(checked.length > 0){  
        label.classList.remove('not-valid');
        return true;
    } 
    
}

// function to verify all feild;
function eventValidation(e){
    if(!nameValidation()){
        e.preventDefault();
    }
    if(!userEmailValidation()){
        e.preventDefault();
    }

    if(!activitiesValid()){
        e.preventDefault();
    }
    Array.from(paymentOption).forEach(card => {
        if(card.value === "credit-card"){
            if(!userCardValidation()){
                e.preventDefault();
            }
            if(!zipCodeValidation()){
                e.preventDefault();
            }
            if(!cvvCardValidation()){
                e.preventDefault();
            }

        }
             
    })

}

// adding toggling focus event;
for(let i = 0; i < checkBoxes.length; i++){
    const box = checkBoxes[i];
    box.addEventListener('focus', e => {
        box.parentElement.classList.add('focus');
    })
    box.addEventListener('blur', e => {
        box.parentElement.classList.remove('focus');
    })
}

form.addEventListener('submit', eventValidation);

jobRole.addEventListener('change', jobRoleSelection);

design.addEventListener('change', shirtDesign);

registerActivities.addEventListener('change', paymentActivites);

paymentOption.addEventListener('change', paymentMethodOption)

