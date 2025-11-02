import { Container } from "../Container/Container";
import styles from "./GraphContainer.module.css";

export const GraphContainer = () => {
  return (
    <Container style={{ flex: 5 }}>
      <div className={styles.graph}>GraphContainer</div>
    </Container>
  );
};
