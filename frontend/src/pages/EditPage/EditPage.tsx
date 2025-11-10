import { useEffect, useState } from "react";
import { SingleSeriesSelector } from "../../components/SingleSeriesSelector/SingleSeriesSelector";
import type { Series } from "../../components/MultipleSeriesSelector/MultipleSeriesSelector";
import { EditSeriesContainer } from "../../components/EditSeriesContainer/EditSeriesContainer";
import { useSeries } from "../../context/SeriesContext";

export const EditPage = () => {
  const [selectedSeries, setSelectedSeries] = useState<
    Series | null | undefined
  >(null);

  const { refetchSeries } = useSeries();

  useEffect(() => {
    refetchSeries();
  }, [refetchSeries]);

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
