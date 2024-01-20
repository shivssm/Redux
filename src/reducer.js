import {ADD_TASK, REMOVE_TASK} from "./actionTypes";

let  id = 0

export default function reducer(state = [], action) {

	switch(action.type) {
		case ADD_TASK:
			return [
				...state, 
				{
					id: ++id,
					task: action.payload.task,
					completed: false
				}
			]

		case REMOVE_TASK: 
			return state.filter(task => task.id !== action.payload.id);
		
		default: 
			return state;
	}
}