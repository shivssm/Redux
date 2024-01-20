// 06 Creating Reducer

// Reducer is a pure function which takes two arguments
// 1. initial state
// 2. object

// syntax:
// function reducer(state, action) {
// 	  how to handle action
// }

let  id = 0

export default function reducer(state = [], action) {

	switch(action.type) {
		case "ADD_TASK":
			return [
				...state, 
				{
					id: ++id,
					task: action.payload.task,
					completed: false
				}
			]

		case "REMOVE_TASK": 
			return state.filter(task => task.id !== action.payload.id);
		
		default: 
			return state;
	}

//    OR (Switch Case is Preferable)

	// if(action.type === "ADD_TASK") {
	// 	return [
	// 		...state, 
	// 		{
	// 			id: ++id,
	// 			task: action.payload.task,
	// 			completed: false
	// 		}
	// 	]
	// }
	
	// else if(action.type === "REMOVE_TASK") {
	// 	return state.filter(task => task.id !== action.payload.id); 
	// }
	
	// return state
}