import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Row, Col, Icon, Card, CardTitle, TextInput, Button, Pagination } from 'react-materialize'
import Layout from '../layouts/default'
import api from '../services/api'
import { Animated } from 'react-animated-css'
import { connect } from 'react-redux'
import * as CharacterActions from '../store/actions/character'

const Characters = ({ location, characters, dispatch }) => {
	const [params, setParams] = React.useState([{}])
	
    
	const paramsBusca = new URLSearchParams(location.search)
    
	for (let p of paramsBusca) {
		console.log(p)
	}

	React.useEffect(() => {
		document.title = 'Personagens - Marvel'
	}, [])

	React.useEffect(() => {
		getCharacters()
	}, [characters.page])
    
	async function getCharacters() {
		const response = await api.get(`characters?orderBy=-modified&limit=${9}&offset=${characters.offset}`, {
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if(response.data.data) {
			dispatch(CharacterActions.setCharacters(response.data.data.results)) 
		}
	}

	async function getCharactersFilter(e) {
		e.preventDefault()
        
		var baseUrl = `characters?orderBy=-modified&limit=${21}&offset=${characters.offset}`
		var url = ''

		if(params) {
			for(var param of params) {
				console.log(param)
				url = baseUrl.concat(`&${param.name}=${param.value}`)
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

	async function handlePagination(value) {
		if(value === 1) {
			dispatch(
				CharacterActions.setPageAndOffset(value, 0)
			)

		} else {
			dispatch(
				CharacterActions.setPageAndOffset(value, (value-1) * 9)
			)
		}
	}

	function handleParams({id, value}) {
		const param = params.find((param) => param.name == id)

		if(param) {
			param.name = id
			param.value = value
		} else {
			setParams([{
				name: id,
				value: value
			}])
		}
	}

	return (
		<Layout>
			<>
				<Row>
					<Col>
						<form onSubmit={(e) => getCharactersFilter(e)}>
							<TextInput
								s={12}
								icon={<Icon>search</Icon>}
								id="nameStartsWith"
								label="Buscar"
								value={params.name}
								onChange={(e) => handleParams(e.target)}
								required
							/>
							<Button
								waves="light"
								flat
							>
                            Buscar
							</Button>
						</form>
					</Col>
				</Row>
				{
					characters.items && characters.items.length > 0 ?
						<Animated animationIn="fadeIn" animationInDuration={300}>
							<Row className="container">
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
							<Row>
								<Pagination
									activePage={characters.page}
									items={characters.items.length}
									leftBtn={<Icon >chevron_left</Icon>}
									maxButtons={8}
									rightBtn={<Icon>chevron_right</Icon>}
									onSelect={(value) => handlePagination(value)}
								/>
							</Row>
						</Animated>
						:
						null
				}
			</>
		</Layout>
	)             
}

Characters.propTypes = {
	dispatch: PropTypes.func,
	characters: PropTypes.object,
	location: PropTypes.object,
	history: PropTypes.object
}

export default connect( state => ({ characters: state.characters }) )(Characters)