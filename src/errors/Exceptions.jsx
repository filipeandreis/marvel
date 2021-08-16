import M from 'materialize-css'

export class RequestException {
	constructor(message) {
		this.name = 'RequestException'
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