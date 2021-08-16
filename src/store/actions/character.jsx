export function setCharacters(characters) {
	return {
		type: 'SET_CHARACTER',
		characters
	}
}

export function setOffset(offset) {
	return {
		type: 'SET_OFFSET',
		offset
	}
}

export function toggleCharacters(character) {
	return {
		type: 'EDIT_CHARACTER',
		character
	}
}