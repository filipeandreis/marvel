import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-materialize'
import Layout from '../layouts/default'
import api from '../services/api'
import { Animated } from 'react-animated-css'

class Character extends React.Component {
	constructor() {
		super()
		this.state = {
			character: {}
		}
	}

	componentDidMount() {
		document.title = 'Personagem - Marvel'

		//this.getCharacterInfo(this.props.match.params.id)
	}

	async getCharacterInfo(id) {
		const response = await api.get(`characters/${id}?`, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
        
		console.log(response.data.data.results[0])
        
		if(response.data.data) {
			this.setState({ character: response.data.data.results[0] })
		} else {
			this.props.history.push('/')
		}
	}

	render() {
		const { character } = this.state

		return (
			<Layout>
				{
					character ?
						<Row>
							<img draggable="false" src="images/background-profile.png" />
							<Col>
								<Animated animationIn="fadeIn" animationInDuration={300}>
								
								</Animated>
							</Col>
						</Row>
						:
						null
				}
			</Layout>
		)             
	}
}

Character.propTypes = {
	match: PropTypes.object,
	history: PropTypes.object
}

export default Character