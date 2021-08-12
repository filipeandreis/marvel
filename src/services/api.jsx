import axios from 'axios'

const api = axios.create({
	baseURL: process.env.REACT_APP_URL_API
})
    
api.interceptors.request.use((config) => {
	document.getElementById('loader').classList.remove('hide')

	return config
}, (error) => {
	document.getElementById('loader').classList.add('hide')

	return Promise.reject(error)
})

api.interceptors.response.use((response) => {
	document.getElementById('loader').classList.add('hide')

	return response
}, (error) => {
	document.getElementById('loader').classList.add('hide')

	return Promise.reject(error)
})

export default api