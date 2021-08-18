import M from 'materialize-css'

export class CharacterException {
	constructor(message) {
		this.name = 'CharacterException'
		this.message = message
		this.throwMessage = function() {
			M.toast({
				classes: 'red darken-2',
				html:`
                    <p>
                        ${this.name}
                        <br>
                        ${this.message}
                    </p>
                `
			})
		}
	}
}