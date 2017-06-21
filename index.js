'use strict'

const {operators, stations} = require('./data.json')

const operatedBy = {}

for (let id in stations) {
	operatedBy[id] = operators[stations[id]]
}

module.exports = operatedBy
