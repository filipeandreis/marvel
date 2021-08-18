import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Character from '../views/Character'
import toJson from 'enzyme-to-json'
import { BrowserRouter } from 'react-router-dom'

const mockStore = configureStore([])

it('renderiza corretamente', () => {
	const store = mockStore({
		characters: {
			items: [
				{
					id: 1012717,
					name: 'Agatha Harkness',
					description: '',
					thumbnail: {
						'path': 'http://i.annihil.us/u/prod/marvel/i/mg/c/a0/4ce5a9bf70e19',
						'extension': 'jpg'
					},
					series: {
						'available': 9
					}
				}
			]
		}
	})

	const match = {
		params: {
			id: 245545,
		}
	}

	const wrapper = render(
		<BrowserRouter>
			<Provider store={store}>
				<Character match={match} />
			</Provider>
		</BrowserRouter>
	)

	expect(toJson(wrapper)).toMatchSnapshot()
})
