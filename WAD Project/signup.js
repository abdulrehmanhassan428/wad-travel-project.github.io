document.addEventListener("DOMContentLoaded", function () {

    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    const form = document.getElementById("signupForm");
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    const userError = document.createElement("p");
    const emailError = document.createElement("p");
    const passError = document.createElement("p");
    const confirmError = document.createElement("p");

    userError.style.color = "red";
    emailError.style.color = "red";
    passError.style.color = "red";
    confirmError.style.color = "red";

    username.after(userError);
    email.after(emailError);
    password.after(passError);
    confirmPassword.after(confirmError);

    form.addEventListener("submit", async function(event){
        event.preventDefault(); 
        let isValid = true;

        userError.textContent = "";
        emailError.textContent = "";
        passError.textContent = "";
        confirmError.textContent = "";

        if (!usernameRegex.test(username.value.trim())) {
            userError.textContent = "Username must be at least 3 characters and contain only letters, numbers, or underscores.";
            isValid = false;
        }

        
        if (!emailRegex.test(email.value.trim())) {
            emailError.textContent = "Please enter a valid email address.";
            isValid = false;
        }

        if (!passwordRegex.test(password.value.trim())) {
            passError.textContent = "Password must be at least 6 characters and include uppercase, lowercase, number, and symbol.";
            isValid = false;
        }

        if (password.value.trim() !== confirmPassword.value.trim()) {
            confirmError.textContent = "Passwords do not match.";
            isValid = false;
        }

        if (isValid) {
            const data = {
                username: username.value.trim(),
                email: email.value.trim(),
                password: password.value.trim()
            };

            try {
                const response = await fetch("http://localhost:3000/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                alert(result.message);

                if (result.message === "Signup successful") {
                    window.location.href = "login.html";
                }

            } catch (error) {
                alert("Server error. Please try again later.");
            }
        }
    });
});
