# vbb-station-operators

**Which operator services a Berlin public transport station?** Thanks to @poldixd for [providing the data](https://github.com/poldixd/vbb-stations)!

[![npm version](https://img.shields.io/npm/v/vbb-station-operators.svg)](https://www.npmjs.com/package/vbb-station-operators)
[![build status](https://img.shields.io/travis/derhuerst/vbb-station-operators.svg)](https://travis-ci.org/derhuerst/vbb-station-operators)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/vbb-station-operators.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)


## Installing

```shell
npm install vbb-station-operators
```


## Usage

```js
const operatedBy = require('vbb-station-operators')

console.log(operatedBy['900000023302']) // U Adenauerplatz
console.log(operatedBy['900000110003']) // S Greifswalder Str.
```

```js
[{
	id: '796',
	name: 'Berliner Verkehrsbetriebe',
	url: 'http://www.bvg.de',
	timezone: 'Europe/Berlin',
	language: 'de',
	phone: null
}]
[{
	id: '1',
	name: 'S-Bahn Berlin GmbH',
	url: 'http://www.s-bahn-berlin.de',
	timezone: 'Europe/Berlin',
	language: 'de',
	phone: null
}]
```


## Contributing

If you have a question or have difficulties using `vbb-station-operators`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/vbb-station-operators/issues).
