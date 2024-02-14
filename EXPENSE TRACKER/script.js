"use strict";

const expenseName = document.getElementById("name");
const expenseDate = document.querySelector("#date");
const expenseAmount = document.getElementById("amount");
const addData = document.getElementById("btn");
const expenseDatadiv = document.querySelector(".expense-data");

function createTable() {
  createTable = function () {};
  const CreateexpenseTable = document.createElement("table");
  CreateexpenseTable.className = "my-expenses";
  CreateexpenseTable.insertAdjacentHTML(
    "afterbegin",
    "<tr class='table-header' ><th>Name</th><th>Date</th><th>Amount</th><th>Action</th></tr>"
  );
  expenseDatadiv.appendChild(CreateexpenseTable);
}

function createTableData(name, date, amount) {
  const expenseTable = document.querySelector(".my-expenses");
  const row = expenseTable.insertRow();
  row.className = "table-row";
  row.insertAdjacentHTML(
    "beforeend",
    `<td class='expense-name' contenteditable='false'>${name}</td><td class='expense-date' contenteditable='false'>${date}</td><td class='expense-Amount' contenteditable='false'>${amount}</td><td><button class='edit-expense'>Edit</button> <button class='delete-expense'>X</button> <button class='save-expense' style='display:none;'>Save</button></td>`
  );
}

addData.addEventListener("click", () => {
  if (
    expenseName.value.length === 0 ||
    expenseDate.value.length === 0 ||
    expenseAmount.value.length === 0
  ) {
    alert("Please fill all the required fields");
  } else {
    const name = expenseName.value;
    const Date = expenseDate.value;
    const amount = expenseAmount.value;
    expenseName.value = "";
    expenseDate.value = "";
    expenseAmount.value = "";
    createTable();
    createTableData(name, Date, amount);
  }
});

expenseDatadiv.addEventListener("click", (e) => {
  const row = findParentRow(e.target);

  if (e.target.className === "delete-expense") {
    row.style.display = "none";
  } else if (e.target.className === "edit-expense") {
    makeEditable(row);
  } else if (e.target.className === "save-expense") {
    saveChanges(row);
  }
});

function findParentRow(element) {
  let currentElement = element;
  while (currentElement && !currentElement.classList.contains("table-row")) {
    currentElement = currentElement.parentElement;
  }
  return currentElement;
}

function makeEditable(row) {
  const cells = row.querySelectorAll("td[contenteditable='false']");

  cells.forEach((cell) => {
    cell.contentEditable = "true";
  });

  row.querySelector(".edit-expense").style.display = "none";
  row.querySelector(".save-expense").style.display = "inline-block";
}

function saveChanges(row) {
  const cells = row.querySelectorAll("td[contenteditable='true']");

  cells.forEach((cell) => {
    cell.contentEditable = "false";
  });

  row.querySelector(".edit-expense").style.display = "inline-block";
  row.querySelector(".save-expense").style.display = "none";
}
