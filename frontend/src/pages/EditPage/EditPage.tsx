import { useState } from "react";
import { SingleSeriesSelector } from "../../components/SingleSeriesSelector/SingleSeriesSelector";
import type { Series } from "../../components/MultipleSeriesSelector/MultipleSeriesSelector";
import { EditSeriesForm } from "../../components/EditSeriesForm/EditSeriesForm";

export const EditPage = () => {
  const [selectedSeries, setSelectedSeries] = useState<
    Series | null | undefined
  >(null);

  return (
    <>
      <SingleSeriesSelector setSelectedSeries={setSelectedSeries} />
      {selectedSeries && <EditSeriesForm selectedSeries={selectedSeries} />}
    </>
  );
};
