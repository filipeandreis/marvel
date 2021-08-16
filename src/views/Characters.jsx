import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Row, Col, Icon, Card, CardTitle, TextInput, Button } from 'react-materialize'
import Layout from '../layouts/default'
import api from '../services/api'
import { Animated } from 'react-animated-css'
import { connect } from 'react-redux'
import * as CharacterActions from '../store/actions/character'

const Characters = ({ characters, dispatch }) => {
	const [offset, setOffset] = React.useState(characters.offset)
	const [params, setParams] = React.useState({ })

	React.useEffect(() => {
		document.title = 'Personagens - Marvel'
            
		setIntersectionObserver()
	}, [])

	React.useEffect(() => {
		getCharacters()
	}, [offset])
    
	async function getCharacters() {
		const response = await api.get(`characters?orderBy=-modified&limit=${21}&offset=${offset}`, {
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if(response.data.data) {
			dispatch(
				CharacterActions.setCharacters(response.data.data.results)
			) 
		}
	}

	async function getCharactersFilter(params) {
		var url = `characters?orderBy=-modified&limit=${21}&offset=${offset}`

		if(params) {
			for(var param of params) {
				url.concat(`&${param}`)
			}
		}

		const response = await api.get(url, {
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if(response.data.data) {
			dispatch(
				CharacterActions.setCharacters(response.data.data.results)
			) 
		}
	}

	async function setIntersectionObserver() {
		const intersectionObserver = new IntersectionObserver((entries) => {
			if(entries.some((entry) => entry.isIntersecting)) {
				setOffset((currentOffset) => currentOffset + 21)
				dispatch(CharacterActions.setOffset(21))
			}
		})

		intersectionObserver.observe(document.getElementById('footer'))

		return () => intersectionObserver.disconnect()
	}

	function handleParams({id, value}) {
		setParams((currentParams) => ({...currentParams, [id]: value}))
	}

	return (
		<Layout>
			{
				characters.items && characters.items.length > 0 ?
					<Animated animationIn="fadeIn" animationInDuration={300}>
						<Row>
							<Col
								l={4}
								m={6}
								s={12}
								offset="l4 m3"
								className="center-align"
							>
								<TextInput
									s={12}
									icon={<Icon>search</Icon>}
									id="name"
									label="Buscar"
									value={params.name}
									onChange={(e) => handleParams(e.target)}
								/>
								<Button
									waves="light"
									flat
									onClick={() => getCharactersFilter()}
								>
                                    Buscar
								</Button>
							</Col>
						</Row>
						<Row className="container center-align">
							{
								characters.items.map((character, key) => (
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
							}
						</Row>
					</Animated>
					:
					null
			}
		</Layout>
	)             
}

Characters.propTypes = {
	dispatch: PropTypes.func,
	characters: PropTypes.object
}

export default connect( state => ({ characters: state.characters }) )(Characters)