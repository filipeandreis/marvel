import React from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import NotFound from './errors/views/NotFound.jsx'
import Home from './views/Home.jsx'
import Characters from './views/Characters.jsx'
import Character from './views/Character.jsx'


const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/characters" component={Characters} />
			<Route exact path="/character/:id" component={Character} />
			<Route path='*' exact={true} component={NotFound} />
		</Switch>
	</BrowserRouter>
)

export default Routes