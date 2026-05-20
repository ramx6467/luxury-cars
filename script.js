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
window.onload = function () {
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
// OPEN BOOKING FORM
function openBooking(car) {
    document.getElementById("carName").value = car;
    display('sectionbooking1');
}


// BOOK CAR FUNCTION
function bookCar() {

    let name = document.getElementById("bookName").value;
    let email = document.getElementById("bookEmail").value;
    let phone = document.getElementById("bookPhone").value;
    let date = document.getElementById("bookDate").value;
    let car = document.getElementById("carName").value;
    let msg = document.getElementById("bookingMsg");

    if (name === "" || email === "" || phone === "" || date === "") {
        msg.innerHTML = "Please fill all booking details";
        msg.style.color = "red";
        return;
    }

    // Save booking in localStorage
    let bookings = JSON.parse(localStorage.getItem("carBookings")) || [];

    bookings.push({
        name: name,
        email: email,
        phone: phone,
        date: date,
        car: car
    });

    localStorage.setItem("carBookings", JSON.stringify(bookings));

    // SEND EMAIL
    emailjs.send("service_z06csiq", "template_gkw5fea", {
        customer_name: name,
        customer_email: email,
        phone: phone,
        booking_date: date,
        car_name: car
    }).then(function (response) {

        msg.innerHTML = "Car booked successfully! Confirmation mail sent.";
        msg.style.color = "lightgreen";

    }, function (error) {

        msg.innerHTML = "Booking saved but email failed!";
        msg.style.color = "orange";

    });

}