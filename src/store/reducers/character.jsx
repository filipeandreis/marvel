const initialState = {
	items: [],
	offset: 0
}

export default function character(state = initialState, action) {
	if(action.type === 'SET_CHARACTER') {
		return {
			...state,
			items: state.items.concat(action.characters)
		}
	}

	else if(action.type === 'SET_OFFSET') {
		return {
			...state,
			offset: state.offset + action.offset
		}
	}

	else if(action.type === 'EDIT_CHARACTER') {
		return {
			...state,
			name: action.name,
			description: action.description
		}
	}

	return state
}