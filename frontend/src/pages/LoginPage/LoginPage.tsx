import { useState } from "react";
import { login } from "../../services/api/auth";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router";
import { useUser } from "../../context/UserContext";

export const LoginPage = () => {
  const { setUsername: setContextUsername, setAccessToken } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await login(username, password);
      if (response.status === 200) {
        setContextUsername(response.data.user.username);
        setAccessToken(response.data.accessToken);
        navigate("/");
      } else {
        setMessage(response.data.message || "Login failed");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className={styles.loginPage}>
      <form onSubmit={handleLogin}>
        <h2>Log in</h2>
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
        <button type="submit">Log in</button>
        {message && <p className={styles.errorMessage}>{message}</p>}
        <div className={styles.registerLink}>
          <p>Don't have an account?</p>
          <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
};
