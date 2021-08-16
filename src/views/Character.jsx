import React from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Row, Col, CardPanel, Divider, Button } from 'react-materialize'
import Layout from '../layouts/default'
import api from '../services/api'
import { Animated } from 'react-animated-css'
import backgroundImage from '../assets/images/background-profile.png'

const Character = (props) => {
	const [id] = React.useState(props.match.params.id)
	const [character, setCharacter] = React.useState({})
	const [series, setSeries] = React.useState([])
	const [seriesPage, setSeriesPage] = React.useState(20)
	const [seriesOffset, setSeriesOffset] = React.useState(0)
	const [lockBtnLoadMore, setLockBtnLoadMore] = React.useState(true)

    
	React.useEffect(() => {
		document.title = 'Personagem - Marvel'

		getCharacterInfo(id)
	}, [])

	async function getCharacterInfo(id) {
		const response = await api.get(`characters/${id}?`, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
                
		if(response.data.data) {
			setCharacter(response.data.data.results[0])

			document.title = `${response.data.data.results[0].name} - Marvel`

			getCharacterSeries(id)
		} else {
			<Redirect to="/characters" />
		}
	}

	async function getCharacterSeries(id) {
		const response = await api.get(`characters/${id}/series?limit=${seriesPage}&offset=${seriesOffset}&orderBy=-modified`, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
                
		if(response.data.data) {
			if(response.data.data.results.length < 20) {
				setSeries(response.data.data.results)
				setSeriesOffset((currentSeriesOffset) => currentSeriesOffset + seriesPage)
				setLockBtnLoadMore(true)
			} else {
				setSeries(response.data.data.results)
				setSeriesOffset((currentSeriesOffset) => currentSeriesOffset + seriesPage)
				setLockBtnLoadMore(false)
			}
		}
	}

	async function getMoreSeries(id) {
		setLockBtnLoadMore(true)
		setSeriesOffset((currentSeriesOffset) => currentSeriesOffset + seriesPage)
		setSeriesPage((currentSeriesPage) => currentSeriesPage + 20)
        
		const response = await api.get(`characters/${id}/series?limit=${seriesPage}&offset=${seriesOffset}&orderBy=-modified`, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
                
		if(response.data.data) {
			if(response.data.data.results.length < 20) {
				setSeries((currentSeries) => currentSeries.concat(response.data.data.results))
				setLockBtnLoadMore(true)
			} else {
				setSeries((currentSeries) => currentSeries.concat(response.data.data.results))
				setLockBtnLoadMore(false)
			}
		}
	}

	return (
		<Layout>
			<div className="char-profile">
				{
					character.id ?
						<Animated
							animationIn="fadeIn"
							animationInDuration={300}
							className="container center-align"
						>
							<img
								className="top-profile-background"
								draggable="false"
								src={backgroundImage}
							/>
							<Animated
								animationIn="zoomIn"
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
								<Link
									className="btn waves-effect waves-light"
									to={`/character-edit/${id}`}
								>
                                    Editar
								</Link>
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
												onClick={() => {getMoreSeries(id)}}
												disabled={lockBtnLoadMore}
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

Character.propTypes = {
	match: PropTypes.object
}

export default Character