import React from 'react'
import PropTypes from 'prop-types'
import Menu from '../components/NavBar.jsx'
import Loader from '../components/Loader.jsx'
import Footer from '../components/Footer'

const Default = ({ children }) => {
	return (
		<div className="layout-pages">
			<Loader />
			<Menu />
			<main>
				<div className="center-align sticky-footer">
					{ children }
				</div>
			</main>
			<Footer />
		</div>
	)
}

Default.propTypes = {
	children: PropTypes.object
}

export default Default