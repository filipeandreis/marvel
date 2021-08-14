import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, CardPanel, Divider } from 'react-materialize'
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

		this.getCharacterInfo(this.props.match.params.id)
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

			document.title = `${response.data.data.results[0].name} - Marvel`
		} else {
			this.props.history.push('/characters')
		}
	}

	render() {
		const { character } = this.state

		return (
			<Layout>
				<div className="char-profile">
					<img
						className="top-profile-img"
						draggable="false"
						src="/images/background-profile.png"
					/>
					{
						character.id ?
							<Animated
								animationIn="fadeIn"
								animationInDuration={300}
								className="container center-align"
							>
								<Animated
									animationIn="fadeInDown"
									animationInDuration={800}
									className="center-align"
								>
									<img
										className="profile-img circle"
										draggable="false"
										src={character.thumbnail.path + '.' + character.thumbnail.extension}
									/>
								</Animated>
								<Row>
									<p className="char-name">{character.name}</p>
									<small className="char-id">ID: {character.id}</small>
								</Row>
								<Row>
									<p className="char-description">{character.description}</p>
								</Row>
								<Row>
									<Col
										l={8}
										m={10}
										s={12}
										offset="l2 m1"
									>
										<CardPanel>
											<span className="series-number">{character.series.available}</span>
											<p>Series</p>
											<Divider />
											{
												character.series.available > 0 ?
													character.series.items.map((serie, key)=>(
                                                        
														<p
															key={`serie-${key}`}
															className="list-series"
														>
															{serie.name}
														</p>
													))
													:
													null
											}
										</CardPanel>
									</Col>
								</Row>
							</Animated>
							:
							null
					}
				</div>
			</Layout>
		)             
	}
}

Character.propTypes = {
	match: PropTypes.object,
	history: PropTypes.object
}

export default Character