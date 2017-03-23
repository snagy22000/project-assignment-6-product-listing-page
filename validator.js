

   'use strict';

  // Define Validator Object
   var validator = {};

   validator.isNonAlphanumeric = function (input) {
     var charCode;
     var output;
     var inputLength = input.length;

     for (var i = 0; i < inputLength; i++) {
       charCode = input.charCodeAt(i);
       if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || (charCode >= 48 && charCode <= 57) || (charCode >= 192 && charCode <= 254)) {
         output = false;
       } else {
         output = true;
         return output;
       }
     }
     return output;
   };

   validator.removeWhiteSpaces = function (input) {
     var output = '';
     for (var i = 0; i < input.length; i++) {
       output += (input.charAt(i) === ' ') ? '' : input.charAt(i);
     }
     return output;
   };

   validator.isEmailAddress = function (input) {
     input = input || '';
     input = validator.removeWhiteSpaces(input);
     var atIndex = input.indexOf('@');
     return atIndex > 0 && atIndex < input.length - 1 && atIndex === input.lastIndexOf('@');
   };
  // console.log(validator.isEmailAddress('joe@example.com'));
  // console.log(validator.isEmailAddress('joe.example.com'));
  // console.log(validator.isEmailAddress('joe@example@com'));

   validator.isPhoneNumber = function (input) {
     var len = input.length;
     validator.removeWhiteSpaces(input);

     if (len !== 10 && len !== 12) {
       return false;
     }
     var nums = '0123456789';
    // var dash = '-';

     if (len === 10) {
       for (var i = 0; i < 10; i++) {
         if (nums.indexOf(input[i]) < 0) { return false; }
       }
       return true;
     } else if (len === 12) {
     } else {
       for (var j = 0; i < 12; i++) {
         if (nums.indexOf(input[j]) < 0) return false;
       }
       return true;
     }
   };
  // console.log('\nIsPhoneNumber');
  // console.log(validator.isPhoneNumber('1245678901'));
  // console.log(validator.isPhoneNumber('1245678901136454'));


   validator.withoutSymbols = function (input) {
     var currChar;
     var output = '';

     for (var i = 0; i < input.length; i++) {
       currChar = input.charAt(i);
       if (!this.isNonAlphanumeric(currChar) || currChar === ' ') {
         output = output + currChar;
       }
     }
     return output;
   };
  // console.log(validator.withoutSymbols('Hi, john.doe@live.com., is that you?/'));

  // Date
   validator.isDate = function (input) {
     if (input === null) return false;
     var date = new Date(input);
     if (isNaN(date)) return false;
     return Number.isInteger(date.getDate());
   };
  // console.log(validator.isDate('null'));

   validator.isBeforeDate = function (input, reference) {
     var inputDate = new Date(input);
     var referenceDate = new Date(reference);
     if (isNaN(inputDate) || isNaN(referenceDate)) return false;
     if (!validator.isDate(inputDate) || !validator.isDate(referenceDate)) { return false; }
     return inputDate < referenceDate;
   };

  // console.log(validator.isBeforeDate('10-10-2016', '4-5-2012'));
  // console.log(validator.isBeforeDate('10-10-2016', '10-12-2016'));
  // var dec25 = new Date('12-25-2016');
  // var  oct31 = new Date('10-31-2016');
  // console.log(validator.isBeforeDate(oct31, dec25));
  // console.log(validator.isBeforeDate(dec25, oct31));
  // console.log(validator.isBeforeDate('dec25', 'ct31'));

   validator.isAfterDate = function (input, reference) {
     var inputDate = new Date(input);
     var referenceDate = new Date(reference);
     if (isNaN(inputDate) || isNaN(referenceDate)) return false;
     if (!validator.isDate(inputDate) || !validator.isDate(referenceDate)) { return false; }
     return inputDate > referenceDate;
   };

  // console.log(validator.isAfterDate('10-10-2016', '4-5-2012'));
  // console.log(validator.isAfterDate('10-10-2016', '10-12-2016'));
  // var dec25 = new Date('12-25-2016');
  // var  oct31 = new Date('10-31-2016');
  // console.log(validator.isAfterDate(oct31, dec25));
  // console.log(validator.isAfterDate(dec25, oct31));
  // console.log(validator.isAfterDate('10-20-2016', 'test'));

   validator.isBeforeToday = function (input) {
     var inputDate = new Date(input);
     var newDate = new Date();
     if (isNaN(inputDate)) return false;
     if (!validator.isDate(inputDate)) { return false; }
     return inputDate < newDate;
   };

  // console.log('\nisBeforeToday');
  // console.log(validator.isBeforeToday('April 2016'));
  // console.log(validator.isBeforeToday(new Date()));
  // console.log(validator.isBeforeToday('2000'));
  // console.log(validator.isBeforeToday('haloo'));

   validator.isAfterToday = function (input) {
     var inputDate = new Date(input);
     var newDate = new Date();
     if (isNaN(inputDate)) return false;
     if (validator.isDate(inputDate) === false) { return false; }
     return inputDate > newDate;
   };

  // console.log('\nisBeforeToday');
  // console.log(validator.isAfterToday('February 2016'));
  // console.log(validator.isAfterToday(new Date()));
  // console.log(validator.isAfterToday('2017'));
  // console.log(validator.isAfterToday('haloo'));

  // Strings
   validator.isEmpty = function (input) {
     return input === input + '' && input.trim() === '';
   };

  // console.log(validator.isEmpty(''));
  // console.log(validator.isEmpty('      '));
  // console.log(validator.isEmpty('      '));
  // console.log(validator.isEmpty('Visiting new places is fun.'));


   validator.contains = function (input, words) {
     var output;
     input = input.toLowerCase();

     if (this.isNonAlphanumeric(input.substring(0, 1))) {
       for (var i = 0; i < words.length; i++) {
         if (input.search(words[i]) !== -1) {
           output = true;
         } else {
           output = false;
         }
       }
       return output;
     }
     var splitString = input.split(' ').join(',').split('-').join(',').split(',');
     for (var j = 0; j < words.length; j++) {
       if (splitString.indexOf(words[j]) < 0) {
         output = false;
       } else {
         output = true;
       }
     }
     return output;
   };

  // console.log(validator.contains('Visiting new places is fun.', ['coconut'])); // returns false
  // console.log(validator.contains('Visiting new places is fun.', ['aces'])); // returns false
  // console.log(validator.contains('Visiting new places is fun.', ['places'])); // returns true
  // console.log(validator.contains('"Definitely," he said in a matter-of-fact tone.', ['matter', 'definitely'])); // returns true

   validator.lacks = function (input, words) {
     var output = false;

     if (this.contains(input, words) === false) {
       output = true;
     } else {
       output = false;
     }
     return output;
   };

   validator.isComposedOf = function (input, words) {
     var output = false;

     if (this.lacks(input, words)) {
       output = false;
     } else {
       output = true;
     }
     return output;
   };

  // console.log(validator.isComposedOf("I am ready. Here I come", ["I", "I'm", "am", "not", "ready"]))

  // Length
   validator.isLength = function (input, n) {
     return input.length <= n;
   };

   validator.isOfLength = function (input, n) {
     return input.length >= n;
   };

  // Words
   validator.countWords = function (input) {
     var splitString;
     if (!isNaN(input)) {
       input = input.toString();
     }
     if (input.indexOf('-') !== -1) {
       splitString = input.toLowerCase().split('-');
       return splitString.length;
     } else if (input.length !== 0) {
       splitString = input.toLowerCase().split(' ');
       return splitString.length;
     }
     return 0;
   };

  // console.log(validator.countWords('Hello.'));
  // console.log(validator.countWords('Hard-to-type-really-fast!'));
  // console.log(validator.countWords('supercalifragilisticexpialidocious'));


   validator.lessWordsThan = function (input, n) {
     var wordInput;
     var wordN;

     if (isNaN(input)) {
       wordInput = validator.countWords(input);
     } else {
       wordInput = input;
     }
     if (isNaN(n)) {
       wordN = validator.countWords(n);
     } else {
       wordN = n;
     }
     return wordInput <= wordN;
   };

  // console.log(validator.lessWordsThan('there are very few words here', 500));
  // console.log(validator.lessWordsThan('there are very few words here', 'jflsaflkasjfkasjfjsakfjsafjlöasfjoöasjfkasjka'));

   validator.moreWordsThan = function (input, n) {
     var output = false;
     if (this.lessWordsThan(input, n)) {
       output = false;
     } else {
       output = true;
     }
     return output;
   };

   validator.isBetween = function (input, floor, ceil) {
     var countedWords = this.countWords(input);
     return (countedWords >= Math.floor(floor) && countedWords <= Math.ceil(ceil));
   };

  // console.log(validator.isBetween('these words fit within a certain range', 5, 7));
  // console.log(validator.isBetween('these words fit within a certain range', 7, 9));

   validator.isAlphanumeric = function (input) {
     var charCode;
     var output;
     var inputLength = input.length;

     for (var i = 0; i < inputLength; i++) {
       charCode = input.charCodeAt(i);
       if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || (charCode >= 48 && charCode <= 57) || charCode === 32) {
         output = true;
       } else {
         output = false;
         return output;
       }
     }
     return output;
   };

   validator.isCreditCard = function (input) {
     var inputLength = input.length;
     if (inputLength !== 16 && inputLength !== 19) {
       console.log(inputLength);
       return false;
     }

     if (inputLength === 16) {
       return this.isAlphanumeric(input);
     } else if (inputLength === 19) {
       var strgroup = input.split('-');
       if (strgroup.length !== 4) {
         return false;
       }
       for (var i = 0; i < strgroup.length; i++) {
         if (strgroup[i].length !== 4 || !this.isAlphanumeric(strgroup[i])) {
           return false;
         }
       }
       return true;
     }
   };

  // console.log(validator.isCreditCard('1234-5678-9101-1121'));
  // console.log(validator.isCreditCard('1234567891011121'));
  // console.log(validator.isCreditCard('4427A693CF324D14'));
  // console.log(validator.isCreditCard('4427-A693-CF32-4D14'));
  // console.log(validator.isCreditCard('testcard'));
  // console.log(validator.isCreditCard('----------------'));

   validator.isBetweenNumbers = function (input, floor, ceiling) {
     return input >= floor && input <= ceiling;
   };


  // Color
   validator.isHex = function (input) {
     if (input.charAt(0) !== '#') return false;
     input = input.substr(1);
     var inputLength = input.length;
     if (inputLength !== 3 && inputLength !== 6) {
       return false;
     }

     for (var i = 0; i < inputLength; i++) {
       var currChar = input.charAt(i);
       if (!isDigit(currChar) && !isHexLetter(currChar)) {
         return false;
       }
     }
     return true;
   };

   function isHexLetter(letter) {
     var charCode = letter.toUpperCase().charCodeAt(0);
     return charCode >= 65 && charCode <= 70;
   }

   function isDigit(char) {
     var charCode = char.charCodeAt(0);
     return charCode >= 48 && charCode <= 57;
   }

  // console.log(validator.isHex('#abcdef'));
  // console.log(validator.isHex('#bbb'));
  // console.log(validator.isHex('#1cf'));
  // console.log(validator.isHex('#1234a6'));

   validator.isRGB = function (input) {
     if (input.length < 10) return false;

     if (!input.startsWith('rgb(') || !input.endsWith(')')) {
       return false;
     }

     input = input.substr(4, input.length - 5);

     var rgbValues = input.split(',');
     if (rgbValues.length !== 3) {
       return false;
     }

     for (var i = 0; i < rgbValues.length; i++) {
       if (!this.isBetweenNumbers(parseInt(rgbValues[i]), 0, 255)) {
         return false;
       }
     }
     return true;
   };

  // console.log(validator.isRGB('rgb(0,0,0)'));
  // console.log(validator.isRGB('rgb(0, 0, 0)'));
  // console.log(validator.isRGB('rgb(255, 255, 112)'));
  // console.log(validator.isRGB('rgba(0,0,0, 0)'));
  // console.log(validator.isRGB('rgb(0,300,0)'));


   validator.isHSL = function (input) {
     if (input.length < 10) return false;

     if (!input.startsWith(('hsl(')) || !input.endsWith((')'))) {
       return false;
     }

     input = input.substr(4, input.length - 5);

     var hslValues = input.split(',');

     if (hslValues.length !== 3) {
       return false;
     }
     if (!validator.isBetweenNumbers(parseInt(hslValues[0]), 0, 360)) {
       return false;
     }

     if (!validator.isBetweenNumbers(Number(hslValues[1]), 0, 1) && !validator.isBetweenNumbers(Number(hslValues[2]), 0, 1)) {
       return false;
     }
     return true;
   };

  // console.log(validator.isHSL('hsl(122, 0.5, 1)'));
  // console.log(validator.isHSL('hsl(300, 1, 1)'));
  // console.log(validator.isHSL('hsl(200, 1, 0.5)'));
  // console.log(validator.isHSL('hsl(360, 1, 1)'));
  // console.log(validator.isHSL('hsl(140, 0.6, 1)'));

   validator.isColor = function (input) {
     return validator.isHex(input) || validator.isRGB(input) || validator.isHSL(input);
   };

  // console.log(validator.isColor('hsl(122, 0.5, 1)'));
  // console.log(validator.isColor('rgb(0,0,0)'));
  // console.log(validator.isColor('#xbb'));
  // console.log(validator.isColor('#ccccff'));
  // console.log(validator.isColor('rgb(255,255,200)'));
  // console.log(validator.isColor('hsl(46,0.66,0.21)'));
  // console.log(validator.isColor('#363'));

  // Trimming
   validator.isTrimmed = function (input) {
     var inputChars = input.split(' ');
     return inputChars.reduce(function (prev, curr) {
       return (curr !== '') ? prev : false;
     }, true);
   };

