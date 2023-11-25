// script.js
 document.addEventListener("DOMContentLoaded", function () {
    // Get the container where the app will be rendered
    const appContainer = document.getElementById("app");

    // Check if the user is logged in
    const accessToken = localStorage.getItem("email");
    if (accessToken) {
        // User is logged in, show the profile page
        showProfilePage();
    } else {
        // User is not logged in, show the signup page
        showSignupPage();
    }

    // Function to display the Signup Page
    function showSignupPage() {
        // Render the Signup Page HTML
        appContainer.innerHTML = `
           
           <div class="container signup-form">
           <p>Welcome back!<img src="./assets/icons8-waving-hand-emoji-48.png" alt=""></p>
           <h2>Sign up to your account</h2>
           <form id="signup-form">
               <label for="name">Your name</label>
               <input type="text" id="name" required>

               <label for="email">Your email</label>
               <input type="email" id="email" required>

               <label for="password">Password</label>
               <input type="password" id="password" required>

               <label for="confirm-password">Confirm password</label>
               <input type="password" id="confirm-password" required>

               <button type="button" id="continue-btn">Continue</button>
               <p class="error-message" id="error-message" style="color: blue;"></p>
           </form>
           
       </div>
           <p class="para">Don't have an account? <a href="#" id="signup-link"> Sign Up</a></p>
           
        `;
    
        const signupForm = document.getElementById("signup-form");
        const continueBtn = document.getElementById("continue-btn");
    
        // Add click event listener to the Continue button
        continueBtn.addEventListener("click", function () {
            validateAndSubmitForm();
        });
    
        // Add event listener for the Signup link (if needed)
        const signupLink = document.getElementById("signup-link");
        signupLink.addEventListener("click", function (event) {
            event.preventDefault();
            showSignupPage();
        });
    
        function validateAndSubmitForm() {
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirm-password").value;
    
            // Check if any field is left blank
            if (!name || !email || !password || !confirmPassword) {
                displayErrorMessage("Error: All fields are mandatory!");
                return;
            }
    
            // Check if passwords match
            if (password !== confirmPassword) {
                displayErrorMessage("Error: Passwords do not match");
                return;
            }
            // Save all user details to local storage
            localStorage.setItem("name", name);
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
        
            // Generate a random access token
            const accessToken = generateAccessToken();
           

            // Save access token to local storage
            localStorage.setItem("accessToken", accessToken);
    
    
            // Display success message
            displayMessage("Signup Successful!", "success");
            // Redirect to the profile page
            showProfilePage();
                    // Add event listener for the Signup link (if needed)
            const signupLink = document.getElementById("signup-link");
            signupLink.addEventListener("click", function (event) {
                event.preventDefault();
                showSignupPage();
            });

        }
    }

    // Function to display the Profile Page
    function showProfilePage() {
        // Retrieve user details from local storage
        const name = localStorage.getItem("name");
        const email = localStorage.getItem("email");
        const accessToken = localStorage.getItem("accessToken");

        // Render the Profile Page HTML
        appContainer.innerHTML = `
             <div class= "profBg"></div>
            <div class="container profile-page">
                <h2 style="color: blue;">Signup Successful!</h2>
                <div class="profile-card">
                    <h3>Profile</h3>
                    <p><img src="./assets/profile.png" alt="profile"></p>
                    <p><strong>Full Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Token:</strong> ${accessToken}</p>
                    <p><strong>Password:</strong> *********</p>
                    <button id="logout-btn">Logout</button>
                </div>
            </div>
        `;

        // Add event listener for the Logout button
        document.getElementById("logout-btn").addEventListener("click", function () {
            // Clear local storage
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            // Redirect to the signup page
            showSignupPage();
        });
    }

   // Function to display an error message
function displayErrorMessage(message) {
    const errorMessage = document.getElementById("error-message");
    errorMessage.innerText = message;
    errorMessage.classList.add("error-message");  // Add this line
}

    // Function to display a general message with specified color
    function displayMessage(message, type) {
        const messageContainer = document.getElementById("error-message");
        messageContainer.innerText = message;

        if (type === "success") {
            messageContainer.classList.remove("error-message");
            messageContainer.classList.add("success-message");
        } else {
            messageContainer.classList.remove("success-message");
            messageContainer.classList.add("error-message");
        }
    }

    // Function to generate a random access token (for demonstration purposes)
    function generateAccessToken() {
        // Implement your logic to generate a random access token
        // For simplicity, you can use a library like uuid or generate a random string
        return uuidv4();
    }
});
