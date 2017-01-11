var should = require('chai').should();

let {ParseSSN, RandomSSN} = require('../built/ssn');

describe('generate and validate', function() {

    it('generates random social security number', function() {
    	let randomSSN = new RandomSSN();
    	randomSSN.should.be.an('object');
    	randomSSN.value().toString().should.be.a('string');

    });

    it('is parsing valid social security string', function() {
    	let parseSSN = new ParseSSN('516386083');
    	parseSSN.should.be.an('object');
    	parseSSN.ssn().toString().should.be.a('string');
    });

});
