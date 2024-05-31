const incomeExpenseForm = document.querySelector("#income-expense-form");
const balanceData = document.querySelector(".balance");
const msg = document.querySelector(".msg");
const incomeExpenseDataList = document.querySelector("#incomeExpenseDataList");
const incomeLink = document.querySelector('.incomeLink')

// income Expense form

incomeExpenseForm.onsubmit =(e)=>{
  e.preventDefault();
  const expenseData = new FormData(e.target);
  const {name,amount,expense,date} =Object.fromEntries(expenseData)
  

  // data validation

  if(!name || !amount ||!expense || !date){
     msg.innerHTML =createAlert("Must be filled")

  }else{
    
    sendDataLS("ExpenseTk",{
      id: createID(),
      name,
      amount,
      expense,
      date,
      CreatedAt : Date.now()
    })

      msg.innerHTML = createAlert("Khoroch successful koraa holoo", "success");

  }

  e.target.reset();
  btnClose.click();
}


let Expensebalance =0;

const showExpenseList = ()=>{
  const oldData = getDataLS('ExpenseTk');
 
  
  let data ="";
  if(oldData){
   
    oldData.map((item,index)=>{
   
      data +=`
             <tr>
                <td>${index + 1}</td>

                <td>${item.name}</td>
                <td>${item.amount} tk</td>
                <td>${item.expense}</td>
                <td>${item.date}</td>
              
                <td>
                    <button
                    class="btn btn-sm btn-info"
                    data-bs-toggle="modal"
                    data-bs-target="#student-show"
                    
                    >
                    <i class="fa fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-warning">
                    <i class="fa fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger">
                    <i class="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
      `
      Expensebalance +=parseInt(`${(item.amount)}`)
    
    })
  } else {
      data = `
        <tr>
            <td colspan="7" class="text-center text-danger">No data found</td>
        </tr>
      `
  }
  incomeExpenseDataList.innerHTML = data;
  balanceData.innerHTML = Expensebalance;
  
}
showExpenseList()


incomeLink.onclick = ()=>{
window.location.href = "index.html";
}

localStorage.setItem('expensedata',Expensebalance)