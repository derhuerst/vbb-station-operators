'use strict'

const {operators, stations} = require('./data.json')

const operatedBy = {}

for (let id in stations) {
	operatedBy[id] = []
	const opIds = stations[id]
	for (let opId of opIds) operatedBy[id].push(operators[opId])
}

module.exports = operatedBy
