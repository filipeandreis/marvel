import React from 'react'
import PropTypes from 'prop-types'
import Menu from '../components/Menu.jsx'
import Loader from '../components/Loader.jsx'

const Default = ({ children }) => {
	return (
		<div className="layout-pages">
			<Loader />
			<Menu />
			{ children }
		</div>
	)
}

Default.propTypes = {
	children: PropTypes.object
}

export default Default