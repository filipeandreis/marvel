import React from 'react'
import PropTypes from 'prop-types'
import api from '../services/api.jsx'
import Swal from 'sweetalert2'
import Layout from '../layouts/default.jsx'
import { Button, Row, Col, CardTitle, Card, Icon, TextInput } from 'react-materialize'
import { Animated } from 'react-animated-css'
import { getToken } from '../services/login'

class Login extends React.Component {
	constructor() {
		super()
		this.state = {
			token: getToken(),
			username: null,
			password: null,
		}
	}

	componentDidMount() {
		document.title = 'Login - Uniftec Revista Acadêmica'
        
		if(this.state.token) {
			return this.props.history.push('/')
		}
	}

	async login(e) {
		e.preventDefault()

		document.getElementById('login').disabled = true
        
		if(this.state.username && this.state.password){
			const response = await api.post('users/login', {
				username: this.state.username,
				password: this.state.password
			})

			if(response.data.success) {
				localStorage.setItem('login', JSON.stringify({
					token: response.data.success.token,
					name: response.data.success.name,
				}))
                
				return this.props.history.push('/admin')
			} else {
				Swal.fire({
					title: 'Login inválido',
					text: 'Usuário ou senha inválidos',
					icon: 'error',
					showConfirmButton: false,
					timer: 3000
				})
                
				document.getElementById('password').value = null
				document.getElementById('login').disabled = false
			}

		} else {
			Swal.fire({
				title: 'Login Inválido',
				text: 'Preencha os campos de usuário e senha para prosseguir!',
				icon: 'error',
				showConfirmButton: false,
				timer: 1500            
			})
		}
	}

	render() {
		return (
			<Layout>
				{
					<Animated animationIn="fadeInDown" animationInDuration={700}>
						<div className="container">
							<form onSubmit={(e)=>{this.login(e)}}>
								<Row>
									<Col
										className="offset-m4"
										m={4}
										s={12}
									>
										<Card
											closeIcon={<Icon>close</Icon>}
											header={<CardTitle style={{maxWidth: '150px', margin: 'auto', paddingTop: '50px'}}
												image="images/user_default.png"/>}
										>
											<Row className="center-align">
												<h4>Login</h4>
											</Row>
											<Row>
												<Col s={12} offset="s1 m1 l2">
													<Row>
														<TextInput
															s={10}
															m={10}
															l={8}
															id="user"
															label="Usuário"
															type="text"
															required
															validate
															onChange={(event)=>{this.setState({ username: event.target.value })}}
														/>
													</Row>
													<Row>
														<TextInput
															s={10}
															m={10}
															l={8}
															id="password"
															label="Senha"
															type="password"
															required
															validate
															onChange={(event)=>{this.setState({ password: event.target.value })}}
														/>
													</Row>
												</Col>
											</Row>
											<Row className="center-align">
												<Button
													className="btn"
													large
													id="login"
													type="submit"
													waves="light"
												>
                                                Acessar
												</Button>
											</Row>
										</Card>
									</Col>
								</Row>
							</form>
						</div>
					</Animated>
				}
			</Layout>
		)
	}
}

Login.propTypes = {
	history: PropTypes.object,
	location: PropTypes.object
}

export default Login