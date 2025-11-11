import { useEffect, useState, type FormEvent } from "react";
import type { Series } from "../../../MultipleSeriesSelector/MultipleSeriesSelector";
import styles from "./EditSeriesForm.module.css";
import { deleteSeries, updateSeries } from "../../../../services/api/series";

type SeriesFormProps = {
  selectedSeries: Series | null;
  setSelectedSeries: (series: Series | null) => void;
};

export const EditSeriesForm = ({
  selectedSeries,
  setSelectedSeries,
}: SeriesFormProps) => {
  const [name, setName] = useState(selectedSeries?.name ?? "");
  const [color, setColor] = useState(selectedSeries?.color ?? "");
  const [matchDate, setMatchDate] = useState(selectedSeries?.matchDate ?? "");
  const [minValue, setMinValue] = useState(selectedSeries?.minValue ?? "");
  const [maxValue, setMaxValue] = useState(selectedSeries?.maxValue ?? "");
  const [message, setMessage] = useState({ msg: "", color: "" });

  useEffect(() => {
    if (selectedSeries) {
      setName(selectedSeries.name);
      setColor(selectedSeries.color);
      setMatchDate(selectedSeries.matchDate);
      setMinValue(selectedSeries.minValue);
      setMaxValue(selectedSeries.maxValue);
    }
  }, [selectedSeries]);

  const showMessage = (msg: string, color: string) => {
    setMessage({ msg, color });
    setTimeout(() => setMessage({ msg: "", color: "" }), 3000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || typeof name !== "string") {
      showMessage("Name is required and must be a string.", "red");
      return;
    }

    if (
      !color ||
      typeof color !== "string" ||
      color.length !== 7 ||
      color[0] !== "#"
    ) {
      showMessage(
        "Color is required and must be a string in the format #RRGGBB.",
        "red"
      );
      return;
    }

    if (
      !matchDate ||
      typeof matchDate !== "string" ||
      !new Date(matchDate).getTime()
    ) {
      showMessage(
        "Match date is required and must be a valid date string.",
        "red"
      );
      return;
    }

    if (
      isNaN(Number(minValue)) ||
      Number(minValue) < 0 ||
      Number(minValue) > 100
    ) {
      showMessage(
        "Minimum value is required and must be between 0 and 100.",
        "red"
      );
      return;
    }

    if (
      isNaN(Number(maxValue)) ||
      Number(maxValue) < 0 ||
      Number(maxValue) > 100
    ) {
      showMessage(
        "Maximum value is required and must be between 0 and 100.",
        "red"
      );
      return;
    }

    if (Number(minValue) >= Number(maxValue)) {
      showMessage("Maximum value must be greater than minimum value.", "red");
      return;
    }

    const response = await updateSeries(selectedSeries!._id, {
      name,
      color,
      matchDate,
      minValue: Number(minValue),
      maxValue: Number(maxValue),
    });

    if (response.data.error) {
      showMessage(`Error updating series: ${response.data.error}`, "red");
      return;
    }

    showMessage("Series updated successfully!", "green");
  };

  const handleDeleteSeries = async () => {
    await deleteSeries(selectedSeries!._id);
    setSelectedSeries(null);
  };

  return (
    <div className={styles.editSeries}>
      <h3 className={styles.title}>Edit series</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="series-name">Name</label>
          <input
            type="text"
            id="series-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="series-color">Color</label>
          <input
            type="text"
            id="series-color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="series-match-date">Match date</label>
          <input
            type="text"
            id="series-match-date"
            value={matchDate}
            onChange={(e) => setMatchDate(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="series-min-value">Minimum value</label>
          <input
            type="text"
            id="series-min-value"
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="series-max-value">Maximum value</label>
          <input
            type="text"
            id="series-max-value"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`${styles.button} ${styles.submitButton}`}
        >
          Save changes
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.deleteButton}`}
          onClick={handleDeleteSeries}
        >
          Delete series
        </button>
      </form>
      {message && (
        <p className={styles.message} style={{ color: message.color }}>
          {message.msg}
        </p>
      )}
    </div>
  );
};
