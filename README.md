# Redux
Learning Redux and Redux-toolkit

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