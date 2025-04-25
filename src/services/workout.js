const workoutModal = require("../model/workout");

const getAllWorkouts = () => {
  const allWorkouts = workoutModal.find({});
  return allWorkouts;
};

const getOneWorkout = (workoutId) => {
  const getWorkout = workoutModal.findById(workoutId);
  return getWorkout;
};

const createNewWorkout = async (body) => {
  const result = await workoutModal.create(body);
  return result;
};

const updateOneWorkout = async (workoutId, body) => {
  const result = await workoutModal.findByIdAndUpdate(workoutId, body, {
    new: true,
  });
  if (!result) {
    throw new Error("Workout not found");
  }

  return result;
};

const deleteOneWorkout = (workoutId) => {
  const deleteWorkOut = workoutModal.findByIdAndDelete(workoutId);
  if (!deleteWorkOut) {
    throw new Error("Workout not found or already deleted");
  }
  return deleteWorkOut;
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
