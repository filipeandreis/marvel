import axios from 'axios'

// const apiUrl = 'https://gateway.marvel.com:443/v1/public/'
// const apiKey = 'apikey=4ca5dd91f3a5a38201caa02dc995cce5'
// const hash = 'hash=5f789ffc79d090d9616ce7482c04acec'
// const ts = 'ts=4'

const apiUrl = 'https://gateway.marvel.com:443/v1/public/'
const apiKey = '9c0824a656d9c3e46e5e149007350df2'
const hash = 'e3896a962c89e0ef4ec63cfb578702c9'
const ts = '4'

const api = axios.create({
	baseURL: apiUrl
})
    
api.interceptors.request.use((config) => {
	document.getElementById('loader').classList.remove('hide')

	if(config.url.substr(-1) === '?') {
		config.url = `${config.url}apikey=${apiKey}&hash=${hash}&ts=${ts}`
	} else {
		config.url = `${config.url}&apikey=${apiKey}&hash=${hash}&ts=${ts}`
	}

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