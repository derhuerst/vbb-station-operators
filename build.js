'use strict'

const {fetch} = require('fetch-ponyfill')()
const csv = require('csv-parser')

const showError = (err) => {
	console.error(err)
	process.exit(1)
}

const fetchOperators = () => {
	return fetch('https://vbb-gtfs.jannisr.de/latest/agency.txt', {
		redirect: 'follow',
		mode: 'cors',
		headers: {
			'user-agent': 'https://github.com/derhuerst/vbb-station-operators'
		}
	})
	.then((res) => {
		if (!res.ok) {
			const err = new Error(res.statusText)
			err.statusCode = res.status
			throw err
		}

		return new Promise((yay, nay) => {
			const parser = csv()
			res.body.pipe(parser)

			res.body.once('error', nay)
			parser.once('error', nay)

			const operators = {} // by id
			parser.on('data', (agency) => {
				const parsed = {
					id: agency.agency_id,
					name: agency.agency_name || null,
					url: agency.agency_url || null,
					timezone: agency.agency_timezone || null,
					lang: agency.agency_lang || null,
					phone: agency.agency_phone || null
				}
				operators[parsed.id] = parsed
			})
			parser.on('end', () => yay(operators))
		})
	})
}

const fetchStations = () => {
	// todo: @poldixd will change this to a new format soon!
	return fetch('https://cdn.rawgit.com/poldixd/vbb-stations/master/all-stations-with-operators.json', {
		redirect: 'follow',
		mode: 'cors',
		headers: {
			'user-agent': 'https://github.com/derhuerst/vbb-station-operators'
		}
	})
	.then((res) => {
		if (!res.ok) {
			const err = new Error(res.statusText)
			err.statusCode = res.status
			throw err
			return
		}

		return res.json()
	})
}

Promise.all([
	fetchOperators(),
	fetchStations()
])
.then(([allOperators, allStations]) => {
	const operators = {} // by id
	const stations = {} // by station id

	for (let [id, _, operatorIds] of allStations) {
		for (let operatorId of operatorIds) {
			const operator = allOperators[operatorId]
			if (!operator) {
				console.error(id + ' has an invalid operator id ' + operatorId)
				continue
			}

			if (!operators[operator.id]) operators[operator.id] = operator
			if (!stations[id]) stations[id] = []
			stations[id].push(operator.id)
		}
	}

	process.stdout.write(JSON.stringify({operators, stations}))
})
.catch(showError)
