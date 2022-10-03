let storedData;
let tablePointer = [];
let currentPage = 1;
let container = document.getElementById("container");
let plusButtons = document.getElementsByClassName("plus");
let tableContainer = document.getElementById("table-area");
let totalRecords = 0;
let newRecord = `<div class="box-container">
                <input type="text" class="name" title="Name doesn't contains symbols e.g:!,#,$,@,%,^,.etc" placeholder="----Your Name----"/>
                <input type="text" class="age" title="Enter a numeric value for age" placeholder="----Age----"/>
                <input type="text" class="mark" title="Enter marks in number" placeholder="----Marks----"/>
                <input type="button" value="+" class="plus" onclick="addNewRecord()" />
                <input type="button" value="-" class="minus" onclick="deleteRecord(this.parentElement)" />
            </div>`;

            
            const getStoredData = () => {
    storedData = localStorage.getItem("task3");
    if (storedData == undefined || storedData == null || storedData == '') {
        storedData = [];
        localStorage.setItem("task3", JSON.stringify(storedData));
    } else {
        storedData = JSON.parse(storedData);
    }
};

const checkPreAndNextButtons = () =>{
    getStoredData();
    totalRecords = storedData.length;

if(totalRecords/5 <=1){
    document.getElementById("next").disabled = document.getElementById("pre").disabled = true;
}else{
    if(currentPage*5>totalRecords){
        document.getElementById("next").disabled = true;
        document.getElementById("pre").disabled = false;
    }
    if(currentPage == 1){
        document.getElementById("pre").disabled = true;
        document.getElementById("next").disabled = false;
    }
}
};

const findNoOfRowsAndDisplayMinusButtons = () => {
    //console.log(container.children.length);
    if (container.children.length == 1) {
        container.children[0].children[4].style.display = "none";
    } else {
        [...container.children].forEach(element => element.children[4].style.display = "block");
    }
};

const addNewRecord = () => {
    container.lastElementChild.insertAdjacentHTML("afterend", newRecord);
    findNoOfRowsAndDisplayMinusButtons();
};

const deleteRecord = element => {
    element.parentElement.removeChild(element);
    let data = { name: element.children[0].value, age: parseInt(element.children[1].value), mark: parseInt(element.children[2].value) };
    storedData = JSON.parse(localStorage.getItem("task3"));
    let index = storedData.findIndex(e => JSON.stringify(e) === JSON.stringify(data));
    localStorage.setItem("task3", JSON.stringify(storedData.slice(0, index - 1).concat(storedData.slice(index + 1))));
    console.log(data, "delete");
    if (!(Object.values(data).includes("") || Object.values(data).includes(NaN) || Object.values(data).includes(null))) {
        getStoredData();
        if (storedData.length > 0)
            fillTable(5, storedData);
        else
            tableContainer.innerHTML = "";
    }
    findNoOfRowsAndDisplayMinusButtons();
};

const showTable = () => {
    let boxContainers = document.getElementsByClassName("box-container");
    const data = [];
    const recordValues = [];
    [...boxContainers].forEach(element => {
        let record = { name: element.children[0].value, age: parseInt(element.children[1].value), mark: parseInt(element.children[2].value) };
        data.push(record);
        recordValues.push(...Object.values(record));
    });
    if (recordValues.includes("") || recordValues.includes(NaN) || recordValues.includes(null)) {
        alert("Some fields are not filled!\nor\nSome fields are filled with wrong values!");
        return;
    }
    getStoredData();
    storedData = storedData.concat(data);
    if (storedData.length == 0) {
        return;
    }
    tableContainer.style.display = "block";
    storedData = [...new Set(storedData.map(e => JSON.stringify(e)))].map(e => JSON.parse(e));
    localStorage.setItem("task3", JSON.stringify(storedData));
    fillTable(5, storedData);
    createPagination(storedData.length, 5);
    checkPreAndNextButtons();
    //console.log(data);
    //console.log(storedData);
};
const clearAll = () => {
    container.innerHTML = newRecord;
    tableContainer.style.display = "none";
    localStorage.setItem("task3", "");
};

const fillTable = (noOfRecords, storedData, start = 0) => {
    tablePointer = [];
    let tableBody = document.getElementById("data-table-body");
    let data = "";
    noOfRecords = storedData.length - start < noOfRecords ? storedData.length - start : noOfRecords;
    for (let i = start; i < start + noOfRecords; i++) {
        tablePointer.push({ name: storedData[i]["name"], age: storedData[i]["age"], mark: storedData[i]["mark"] });
        data += `<tr><td>${storedData[i]["name"]}</td><td>${storedData[i]["age"]}</td><td>${storedData[i]["mark"]}</td></tr>`;
    }
    console.log(tableBody);
    tableBody.innerHTML = data;
};

const createPagination = (totalRecords, recordsPerPage) => {
    let paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";
    let i = 0;
    while (totalRecords > 0) {
        paginationContainer.innerHTML += `<div class="page-numbers" onclick="showPage(parseInt(this.innerText))" >${++i}</div>`;
        totalRecords -= recordsPerPage;
    }
};

const showPage = (pageNumber) => {
    getStoredData();
    fillTable(5, storedData, (pageNumber * 5) - 5);
    currentPage = pageNumber;
    checkPreAndNextButtons();
};

const sortStoredData = (property, orderBy = false) => {
    let tableBody = document.getElementById("data-table-body");
    if (property == 'name') {
        tablePointer.sort((a, b) => {
            let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
            if (nameA > nameB)
                return 1;
            else if (nameA < nameB)
                return -1;
            else return 0;
        })
    } else {
        tablePointer.sort((a, b) => a[property] - b[property]);
    }
    if (orderBy) tablePointer.reverse();
    fillTable(5, tablePointer);
};
getStoredData();
if (storedData.length > 0) {
    showTable();
}

checkPreAndNextButtons();

const pre = (element)=>{
    currentPage--;
    element.disabled = false;
    if((currentPage -1)*5 <= 0){
        element.disabled = true;
    }
    element.nextElementSibling.nextElementSibling.disabled = false;
    showPage(currentPage);
    console.log(totalRecords,currentPage,(currentPage -1)*5);
};

const next = element =>{
    currentPage++;
    element.disabled = false;
    if((currentPage)*5 >= totalRecords )
    element.disabled = true;
    element.previousElementSibling.previousElementSibling.disabled = false;
    console.log(totalRecords,currentPage);
    showPage(currentPage);
};