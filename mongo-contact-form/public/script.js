const API_URL = "/api/contacts";
let editId = null;

// Load contacts when page loads
document.addEventListener("DOMContentLoaded", fetchContacts);

async function addContact() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !email || !phone) {
    alert("All fields are required");
    return;
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    alert("Phone number must be exactly 10 digits");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Enter a valid email address");
    return;
  }

  const contact = { name, email, phone };

  try {
    if (editId) {
      // UPDATE
      await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact)
      });
      editId = null;
    } else {
      // CREATE
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact)
      });
    }

    clearForm();
    fetchContacts();

  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong");
  }
}

async function fetchContacts() {
  try {
    const res = await fetch(API_URL);
    const contacts = await res.json();
    displayContacts(contacts);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

function displayContacts(contacts) {
  const list = document.getElementById("contactList");
  list.innerHTML = "";

  contacts.forEach(contact => {
    list.innerHTML += `
      <p>
        <b>Name:</b> ${contact.name} <br>
        <b>Email:</b> ${contact.email} <br>
        <b>Phone:</b> ${contact.phone} <br>
        <button onclick="editContact('${contact._id}', '${contact.name}', '${contact.email}', '${contact.phone}')">Edit</button>
        <button onclick="deleteContact('${contact._id}')">Delete</button>
      </p>
      <hr>
    `;
  });
}

function editContact(id, name, email, phone) {
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("phone").value = phone;
  editId = id;
}

async function deleteContact(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });
    fetchContacts();
  } catch (err) {
    console.error("Delete error:", err);
  }
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}