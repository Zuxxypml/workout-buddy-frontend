import React, { useEffect } from "react";
import Workoutdetails from "../../components/WorkoutDetails/Workoutdetails";
import Workoutform from "../../components/WorkoutForm/Workoutform";
import { useWorkoutsContext } from "../../hooks/WorkoutsContextHook";
function Indexpage() {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(
        "https://zuxxy-workout-buddy-api.herokuapp.com/api/workouts"
      );
      const { msg } = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: msg });
      }
    };
    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <Workoutdetails
              key={workout._id}
              workout={workout}
            ></Workoutdetails>
          ))}
      </div>
      <Workoutform></Workoutform>
    </div>
  );
}

export default Indexpage;
