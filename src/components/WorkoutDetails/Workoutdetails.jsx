import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useWorkoutsContext } from "../../hooks/WorkoutsContextHook";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function Workoutdetails(props) {
  const { title, load, reps, createdAt, _id } = props.workout;
  const { workouts, dispatch } = useWorkoutsContext();
  const newWorkouts = workouts.filter((workout) => {
    return workout._id !== _id;
  });
  async function handleDelete() {
    const rawResponse = await fetch(
      `https://zuxxy-workout-buddy-api.herokuapp.com/api/workouts/${_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ _id: _id }),
      }
    );
    const response = await rawResponse.json();
    if (rawResponse.ok) {
      dispatch({ type: "SET_WORKOUTS", payload: newWorkouts });
    }
    console.log(response);
  }
  return (
    <div className="workout-details">
      <h4>{title}</h4>
      <p>
        Load {`{KG}`}: {load}{" "}
      </p>
      <p>Reps: {reps} </p>
      <p>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
      <span onClick={handleDelete}>
        <DeleteIcon />
      </span>
    </div>
  );
}

export default Workoutdetails;
