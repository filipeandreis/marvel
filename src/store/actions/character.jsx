export function setCharacters(characters, total) {
	return {
		type: 'SET_CHARACTER',
		characters,
		total
	}
}

export function setPageAndOffset(page, offset) {
	return {
		type: 'SET_PAGE',
		page,
		offset
	}
}

export function setFilter(name, value) {
	return {
		type: 'SET_FILTER',
		name,
		value
	}
}

export function removeFilter() {
	return {
		type: 'REMOVE_FILTER'
	}
}

export function toggleCharacters(character) {
	return {
		type: 'EDIT_CHARACTER',
		character
	}
}