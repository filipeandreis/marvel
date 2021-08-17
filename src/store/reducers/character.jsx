const initialState = {
	items: [],
	total: 0,
	page: 1,
	offset: 0,
	filter: []
}

export default function character(state = initialState, action) {
	if(action.type === 'SET_CHARACTER') {
		return {
			...state,
			items: action.characters,
			total: action.total
		}
	}

	else if(action.type === 'SET_PAGE') {
		return {
			...state,
			page: action.page,
			offset: action.offset
		}
	}

	else if(action.type === 'SET_FILTER') {
		const param = state.filter.find((param) => param.name == action.name)

		if(param) {
			param.name = action.name,
			param.value = action.value

			return {
				...state
			}
		} else {
			state.filter.push({
				name: action.name,
				value: action.name
			})

			return {
				...state
			}
		}
	}

	else if(action.type === 'REMOVE_FILTER') {
		return {
			...state,
			filter: []
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