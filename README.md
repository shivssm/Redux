# Redux
# Learning Redux and Redux-toolkit

Q.How Redux works?

-> We use Redux for managing the state of web application which have
little complex UI application.

In Redux, we store our applications all state in a single object 
called store. 

When some component needs a data of particular thing, then we get that
state from the single place, which is store.

Ex- store of a social media website.

store = {
	user: [{...}],
	posts: [{...}],
	friends: [{...}],
	notifications: [{...}],
	chats: [{...}]
}

Designing of store is up to us but one application has only one Redux store

-To update this store state, we use a pure function called reducer.
														----------
This reducer takes the current state as argument and return the 
updated state.

function reducer(state){
	// for updating store
}

-How Reducer know when to perform which task like add, delete?

-> for that we pass one more argument in that function called action.
function reducer(state, action){
	// for updating store
}
By using action parameter we can tell reduer which task they have to perform.

So there are three main thing about Redux: Action, Store, Reducer.

- How these three things work together? Explain with example To-do list.
-> When user add a new task: 
-which means user dispatch an action to the Redux store.
-Redux store pass this action to reducer.
-Reducer perform the action and update the store values.
-So we can directly call reducers, we have to use store for calling reducer

Actions - What to do
Reducer - How to do
Store - Keep data in single place

---------------------------------------------------------------------

Section 03 - Introduction of application

We will build To-do Application, where we will 
-Add the tasks
-Remove the tasks
-Mark as completed

Steps for implementing redux
>Designing the store
>List our actions (What to do)
>Create reducer function (How to do)
>Create redux store

---------------------------------------------------------------
>Designing the store
-To add task in our application - We store all our task details
in array. So our store look like this
[
	{
		id: 1,
		task: "Design store",
		completed: false
	}, {...}, {...}
]
---------------------------------------------------------------
>Listing all actions
> ADD_TASK 
> REMOVE_TASK
> TASK_COMPLETED

Action = What to do
In Redux, every action is an object and structure of this object
is fixed. They have at least one property, which is type.

const addTaskAction = 
{
	type: "ADD_TASK", //we can also use numbers instead of string,
						this clearly defines the purpose of tasks
	payload: {   // we have all data related to the action
		task: "This is new task!" 
	}
}

const removeTaskAction = 
{
	type: "REMOVE_TASK",
	id: 1 //we can remove a task by a particular task id.
}

--------------------------------------------------------------
06 Creating Reducer

Reducer is a pure function which takes two arguments
1. initial state
2. object

syntax:
function reducer(state, action) {
	//how to handle action
}

inside src-> newFile -> reducer.js

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
			],
		case "REMOVE_TASK": 
			return state.filter(task => task.id !== action.payload.id);,
		
		default: 
			return state;
	}

   OR (Switch Case is Preferable)

	if(action.type === "ADD_TASK") {
		return [
			...state, 
			{
				id: ++id,
				task: action.payload.task,
				completed: false
			}
		]
	}
	
	else if(action.type === "REMOVE_TASK") {
		return state.filter(task => task.id !== action.payload.id); 
	}
	
	return state
}

-----------------------------------------------------------------------

07 Creating redux store

create new file -> store.js

We use createStore method from Redux to create store.
inside createStore() we have to pass root reducer.
Root Reducer is just a combination of all reducers.
Now, createStore() will return store with its method.
let's store that in store variable and export it


first install redux - npm i redux


import {legacy_createStore as createStore} from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

export default store;

----

create new file -> index.js

import the store and console.log this store
we get the store in console, we will get the methods like dispatch for dispatching the action,
getState for getting the current state.

if we console log store.getState(),  we will get empty array.


import store from './store'

console.log(store)
console.log(store.getState())

---------------------------------------------------------------------
08 Dispatching the actions
We can dispatch action using dispatch method.
Previously we design action  that is an objectwith two properties, 
first one is type and second one is payload which holds all data.
Pass those in dispatch method.

index.js file
--------------
import store from './store'

store.dispatch({type: "ADD_TASK", payload: {task: "Task 1"}}); //Add Task

store.dispatch({type: "REMOVE_TASK", payload: {id: 1}}); //Remove Task

console.log(store.getState());

In this you observe, we have to write big object for dispatching each action.
and that will make our code messy. So let's define our action in separate file.

create new file action.js
--------------------------

export const addTask = (task) => {
	return { type: "ADD_TASK", payload: { task: task } }
}

export const removeTask = (id) => {
	return { type: "REMOVE_TASK", payload: {id: id} }
}


index.js file
--------------
Now import the addTask function from action and pass the task details in dispatch
method.

import store from "./store";
import {addTask, removeTask} from "./action";

store.dispatch(addTask("Task 1"));
console.log(store.getState());

store.dispatch(removeTask(1));
console.log(store.getState());

----------------------------------------------------------------------------------
Section 03
-----------
09 Making ActionTypes

There is one little issue with our current implementation. In reducer function and
in action, we have to pass the same action string.

if someday, we decide to change the name of the action, then we have to change it
at two different places. So we create a new file actionTypes.js. In this file we
will save our all action strings and export them.

actionTypes.js
---------------

export const ADD_TASK = "ADD_TASK"

export const REMOVE_TASK = "REMOVE_TASK"

Now in reducer.js file we have to import all actionTypes and replace the
action types using actionTypes.ADD_TASK & actionTypes.REMOVE_TASK.

Same thing we have to do in action.js file.

Now if we have to change it's string, we have to change at only one place.

---------------------------------------------------------------------------------
section 3

subscribe and unsubscribe
--------------------------

subscribe function will run everytime, when something change in redux store state.
Subscribe function brings unsubscribe method in it. If we store subscribe and call
unsubscribe method then after that, if our store will change, we don't get notified.


index.js
---------

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

---------------------------------------------------

# Exercise - To mark task as completed

-First Go to actionTypes.js and add a TASK_COMPLETED type.
-Go to reducer.js and write case for actionTypes.TASK_COMPLETED.
-Then write the action for actionTypes.TASK_COMPLETED. 
-Then go to index.js file and import the completedTask from action
and call store.dispatch().

--------------------------------------------------------

# Folder Structure

src
	store
	- store.js
	  task
		- action.js
		- reducer.js
		- actionTypes.js
	  employess
	    - action.js
		- reducer.js
		- actionTypes.js

Duck Module Folder Structure
src
	store
		- store.js
		- tasks.js
		- employees.js
		
-----------------------------------------------------------------

# Implementing Duck Module
Combining Action, Reducers and Action-types in one file.

-Create new folder - store
-Move all files in store folder except index.js file
-Create a new file tasks.js inside store
-Copy all actionTypes.js code to tasks.js
	Remove the export from those types & delete actionTypes.js file
-Copy all code of action.js file except import statement in tasks.js file
-Similarly do with Reducer.js file into tasks.js
-Modify import of reduce in store.js file to tasks.
-Also Modify imports in index.js file and rename store.js to configureStore.js

--------------------------------------------------------------------

# Redux Thunk

Thunk - In programming term, thunk is "a peice of code that does
some delay work". It means, rather that run the logic now, we can
write code that can be used to perform the work later.

Ex - We want to fetch the data from api and after fetching data we can store that into Redux store.

you might think, we can simply add async for this action creator?
- we can't do that. Redux thunk will allow actions to return function
instead of returning plain objects.

Using Redux-Thunk middleware, we can write asynchronous/complex logic in Redux like calling API, dispatch multiple actions from one action, etc..

To apply Redux-Thunk
- Add thunk method in configure store function
  Go to configureStore.js file and import applyMiddleware from "redux"
- Import thunk from redux-thunk library.
  -> npm i redux-thunk
- In createStore function after reducer add applyMiddleware(thunk) and pass thunk into it. This is an old method to call api in Redux.
---------------------------------------------------------------------

# Call API using Redux-thunk

In tasks.js file, we have to add action for calling API.

const fetchTodo = () => {
	return async function (dispatch, getState) {
		const rsponse = await fetch('https://jsonplaceholder.typicode.com/todos/1');
		console.log(response)
	}
}

export const fetchTodo = () =>  async (dispatch) => {
		const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
		const task = await response.json();
		dispatch(addTask(task.title));
	}

Recap Redux-Thunk
- Redux-thunk is used to apply complex logic or asynchronous task in redux.
- First we have to define action same as we define other actions.
- But at the place of returning object, we return another function in
  which we can perform asynchronous or synchronous task.
- In that function, we have two parameters dispatch and payload. 
  At the end we can dispatch action from that function.
- This is not the best method to call API in Redux.

----------------------------------------------------------------------
# Summary
----------
In this section, we see the basics of Redux and build our first redux application.
---------------------------------------------------------------------
🚀How redux work?
------------------
-We store all our application state (data) in a single place called Store. Imagine Store as Database for frontend.
-----------------------------------------------
-There are 3 main parts of Redux
---------------------------------
Store - which stores all data
-----------------------------------
Reducer - function which will add, update and delete data (How to do)
----------------------------------------------------------------------
Actions - which will define which task we want to perform (What to do)
----------------------------------------------------------------------
-We can only change store data using the Reducer function.
---------------------------------------------------------------
-For example, we have a to-do application. We want to add a new task. So
---------------------------------------------------------------------
Action - ADD_TASK
------------------------
Reducer - perform how to add task in the store
-------------------------------------------------

📌4 steps to implement Redux:
-------------------------------
- Designing the store - How store object looks like
-----------------------------------------------------
- List actions - that can perform in the application.
-------------------------------------------------------
- Create Reducer - function to define How to perform that action
-----------------------------------------------------------------
- Create redux store
-------------------------

💻Creating Reducer function:
-----------------------------
-A reducer is a pure function that takes two arguments. The first one is the Initial or Current state and the second one is the action object.
--------------------------------------------------------------------
-Inside this function, we use If..else or we can use Switch case to identify the action type.
--------------------------------------------------------------------
let id = 0;
 
export default function reducer(state = [], action) {
    switch (action.type) {
        case ADD_TASK:
            return [
                ...state,
                {
                    id: ++id,
                    task: action.payload.task,
                    completed: false,
                },
            ];
 
        case REMOVE_TASK:
            return state.filter((task) => task.id !== action.payload.id);
 
        case TASK_COMPLETED:
            return state.map((task) =>
                task.id === action.payload.id
                    ? {
                          ...task,
                          completed: true,
                      }
                    : task
            );
 
        default:
            return state;
    }
}

---------------------------------------------------------------------

📜Configure redux store
------------------------------
- For creating a redux store we have a function in the redux library called createStore and we have to just pass our Root reducer as a parameter.
--------------------------------------------------------------------

import { legacy_createStore as createStore } from "redux";
import reducer from "./tasks";
 
const store = createStore(reducer);
 
export default store;

----------------------------------------------------------------------
🧑🏻‍💻Dispatch action from store
----------------------------------
-For dispatching any action, we have to use store.dispatch method and then we pass our action object with type property (which is the action name) and payload property (in which we can pas data related to action).
--------------------------------------------------------------------
store.dispatch({ type: "ADD_TASK", payload: { task: "Add new task"} });
--------------------------------------------------------------------

🔔Subscribe and unsubscribe method
---------------------------------------
- As we use Subscribe feature on YouTube, store.subscribe method is also used to get notified when we have something change in our store object.
--------------------------------------------------------------------
store.subscribe(() => {
    console.log("Updated", store.getState());
});
--------------------------------------------------------------------
- This callback function will run on every change on the redux store.
----------------------------------------------------------------------
- Now if we want to stop this subscribe method we have to use unsubscribe.
----------------------------------------------------------------------
const unsubscribe = store.subscribe(() => {
    console.log("Updated", store.getState());
});
unsubscribe();
----------------------------------------------------------------------