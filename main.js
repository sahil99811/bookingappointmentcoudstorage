var expenses;
async function getallexpenses(){
    await  axios.get('https://crudcrud.com/api/e00d5a79487b4f3cab52733439453940/expense').then((res)=>{
        expenses=res.data;
        updateUI();
    });
}

getallexpenses();
expenses=expenses||[];
document.getElementById('add-expense').addEventListener('click', function () {
    const description = document.getElementById('expense-description').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const date = document.getElementById('expense-date').value;

    if (description && amount && date) {
        axios.post('https://crudcrud.com/api/e00d5a79487b4f3cab52733439453940/expense',{
            description, amount, date 
        }).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
        expenses.push({description,amount,date});
        updateUI();
        clearInputFields();
    }
});


function updateUI() {
    // console.log(expenses);
    const expensesList = document.getElementById('expenses-list');
    expensesList.innerHTML = '';
    expenses.forEach((expense, index) => {
        // console.log(expense);
        const expenseItem = document.createElement('div');
        expenseItem.innerHTML = `${expense.description} - rs${expense.amount} - ${expense.date}
            <button class="edit-button" onclick="editExpense(${index})">Edit</button>
            <button class="delete-button" onclick="deleteExpense(${index})">Delete</button>`;
        expensesList.appendChild(expenseItem);
    });
}

function clearInputFields() {
    document.getElementById('expense-description').value = '';
    document.getElementById('expense-amount').value = '';
    document.getElementById('expense-date').value = '';
}

function editExpense(index) {
    const editedExpense = expenses[index];
    document.getElementById('expense-description').value = editedExpense.description;
    document.getElementById('expense-amount').value = editedExpense.amount;
    document.getElementById('expense-date').value = editedExpense.date;
    
    // await axios.put(`https://crudcrud.com/api/e00d5a79487b4f3cab52733439453940/expense/&{expenses[index]._id}`,{
    //     description
    // }).then((res)=>{
    //     console.log(res);
    // })
    const id=expenses[index]._id;
    console.log(id);
     axios.delete(`https://crudcrud.com/api/e00d5a79487b4f3cab52733439453940/expense/${expenses[index]._id}`);
    expenses.splice(index, 1); 
    updateUI();
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    axios.delete(`https://crudcrud.com/api/e00d5a79487b4f3cab52733439453940/expense/${expenses[index]._id}`);
    updateUI();
}
updateUI();