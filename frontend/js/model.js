export const register = function (name, email, password) {
  async function register(ev) {
    ev.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      setRedirect(true);
      alert("Registration Successful !! Redirecting you to Login.");
    } catch (e) {
      alert("Registration Failed. Please try again later");
    }
  }
};
