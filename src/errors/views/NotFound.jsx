import React from 'react'
import { Link } from 'react-router-dom'

class NotFound extends React.Component {

	render() {
		return (
			<div>
				<div className="body-not-found">
					<h1 className="h1-not-found">404</h1>
					<p className="p-not-found">Página não encontrada.</p>
					<div className="center-align">
						<Link to="/" className="button-not-found">Voltar para a página inicial</Link>
					</div>
				</div>
			</div>
		)
	}
}

export default NotFound