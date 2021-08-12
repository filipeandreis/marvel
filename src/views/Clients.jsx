import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Icon, CollectionItem, Collection } from 'react-materialize'
import Layout from '../layouts/default'
import api from '../services/api'
import { Animated } from 'react-animated-css'

class Clients extends React.Component {
	constructor() {
		super()
		this.state = {
			clients: []
		}
	}

	componentDidMount() {
		document.title = 'Arquivo - Uniftec Revista Acadêmica'

		this.getCityClients(this.props.match.params.city)
	}

	async getCityClients(city) {
		const response = await api.get(`client/index-city/${city}`)
        
		console.log(response.data.success)
        
		if(response.data.success) {
			this.setState({ clients: response.data.success })
		} else {
			this.props.history.push('/')
		}
	}

	render() {
		const { clients } = this.state

		return (
			<Layout>
				{
					clients ?
						<Row>
							<Animated animationIn="fadeIn" animationInDuration={300}>
								<Col
									l={6}
									m={8}
									s={12}
									offset="l3 m2"
								>
									<Collection>
										{
											clients && this.state.clients[0] ?
												clients.map((client, key) => (
													<CollectionItem key={key} className="avatar">
														<img
															alt=""
															className="circle"
															src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
														/>
														<span className="title">
															{client.first_name + ' ' + client.last_name}
														</span>
														<p>
															{client.email}
															<br />
															{client.gender}
															<br />
															{client.company}
															<br />
															{client.city}
															<br />
															{client.title}
														</p>
														<a
															className="secondary-content"
															href="#!"
														>
															<Icon>
                                                            edit
															</Icon>
														</a>
													</CollectionItem>
												))
												:
												null
										}
									</Collection>
								</Col>
							</Animated>
						</Row>
						:
						null
				}
			</Layout>
		)             
	}
}

Clients.propTypes = {
	match: PropTypes.object,
	history: PropTypes.object
}

export default Clients