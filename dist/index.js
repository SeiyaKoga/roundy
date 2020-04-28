
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./roundy.cjs.production.min.js')
} else {
  module.exports = require('./roundy.cjs.development.js')
}
