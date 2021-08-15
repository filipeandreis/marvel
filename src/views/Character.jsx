import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, CardPanel, Divider, Button } from 'react-materialize'
import Layout from '../layouts/default'
import api from '../services/api'
import { Animated } from 'react-animated-css'

class Character extends React.Component {
	constructor() {
		super()
		this.state = {
			character: {},
			series: [],
			seriesPage: 0,
			seriesOffset: 0,
			lockBtnLoadMore: true
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
                
		if(response.data.data) {
			this.setState({ character: response.data.data.results[0] })

			document.title = `${response.data.data.results[0].name} - Marvel`

			this.getCharacterSeries(id)
		} else {
			this.props.history.push('/characters')
		}
	}

	async getCharacterSeries(id) {
		this.setState({
			lockBtnLoadMore: true,
			seriesOffset: this.state.seriesOffset + this.state.seriesPage,
			seriesPage: this.state.seriesPage + 20
		})

		const response = await api.get(`characters/${id}/series?limit=${this.state.seriesPage}&offset=${this.state.seriesOffset}&orderBy=-modified`, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
                
		if(response.data.data) {
			if(response.data.data.results.length < 20) {
				this.setState({
					series: this.state.series.concat(response.data.data.results),
					lockBtnLoadMore: true
				})
			} else {
				this.setState({
					series: this.state.series.concat(response.data.data.results),
					lockBtnLoadMore: false
				})
			}
		}
	}

	render() {
		const { character, series } = this.state

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
										className="profile-img"
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
												series && series.length > 0 ?
													series.map((serie, key)=>(
														<p
															key={`serie-${key}`}
															className="list-series"
														>
															{serie.title}
														</p>
													))
													:
													null
											}
											<Row>
												<Button
													waves="light"
													onClick={() => {this.getCharacterSeries(this.props.match.params.id)}}
													disabled={this.state.lockBtnLoadMore}
												>
                                                    Carregar mais
												</Button>
											</Row>
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