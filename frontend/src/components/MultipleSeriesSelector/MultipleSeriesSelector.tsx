import Select, { type MultiValue } from "react-select";
import { Container } from "../Container/Container";
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

export type SeriesWithNormalizedTimestamps = Omit<Series, "measurements"> & {
  measurements: {
    timestamp: number;
    value: number;
  }[];
};

export type Option = {
  value: string;
  label: string;
};

export const MultipleSeriesSelector = () => {
  const { allSeries, setSelectedSeries } = useSeries();

  const options: Option[] = allSeries.map((s) => ({
    value: s._id,
    label: `${s.name} - ${new Date(s.matchDate).toLocaleDateString()}`,
  }));

  const handleOnChange = (selectedOptions: MultiValue<Option>) => {
    setSelectedSeries(
      selectedOptions
        .map((option) => allSeries.find((s) => s._id === option.value)!)
        .filter((s): s is Series => s !== undefined)
    );
  };

  return (
    <Container style={{ flex: 1 }}>
      <Select
        options={options}
        isMulti
        closeMenuOnSelect={false}
        onChange={handleOnChange}
      />
    </Container>
  );
};
