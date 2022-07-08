import React from "react";
import { useState } from "react";
import { useWorkoutsContext } from "../../hooks/WorkoutsContextHook";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

const Workoutform = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { dispatch } = useWorkoutsContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const workout = { title, load, reps };

    const response = await fetch(
      "https://zuxxy-workout-buddy-api.herokuapp.com/api/workouts",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workout),
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      json.emptyFieldsArray && setEmptyFields(json.emptyFieldsArray);
    }
    if (response.ok) {
      setError(null);
      setTitle("");
      setLoad("");
      setReps("");
      setEmptyFields([]);
      console.log("new workout added:", json);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />

      <label>Number of Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />

      <Button type="submit" className="Button" endIcon={<AddIcon />}>
        Add Workout
      </Button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Workoutform;
