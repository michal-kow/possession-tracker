import Select from "react-select";
import { Container } from "../Container/Container";
import styles from "./SeriesContainer.module.css";
import { useEffect, useState } from "react";
import { getAllSeries } from "../../services/api/series";

type Measurement = {
  timestamp: string;
  value: number;
};

type Series = {
  _id: string;
  name: string;
  matchDate: string;
  color: string;
  minValue: number;
  maxValue: number;
  measurements: Measurement[];
};

export const SeriesContainer = () => {
  const [series, setSeries] = useState<Series[]>([]);

  useEffect(() => {
    const fetchSeries = async () => {
      const data = await getAllSeries();
      setSeries(data);
      console.log(data);
    };
    fetchSeries();
  }, []);

  const options = series.map((s) => ({
    value: s._id,
    label: `${s.name} - ${new Date(s.matchDate).toLocaleDateString()}`,
  }));

  return (
    <Container style={{ flex: 1 }}>
      <div className={styles.series}>Pick Series</div>
      <Select options={options} isMulti closeMenuOnSelect={false} />
    </Container>
  );
};
