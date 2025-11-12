import { useEffect, useState } from "react";
import { changePassword, getUsers } from "../../services/api/users";
import { useUser } from "../../context/UserContext";

import styles from "./ChangePassword.module.css";

export const ChangePassword = () => {
  const [userId, setUserId] = useState();
  const [newPassword, setNewPassword] = useState("");

  const { username } = useUser();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      if (response.status === 200) {
        const users = response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        users.find((user: any) => {
          if (user.username === username) {
            setUserId(user._id);
          }
        });
      }
    };

    fetchUsers();
  }, [username]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    const response = await changePassword(userId, newPassword);

    if (response.status === 200) {
      alert("Password changed successfully");
      setNewPassword("");
    }
  };

  return (
    <div className={styles.changePasswordContainer}>
      <form onSubmit={handleChangePassword}>
        <label>New Password:</label>
        <input
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};
