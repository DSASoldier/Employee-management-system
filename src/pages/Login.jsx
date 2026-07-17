import { useState, useContext } from "react";
import { UserContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import cat from "../assets/ems.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailMessage, setEmailMessage] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState(false);
  const [message, setMessage] = useState(false);

  const contextData = useContext(UserContext);
  const users = contextData.users;
  const getEmail = contextData.getEmail;

  const navigation = useNavigate();

  function validateEmail(email) {
    const regex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  function validatePassword(password) {
    const regex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[^\s]+$/;
    return regex.test(password);
  }

  function emailChangeHandler(e) {
    setEmail(e.target.value);
    setEmailMessage(false);
    setMessage(false);
  }

  function passwordValue(e) {
    setPassword(e.target.value);
    setPasswordMessage(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (users.length === 0) {
      alert("Please wait while users are loading.");
      return;
    }

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    setEmailMessage(!isEmailValid);
    setPasswordMessage(!isPasswordValid);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    const formattedEmail = email.trim().toLowerCase();

    const user = users.find(
      (item) =>
        item.email.trim().toLowerCase() === formattedEmail
    );

    if (user) {
      localStorage.setItem("token", formattedEmail);
      getEmail();
      navigation("/login-dashboard");
      return;
    }

    // Admin login (temporary)
    if (formattedEmail === "sudeepchatterje70@gmail.com") {
      navigation("/login-dashboard");
      return;
    }

    setMessage(true);
  }

  return (
    <div
      className="login-root-container"
      style={{ backgroundImage: `url(${cat})` }}
    >
      <div className="login-overlay"></div>

      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-title">Employee Management</h1>

        <p className="login-subtitle">
          Welcome Back 👋
        </p>

        <label className="login-label">
          Email Address
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={emailChangeHandler}
          className="login-text"
          autoComplete="email"
        />

        {emailMessage && (
          <p className="login-error-message">
            Please enter a valid email address.
          </p>
        )}

        <label className="login-label">
          Password
        </label>

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={passwordValue}
          className="login-text"
          autoComplete="current-password"
        />

        {passwordMessage && (
          <p className="login-error-message">
            Password must contain at least one uppercase
            letter and one special character.
          </p>
        )}

        <button
          className="login-submit-button"
          disabled={users.length === 0}
        >
          {users.length === 0 ? "Loading..." : "Login"}
        </button>

        {message && (
          <p className="login-error-message">
            Invalid email or password.
          </p>
        )}
      </form>
    </div>
  );
}