import { useState } from "react";
import { SingleSeriesSelector } from "../../components/SingleSeriesSelector/SingleSeriesSelector";
import type { Series } from "../../components/MultipleSeriesSelector/MultipleSeriesSelector";
import { EditSeriesContainer } from "../../components/EditSeriesContainer/EditSeriesContainer";

export const EditPage = () => {
  const [selectedSeries, setSelectedSeries] = useState<
    Series | null | undefined
  >(null);

  return (
    <>
      <SingleSeriesSelector setSelectedSeries={setSelectedSeries} />
      {selectedSeries && (
        <EditSeriesContainer
          selectedSeries={selectedSeries}
          setSelectedSeries={setSelectedSeries}
        />
      )}
    </>
  );
};
