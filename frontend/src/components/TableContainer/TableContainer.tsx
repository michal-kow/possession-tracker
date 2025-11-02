import { Container } from "../Container/Container";
import styles from "./TableContainer.module.css";

export const TableContainer = () => {
  return (
    <Container style={{ flex: 2 }}>
      <div className={styles.table}>TableContainer</div>
    </Container>
  );
};
