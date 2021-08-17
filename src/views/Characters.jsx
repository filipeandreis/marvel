import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Row, Col, Icon, Card, CardTitle, TextInput, Button, Pagination } from 'react-materialize'
import Layout from '../layouts/default'
import api from '../services/api'
import { Animated } from 'react-animated-css'
import { connect } from 'react-redux'
import * as CharacterActions from '../store/actions/character'

const Characters = ({ characters, dispatch }) => {
	React.useEffect(() => {
		document.title = 'Personagens - Marvel'
	})

	React.useEffect(() => {
		getCharacters()
	}, [characters.page, characters.filter])
    
	async function getCharacters() {
		var url = `characters?orderBy=-modified&limit=${9}&offset=${characters.offset}`
        
		if(characters.filter[0] && characters.filter[0].name) {
			for(var param of characters.filter) {
				url = url.concat(`&${param.name}=${param.value}`)
			}
		}

		const response = await api.get(url, {
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if(response.data.data) {
			dispatch(CharacterActions.setCharacters(response.data.data.results, response.data.data.total))
		}
	}

	async function handlePagination(value) {
		if(value === 1) {
			dispatch(CharacterActions.setPageAndOffset(value, 0))
		} else {
			dispatch(CharacterActions.setPageAndOffset(value, (value-1) * 9))
		}
	}

	function handleParams({id, value}) {
		dispatch(CharacterActions.setFilter(id, value))
	}

	function handleForm(e) {
		e.preventDefault()

		getCharacters()

		dispatch(CharacterActions.setPageAndOffset(1, 0))
	}

	function removeFilters(e) {
		e.preventDefault()

		document.getElementById('nameStartsWith').value = ''
        
		dispatch(CharacterActions.setPageAndOffset(1, 0))
		dispatch(CharacterActions.removeFilter())
	}

	return (
		<Layout>
			<div>
				<Row>
					<Col
						l={4}
						m={6}
						s={12}
						offset="l4 m3"
					>
						<form onSubmit={(e) => handleForm(e) }>
							<TextInput
								s={12}
								icon={<Icon>search</Icon>}
								id="nameStartsWith"
								label="Buscar"
								value={characters.filter.nameStartsWith}
								onChange={(e) => handleParams(e.target)}
								required
							/>
							<Button
								waves="light"
								flat
							>
                                Buscar
							</Button>
							{
								characters.filter[0] ?
									<Button
										waves="light"
										flat
										onClick={(e) => removeFilters(e)}
									>
										Limpar<Icon right>close</Icon>
									</Button>
									: null
							}
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
												header={<CardTitle image={`${character.thumbnail.path}.${character.thumbnail.extension}`}/>}
												actions={[
													<Link
														className="red-text text-darken-4"
														key={1}
														to={`/character/${character.id}`}
													>
                                                        Ver personagem
													</Link>
												]}
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
									items={characters.total}
									leftBtn={<Icon >chevron_left</Icon>}
									maxButtons={characters.total <= 9 ? 1 : 5}
									rightBtn={<Icon>chevron_right</Icon>}
									onSelect={(value) => handlePagination(value)}
								/>
							</Row>
						</Animated>
						:
						null
				}
			</div>
		</Layout>
	)             
}

Characters.propTypes = {
	dispatch: PropTypes.func,
	characters: PropTypes.object
}

export default connect( state => ({ characters: state.characters }) )(Characters)