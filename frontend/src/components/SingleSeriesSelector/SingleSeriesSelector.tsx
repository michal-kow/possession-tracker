import { Container } from "../Container/Container";
import Select from "react-select";
import type {
  Option,
  Series,
} from "../MultipleSeriesSelector/MultipleSeriesSelector";
import { useSeries } from "../../context/SeriesContext";

type SingleSeriesSelectorProps = {
  setSelectedSeries: (series: Series | null | undefined) => void;
};

export const SingleSeriesSelector = ({
  setSelectedSeries,
}: SingleSeriesSelectorProps) => {
  const { allSeries } = useSeries();

  const handleOnChange = (option: Option | null) => {
    setSelectedSeries(
      option ? allSeries.find((s) => s._id === option.value) : null
    );
  };

  const options: Option[] = allSeries.map((s) => ({
    value: s._id,
    label: `${s.name} - ${new Date(s.matchDate).toLocaleDateString()}`,
  }));

  return (
    <Container>
      <Select options={options} onChange={handleOnChange} />
    </Container>
  );
};
