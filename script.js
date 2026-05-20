// show login or signup
function showSignup() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "block";
}

function showLogin() {
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}


// SIGNUP FUNCTION
function signupUser() {

    let username = document.getElementById("signupUser").value;
    let password = document.getElementById("signupPass").value;
    let error = document.getElementById("signupError");

    if (username === "" || password === "") {
        error.innerHTML = "Please fill all fields";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // check if username already exists
    let exists = users.find(user => user.username === username);

    if (exists) {
        error.innerHTML = "Username already exists";
        return;
    }

    // save user
    users.push({
        username: username,
        password: password
    });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully! Please login.");
    showLogin();
}


// LOGIN FUNCTION
function loginUser() {

    let username = document.getElementById("loginUser").value;
    let password = document.getElementById("loginPass").value;
    let error = document.getElementById("loginError");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let validUser = users.find(user => user.username === username && user.password === password);

    if (validUser) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", username);

        display('sectionpageone');
    } else {
        error.innerHTML = "Invalid username or password";
    }
}


// AUTO LOGIN CHECK
window.onload = function() {
    if (localStorage.getItem("isLoggedIn") === "true") {
        display('sectionpageone');
    } else {
        display('sectionauth');
    }
}


// LOGOUT FUNCTION
function logoutUser() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");

    display('sectionauth');
}