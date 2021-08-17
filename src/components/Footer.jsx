import React from 'react'
import { Footer as MaterializeFooter } from 'react-materialize'

const Footer = () => {
	return (
		<MaterializeFooter
			id="footer"
			copyrights="© 2021 MARVEL"
			style={{ backgroundColor: '#212121' }}
		>
			<h5 className="white-text">
                Marvel - Personagens
			</h5>
			<p className="grey-text text-lighten-4">
				<a
					rel="noreferrer noopener"
					target="_blank"
					href="https://marvel.com\"
				>
                    Data provided by Marvel. © 2021 MARVEL
				</a>
			</p>
		</MaterializeFooter>
	)
}

export default Footer