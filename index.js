'use strict'

const yaml = require('js-yaml')
const chai = require('chai')
const expect = chai.expect
chai.use(require('dirty-chai'))
const debug = require('debug')('multimatter')

const separator = new RegExp(/^\ufeff?(= yaml =)$/)

exports = module.exports = (contents) => {
  let results = []
  let result, header = false
  let finalize = (result) => {
    if (result) {
      result.contents = result.contents.join('\n')
      results.push(result)
    }
  }

  for (let line of contents.split(/\n/)) {
    if (!header && separator.exec(line)) {
      finalize(result)
      header = []
    } else if (header && separator.exec(line)) {
      result = yaml.safeLoad(header.join('\n'))
      expect(result).to.not.have.property('contents')
      result.contents = []
      header = false
    } else if (header) {
      header.push(line)
    } else {
      expect(result).to.be.ok()
      result.contents.push(line)
    }
  }
  finalize(result)
  return results
}
