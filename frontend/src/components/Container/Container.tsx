import type { ReactNode } from "react";
import styles from "./Container.module.css";

type Props = {
  children?: ReactNode;
  style?: React.CSSProperties;
};

export const Container = ({ children, style }: Props) => {
  return (
    <div className={styles.container} style={style}>
      {children}
    </div>
  );
};
