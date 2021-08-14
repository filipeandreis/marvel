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
		const response = await api.get('characters?limit=20', {
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
				<div className="background-red">
					{
						characters ?
							<Row className="container center-align">
								<Animated animationIn="fadeIn" animationInDuration={300}>
									{
										characters && characters.length > 0 ?
											characters.map((character, key) => (
												<Col
													key={key}
													l={4}
													m={6}
													s={12}
													className="cards-home"
												>
													<Card
														className="responsive-card hoverable"
														header={<CardTitle image={character.thumbnail.path + '.' + character.thumbnail.extension}/>}
														actions={[<Link className="red-text text-darken-4" key={1} to={`/character/${character.id}`}>Ver personagem</Link>]}
														revealIcon={<Icon>more_vert</Icon>}
														closeIcon={<Icon>close</Icon>}
													>
														{character.name}
													</Card>
												</Col>
											))
											:
											null
									}
								</Animated>
							</Row>
							:
							null
					}
				</div>
			</Layout>
		)             
	}
}

Characters.propTypes = {
	match: PropTypes.object,
	history: PropTypes.object
}

export default Characters