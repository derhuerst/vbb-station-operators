'use strict'

const test = require('tape')

const operatedBy = require('.')

test('each operator should have an id and a name', (t) => {
	for (let station in operatedBy) {
		// todo: validate station ID

		const operators = operatedBy[station]
		for (let o of operators) {
			t.equal(typeof o.id, 'string')
			t.ok(o.id)

			t.equal(typeof o.name, 'string')
			t.ok(o.name)
		}
	}

	t.end()
})
