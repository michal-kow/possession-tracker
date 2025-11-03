import Select, { type MultiValue } from "react-select";
import { Container } from "../Container/Container";
import styles from "./SeriesContainer.module.css";
import { useEffect, useState } from "react";
import { getAllSeries } from "../../services/api/series";
import { useSeries } from "../../context/SeriesContext";

type Measurement = {
  timestamp: string;
  value: number;
};

export type Series = {
  _id: string;
  name: string;
  matchDate: string;
  color: string;
  minValue: number;
  maxValue: number;
  measurements: Measurement[];
};

type Option = {
  value: string;
  label: string;
};

export const SeriesContainer = () => {
  const [series, setSeries] = useState<Series[]>([]);
  const { setSelectedSeries } = useSeries();

  useEffect(() => {
    const fetchSeries = async () => {
      const data = await getAllSeries();
      setSeries(data);
    };
    fetchSeries();
  }, []);

  const options: Option[] = series.map((s) => ({
    value: s._id,
    label: `${s.name} - ${new Date(s.matchDate).toLocaleDateString()}`,
  }));

  const handleOnChange = (selectedOptions: MultiValue<Option>) => {
    setSelectedSeries(
      selectedOptions
        .map((option) => series.find((s) => s._id === option.value)!)
        .filter((s): s is Series => s !== undefined)
    );
  };

  return (
    <Container style={{ flex: 1 }}>
      <div className={styles.series}>Pick Series</div>
      <Select
        options={options}
        isMulti
        closeMenuOnSelect={false}
        onChange={handleOnChange}
      />
    </Container>
  );
};
