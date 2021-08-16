export function setCharacters(characters) {
	return {
		type: 'SET_CHARACTER',
		characters
	}
}

export function setPageAndOffset(page, offset) {
	return {
		type: 'SET_PAGE',
		page,
		offset
	}
}

export function toggleCharacters(character) {
	return {
		type: 'EDIT_CHARACTER',
		character
	}
}