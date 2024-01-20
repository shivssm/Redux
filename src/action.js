import { ADD_TASK, REMOVE_TASK, TASK_COMPLETED } from "./actionTypes"

export const addTask = (task) => {
	return { type: ADD_TASK, payload: { task: task } }
}

export const removeTask = (id) => {
	return { type: REMOVE_TASK, payload: {id: id} }
}

export const completedTask = (id) => {
    return {type: TASK_COMPLETED, payload: {id: id} }
}