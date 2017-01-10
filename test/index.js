var should = require('chai').should();

let {ParseSSN, RandomSSN} = require('../build/ssn');

describe('generate and validate', function() {
    // for (var state in ssn.states) { 
    //     var num = ssn.generate(ssn.states[state]);
    //     it('ssn for ' + ssn.states[state], function() {
    //         ssn.validate(num).should.equal(ssn.states[state]);
    //     });
    // }

    it('generates random social security number', function() {
    	let randomSSN = new RandomSSN();
    	randomSSN.should.not.be.empty();
    });

    it('generates random social security number', function() {
    	let randomSSN = new RandomSSN();
    	randomSSN.should.not.be.empty();
    });
});
