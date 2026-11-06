import React, { useState } from "react";
const Register = () => {
const [userName, setUserName] = useState("");
const [password, setPassword] = useState("");
const [email, setEmail] = useState("");
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const gohome = () => {
window.location.href = window.location.origin;
};
const register = async (e) => {
    e.preventDefault();
    const register_url = window.location.origin + "/djangoapp/register";
    const res = await fetch(register_url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName, password, firstName, lastName, email }),
});
const json = await res.json();
if (json.status) {
sessionStorage.setItem("username", json.userName);
window.location.href = window.location.origin;
} else if (json.error === "Already Registered") {
alert("The user with same username is already registered");
window.location.href = window.location.origin;
}
};
const inputStyle = {
  width: "100%", padding: "10px", marginBottom: "15px",
  border: "1px solid #ccc", borderRadius: "6px", fontSize: "16px",
};
return (
  <div>
    <nav style={{ backgroundColor: "darkturquoise", height: "1in", display: "flex", alignItems: "center", padding: "0 20px" }}>
      <h2 style={{ margin: 0 }}>Dealerships</h2>
      <a href="/" style={{ marginLeft: "40px", fontSize: "larger", color: "black", textDecoration: "none" }}>Home</a>
    </nav>
    <div style={{ maxWidth: "450px", margin: "50px auto", padding: "30px", border: "1px solid #ddd", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Sign Up</h2>
        <span onClick={gohome} style={{ cursor: "pointer", fontSize: "22px" }}>✕</span>
      </div>
      <hr />
      <form onSubmit={register}>
        <input type="text" placeholder="Username" style={inputStyle} onChange={(e) => setUserName(e.target.value)} required />
        <input type="text" placeholder="First Name" style={inputStyle} onChange= {(e) => setFirstName(e.target.value)} required />
        <input type="text" placeholder="Last Name" style={inputStyle} onChange= {(e) => setLastName(e.target.value)} required />
        <input type="email" placeholder="Email" style={inputStyle} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" style={inputStyle} onChange= {(e) => setPassword(e.target.value)} required />
        <input type="submit" value="Register" style={{ width: "100%", padding: "10px", backgroundColor: "darkturquoise", border: "none", borderRadius: "6px", fontSize: "18px", cursor: "pointer" }} />
      </form>
    </div>
  </div>
);
};
export default Register;