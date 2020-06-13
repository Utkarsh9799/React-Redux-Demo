const redux = require('redux');
const axios = require('axios');
const reduxThunk = require('redux-thunk').default;

const initialState = {
	loading: false,
	users: [],
	error: '',
};

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

const fetchUsersRequest = () => {
	return {
		type: FETCH_USERS_REQUEST,
	};
};

const fetchUsersSuccess = (users) => {
	return {
		type: FETCH_USERS_SUCCESS,
		payload: users,
	};
};

const fetchUsersFailure = (error) => {
	return {
		type: FETCH_USERS_FAILURE,
		payload: error,
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USERS_REQUEST:
			return {
				...state,
				loading: true,
			};

		case FETCH_USERS_SUCCESS:
			return {
				loading: false,
				users: action.payload,
				error: '',
			};

		case FETCH_USERS_FAILURE:
			return {
				loading: false,
				users: [],
				error: action.payload,
			};
	}
};

const fetchUsers = () => {
	return async function (dispatch) {
		dispatch(fetchUsersRequest());
		try {
			const response = await axios.get(
				'https://jsonplaceholder.typicode.com/users'
			);
			const users = response.data.map((user) => user.id);
			dispatch(fetchUsersSuccess(users));
		} catch (error) {
			dispatch(fetchUsersFailure(error.message));
		}
	};
};

const store = redux.createStore(reducer, redux.applyMiddleware(reduxThunk));
store.subscribe(() => {
	console.log(store.getState());
});
store.dispatch(fetchUsers());
