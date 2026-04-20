const baseUrl = "https://hm-backend-hy5d.onrender.com/admitP";

// Fetch and display patients
const fetchPatients = async () => {
    try {
        const response = await axios.get(`${baseUrl}/admitP_all`);
        const patients = response.data;

        const tableBody = document.querySelector("#patientTable tbody");
        tableBody.innerHTML = ""; // Clear existing rows

        patients.forEach(patient => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${patient.Name}</td>
                <td>${patient.Address}</td>
                <td>${patient.Email}</td>
                <td>${patient.Age}</td>
                <td>${patient.PhoneNumber}</td>
                <td>${patient.Gender}</td>
                <td>${patient.BloodGroup}</td>
                <td>${patient.Department}</td>
                <td>
                    <button onclick="populateUpdateForm('${patient.Name}')">Update</button>
                    <button onclick="deletePatient('${patient.Name}')">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching patients:", error);
    }
};

// Populate update form
const populateUpdateForm = (name) => {
    const row = [...document.querySelectorAll("#patientTable tbody tr")].find(r => 
        r.cells[0].textContent === name);

    if (row) {
        document.getElementById("updateName").value = row.cells[0].textContent;
        document.getElementById("updateAddress").value = row.cells[1].textContent;
        document.getElementById("updateEmail").value = row.cells[2].textContent;
        document.getElementById("updateAge").value = row.cells[3].textContent;
        document.getElementById("updatePhoneNumber").value = row.cells[4].textContent;
        document.getElementById("updateGender").value = row.cells[5].textContent;
        document.getElementById("updateBloodGroup").value = row.cells[6].textContent;
        document.getElementById("updateDepartment").value = row.cells[7].textContent;

        document.getElementById("updateForm").style.display = "block";
    }
};

// Update patient
const updatePatient = async (event) => {
    event.preventDefault();

    const updatedPatient = {
        Name: document.getElementById("updateName").value,
        Address: document.getElementById("updateAddress").value,
        Email: document.getElementById("updateEmail").value,
        Age: document.getElementById("updateAge").value,
        PhoneNumber: document.getElementById("updatePhoneNumber").value,
        Gender: document.getElementById("updateGender").value,
        BloodGroup: document.getElementById("updateBloodGroup").value,
        Department: document.getElementById("updateDepartment").value,
    };

    try {
        await axios.put(`${baseUrl}/admitP_put`, updatedPatient);
        document.getElementById("updateForm").style.display = "none";
        fetchPatients();
    } catch (error) {
        console.error("Error updating patient:", error);
    }
};

// Delete patient
const deletePatient = async (name) => {
    try {
        await axios.delete(`${baseUrl}/admitP_delete`, { data: { Name: name } });
        fetchPatients();
    } catch (error) {
        console.error("Error deleting patient:", error);
    }
};


// Initialize
document.getElementById("updateForm").addEventListener("submit", updatePatient);
fetchPatients();