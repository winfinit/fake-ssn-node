"use strict";
var RandomSSN = (function () {
    function RandomSSN(state) {
        if (state === void 0) { state = states[Math.floor(Math.random() * (states.length - 1))]; }
        this._state = new SSNState(state);
        // select random area from state prefix
        var amountOfAreaNumbers = this._state.areaNumbers().length;
        var randomAreaNumberIndex = Math.floor(Math.random() * amountOfAreaNumbers);
        var areaNumber = new AreaNumber(this._state, this._state.areaNumbers()[randomAreaNumberIndex]);
        // get Highgroup
        var highGroupNumber = highgroup[areaNumber.value()];
        var possibleGroup = possibleGroups.indexOf(highGroupNumber);
        // select random entry from group
        var randomGroupNumberIndex = Math.floor(Math.random() * possibleGroup);
        var groupNumber = new GroupNumber(possibleGroups[randomGroupNumberIndex]);
        // random serial number
        var randomSerialNumber = Math.floor(Math.random() * 9999);
        var serialNumber = new SerialNumber(randomSerialNumber);
        this._ssn = new SSN(this._state, "" + areaNumber.toString() + groupNumber.toString() + serialNumber.toString());
    }
    // this will generate ssn
    RandomSSN.prototype.value = function () {
        return this._ssn;
    };
    return RandomSSN;
}());
exports.RandomSSN = RandomSSN;
var SSN = (function () {
    function SSN(state, ssn) {
        this._ssn = ssn;
        this._state = state;
        if (ssn.length !== 9) {
            throw new RangeError("Invalid SSN Length, must be 9 digits \"" + ssn + "\"");
        }
        this._areaNumber = new AreaNumber(state, parseInt(this._ssn.substr(0, 3)));
        this._groupNumber = new GroupNumber(parseInt(this._ssn.substr(3, 2)));
        this._serialNumber = new SerialNumber(parseInt(this._ssn.substr(5)));
    }
    SSN.prototype.toFormattedString = function () {
        return this.areaNumber().toString() + "-" + this.groupNumber().toString() + "-" + this.serialNumber().toString();
    };
    SSN.prototype.toString = function () {
        return this._ssn;
    };
    SSN.prototype.areaNumber = function () {
        return this._areaNumber;
    };
    SSN.prototype.groupNumber = function () {
        return this._groupNumber;
    };
    SSN.prototype.serialNumber = function () {
        return this._serialNumber;
    };
    SSN.prototype.state = function () {
        return this._state;
    };
    return SSN;
}());
exports.SSN = SSN;
var SSNState = (function () {
    function SSNState(state) {
        this._states = states;
        this._state = state.toUpperCase().trim();
        var isValidState = this._states.some(function (validState) { return validState === state; });
        if (isValidState === undefined) {
            throw RangeError("Invalid State Prefix \"" + this._state + "\"");
        }
    }
    SSNState.prototype.toString = function () {
        return this._state;
    };
    SSNState.prototype.areaNumbers = function () {
        return statePrefixes[this.toString()];
    };
    SSNState.prototype.hasAreaNumber = function (areaNumber) {
        return this.areaNumbers().some(function (statesAreaNumber) { return statesAreaNumber === areaNumber; });
    };
    return SSNState;
}());
exports.SSNState = SSNState;
var AreaNumber = (function () {
    function AreaNumber(state, areaNumber) {
        if (!state.hasAreaNumber(areaNumber)) {
            throw new RangeError("Invalid Area Number \"" + areaNumber + "\" for state \"" + state.toString() + "\"");
        }
        this._state = state;
        this._areaNumber = areaNumber;
    }
    AreaNumber.prototype.state = function () {
        return this._state;
    };
    AreaNumber.prototype.value = function () {
        return this._areaNumber;
    };
    AreaNumber.prototype.toString = function () {
        return padStringWithZeros(3, this._areaNumber.toString());
    };
    return AreaNumber;
}());
exports.AreaNumber = AreaNumber;
var GroupNumber = (function () {
    function GroupNumber(groupNumber) {
        this._groupNumber = groupNumber;
    }
    GroupNumber.prototype.value = function () {
        return this._groupNumber;
    };
    GroupNumber.prototype.toString = function () {
        return padStringWithZeros(2, this._groupNumber.toString());
    };
    return GroupNumber;
}());
exports.GroupNumber = GroupNumber;
var SerialNumber = (function () {
    function SerialNumber(serialNumber) {
        this._serialNumber = serialNumber;
    }
    SerialNumber.prototype.value = function () {
        return this._serialNumber;
    };
    SerialNumber.prototype.toString = function () {
        return padStringWithZeros(4, this._serialNumber.toString());
    };
    return SerialNumber;
}());
exports.SerialNumber = SerialNumber;
var AreaNumberToState = (function () {
    function AreaNumberToState(areaNumber) {
        this._state = this.findState(areaNumber);
    }
    AreaNumberToState.prototype.findState = function (areaNumber) {
        var detectedState;
        for (var state in statePrefixes) {
            var ssnState = new SSNState(state);
            if (ssnState.hasAreaNumber(areaNumber)) {
                detectedState = ssnState;
            }
        }
        if (!detectedState) {
            throw new RangeError(areaNumber + " area number is not valid");
        }
        return detectedState;
    };
    AreaNumberToState.prototype.state = function () {
        return this._state;
    };
    return AreaNumberToState;
}());
exports.AreaNumberToState = AreaNumberToState;
var ParseSSN = (function () {
    function ParseSSN(ssn) {
        var areaNumberString = ssn.substr(0, 3);
        var areaNumberInt = parseInt(areaNumberString);
        var areaNumberToState = new AreaNumberToState(areaNumberInt);
        var ssnState = areaNumberToState.state();
        this._ssn = new SSN(ssnState, ssn);
    }
    ParseSSN.prototype.ssn = function () {
        return this._ssn;
    };
    return ParseSSN;
}());
exports.ParseSSN = ParseSSN;
function padStringWithZeros(length, stringToPad) {
    var padding = (new Array(length + 1)).join("0");
    var tempPaddedString = "" + padding + stringToPad;
    var paddedString = tempPaddedString.substr(tempPaddedString.length - length);
    return paddedString;
}
var states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];
// The SSA uses a funky method of figuring out what group number to use next. This area has them in the proper order and makes it easier to generate a SSN.
var possibleGroups = [1, 3, 5, 7, 9, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 2, 4, 6, 8, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 97, 99];
var statePrefixes = {
    'AK': [574],
    'AL': [416, 417, 418, 419, 420, 421, 422, 423, 424],
    'AR': [429, 430, 431, 432, 676, 677, 678, 679],
    'AZ': [526, 527, 600, 601, 764, 765],
    'CA': [545, 546, 547, 548, 549, 550, 551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612, 613, 614, 615, 616, 617, 618, 619, 620, 621, 622, 623, 624, 625, 626],
    'CO': [521, 522, 523, 524, 650, 651, 652, 653],
    'CT': [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
    'DC': [577, 578, 579],
    'DE': [221, 222],
    'FL': [261, 262, 263, 264, 265, 266, 267, 589, 590, 591, 592, 593, 594, 595, 766, 767, 768, 769, 770, 771, 772],
    'GA': [252, 253, 254, 255, 256, 257, 258, 259, 260, 667, 668, 669, 670, 671, 672, 673, 674, 675],
    'HI': [575, 576, 750, 751],
    'IA': [478, 479, 480, 481, 482, 483, 484, 485],
    'ID': [518, 519],
    'IL': [318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361],
    'IN': [303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317],
    'KS': [509, 510, 511, 512, 513, 514, 515],
    'KY': [400, 401, 402, 403, 404, 405, 406, 407],
    'LA': [433, 434, 435, 436, 437, 438, 439, 659, 660, 661, 662, 663, 664, 665],
    'MA': [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
    'MD': [212, 213, 214, 215, 216, 217, 218, 219, 220],
    'ME': [4, 5, 6, 7],
    'MI': [362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386],
    'MN': [468, 469, 470, 471, 472, 473, 474, 475, 476, 477],
    'MO': [486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500],
    'MS': [425, 426, 427, 428, 587],
    'MT': [516, 517],
    'NC': [237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 681, 682, 683, 684, 685, 686, 687, 688, 689, 690],
    'ND': [501, 502],
    'NE': [505, 506, 507, 508],
    'NH': [1, 2, 3],
    'NJ': [135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158],
    'NM': [525, 585, 648, 649],
    'NV': [530, 680],
    'NY': [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134],
    'OH': [268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302],
    'OK': [440, 441, 442, 443, 444, 445, 446, 447, 448],
    'OR': [540, 541, 542, 543, 544],
    'PA': [159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211],
    'RI': [35, 36, 37, 38, 39],
    'SC': [247, 248, 249, 250, 251, 654, 655, 656, 657, 658],
    'SD': [503, 504],
    'TN': [408, 409, 410, 411, 412, 413, 414, 415, 756, 757, 758, 759, 760, 761, 762, 763],
    'TX': [449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 627, 628, 629, 630, 631, 632, 633, 634, 635, 636, 637, 638, 639, 640, 641, 642, 643, 644, 645],
    'UT': [528, 529, 646, 647],
    'VA': [223, 224, 225, 226, 227, 228, 229, 230, 231, 691, 692, 693, 694, 695, 696, 697, 698, 699],
    'VT': [8, 9],
    'WA': [531, 532, 533, 534, 535, 536, 537, 538, 539],
    'WI': [387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399],
    'WV': [232, 233, 234, 235, 236],
    'WY': [520]
};
var highgroup = [null, 11, 11, 8, 13, 13, 11, 11, 94, 94, 94, 94, 94, 94, 94, 94, 94, 94, 94, 94, 94, 94, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 74, 74, 74, 74, 74, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 25, 25, 25, 25, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 91, 91, 91, 91, 89, 89, 89, 89, 89, 13, 11, 99, 99, 99, 99, 99, 99, 99, 99, 99, 57, 57, 57, 57, 55, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 37, 37, 37, 37, 37, 37, 37, 37, 35, 35, 35, 35, 35, 35, 35, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 39, 39, 39, 39, 39, 39, 39, 39, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 31, 31, 73, 73, 73, 73, 73, 73, 73, 73, 99, 99, 99, 99, 99, 99, 99, 99, 67, 67, 67, 67, 67, 67, 67, 67, 65, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 29, 29, 29, 27, 27, 27, 27, 27, 27, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 57, 57, 57, 57, 57, 55, 55, 55, 55, 55, 43, 41, 41, 41, 41, 41, 41, 41, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 37, 37, 45, 45, 59, 57, 57, 57, 33, 33, 33, 33, 31, 31, 31, 49, 49, 89, 87, 61, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 71, 71, 71, 71, 71, 71, 71, 71, 71, 83, 83, 81, 81, 81, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 61, 99, 99, 53, 53, 53, 41, 99, 99, 99, 99, 99, 67, 99, 9, 99, 99, 99, 99, 99, 99, 99, 94, 92, 92, 92, 99, 99, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 85, 85, 85, 85, 85, 85, 85, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 29, 29, 29, 29, 29, 29, 29, 29, 29, 23, 21, 58, 56, 62, 62, 62, 60, 38, 36, 36, 36, 36, 24, 24, 22, 22, 22, 22, 22, null, 48, 48, 48, 48, 48, 48, 48, 48, 48, 22, 22, 22, 20, 31, 24, 24, 24, 24, 24, 24, 24, 24, 24, 22, 18, 18, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 28, 18, 18, 10, 14, 28, 28, 28, 28, 26, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 20, 18, 9, 7, 7, 7, 12, 12, 12, 12, 12, 12, 12, 12, 29, 27, 4, 2, 2, 2, 2, 2, 2];
//# sourceMappingURL=ssn.js.map