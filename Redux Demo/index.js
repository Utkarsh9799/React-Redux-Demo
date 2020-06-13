const redux = require('redux');
const reduxLogger = require('redux-logger');
// const createStore = redux.createStore;
// const combineReducers = redux.combineReducers;
// const applyMiddleware = redux.applyMiddleWare;

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

// Creating redux logger middleware
const logger = reduxLogger.createLogger();

// Action creator (function that returns action)
function buyCake() {
	return {
		// Action Object
		type: BUY_CAKE,
		info: 'First redux action',
	};
}

// Action creator for buying ice cream
function buyIcecream() {
	return {
		type: BUY_ICECREAM,
		info: 'Buying ice cream',
	};
}

// // State of app
// const initialState = {
// 	numOfCakes: 10,
// 	numOfIcecreams: 25,
// };

const initialCakeState = {
	numOfCakes: 10,
};

const initialIcecreamState = {
	numOfIcecreams: 25,
};

// Reducer function with default value of state being initialState
const cakeReducer = (state = initialCakeState, action) => {
	switch (action.type) {
		case BUY_CAKE:
			return {
				// Spread operator to make a copy of state, in case state hold more than one property
				...state,
				numOfCakes: state.numOfCakes - 1,
			};

		default:
			return state;
	}
};

const icecreamReducer = (state = initialIcecreamState, action) => {
	switch (action.type) {
		case BUY_ICECREAM:
			return {
				...state,
				numOfIcecreams: state.numOfIcecreams - 1,
			};

		default:
			return state;
	}
};

const rootReducer = redux.combineReducers({
	cake: cakeReducer,
	icecream: icecreamReducer,
});

// Redux store
const store = redux.createStore(rootReducer, redux.applyMiddleware(logger));
console.log('Initial state: ', store.getState());

// Subscribing to the store and listening to the state changes
const unsubscribe = store.subscribe(() => {});

// Dispatching actions to change the state of the app
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcecream());

// Unsubscribing the listener
unsubscribe();
