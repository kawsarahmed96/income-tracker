const incomeCreateForm = document.getElementById("income-create-form");

const msg = document.querySelector(".msg");
const incomeDataList = document.querySelector("#incomeDataList");
const final_amount = document.querySelector(".finalAmount");

const balanceData = document.querySelector(".balance");
const btnClose = document.querySelector(".buttonClose");
 
const urlLink = document.querySelector('.urlLink')
// income list 
  let balance =0;
const showIncomeList = ()=>{
  const oldData = getDataLS('incomeTk');

  let data ="";
  if(oldData){
   
    oldData.map((item,index)=>{
   
      data +=`
             <tr>
                <td>${index + 1}</td>

                <td>${item.name}</td>
                <td>${item.amount} tk</td>
                <td>${item.source}</td>
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
      balance +=parseInt(`${(item.amount)}`)
    
    })
  } else {
      data = `
        <tr>
            <td colspan="7" class="text-center text-danger">No data found</td>
        </tr>
      `
  }
  incomeDataList.innerHTML = data;
  balanceData.innerHTML = balance;
  
}
showIncomeList()
// submit form


incomeCreateForm.onsubmit = (e)=>{
  e.preventDefault();
  const incomeData = new FormData(e.target);
  const {name,amount,source,date}= Object.fromEntries(incomeData);

  if(!name || !amount ||!source || !date){
     msg.innerHTML =createAlert("Must be filled")

  }else{
    
    sendDataLS("incomeTk",{
      id: createID(),
      name,
      amount,
      source,
      date,
      CreatedAt : Date.now()
    })

      msg.innerHTML = createAlert("Income added successful", "success");

  }

  e.target.reset();
  btnClose.click();
  showIncomeList()
}




urlLink.onclick = ()=>{
window.location.href = "expense.html";
}

let expenseData= localStorage.getItem("expensedata")

if(expenseData){
  final_amount.innerHTML =  balance-expenseData

}














































































// const student_create_modal = document.getElementById("student-create");
// const studentList = document.getElementById("student-data-list");
// const msg = document.querySelector(".msg");
// const singleStudentData = document.querySelector(".student-data");
// 
// // show student data
// const getAllStudents = () => {
//   const students = getDataLS("students");
// 
//   let dataList = "";
// 
//   if (students) {
//     students.forEach((item, index) => {
//       dataList += `
//             <tr>
//                 <td>${index + 1}</td>
//                 <td>
//                     <img
//                     src="${item.photo}"
//                     alt=""
//                     />
//                 </td>
//                 <td>${item.name}</td>
//                 <td>${item.email}</td>
//                 <td>${item.phone}</td>
//                 <td>${item.location}</td>
//                 <td>${timeSayed(item.createdAt)}</td>
//                 <td>
//                     <button
//                     class="btn btn-sm btn-info"
//                     data-bs-toggle="modal"
//                     data-bs-target="#student-show"
//                     onclick="showSingleStudent('${item.id}')"
//                     >
//                     <i class="fa fa-eye"></i>
//                     </button>
//                     <button class="btn btn-sm btn-warning">
//                     <i class="fa fa-edit"></i>
//                     </button>
//                     <button class="btn btn-sm btn-danger"  onclick="deleteStudent('${
//                       item.id
//                     }')">
//                     <i class="fa fa-trash"></i>
//                     </button>
//                 </td>
//             </tr>
//       `;
//     });
//   } else {
//     dataList = `
//         <tr>
//             <td colspan="7" class="text-center text-danger">No data found</td>
//         </tr>
//     `;
//   }
// 
//   studentList.innerHTML = dataList;
// };
// 
// const deleteStudent = (id) => {
//   const conf = confirm("Are you sure");
// 
//   if (conf) {
//     deleteSigleData("students", id);
//     getAllStudents();
//   }
// };
// 
// const showSingleStudent = (id) => {
//   const { name, email, phone, location, photo } = getSingledata("students", id);
// 
//   singleStudentData.innerHTML = `
//   <img
//   src="${photo}"
//   alt=""
// />
// <h2>${name}</h2>
// <p>${location}</p>
//   `;
// };
// 
// getAllStudents();
// 
// // now submit student create form
// student_create_form.onsubmit = (e) => {
//   e.preventDefault();
// 
//   // get form data
//   const form_data = new FormData(e.target);
//   const { name, email, phone, location, photo } = Object.fromEntries(form_data);
// 
//   //  form validation
//   if (!name || !email || !phone || !location || !photo) {
//     msg.innerHTML = createAlert("All fields are required");
//   } else if (!isEmail(email)) {
//     msg.innerHTML = createAlert("Invalid Email Address", "warning");
//   } else if (!isMobile(phone)) {
//     msg.innerHTML = createAlert("Invalid Mobile Number", "warning");
//   } else {
//     sendDataLS("students", {
//       id: createID(),
//       name,
//       email,
//       phone,
//       location,
//       photo,
//       createdAt: Date.now(),
//     });
// 
//     msg.innerHTML = createAlert("Student data created", "success");
// 
//     e.target.reset();
//     getAllStudents();
//   }
// };
