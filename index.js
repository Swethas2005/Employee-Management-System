const genderSelect = document.getElementById("gender");
const sortSelect = document.getElementById("sort");
const tbody = document.getElementById("tbody");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
let currentPage = 1;
let totalPages = 1;
let currentData = [];

function fetchData(page, limit) {
    fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${page}&limit=${limit}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (!data || !data.data) {
                throw new Error('Invalid data format');
            }
            currentData = data.data;
            totalPages = Math.ceil(data.total / limit);
            updateTable();
            updateButtons();
        })
        .catch(error => console.error('Error fetching employees:', error.message));
}

function updateTable() {
    tbody.innerHTML = "";
    currentData.forEach(employee => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.gender}</td>
            <td>${employee.salary}</td>
        `;
        tbody.appendChild(row);
    });
}

function updateButtons() {
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

function filterAndSortData() {
    let filteredData = currentData.filter(employee => employee.gender === genderSelect.value);
    if (sortSelect.value === "asc") {
        filteredData.sort((Low, High) => Low.salary - High.salary);
    } else {
        filteredData.sort((Low, High) => High.salary - Low.salary);
    }
    currentData = filteredData;
    totalPages = Math.ceil(currentData.length / 10);
    currentPage = 1;
    updateTable();
    updateButtons();
}

function prevPage() {
    currentPage--;
    fetchData(currentPage, 10);
}

function nextPage() {
    currentPage++;
    fetchData(currentPage, 10);
}

genderSelect.addEventListener("change", filterAndSortData);
sortSelect.addEventListener("change", filterAndSortData);
prevBtn.addEventListener("click", prevPage);
nextBtn.addEventListener("click", nextPage);


fetchData(currentPage, 10);

    