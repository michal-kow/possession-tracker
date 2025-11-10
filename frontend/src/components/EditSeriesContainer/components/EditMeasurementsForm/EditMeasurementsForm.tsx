import { useEffect, useState, type MouseEvent } from "react";
import type { Series } from "../../../MultipleSeriesSelector/MultipleSeriesSelector";
import {
  denormalizeTimestamp,
  normalizeTimestamp,
} from "../../../../helpers/normalizeTimestamps";
import styles from "./EditMeasurementsForm.module.css";
import {
  createMeasurement,
  updateMeasurement,
} from "../../../../services/api/series";
import { useSeries } from "../../../../context/SeriesContext";

type EditMeasurementsFormProps = {
  selectedSeries: Series | null;
  setSelectedSeries: (series: Series | null) => void;
};

export const EditMeasurementsForm = ({
  selectedSeries,
  setSelectedSeries,
}: EditMeasurementsFormProps) => {
  const { refetchSeries } = useSeries();

  const [localSelectedSeries, setLocalSelectedSeries] = useState<Series | null>(
    selectedSeries
  );
  const [savedSeries, setSavedSeries] = useState<Series | null>(selectedSeries);

  useEffect(() => {
    setLocalSelectedSeries(selectedSeries);
    setSavedSeries(selectedSeries);
  }, [selectedSeries]);

  const minutes: number[] = Array.from({ length: 90 }, (_, i) => i + 1);

  const handleChangeMeasurementValue = (newValue: string, minute: number) => {
    if (!localSelectedSeries) return;

    const updatedMeasurements = [...localSelectedSeries.measurements];
    const measurementIndex = updatedMeasurements.findIndex(
      (m) =>
        (new Date(m.timestamp).getTime() -
          new Date(localSelectedSeries.matchDate).getTime()) /
          1000 /
          60 ===
        minute
    );

    if (measurementIndex !== -1) {
      updatedMeasurements[measurementIndex] = {
        ...updatedMeasurements[measurementIndex],
        value: newValue as unknown as number,
      };
    } else {
      updatedMeasurements.push({
        _id: Math.random().toString(16).slice(2),
        timestamp: denormalizeTimestamp(localSelectedSeries, minute),
        value: newValue as unknown as number,
      });
    }

    setLocalSelectedSeries({
      ...localSelectedSeries,
      measurements: updatedMeasurements,
    });
  };

  const handleCanSaveOne = (minute: number) => {
    if (!localSelectedSeries) return false;

    const measurement = localSelectedSeries.measurements.find(
      (m) => normalizeTimestamp(localSelectedSeries, m.timestamp) === minute
    );
    if (!measurement?.value || isNaN(Number(measurement.value))) return false;

    const savedMeasurement = savedSeries?.measurements.find(
      (m) => normalizeTimestamp(savedSeries, m.timestamp) === minute
    );
    if (!savedMeasurement) return true;

    return measurement.value !== savedMeasurement.value;
  };

  const handleSaveOne = async (
    e: MouseEvent<HTMLButtonElement>,
    minute: number
  ) => {
    e.preventDefault();

    if (!localSelectedSeries) return;

    const measurement = localSelectedSeries.measurements.find(
      (m) => normalizeTimestamp(localSelectedSeries, m.timestamp) === minute
    );
    if (!measurement) return;

    const savedMeasurementIndex = savedSeries?.measurements.findIndex(
      (m) => normalizeTimestamp(savedSeries, m.timestamp) === minute
    );

    if (savedMeasurementIndex === -1) {
      await createMeasurement(localSelectedSeries._id, {
        timestamp: measurement.timestamp,
        value: Number(measurement.value),
      });
    } else {
      await updateMeasurement(localSelectedSeries._id, measurement._id, {
        timestamp: measurement.timestamp,
        value: Number(measurement.value),
      });
    }

    setSavedSeries(localSelectedSeries);
    setSelectedSeries(localSelectedSeries);
    refetchSeries();
  };

  return (
    <div className={styles.editMeasurements}>
      <h3>Edit measurements</h3>
      <table className={styles.measurementsTable}>
        <thead>
          <tr>
            <th>Minute</th>
            <th>Value [%]</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {minutes.map((minute) => {
            const measurement = localSelectedSeries?.measurements.find(
              (m) =>
                normalizeTimestamp(localSelectedSeries, m.timestamp) === minute
            ) || {
              timestamp: denormalizeTimestamp(localSelectedSeries, minute),
              value: "",
            };

            return (
              <tr key={minute}>
                <td>
                  {normalizeTimestamp(
                    localSelectedSeries,
                    measurement.timestamp
                  )}
                </td>
                <td>
                  <input
                    type="text"
                    value={measurement.value}
                    onChange={(e) =>
                      handleChangeMeasurementValue(e.target.value, minute)
                    }
                  />
                </td>
                <td>
                  <button
                    className={styles.saveButton}
                    onClick={(e) => handleSaveOne(e, minute)}
                    disabled={!handleCanSaveOne(minute)}
                  >
                    Save
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
