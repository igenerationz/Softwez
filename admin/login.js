const ADMIN_EMAIL = "igenerationofficial@gmail.com";

const loginBtn = document.getElementById("loginBtn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");

async function loginAdmin() {

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        message.textContent = "Please enter email and password.";
        return;
    }

    loginBtn.disabled = true;
    loginBtn.textContent = "Logging in...";
    message.textContent = "Connecting to Supabase...";

    try {

        // Make sure Supabase client exists
        if (typeof supabaseClient === "undefined") {
            throw new Error(
                "Supabase client could not load. Check supabase-config.js path."
            );
        }

        const result = await Promise.race([

            supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            }),

            new Promise((_, reject) =>
                setTimeout(() => {
                    reject(
                        new Error(
                            "Supabase request timed out after 15 seconds."
                        )
                    );
                }, 15000)
            )

        ]);

        const { data, error } = result;

        console.log("Supabase login response:", data);
        console.log("Supabase login error:", error);

        if (error) {
            throw error;
        }

        const loggedInEmail =
            data.user?.email?.toLowerCase();

        if (
            loggedInEmail !==
            ADMIN_EMAIL.toLowerCase()
        ) {

            await supabaseClient.auth.signOut();

            throw new Error(
                "Access denied. Admin account required."
            );
        }

        message.textContent =
            "Login successful. Redirecting...";

        window.location.href = "index.html";

    } catch (error) {

        console.error("LOGIN ERROR:", error);

        message.textContent =
            error.message || "Login failed.";

        loginBtn.disabled = false;
        loginBtn.textContent = "Login";
    }
}


loginBtn.addEventListener(
    "click",
    loginAdmin
);


[emailInput, passwordInput].forEach(input => {

    input.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {
                loginAdmin();
            }

        }
    );

});