'use strict'

const multimatter = require('../index.js')

const chai = require('chai')
const expect = chai.expect
chai.use(require('dirty-chai'))

describe('multimatter', () => {
  it('should parse front matter properly', () => {
    let results = multimatter(`= yaml =
test: me
= yaml =
Contents`)
    expect(results).to.have.lengthOf(1)
    expect(results[0].test).to.equal('me')
    expect(results[0].contents.trim()).to.equal('Contents')
  })
  it('should parse multimatter properly', () => {
    let results = multimatter(`= yaml =
test: me
= yaml =
Contents
More contents

= yaml =
another: test
= yaml =
More content
Here
`)
    expect(results).to.have.lengthOf(2)
    expect(results[0].test).to.equal('me')
    expect(results[0].contents.trim()).to.equal('Contents\nMore contents')
    expect(results[1].another).to.equal('test')
    expect(results[1].contents.trim()).to.equal('More content\nHere')
  })
})
