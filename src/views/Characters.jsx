import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Row, Col, Icon, Card, CardTitle } from 'react-materialize'
import Layout from '../layouts/default'
import api from '../services/api'
import { Animated } from 'react-animated-css'

class Characters extends React.Component {
	constructor() {
		super()
		this.state = {
			characters: []
		}
	}

	componentDidMount() {
		document.title = 'Personagens - Marvel'

		this.getCharacters()
	}

	async getCharacters() {
		const response = await api.get('characters?apikey=4ca5dd91f3a5a38201caa02dc995cce5&hash=5f789ffc79d090d9616ce7482c04acec&ts=4&limit=20', {
			headers: {
				'Content-Type': 'application/json'
			}
		})
        
		if(response.data.data) {
			this.setState({ characters: response.data.data.results })
		}

		const images = document.getElementsByTagName('img')

		for(var img of images) {
			img.setAttribute('draggable', 'false')
		}
	}

	render() {
		const { characters } = this.state

		return (
			<Layout>
				{
					characters ?
						<Row className="container center-align">
							<Animated animationIn="fadeIn" animationInDuration={300}>
								<Col
								>
									{
										characters && characters.length > 0 ?
											characters.map((character, key) => (
												<Col
													key={key}
													l={4}
													m={6}
													s={12}
												>
													<Card
														className="responsive-card"
														closeIcon={<Icon>close</Icon>}
														header={<CardTitle image={character.thumbnail.path + '.' + character.thumbnail.extension} reveal waves="light"/>}
														reveal={<p>{character.description}</p>}
														revealIcon={<Icon>more_vert</Icon>}
														title={character.name}
													>
														<Link to={`/character/${character.id}`}>
                                                                Ver personagem
														</Link>
													</Card>
												</Col>
											))
											:
											null
									}
								</Col>
							</Animated>
						</Row>
						:
						null
				}
			</Layout>
		)             
	}
}

Characters.propTypes = {
	match: PropTypes.object,
	history: PropTypes.object
}

export default Characters