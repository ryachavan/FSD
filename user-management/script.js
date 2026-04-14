let editMode = false;

// querying/filtering
async function searchByName() {
  const name = document.getElementById("searchName").value.trim();

  if (!name) {
    loadUsers();
    return;
  }

  const res = await fetch(`/search?name=${encodeURIComponent(name)}`);
  renderUsers(await res.json());
}

async function filterByAge() {
  const minAge = document.getElementById("minAge").value;

  if (!minAge) {
    loadUsers();
    return;
  }

  const res = await fetch(`/filter?minAge=${minAge}`);
  renderUsers(await res.json());
}

async function searchByHobby() {
  const hobby = document.getElementById("searchHobby").value.trim();

  if (!hobby) {
    loadUsers();
    return;
  }

  const res = await fetch(`/hobby?hobby=${encodeURIComponent(hobby)}`);
  renderUsers(await res.json());
}

// fetch all users from database
async function loadUsers() {
  const res = await fetch(`/users`);
  const users = await res.json();
  renderUsers(users);
}

function renderUsers(users) {
  const container = document.getElementById("userList");
  container.innerHTML = "";

  users.forEach(user => {
    const row = document.createElement("div");
    row.className = "user-row";

    const info = document.createElement("div");
    info.className = "user-info";
    info.innerHTML = `
      <b>${user.name}</b>
      <small>${user.bio || "No bio available"}</small>
      <p>Email: ${user.email}</p>
      <p>Age: ${user.age || "N/A"}</p>
      <p>Hobbies: ${user.hobbies.length > 0 ? user.hobbies.join(", ") : "None"}</p>
    `;

    const actions = document.createElement("div");

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.onclick = () => editUser(user);

    const delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.className = "danger";
    delBtn.onclick = () => deleteUser(user._id);

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    row.appendChild(info);
    row.appendChild(actions);
    container.appendChild(row);
  });
}

// form handling
function submitForm() {
  editMode ? updateUser() : addUser();
}

// create
async function addUser() {
  const user = collectFormData();
  if (!user) return;

  const res = await fetch(`/addUser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error || "Creation failed");
    return;
  }

  resetForm();
  loadUsers();
}

// update
async function updateUser() {
  const id = document.getElementById("userId").value;
  const user = collectFormData();
  if (!user) return;

  await fetch(`/updateUser/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  resetForm();
  loadUsers();
}

function editUser(user) {
  editMode = true;

  document.getElementById("formTitle").innerText = "Edit User";
  document.getElementById("submitBtn").innerText = "Update";

  document.getElementById("userId").value = user._id;
  document.getElementById("name").value = user.name;
  document.getElementById("email").value = user.email;
  document.getElementById("age").value = user.age || "";
  document.getElementById("hobbies").value = user.hobbies.join(",");
  document.getElementById("bio").value = user.bio || "";
}

function resetForm() {
  editMode = false;

  document.getElementById("formTitle").innerText = "Add User";
  document.getElementById("submitBtn").innerText = "Save";

  document.querySelectorAll(".form-panel input, .form-panel textarea")
    .forEach(el => el.value = "");
}

function collectFormData() {
  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const ageEl = document.getElementById("age");
  const hobbiesEl = document.getElementById("hobbies");
  const bioEl = document.getElementById("bio");

  if (!nameEl || !emailEl || !ageEl || !hobbiesEl || !bioEl) {
    console.error("Missing form elements");
    return null;
  }

  const ageValue = ageEl.value.trim();

  return {
    name: nameEl.value.trim(),
    email: emailEl.value.trim(),
    age: ageValue ? parseInt(ageValue) : undefined,
    hobbies: hobbiesEl.value
      ? hobbiesEl.value.split(",").map(h => h.trim())
      : [],
    bio: bioEl.value.trim()
  };
}

// delete
async function deleteUser(id) {
  await fetch(`/deleteUser/${id}`, { method: "DELETE" });
  loadUsers();
}

// initial load
loadUsers();