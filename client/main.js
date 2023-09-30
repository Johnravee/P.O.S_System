// VARIABLES
  const moneyShortcut = document.querySelectorAll('.Cashmoney')
  const ReceiptContent = document.querySelector('.ReceiptContent')
  const mode = document.querySelector("#ModeofEating")
 const numDisplay = document.querySelector("#numDisplay");
 const PaymentDisplay = document.querySelector("#PaymentDisplay");
 const searchInput = document.querySelector('#searchInput')
 const Ul = document.querySelector('.List')
 const CustomerList = document.querySelector('.OrdersList')
 const ReceiptElement = document.querySelector('.Element')

// Product Container
const AllProducts = []



//Function to add text to display
function CalNum(num){
    numDisplay.append(num)
    
}


function clearNum(){
  numDisplay.innerHTML = ''
}

function digit(inti){
  PaymentDisplay.append(inti)
}


function txnNumber(num){
  searchInput.append(num)
}


//function to display product 
function ListDisplay(){
    Ul.innerHTML = ''
    CustomerList.innerHTML = ''
    const CombinedProducts = AllProductsDuplicates(AllProducts)

    CombinedProducts.map(product =>{
        const li = document.createElement('li')
        li.className = 'list-item'
        li.innerHTML = `<div class="liCon">
        <span>${product.quantity} ${product.product}</span> <span>${product.price}.00</span></div>`
        Ul.appendChild(li);

        const liForCustomer = document.createElement('li')
        liForCustomer.innerHTML = ` <div class="item">
        <span>${product.quantity}</span>
        <span>${product.product}</span>
        <span>${product.price}.00</span>
      </div>` 

      CustomerList.appendChild(liForCustomer)


        TotalAmount()
        
    })
}



//function to add product to Allproducts array
function Product(ProductName, ProductPrice) {
      // Find the product if same
    const existingItem = AllProducts.find(product => product.product === ProductName)
  
    if (existingItem) 
    {
      // If item already exists, check if numDisplay has a value
      if (numDisplay.innerHTML.trim() !== '') 
      {
        // Add numDisplay value to the existing quantity
        existingItem.quantity += parseInt(numDisplay.innerHTML); 
        numDisplay.innerHTML = ''
      } else 
      {
        existingItem.quantity++;
        
      }
    } else 
    {
      // If item does not exist, check if numDisplay has a value
      if (numDisplay.innerHTML.trim() !== '') 
      {
        AllProducts.push({  product: ProductName, price: ProductPrice, quantity: parseInt(numDisplay.innerHTML) });
      } else 
      {
        AllProducts.push({ product: ProductName, price: ProductPrice, quantity: 1 });
      
      }
    }
    numDisplay.innerHTML = ''
    ListDisplay()
  }

  //function to combined products
  function AllProductsDuplicates(AllProducts){
    const CombinedProduct = new Map

    AllProducts.map(product  =>{

      //If Map has the same value
        if(CombinedProduct.has(product.product))
        {
            const ExistingProduct = product.product,
            ExistingQuantity = product.quantity,
            ExistingPrice = product.price

            CombinedProduct.set(product.product, {
                quantity: ExistingQuantity,
                price: product.price + ExistingPrice
            })
        }else{
            CombinedProduct.set(product.product, {
                quantity: product.quantity,
                price: product.price * product.quantity
            })
        }
    })

    const newArr = []

        //pass new object to Arr
        CombinedProduct.forEach((Allprod, product)=>{
            newArr.push({product, price : Allprod.price, quantity: Allprod.quantity})
        })

        return newArr

}




// function to calculate price of products
function TotalAmount(){
  const Sum = AllProducts.reduce((initial, current)=> initial + current.price * current.quantity, 0)
  document.querySelector('#amountDisplay').innerHTML = parseFloat(Sum).toFixed(2)
  document.querySelector('#TotalAmnt').textContent = `Total: ${parseFloat(Sum).toFixed(2)}`
}




//function to observe the nodeChild of List
const observes = new MutationObserver(() =>{
  
    if(Ul.childElementCount > 0){
      Ul.scrollTop = Ul.scrollHeight
    }
})

const watch = {childList: true}
observes.observe(Ul, watch)

//Set Receipt EatMode, Dine in by default 
document.querySelector('#Mode').textContent = `------ ${mode.textContent} ------`

//function to set Dine in/ Take home
let eat = false
function ModeOfEating(){
  eat = !eat //True

  if(eat){
    const Hesitate = confirm("Are you sure you want to takeout?")

    if(Hesitate === true){
      mode.textContent = "Take Home"
      document.querySelector('#Mode').textContent = `------${mode.textContent}------`
    }
  }else{
    console.log(eat);
    const Hesitate = confirm("Are you sure you want to Dine in?")

    if(Hesitate === true){
      mode.textContent = "Dine in"
      document.querySelector('#Mode').textContent = `------${mode.textContent}------`
    }
  }  
}

let orderTotal = ''
let holderTnx = ''
//Array to store payments 
const TotalPayment = []

//function to process payments
function Payment(){
  if(Ul.childElementCount <= 0)
  {
    dishBtns.forEach(btns => {btns.style.zIndex = '-1'})
    PopupsError("No items") 
    return
  }
  orderTotal =  document.querySelector('#amountDisplay').textContent
  document.querySelector('#Payment').disabled = true
  let leng = "0123456789"
  let num = "";
  for (let i = 0; i < 10; i++) {
    num += leng.charAt(Math.floor(Math.random() * leng.length))
  }
  holderTnx = num


  const timeZone = "Asia/Manila";
  let date = new Date().toLocaleString("en-US", { timeZone })

  document.querySelector('#Transaction').textContent = `TXN: #${num}`
  document.querySelector('#Date').innerHTML = `${new Date().getMonth() + 1 }/${new Date().getDate()}/${new Date().getFullYear()}`
  document.querySelector('#Time').innerHTML = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`

  //Display none
  document.querySelector('.paymentContainer').style.display = "grid"
   document.querySelector('.paymentContainer').style.display = 'flex'
    const quantityCalc =  document.querySelectorAll('.Calc input')

    const displayNone = ['.dish','.DessertsProduct','.ExtraProduct','.SandWichesProduct','.SizzlingProductUnli','.NoodlesProduct','.SizzlingProduct',".drinks",'.familyMealsProduct']

    setDisplayNone(displayNone)

    quantityCalc.forEach(quanBtn => {
      quanBtn.disabled = true
    })




  
  moneyShortcut.forEach(money =>{
    money.addEventListener('click', (e)=>{
      let Cash = parseFloat(e.currentTarget.value)
      TotalPayment.push(Cash)


      let Total =  document.querySelector('#amountDisplay')
      
      const ProductTotal = parseFloat(Total.textContent)
      
      //Customer's money
      const TotalCustomerMoney  = TotalPayment.reduce((init, num) => init + num, 0)
     
      
       //Who is Greater?
      if(Cash >= ProductTotal)
      {
        let res = Cash - ProductTotal
        //"?"
        document.querySelector('#CustCash').textContent = `Cash: ${parseFloat(TotalCustomerMoney).toFixed(2)}`, 
        document.querySelector('#Change').textContent = `Change: ${parseFloat(res).toFixed(2)}`
        Total.textContent = parseFloat(res).toFixed(2)
        document.querySelector('sub').textContent = "Change"
        allOrders()
        Submit()
        allOrders()
        PrintReceipt()
        PopupInform('Start new transactions')
        
        
       
      }
      else
      {
        let res = ProductTotal - Cash
        Total.textContent = parseFloat(res).toFixed(2)
        //"?"
        Cash >= ProductTotal && (
        document.querySelector('#CustCash').textContent = `Cash: ${parseFloat(TotalCustomerMoney).toFixed(2)}`, 
        document.querySelector('#Change').textContent = `Change: ${parseFloat(res).toFixed(2)}`,         
        document.querySelector('sub').textContent = "Change" ,Submit(),allOrders(), PrintReceipt()
       ,PopupInform('Start new transactions'))
      }
    })
  })
  document.querySelector('.ReceiptDetails').textContent = ReceiptContent.textContent
}


//function process other payments
function CashDisplayCheck(){
  if(PaymentDisplay.textContent !== '')
 {
  let TA =  document.querySelector('#amountDisplay')
  const TAtoFloat = parseFloat(TA.textContent).toFixed(2)
  

  TotalPayment.push(parseFloat(PaymentDisplay.textContent))
  const TotalCustomerPayment = TotalPayment.reduce((init, values)=> init + values)
  
  if(parseFloat(PaymentDisplay.textContent) >= TAtoFloat)
  {
    let result = parseFloat(PaymentDisplay.textContent) - TAtoFloat
    TA.textContent = parseFloat(result).toFixed(2)
    PaymentDisplay.innerHTML = ''

    //"?"
    document.querySelector('#CustCash').textContent = `Cash: ${parseFloat(TotalCustomerPayment).toFixed(2)}`, 
    document.querySelector('#Change').textContent = `Change: ${parseFloat(result).toFixed(2)}`
    document.querySelector('sub').textContent = "Change"
    Submit()
    allOrders()
    PrintReceipt()
    PopupInform('Start new transactions')
  }
  else
  {
    let result = TAtoFloat - parseFloat(PaymentDisplay.textContent) 
    TA.textContent = parseFloat(result).toFixed(2)

    parseFloat(PaymentDisplay.textContent) >= TAtoFloat && (
    document.querySelector('#CustCash').textContent = `Cash: ${parseFloat(TotalCustomerPayment).toFixed(2)}`, 
   document.querySelector('#Change').textContent = `Change: ${parseFloat(result).toFixed(2)}`,document.querySelector('sub').textContent = "Change",Submit(),allOrders(), PrintReceipt()
   ,PopupInform('Start new transactions'))

   PaymentDisplay.innerHTML = ''
  }
 }
 else{
  PopupsError("No cash")
 }
}


//function for exactAmount money of customer
function ExactAmount(){
  document.querySelector('sub').textContent = "Change"
  document.querySelector('#CustCash').textContent = `Cash: ${document.querySelector('#amountDisplay').textContent}`
  document.querySelector('#Change').textContent = `Change: 0.00` 
  Submit()
  allOrders()
  PrintReceipt()
  PopupInform('Start new transactions')

  PaymentDisplay.innerHTML = ''
}



let isPrinting = false
let ReceiptNum = 0  //customers receipt number

//function to print receipts
function PrintReceipt() {

  if(isPrinting)
    return 
  
    isPrinting = true
    ReceiptNum++
    if(ReceiptNum === 100){ReceiptNum = 1}
    document.querySelector('#Number').textContent = `#00${ReceiptNum}`
  
  const ReceiptContent = document.querySelector('.ReceiptContent');
  
  // Set the desired print width in pixels
  const printWidthPx = 301.57;
  
  // Calculate the scaling factor based on the print width
  const scaleFactor = printWidthPx / ReceiptContent.offsetWidth;
  
  // Apply the scaling transformation
  ReceiptContent.style.transform = `scale(${scaleFactor})`;
  
  // Open a new window for printing
  const printWindow = window.open('', '_blank');
  
  printWindow.document.write('<html><head><title>Receipt</title></head><body>');
  printWindow.document.write(ReceiptContent.outerHTML);
  printWindow.document.write(`<style>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&family=Rajdhani:wght@700&display=swap');
body{
  width: 301.57px;
  font-family: 'Rajdhani', sans-serif;
}

  .ReceiptBody{
    position: absolute;
    background-color: #fff;
    height: auto;
    width: 301.57px;
    padding: 10px ;
    left: 6%;
    top: 10%;
}

#ReceiptLogo{
  text-align: center;
}

.ReceiptAddress{
  text-align: center;
}

#Mode{
  text-align: center;
}

.OrdersList{
  list-style: none;
  padding: 0;
}

.ReceiptContent{
    max-width: 301.57px;
    padding: 20px 10px
}

.DateTime{
    display: flex;
    justify-content: space-evenly;
}

.item{
    max-width: 301.57px;
    padding: 5px 20px;
    display: flex;
    justify-content: space-between;
    text-align: center;
}



.ReceiptColumn{
    padding: 5px 20px;
    display: flex;
    justify-content: space-between;
    text-align: center;
}

.Thankies{
    text-align: center;
}

.ReceiptNumber{
    margin: 50px 0 0 0;

}

#Number{
    font-size: 30px;
    text-align: center;
}

.MoneyInfo{
    padding: 5px 20px;
}

.MoneyInfo p{
    margin: 2px 0;
}

#CashierName{
  padding: 5px 10px;
}


  </style>`)
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  
  setTimeout(()=>{
    // Print the window and close it
  printWindow.print();
  printWindow.close();
  // Reset the transformation after printing
  ReceiptContent.style.transform = 'none';
  document.querySelector('.ReceiptBody').style.display = 'none';
  isPrinting = false
},100)

  
}





//function to check sessions
function DineIn(){
  const isLoggedin = 'http://localhost:3000/isLoggedin'
  fetch(isLoggedin, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(async(res) => {
    const respo = await res.json()
    console.log(respo);
    if(respo.message === "Welcome, session continued")
    {
      document.querySelector('#CashierName').textContent = `CASHIER NAME : ${respo.user}`
      document.querySelector(".div1").style.display = 'block'
      document.querySelector(".div2").style.display = 'flex'
      document.querySelector(".div3").style.display = 'block'
      document.querySelector(".dish").style.display = 'grid'
      document.querySelector(".Main").style.display = 'none'
    
    
      quantityCalc.forEach(quanBtn => {
        quanBtn.disabled = false
      })
    }
    else   PopupsError("There is no logged in account, please log in first")
    
     
  })
  .catch(err => PopupsError("There is no logged in account, please log in first"))
}


// Prevent multiple submits
let isSubmittingSubmit = false;
let isSubmittingAllOrders = false;

// Database logged user Submission
function Submit() {
  const receiptContent = document.querySelector('.ReceiptContent').textContent;
  const jsonData = { receiptContent, holderTnx, orderTotal };
 

  if (isSubmittingSubmit) return;

  isSubmittingSubmit = true;

  const apiUrl = 'http://localhost:3000/userReceipt';

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonData)
  })
    .then(() => {
      isSubmittingSubmit = false;
    })
    .catch(error => {
      PopupsError('Order are not submitted', error);
      isSubmittingSubmit = false;
    });
}

// Function to insert product
function allOrders() {
  const receiptContent = document.querySelector('.ReceiptContent').innerHTML;
 
  const jsonData = { receiptContent, holderTnx, orderTotal };

  if (isSubmittingAllOrders) return;

  isSubmittingAllOrders = true;

  const apiUrl = 'http://localhost:3000/allorders';

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonData)
  })
    .then(() => {
      isSubmittingAllOrders = false;
    })
    .catch(error => {
      PopupsError('Order are not submitted', error);
      isSubmittingAllOrders = false;
    });
}




//Function to log in
function Login(){
  let user = document.querySelector('#userlog').value
  let pass = document.querySelector('#userlogpass').value


  const apiUrl = 'http://localhost:3000/login';

  fetch(apiUrl, {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({user, pass})
  })
  .then(async (res) =>{
      const response = await res.json()
      if(response.message === "Login successful"){
        PopupSuccess("Login attempt was successful.")
        document.querySelector('.login-loading').style.display = 'none'
        setTimeout(()=>{
          document.querySelector('#userlog').value = ''
        document.querySelector('#userlogpass').value = ''
      },2000)
      }
      else
      {
        PopupsError("No account found ")
        document.querySelector('.login-loading').style.display = 'none'
      }
    })

  .catch(err =>{
    PopupsError("Login failed. Please check your credentials.");
    document.querySelector(".login-loading").style.display = 'none'
  })

  document.querySelector('.modal-Login').style.display = 'none'
  document.querySelector('.login-loading').style.display = 'flex'


}



//Function to create account
function CreateAcc() {
  const usernameInput = document.querySelector('#username');
  const passwordInput = document.querySelector('#password');
  const firstname = document.querySelector('#firstname');
  const lastname = document.querySelector('#lastname');
  const cpassInput = document.querySelector('#cpass');
  const createerr = document.querySelector('#createerr');
  
  const username = usernameInput.value;
  const password = passwordInput.value;
  const cpass = cpassInput.value;
  const fname =  firstname.value 
  const lname = lastname.value

  // Clear previous error message if any
  createerr.textContent = '';

  // Account Validation
  if (username === '' || password === '' || cpass === '' || fname === '' || lname === '') {
    createerr.textContent = 'Please fill in all fields.';
    setTimeout(() => {
      createerr.textContent = '';
    }, 3000);
    return; // Stop execution if fields are empty
  }

  if (password !== cpass) {
    createerr.textContent = 'Passwords do not match.';
    setTimeout(() => {
      createerr.textContent = '';
    }, 3000);
    return; // Stop execution if passwords don't match
  }


  document.querySelector('.login-loading').style.display = 'flex'
  const apiUrl = 'http://localhost:3000/createacc';
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ fname, lname ,username, password })
  })  
  .then(res => {
    if(res.ok) return res.text()
  
    else console.error('Request err');
  })
  .then(serverResponse => {
    if(serverResponse === "Account created"){
      PopupSuccess('Account created successfully!')
      document.querySelector('.login-loading').style.display = 'none'
    }
    else PopupsError('Registration error!')
    document.querySelector('.login-loading').style.display = 'none'
  })
  .catch(err => {
    PopupsError("ERROR", err);
    document.querySelector('.login-loading').style.display = 'none'
  });

  // Clear input fields and close modal
  document.querySelector('.modal-container').style.display = 'none';
  usernameInput.value = '';
  passwordInput.value = '';
  cpassInput.value = '';
  fname.value = '';
  lname.value = '';
}



//Function to logged off account
async function CashierOff(){

 const toDisplayNone = [".div1",".div3",".div2",".drinks","SilogProducts",".SizzlingProduct",".SizzlingProductUnli",".familyMealsProduct",".NoodlesProduct",".SandWichesProduct",".ExtraProduct",".DessertsProduct",".paymentContainer",".ModalContainer",".dish"]

  //function to hide elements
  setDisplayNone(toDisplayNone)
    
  
  try {
    const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
      resetAllValues()
      document.querySelector('#CashierName').textContent = `CASHIER NAME : `
  
      setDisplayNone(toDisplayNone)
      PopupSuccess("Cashier log off")
    } else {
        // Logout failed
       PopupsError('Logout failed');
    }
    

 }  
catch (error) {
  PopupsError('Error during logout:', error);
}


}






//Function to register account 
function VoidRegistration() {
  const vname = document.querySelector('#vname');
  const vpass = document.querySelector('#vpass');
  const cvpass = document.querySelector('#cvpass');

  const vnameVal = vname.value;
  const vpassVal = vpass.value;
  const cvpassVal = cvpass.value
  const voidAPIURL = "http://localhost:3000/voidReg";

  if(vnameVal === '' && vpassVal === '' && cvpassVal === ''){
    PopupsError('Please fill out all required fields')
  }
  else{
    if(vpassVal !== cvpassVal){
        document.querySelector('#vcreateerr').textContent =  'Passwords do not match.'

        setTimeout(() => {
          document.querySelector('#vcreateerr').textContent = ''
        }, 2000);
    }else{
      fetch(voidAPIURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ vnameVal, vpassVal })
      })
      .then(res => {
        if(res.ok) return res.text()
        
        else PopupsError('Error')

      })
      .then(res => {
        if(res === "Registration successful."){

          document.querySelector('.modal-void').style.display = 'none'
          document.querySelector('.modal-Login').style.display = 'none'
          PopupSuccess("Registration completed!")
          vpass.value = '';
          vname.value = '';
        }
      })
      .catch(err => {
        document.querySelector('.modal-void').style.display = 'none'
          document.querySelector('.modal-Login').style.display = 'none'
          vpass.value = '';
          vname.value = '';
        PopupsError("Error submitting: ", err);
      });
    }
    }
  }






// Function to shutdown system
function shutDown(){
  if(confirm('Are you sure you want to shutdown?')){
    const shutDownUrl = 'http://localhost:3000/shutdown'
  fetch(shutDownUrl, {
    method : "GET"
  })
  .then(res =>{
    return res.text()
  })
  .then(mes => {
    PopupsError(mes)
  })
  .catch(err =>{
    PopupsError("Shutdown Error");
  })
  }
} 



//function to verify the password for void
function VoidPass(){
  const voidNumber = document.querySelector('#voidNumber')
  const passVal = document.querySelector('#passwordInput')
  let VoidPass = passVal.value
  let VoidNum = voidNumber.value
  const voidPassAPI = 'http://localhost:3000/voidpass'
  fetch(voidPassAPI, {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({VoidNum, VoidPass})
  })
  .then(async (res) => {
    const responseText = await res.text(); 
    if (responseText === 'Password Matched') {
      dishBtns.forEach(btns => {btns.style.zIndex = '1'})
      document.querySelector(".List").style.pointerEvents = "auto";
      const UlChilds = Ul.querySelectorAll('li');
      const arr = Array.from(UlChilds);
      UlChilds.forEach((child) => {
        child.addEventListener('click', (e) => {
          const clickValue = e.currentTarget;
          const index = arr.findIndex((item) => item === clickValue);
          const indexOfLi = index;
          AllProducts.splice(indexOfLi, 1);
          document.querySelector('.List').style.height = "100%"
          document.querySelector('.List').style.width = "100%"
          document.querySelector('.List').style.overflowY = "hidden"
          document.querySelector('.list-item').style.display = "flex"
          
          ListDisplay();
          TotalAmount();
          VoidBack()
          
        });  
        passVal.value = ''
        voidNumber.value = ''
        document.querySelector('.ModalContainer').style.display = 'none';
      });

      voidIndicator()
    }else{
      PopupsError("Password incorrect")
      document.querySelector('.ModalContainer').style.display = 'none'
      passVal.value = ''
      voidNumber.value = ''
    }
  })
  .catch(err =>{
    PopupsError("Incorrect password")
  })
   
  }


  //function to pass value and to search data
let searchResult = false
function SearchReceipt(){
    document.querySelector('.login-loading').style.display = 'flex'
    search(searchInput.textContent);
    setTimeout(()=>{
      if(searchResult)
      {
        document.querySelector('.login-loading').style.display = 'none'
      document.querySelector('.SearchBody').style.display = "none"
      document.querySelector('.SearchedBody').style.display = "flex"
    
      }
    },3000)

  }

  //function to send request to API
  function search(data) {
    if (!data) {
      PopupsError('Data is required for searching');
      return;
    }
  
    const apiUrl = `http://localhost:3000/search?q=${data}`;
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.length > 0) {
          data.forEach(result => {
            searchResult = true
            ReceiptElement.innerHTML = result.product
          
          });
        } else {
         setTimeout(()=>{
          SearchBack()
          searchResult = false
          document.querySelector('.login-loading').style.display = 'none'
          PopupsError('Data not found')
         },1000)
        }
      })
      .catch(error => {
        PopupsError('Fetch error:', error);
        document.querySelector('.login-loading').style.display = 'none'
      });
  }

  //function to print searched data
  function PrintSearch(){
  // Set the desired print width in pixels
  const printWidthPx = 301.57;
  
  // Calculate the scaling factor based on the print width
  const scaleFactor = printWidthPx / ReceiptElement.offsetWidth;
  
  // Apply the scaling transformation
  ReceiptElement.style.transform = `scale(${scaleFactor})`;

    // Open a new window for printing
  const printWindow = window.open('', '_blank');
  
  printWindow.document.write('<html><head><title>Receipt</title></head><body>');
  printWindow.document.write(ReceiptElement.outerHTML);
  printWindow.document.write(`<style>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&family=Rajdhani:wght@700&display=swap');
body{
  width: 301.57px;
  font-family: 'Rajdhani', sans-serif;
}

  .ReceiptBody{
    position: absolute;
    background-color: #fff;
    height: auto;
    width: 300px;
    padding: 10px ;
    left: 6%;
    top: 10%;
}

#ReceiptLogo{
  text-align: center;
}

.ReceiptAddress{
  text-align: center;
}

#Mode{
  text-align: center;
}

.OrdersList{
  list-style: none;
  padding: 0;
}

.ReceiptContent{
    max-width: 301.57px;
    padding: 20px 10px
}

.DateTime{
    display: flex;
    justify-content: space-evenly;
}

.item{
    max-width: 301.57px;
    padding: 5px 20px;
    display: flex;
    justify-content: space-between;
    text-align: center;
}



.ReceiptColumn{
    padding: 5px 20px;
    display: flex;
    justify-content: space-between;
    text-align: center;
}

.Thankies{
    text-align: center;
}

.ReceiptNumber{
    margin: 50px 0 0 0;

}

#Number{
    font-size: 30px;
    text-align: center;
}

.MoneyInfo{
    padding: 5px 20px;
}

.MoneyInfo p{
    margin: 2px 0;
}

#CashierName{
  padding: 5px 10px;
}


  </style>`)
  
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  document.querySelector('.SearchedBody').style.display = "none"
  searchInput.textContent = ''
  ReceiptElement.innerHTML = ''
  printWindow.print()
  printWindow.close()
  }


// function to reset receipt number 
function ResetCM(){

    ReceiptNum = 0
  PopupSuccess("Reset successfully!")
}





//Click button identifier
let isRegisterAccClick,isVoidClick,isCutOffClick = false




let pinCode = [] 
const pin1 = document.querySelector('#pin1')
const pin2 = document.querySelector('#pin2')
const pin3 = document.querySelector('#pin3')
const pin4 = document.querySelector('#pin4')
// function to input value in PIN
function pin(data){
    

    if(pin1.value.length === 0){
        pin1.value = data
       pinCode.push(data)
        return
    }

    if(pin2.value.length === 0){
        pin2.value = data
        pinCode.push(data)
        return
    }

    if(pin3.value.length === 0){
        pin3.value = data
        pinCode.push(data)
        return
    }

    if(pin4.value.length === 0){
        pin4.value = data
        pinCode.push(data)
        return
    }
}



//function for displaying important
function displayImportantModal(){
  pin1.value = ''
  pin2.value = ''
  pin3.value = ''
  pin4.value = ''

  pinCode = []
console.log(pinCode);
  if(isRegisterAccClick)
  {
   document.querySelector('.managerModalAuth').style.display = 'none'
   document.querySelector('.modal-container').style.display = 'flex'
  }
  else if(isVoidClick)
  {
   document.querySelector('.managerModalAuth').style.display = 'none'
   document.querySelector('.modal-void').style.display = 'flex'
  }
  else if(isCutOffClick)
  {
   
     document.querySelector('.cutOffModal').style.display = 'flex'
 
   const cutOffEndPoint = 'http://localhost:3000/cutoff'
   fetch(cutOffEndPoint)
   
   .then(async datas => await datas.json())
   .then(data =>{
    document.querySelector('.managerModalAuth').style.display = 'none'
     const totalSalary = data.salary
     document.querySelector('#cashierName').textContent = `Cashier: ${data.cashier}`
     document.querySelector('#salary').textContent = `Total Sale: ₱${totalSalary}`
 
   })
   .catch(err =>{
     console.log("Error data", err);
   })
   
  }


}




//function for PIN code
function mgEnter(){
    let pinCodes = pinCode.join('')
    console.log(pinCode);
    const apiUrl = 'http://localhost:3000/pinCode'

    fetch(apiUrl,{
      method : "POST",
      headers : {"Content-Type" : "application/json"}, 
      body : JSON.stringify({pinCodes})
    })
    .then(res => res.text())
    .then(res => {
      if(res === "PIN found")
        {
        displayImportantModal()
        }
        else
        {
         pinCode = []
         pin1.value = ''
         pin2.value = ''
         pin3.value = ''
         pin4.value = ''
        PopupsError("PIN incorrect")
      }
    })
    .catch(err =>{
      pinCodes = []
      console.log("Incorrect PIN", err);
      PopupsError("Something went wrong, please check your PIN")
    })
    
}




//function to reset all to default values
function resetAllValues() {
  

  isSubmittingAllOrders = false
  isSubmittingSubmit = false
  orderTotal = ''
  console.log(orderTotal);
  const displaynone = [".drinks",".SilogProducts",".SizzlingProduct",".SizzlingProductUnli",".familyMealsProduct",".NoodlesProduct",".SandWichesProduct",".ExtraProduct",".DessertsProduct",".paymentContainer",".Payment"]
    
  //function to hide elements
  setDisplayNone(displaynone)

  document.querySelector(".dish").style.display = "grid"
  document.querySelector(".Calc").style.display = "grid"
  const quantityCalc =  document.querySelectorAll('.Calc input')

    quantityCalc.forEach(quanBtn => {
      quanBtn.disabled = false
    })

    document.querySelector('sub').textContent = "Total amount"
  
   setTimeout(()=>{
    // Reset variables
  AllProducts.length = 0;
  TotalPayment.length = 0;
  eat = false;

  // Reset elements
  numDisplay.innerHTML = '';
  PaymentDisplay.innerHTML = '';
  Ul.innerHTML = '';
  CustomerList.innerHTML = '';
  

  // Reset specific element values
  document.querySelector('#amountDisplay').textContent = '0';

  // Reset mode of eating
  mode.textContent = 'Dine in';
  document.querySelector('#Mode').textContent = '------ Dine in ------';
  document.querySelector('#Payment').disabled = false},100)
  
}



