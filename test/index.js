var should = require('chai').should();

let {ParseSSN, RandomSSN} = require('../build/ssn');

describe('generate and validate', function() {

    it('generates random social security number', function() {
    	let randomSSN = new RandomSSN();
    	console.log(randomSSN.value().toString());
    	randomSSN.should.not.be.empty();
    });

    it('is parsing valid social security string', function() {
    	let parseSSN = new ParseSSN('516386083');
    	parseSSN.should.not.be.empty();
    });

});
