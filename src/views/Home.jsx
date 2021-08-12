import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../layouts/default'
import { Row, Col, Card } from 'react-materialize'
import api from '../services/api'
import { Animated } from 'react-animated-css'

class Home extends React.Component {
	constructor() {
		super()

		this.state = {
			cities: null
		}
	}

	componentDidMount() {
		document.title = 'Home - Clientes Cidades'

		//this.getcities()
	}

	async getcities() {
		const response = await api.get('client/count-city')

		if(response.data.success) {
			this.setState({
				cities: response.data.success
			})
		}
	}
    
	render() {
		const { cities } = this.state
		return (
			<Layout>
				<header className='center-align'>
					<Row className="margin-card">
						<Animated animationIn="fadeIn" animationInDuration={300}>
							{
								cities ?
									cities.map((city, key) => (
										<Col
											key={key}
											s={12}
											m={5}
											l={3}
										>
											<Card
												actions={[
													<Link
														key={1}
														to={`city-clients/${Buffer.from(city.city).toString('base64')}`}
													>
                                                    Ver clientes
													</Link>
												]}
											>
												<h5>{city.city}</h5>
												<p>Qtd: {city.count}</p>
											</Card>
										</Col>
									))
									:
									null
							}
						</Animated>
					</Row>
				</header>
			</Layout>
		)
	}
}

export default Home