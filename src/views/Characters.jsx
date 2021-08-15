import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Icon, Card, CardTitle } from 'react-materialize'
import Layout from '../layouts/default'
import api from '../services/api'
import { Animated } from 'react-animated-css'

class Characters extends React.Component {
	constructor() {
		super()
		this.state = {
			characters: [],
			page: 21,
			offset: 0
		}
	}

	componentDidMount() {
		document.title = 'Personagens - Marvel'

		this.getCharacters()
		this.setIntersectionObserver()
	}

	async getCharacters() {
		const response = await api.get(`characters?orderBy=-modified&limit=${this.state.page}&offset=${this.state.offset}`, {
			headers: {
				'Content-Type': 'application/json'
			}
		})

        
		if(response.data.data) {
			this.setState({
				characters: this.state.characters.concat(response.data.data.results)
			})
		}

		const images = document.getElementsByTagName('img')

		for(var img of images) {
			img.setAttribute('draggable', 'false')
		}
	}

	async setIntersectionObserver() {
		const intersectionObserver = new IntersectionObserver((entries) => {
			if(this.state.characters.length > 0 && entries.some((entry) => entry.isIntersecting)) {
				this.setState({
					offset: this.state.offset + this.state.page,
					page: this.state.page + 21
				})

				this.getCharacters()
			}
		})

		intersectionObserver.observe(document.getElementById('loadMore'))

		return () => intersectionObserver.disconnect()
	}

	render() {
		const { characters } = this.state

		return (
			<Layout>
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
							<span id="loadMore">...</span>
						</Row>
						:
						null
				}
			</Layout>
		)             
	}
}

export default Characters