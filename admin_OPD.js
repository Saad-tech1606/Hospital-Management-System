const apiBaseUrl = 'https://hm-backend-hy5d.onrender.com/opd'; // Change to your backend base URL

// Fetch all records and populate the table
async function fetchData() {
    try {
        const response = await axios.get(`${apiBaseUrl}/opd_all`);
        const data = response.data;
        const tableBody = document.querySelector('#opd-table tbody');
        tableBody.innerHTML = '';
        data.forEach((item) => {
            const row = `<tr>
                <td>${item.Name}</td>
                <td>${item.Email}</td>
                <td>${item.Address}</td>
                <td>${item.Age}</td>
                <td>${item.PhoneNumber}</td>
                <td>${item.Gender}</td>
                <td>${item.CauseOfAdmission}</td>
                <td>${item.RegistrationDate}</td>
                <td>
                    <button onclick="updateRecord('${item.Name}')">Update</button>
                    <button onclick="deleteRecord('${item.Name}')">Delete</button>
                </td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Fill the form with the record's data to update
function updateRecord(name) {
    const table = document.getElementById('opd-table');
    const rows = table.getElementsByTagName('tr');
    let selectedRecord;

    // Find the row that matches the name and get the values
    for (let row of rows) {
        const cells = row.getElementsByTagName('td');
        if (cells.length > 1 && cells[0].innerText === name) {
            selectedRecord = {
                Name: cells[0].innerText,
                Email: cells[1].innerText,
                Address: cells[2].innerText,
                Age: cells[3].innerText,
                PhoneNumber: cells[4].innerText,
                Gender: cells[5].innerText,
                CauseOfAdmission: cells[6].innerText,
                RegistrationDate: cells[7].innerText
            };
            break;
        }
    }

    // Populate the form with the values from the selected row
    document.getElementById('name').value = selectedRecord.Name;
    document.getElementById('email').value = selectedRecord.Email;
    document.getElementById('address').value = selectedRecord.Address;
    document.getElementById('age').value = selectedRecord.Age;
    document.getElementById('phone').value = selectedRecord.PhoneNumber;
    document.getElementById('gender').value = selectedRecord.Gender;
    document.getElementById('cause').value = selectedRecord.CauseOfAdmission;
    document.getElementById('date').value = selectedRecord.RegistrationDate;
}

// Add or Update a record
async function addOrUpdate() {
    const data = {
        Name: document.getElementById('name').value,
        Email: document.getElementById('email').value,
        Address: document.getElementById('address').value,
        Age: document.getElementById('age').value,
        PhoneNumber: document.getElementById('phone').value,
        Gender: document.getElementById('gender').value,
        CauseOfAdmission: document.getElementById('cause').value,
        RegistrationDate: document.getElementById('date').value,
    };

    try {
        await axios.put(`${apiBaseUrl}/opd_put`, data);
        alert('Record added/updated successfully!');
        fetchData();
    } catch (error) {
        console.error('Error adding/updating record:', error);
        alert('Operation failed.');
    }
}

// Delete a record
async function deleteRecord(name) {
    try {
        await axios.delete(`${apiBaseUrl}/opd_delete`, { data: { Name: name } });
        alert('Record deleted successfully!');
        fetchData();
    } catch (error) {
        console.error('Error deleting record:', error);
        alert('Operation failed.');
    }
}

// Initial fetch of data
fetchData();