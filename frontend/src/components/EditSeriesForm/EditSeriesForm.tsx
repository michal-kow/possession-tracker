import { Container } from "../Container/Container";
import type { Series } from "../MultipleSeriesSelector/MultipleSeriesSelector";

type EditSeriesFormProps = {
  selectedSeries: Series | null;
};

export const EditSeriesForm = ({ selectedSeries }: EditSeriesFormProps) => {
  return <Container>{selectedSeries?._id}</Container>;
};
