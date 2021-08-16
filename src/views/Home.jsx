import React from 'react'
import { Animated } from 'react-animated-css'
import { Icon } from 'react-materialize'
import Menu from '../components/NavBar'
import { Link } from 'react-router-dom'

class Home extends React.Component {
	componentDidMount() {
		document.title = 'Home - Marvel'

		this.runAnimation()
	}

	runAnimation(e) {
		const element = document.getElementById('animate')
        
		if (element) {
			if(e) {
				e.preventDefault()
			}

			element.classList.remove('run-animation')

			void element.offsetWidth

			element.classList.add('run-animation')
		}
	}
    
	render() {
		return (
			<div className="body-home">
				<Menu />
				<Animated animationIn="fadeIn" animationInDuration={300} style={{ overflow: 'hidden' }}>
					<div className="wrapper run-animation" id="animate">
						<div className="logo">

							<span className="marvel">Marvel</span>
							<span className="studios">Personagens</span>

							<div>
								<Icon small onClick={(e) => this.runAnimation(e)} className="restart">replay</Icon>
								<br/>
								<br/>
							</div>
                            
							<Animated animationIn="fadeInUpBig" animationInDuration={2000} animationInDelay={2000}>
								<Link style={{color: 'white'}} to='/characters'>
									<button className="btn-home">
										<span className="btn__inner">
											<span className="btn__slide" />
											<span className="btn__content">Ver personagens</span>
										</span>
									</button>
								</Link>
							</Animated>
						</div>
					</div>
					<div className="images"></div>
				</Animated>
			</div>
		)
	}
}

export default Home