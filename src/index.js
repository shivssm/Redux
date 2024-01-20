import store from "./store";
import {addTask, removeTask} from "./action";

store.subscribe(() => {
	console.log("Updated", store.getState());
})

const unsubscribe = store.subscribe(() => {
	console.log("Updated", store.getState());
})


store.dispatch(addTask("Task 1"));
console.log(store.getState());

unsubscribe();

store.dispatch(removeTask(1));
console.log(store.getState());