import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import NotFound from './errors/views/NotFound.jsx'
import Home from './views/Home/Home.jsx'
import Characters from './views/Characters/Characters.jsx'
import Character from './views/Character/Character.jsx'
import CharacterEdit from './views/CharacterEdit/CharacterEdit.jsx'

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/characters" component={Characters} />
			<Route exact path="/character/:id" component={Character} />
			<Route exact path="/character-edit/:id" component={CharacterEdit} />
			<Route path='*' exact={true} component={NotFound} />
		</Switch>
	</BrowserRouter>
)

export default Routes