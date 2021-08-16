import React from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import api from '../services/api'
import { Row, Col, CardPanel, Button, TextInput } from 'react-materialize'
import Layout from '../layouts/default'
import { Animated } from 'react-animated-css'
import { connect } from 'react-redux'
import M from 'materialize-css'
import * as CharacterActions from '../store/actions/character'
import backgroundImage from '../assets/images/background-profile.png'

const CharacterEdit = ({ match, characters, dispatch }) => {
	const [character, setCharacter] = React.useState({})

	React.useEffect(() => {
		document.title = 'Editar Personagem - Marvel'

		const stateChar = characters.items.find((character) => character.id == match.params.id)

		if(stateChar) {
			setCharacter(stateChar)
		} else {
			getCharacterInfo(match.params.id)
		}

	}, [])

	async function getCharacterInfo(id) {
		const response = await api.get(`characters/${id}?`, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
                
		if(response.data.data) {
			setCharacter(response.data.data.results[0])
		} else {
			<Redirect to="/characters" />
		}
	}
    

	function handleChange({ id, value }) {
		setCharacter((currentCharacter) => ({...currentCharacter, [id]: value}))
	}

	async function save() {
		dispatch(CharacterActions.setCharacters([character]))

		M.toast({
			classes: 'green darken-2',
			html:`
                <p>
                    Personagem salvo!
                </p>
            `
		})
	}
    
	return (
		<Layout>
			<div className="char-profile-edit">
				{
					character.id ?
						<Animated
							animationIn="fadeIn"
							animationInDuration={300}
							className="center-align"
						>
							<img
								className="top-profile-background"
								draggable="false"
								src={backgroundImage}
							/>
							<Row>
								<Col
									l={4}
									m={8}
									s={12}
									offset="l4 m2"
								>
									<CardPanel>
										<Row>
											<span className="series-number">Editar Personagem</span>
										</Row>
										<Row className="card-edit-character">
											<TextInput
												s={12}
												id="id"
												label="ID"
												value={character.id}
												disabled
											/>
											<TextInput
												s={12}
												id="name"
												label="Nome"
												value={character.name}
												onChange={({ target }) => handleChange(target)}
											/>
											<TextInput
												s={12}
												id="description"
												label="Descrição"
												value={character.description}
												onChange={({ target }) => handleChange(target)}
											/>
										</Row>
										<Row>
											<Button
												waves="light"
												onClick={() => { save() }}
											>
                                            Salvar
											</Button>
										</Row>
									</CardPanel>
									<Row>
										<Link
											className="btn-flat waves-effect waves-light"
											waves="light"
											to={`/character/${character.id}`}
										>
                                        Voltar
										</Link>
									</Row>
								</Col>
							</Row>
						</Animated>
						:
						null
				}
			</div>
		</Layout>
	)}

CharacterEdit.propTypes = {
	characters: PropTypes.object,
	dispatch: PropTypes.func,
	match: PropTypes.object
}

export default connect( state => ({ characters: state.characters }) )(CharacterEdit)