const clickSound = document.querySelector('#ClickSound')
const quantityCalc =  document.querySelectorAll('.Calc input')
const dishBtns = document.querySelectorAll('.dish input')

document.addEventListener('click', ()=>{
    clickSound.currentTime = 0
    clickSound.play()
})

const CalcDisplay = document.querySelector("#numDisplay");




setTimeout(()=>{
    document.querySelector(".center-body").style.display = 'none'
},2000)



function PopupsError(message){
    document.querySelector('#popMessage').textContent = message
    document.querySelector('.PopupsError').style.display = 'flex'
  }
  

  function PopupInform(message){
  document.querySelector('#PopInformMess').textContent = message
    document.querySelector('.PopupInform').style.display = 'flex'
}

  
  function PopupSuccess(message){
    document.querySelector('#popMessageDone').textContent = message
    document.querySelector('.PopSuccess').style.display = 'flex'
  }

// Scroll Down Function
function ScrollDown(){
    // Scroll the scroll bar by  100px
    Ul.scrollTop += 100
}

function ScrollUp(){
    Ul.scrollTop += -100
}



// Scroll Events
document.querySelector('#Up').addEventListener('click', ScrollUp)
document.querySelector('#Down').addEventListener('click', ScrollDown)

//Display Beverage section
function Beverages(){
document.querySelector(".drinks").style.display = "block"
document.querySelector(".dish").style.display = "none"
CalcDisplay.innerHTML = ''
    
}

//Back to main display
function DisplayMain(){
    document.querySelector(".dish").style.display = "grid"
    CalcDisplay.innerHTML = ''
}

function DrinkItemBack(){
    DisplayMain()
    document.querySelector(".drinks").style.display = "none"
    CalcDisplay.innerHTML = ''
}

//Display menu section
function SilogProductMeal(){
    document.querySelector(".dish").style.display = "none"
    document.querySelector('.SilogProducts').style.display = "block"
    CalcDisplay.innerHTML = ''
}

function SilogItemBack(){
    DisplayMain()
    document.querySelector('.SilogProducts').style.display = "none"
    CalcDisplay.innerHTML = ''
}

function SizzlingProduct(){
    document.querySelector('.SizzlingProduct').style.display = 'block'
    document.querySelector(".dish").style.display = "none"
    CalcDisplay.innerHTML = ''
}


function SizzlingBack(){
    DisplayMain()
    document.querySelector('.SizzlingProduct').style.display = 'none'
    CalcDisplay.innerHTML = ''
}



function FamilyMeal(){
    document.querySelector(".dish").style.display = "none"
    document.querySelector('.familyMealsProduct').style.display = "block"
    CalcDisplay.innerHTML = ''
}

function FmealBack(){
    DisplayMain()
    document.querySelector('.familyMealsProduct').style.display = 'none'
    CalcDisplay.innerHTML = ''
}


function Noodles(){
    document.querySelector(".dish").style.display = "none"
    document.querySelector('.NoodlesProduct').style.display = "block"
    CalcDisplay.innerHTML = ''
}

function NMealBack(){
    DisplayMain()
    document.querySelector('.NoodlesProduct').style.display = 'none'
    CalcDisplay.innerHTML = ''
}


function Unli(){
    document.querySelector(".dish").style.display = "none"
    document.querySelector('.SizzlingProductUnli').style.display = "block"
    CalcDisplay.innerHTML = ''
}

function SizzlingUnliBack(){
    DisplayMain()
    document.querySelector('.SizzlingProductUnli').style.display = 'none'
    CalcDisplay.innerHTML = ''
}



function SandWich(){
    document.querySelector(".dish").style.display = "none"
    document.querySelector('.SandWichesProduct').style.display = "block"
    CalcDisplay.innerHTML = ''
}


function SandWichBack(){
    DisplayMain()
    document.querySelector('.SandWichesProduct').style.display = 'none'
    CalcDisplay.innerHTML = ''
}


function Extra(){
    document.querySelector(".dish").style.display = "none"
    document.querySelector('.ExtraProduct').style.display = "block"
    CalcDisplay.innerHTML = ''
}

function ExtraBack(){
    DisplayMain()
    document.querySelector('.ExtraProduct').style.display = 'none'
    CalcDisplay.innerHTML = ''
}


function Dessert(){
    document.querySelector(".dish").style.display = "none"
    document.querySelector('.DessertsProduct').style.display = "block"
    CalcDisplay.innerHTML = ''
}

function DessertBack(){
    DisplayMain()
    document.querySelector('.DessertsProduct').style.display = 'none'
    CalcDisplay.innerHTML = ''
}


// Payment
function BackToMain(){
    orderTotal = ''
   
    document.querySelector('.paymentContainer').style.display = "none"
    document.querySelector('.dish').style.display = 'grid'
    document.querySelector('.Calc').style.display = 'grid'
    document.querySelector('.Payment').style.display = 'none'

    const quantityCalc =  document.querySelectorAll('.Calc input')
    document.querySelector('#Payment').disabled = false
    quantityCalc.forEach(quanBtn => {
      quanBtn.disabled = false
      
    })

}



function CashMe(){
    document.querySelector('.Payment').style.display = 'grid'
    document.querySelector('.Calc').style.display = 'none'
}


function ResetPaymentDisplay(){
    if(PaymentDisplay.textContent === ''){
        document.querySelector('.Payment').style.display = 'none'
        document.querySelector('.Calc').style.display = 'grid'
    }else{
    
        PaymentDisplay.textContent = ''
        
    }
}


function voidIndicator(){
    
    document.querySelector('.voidIndiContent').style.display = 'block'
    document.querySelector('.div1').style.zIndex = "1"
    document.querySelector('.div1').style.height = "100vh"
    document.querySelector('.div1').style.width = "43vw"
    document.querySelector('.div1').style.overflowY = "hidden"
    document.querySelector('.List').style.height = "90vh"
    document.querySelector('.List').style.overflowY = "scroll"
    

    const displaynone = ['.amount','sup',".div3",".div2",".drinks",".SilogProducts",".SizzlingProduct",".SizzlingProductUnli",".familyMealsProduct",".NoodlesProduct",".SandWichesProduct",".ExtraProduct",".DessertsProduct",".paymentContainer",".ModalContainer",".dish"]
    //function to hide elements
    setDisplayNone(displaynone)
}

//Back function 
function VoidBack(){
    document.querySelector('.voidIndiContent').style.display = null
    document.querySelector('.div1 ').style.zIndex = null    
    document.querySelector('.div1 ').style.height = null    
    document.querySelector('.div1 ').style.overflowY = null
    document.querySelector('.amount').style.display = 'block'
    document.querySelector('sup').style.display = "block"
    document.querySelector('.List').style.width = "100%"
    document.querySelector('.List').style.height = "100%"
    document.querySelector('.displaylbl').style.height = "78%"  
    const displayBack = [".dish",".div3",".div2",".div1",".div4",".Calc"]
    
    displayBack.forEach(display => {
        const displays =  document.querySelector(display)
        if(displays)
        displays.style.display = "grid"
    })

    const quantityCalc =  document.querySelectorAll('.Calc input')
    quantityCalc.forEach(quanBtn => {
      quanBtn.disabled = false
    })
    
}


function voidCancel(){
    document.querySelector('.Payment').style.display = 'none'
    document.querySelector(".List").style.pointerEvents = "none";
    document.querySelector('.voidIndiContent').style.display = null
    document.querySelector('.div1 ').style.zIndex = null    
    document.querySelector('.div1 ').style.height = null    
    document.querySelector('.div1 ').style.overflowY = null
    document.querySelector('.amount').style.display = "block"
    document.querySelector('sup').style.display = "block"
    document.querySelector('.List').style.width = "100%"
    document.querySelector('.List').style.height = "100%"
    document.querySelector('.displaylbl').style.height = "78%"
    document.querySelector('.List').style.overflowY = "hidden"
    const dipslayBack = [".dish",".div3",".div2",".div1",".div4",".Calc"]
    
    dipslayBack.forEach(display => {
        const displays =  document.querySelector(display)
        if(displays)
        displays.style.display = "grid"
    })

  
    quantityCalc.forEach(quanBtn => {
      quanBtn.disabled = false
    })

}




//Back to Beginning screen
function Begin(){
   

    const displaynone = [".div1",".div3",".div2",".drinks",".SilogProducts",".SizzlingProduct",".SizzlingProductUnli",".familyMealsProduct",".NoodlesProduct",".SandWichesProduct",".ExtraProduct",".DessertsProduct",".paymentContainer",".ModalContainer",".dish"]
    //function to hide elements
    setDisplayNone(displaynone)

    document.querySelector(".Main").style.display = 'grid'
}

// VOID
function VoidClose(){
    dishBtns.forEach(btn =>{btn.style.zIndex = '1'})
    document.querySelector('.ModalContainer').style.display = 'none'
}

// RegisterAcc
function RegisterAcc(){
    isRegisterAccClick = true
    document.querySelector('.managerModalAuth').style.display = 'flex'
}

function closeModal(){
    document.querySelector('.modal-container').style.display = 'none'
    document.querySelector('.modal-void').style.display = 'none'
    document.querySelector('.modal-Login').style.display = 'none'


    isVoidClick = false
    isRegisterAccClick = false
    pinCode = []
}

function VoidOpen(){
    isVoidClick = true
    document.querySelector('.managerModalAuth').style.display = 'flex'
  
}
// Login
function CashierOn(){
    document.querySelector('.modal-Login').style.display = 'flex'
}

//Voiding functinon
function Void(){
   if(Ul.childElementCount <= 0)
   {
     dishBtns.forEach(btns => {btns.style.zIndex = '-1'})
     PopupsError("No item to")
     return
   }

    document.querySelector('.ModalContainer').style.display = 'block'
    document.querySelector('#passwordModal').style.zIndex = '1'
    dishBtns.forEach(btns => {btns.style.zIndex = '-1'})
   
    
  }


// PopUp modal
function PopOk(){
    document.querySelector('.PopupsError').style.display = 'none'
    dishBtns.forEach(btn =>{btn.style.zIndex = '1'})
}

function PopDone(){
    document.querySelector('.PopSuccess').style.display = 'none'
}


// Receipt search
function FindReceipt(){
    document.querySelector('.SearchBody').style.display = "flex"
}

function SearchBack(){
    document.querySelector('.SearchedBody').style.display = "none"
    searchInput.textContent = ''
    ReceiptElement.innerHTML = ''
}


function SearchClear(){
    const searchInputDisplay = document.querySelector('#searchInput')
    if(searchInputDisplay.textContent !== '') searchInputDisplay.textContent = ''
    else document.querySelector('.SearchBody').style.display = "none"
    
}


// function to hide elements
function setDisplayNone(toDisplayNone){
    toDisplayNone.forEach(display =>{
      const element =  document.querySelector(display)
       if(element)
           element.style.display = "none";
      
       
   })
  }


//function to inform user
function PopInformOk(){
    orderTotal = ''
    document.querySelector('.login-loading').style.display = "flex"
      resetAllValues()
      document.querySelector('.PopupInform').style.display = "none"
  
  
    setTimeout(()=>{
       document.querySelector('.login-loading').style.display = "none"
    },100)
  }

  //function to check sales
  function cutOff(){
    isCutOffClick = true
    document.querySelector('.managerModalAuth').style.display = 'flex'
  }

//function to remove its modal
function cutBack(){
    document.querySelector('.cutOffModal').style.display = 'none'
}

function mgModalBack(){
    document.querySelector('.managerModalAuth').style.display = 'none'
    pin1.value = ''
    pin2.value = ''
    pin3.value = ''
    pin4.value = ''
    pinCode = []
    dishBtns.forEach(btns => {btns.style.zIndex = '1'})
}



