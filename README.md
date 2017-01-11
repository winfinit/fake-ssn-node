# fake-ssn-node

This is a clone of [**fng-ssn-tools**](https://github.com/corbanworks/fng-ssn-tools) just in node.js

A small library providing one an ability to validate a social security number, 
find a state where SSN was issued, and generate a fake social security numbers
for testing your application.

## Installation

```bash
  npm install ssn -g
```

## Synopsis

```javascript
let {ParseSSN, RandomSSN} = require('ssn');
let randomSSN = new RandomSSN();
console.log("SSN string:", randomSSN.value().toString()); //023121234
console.log("SSN formatted string", randomSSN.value().toFormattedString()); //023-12-1234
console.log("SSN state", randomSSN.value().state().toString()); // FL

let parseSSN = new ParseSSN('516386083');
console.log("SSN state", parseSSN.ssn().state().toString());
```

## Tests

```bash
  npm test
```

## API

### RandomSSN(stateANSI?: string)
Class generates random social security number, optionally accepts state ANSI string (Ex. FL, NY, etc.).

```javascript
  let randomSSN = new RandomSSN();
  let randomSSNFromState = new RandomSSN('FL');

  let ssnString = randomSSN.value().toString();
  let stateANSIString = randomSSN.value().state().toString();
```

#### value(): SSN
Method returning generated SSN object

----

### ParseSSN(ssnString: string)
Class parsing SSN string and performs validity of SSN, if SSN is invalid, RangeError exception is thrown.

```javascript
  let parseSSN = new ParseSSN('516386083');
  let ssnString = parseSSN.value().toString();
```

#### value(): SSN
Method returning generated SSN object

----

### SSN(state: SSNState, ssn: string)
Class with helper methods to deal with SSN string

#### toFormattedString(): string
Returns formatted SSN string 'xxx-xx-xxxx'

#### toString(): string
Returns SSN in a string format 'xxxxxxxxx'

#### state(): SSNState
Returns SSNState object

----

### SSNState(state: string)
Class helping to deal with states in relation to SSN

#### toString(): string
Return ANSI string for state


## Contributing

If you find a bug or willing to add some enhancement, pull requests are very welcome

## Release History

* 0.0,1 Initial release
* 0.0.2 Bug fixes
* 0.0.3 Bug fixes
* 0.0.4 Added validation
* 0.5.0 Added tests and documentation
* 0.5.1 Corrected type in the doc
* 0.5.2 Updated markdown
* 0.5.3 fixed bug with random states selection
* 1.0.0 rewrite of a module in TS

## Legal

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
