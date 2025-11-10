import { Container } from "../Container/Container";
import type { Series } from "../MultipleSeriesSelector/MultipleSeriesSelector";
import { EditMeasurementsForm } from "./components/EditMeasurementsForm/EditMeasurementsForm";
import { EditSeriesForm } from "./components/EditSeriesForm/EditSeriesForm";
import styles from "./EditSeriesContainer.module.css";

type EditSeriesContainerProps = {
  selectedSeries: Series | null;
  setSelectedSeries: (series: Series | null) => void;
};

export const EditSeriesContainer = ({
  selectedSeries,
  setSelectedSeries,
}: EditSeriesContainerProps) => {
  return (
    <div className={styles.editSeriesForm}>
      <Container>
        <EditSeriesForm selectedSeries={selectedSeries} />
      </Container>
      <Container>
        <EditMeasurementsForm
          selectedSeries={selectedSeries}
          setSelectedSeries={setSelectedSeries}
        />
      </Container>
    </div>
  );
};
