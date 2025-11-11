import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { signUp } from "../../services/api/users";
import styles from "./SignUpPage.module.css";
import { useUser } from "../../context/UserContext";

export const SignUpPage = () => {
  const { setUsername: setUsernameContext, setAccessToken } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await signUp(username, password);
    if (response.status === 201) {
      setUsernameContext(response.data.user.username);
      setAccessToken(response.data.accessToken);
      return navigate("/");
    } else {
      setMessage(response.data.message || "Sign up failed");
    }
  };

  return (
    <div className={styles.signUpPage}>
      <form onSubmit={handleSignUp}>
        <h2>Sign up</h2>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign up</button>
        {message && <p>{message}</p>}
        <div className={styles.loginLink}>
          <p>Already have an account?</p>
          <Link to="/login">Log in</Link>
        </div>
      </form>
    </div>
  );
};
