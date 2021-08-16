const initialState = {
	items: [],
	page: 1,
	offset: 0
}

export default function character(state = initialState, action) {
	if(action.type === 'SET_CHARACTER') {
		return {
			...state,
			items: action.characters
		}
	}

	else if(action.type === 'SET_PAGE') {
		return {
			...state,
			page: action.page,
			offset: action.offset
		}
	}

	else if(action.type === 'EDIT_CHARACTER') {
		return {
			...state,
			items: state.items.concat(action.character)
		}
	}

	return state
}