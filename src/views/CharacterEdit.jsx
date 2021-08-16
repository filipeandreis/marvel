import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Row, Col, CardPanel, Button, TextInput } from 'react-materialize'
import Layout from '../layouts/default'
import { Animated } from 'react-animated-css'
import { connect } from 'react-redux'
import * as CharacterActions from '../store/actions/character'
import backgroundImage from '../assets/images/background-profile.png'

const Character = ({ character, dispatch }) => {
	React.useEffect(() => {
		document.title = 'Editar Personagem - Marvel'
	}, [])
    
	const [name, setName] = React.useState(character.name)
	const [description, setDescription] = React.useState(character.description)
    
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
												value={name}
												onChange={({ target }) => setName(target.value)}
											/>
											<TextInput
												s={12}
												id="description"
												label="Descrição"
												value={description}
												onChange={({ target }) => setDescription(target.value)}
											/>
										</Row>
										<Row>
											<Button
												waves="light"
												onClick={() => { dispatch(CharacterActions.toggleCharacters({...character, name, description})) }}
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

Character.propTypes = {
	character: PropTypes.object,
	dispatch: PropTypes.func
}

export default connect( state => ({ character: state.character }) )(Character)