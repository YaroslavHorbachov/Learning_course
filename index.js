var log = console.log;
var $ = document.querySelector.bind(document);
var create = document.createElement.bind(document);


var result = $('.result');
var input = $('input');

var valueSize = 0;

function onChangeInput(e) {
    /* SIZE INPUT FIELD*/
    result.innerHTML = '';
    var target = e.target;
    var value = target.value;
    var length = value.length;
    target.attributes.size.value = length + 'px';

    /* FRAGMENT */
    var fragment = new DocumentFragment();

    /* LENGTH OF TEXT */

    var lengthElement = create('p');
    lengthElement.innerText = 'Length of text:  ' + length;
    fragment.appendChild(lengthElement);

    /* REGULAR TEXT TEXT */

    var regularElement = create('p');

    function regularValue(val) {
        return val.replace(/[\W\s]/g, '')
    }

    regularElement.innerText = regularValue(value);
    fragment.appendChild(regularElement);

    /* COUNT WDS*/

    var countWordElement = create('p');

    function getCountWord(val) {
        return val
            .replace(/\s/g, '$')
            .trim()
            .split('$')
            .filter(function(char){ return char.length })
            .length
    }

    countWordElement.innerText = 'Count of words: ' + getCountWord(value);
    fragment.appendChild(countWordElement);


    /* COUNT NUM */
    var countNumElement = create('p');

    function getCountNum(val) {
        return val
            .replace(/[A-Za-z]/g, ' ')
            .split(' ')
            .filter(function(char){return char.length})
            .map(function(chr){return chr.split('..').join('')})
            .filter(function(chr)  {
                return chr.split('.').length <= 2
            })

    }

    countNumElement.innerText = 'Count of number: ' + getCountNum(value).length;
    fragment.appendChild(countNumElement);


    /* ALL INTEGERS IN 6LET(X)*/
    var allIntegersElement = create('p');

    function getAllInteger(val) {
        return getCountNum(val)
            .filter(function(chr) { return !chr.match(/\./g) })
            .filter(function(chr) {return chr.length <= 6})
            .map(function(chr)  {
                if (chr.length === 6) {
                    return chr
                }
                else {
                    var nC = 6 - chr.length;
                    return Array(nC).fill(0).join('') + chr
                }
            })
    }

    allIntegersElement.innerText = 'All integers numbers is format XXXXXX: ' + getAllInteger(value);
    fragment.appendChild(allIntegersElement);


    /* All FRACTION NUMBERS IN XXXXXX.XX */
    var allFractionElement = create('p');

    function getAllFraction(val) {
        return getCountNum(val)
            .filter(chr => chr.match(/\./g))
            .map(chr => {
                return chr.replace(/[A-Za-z]/g, '')
            }).filter( chr => {
                let char = chr.split('.');
                console.log(char);
                if( char[0].length < 6 && char[1].length <=2) {return chr;}
            })
            .map(chr => {

                var newChar = chr.split('.');
                console.log(newChar);
                if (newChar[0].length === 6 && newChar[1].length === 2) {
                    return newChar
                }
                else {
                    var nCFirst = 6 - newChar[0].length;
                    var nCSecond = 2 - newChar[1].length;
                    return Array(nCFirst).fill(0).join('') + newChar[0]
                        + '.' +  Array(nCSecond).fill(0).join('') + newChar[1]
                }
            })
    }

    allFractionElement.innerText = 'All fractions numbers: ' + getAllFraction(value);
    fragment.appendChild(allFractionElement);


    /*CLEAN NUMBER */
    var cleanNumber = getCountNum(value).map(chr => +chr);

    /*SUM OF ALL NUMBERS*/
    var allNumbersSumElement = create('p');
    function getAllNumbersSum(){
        return cleanNumber.reduce(function (acc,number) {
            return acc + number
        },0)
    }
    allFractionElement.innerText = 'Sum of All Numbers: ' + getAllNumbersSum();
    fragment.appendChild(allNumbersSumElement);



    /* MAX NUMBER */
    var maxNumberElement = create('p');
    function getMaxNumber(){
        return Math.max.apply({}, cleanNumber)
    }
    maxNumberElement.innerText = 'Max numeber: ' + getMaxNumber();
    fragment.appendChild(maxNumberElement);


    /* EQUAL NUMBERS */
    var equalNumbersElement = create('p');
    function getEqualNumbersElement(){
        return cleanNumber[0] === (getAllNumbersSum() / cleanNumber.length)
    }
    equalNumbersElement.innerText = 'All numbers is equal: ' + getEqualNumbersElement(value);
    fragment.appendChild(equalNumbersElement);



    /* RANDOM NUMBER  */
    var randomNumberElement = create('p');
    function getRandomNumberElement(){
        return cleanNumber[Math.floor(Math.random()*cleanNumber.length)]
    }
    randomNumberElement.innerText = 'Random number from input: ' + getRandomNumberElement();
    fragment.appendChild(randomNumberElement);


    /* RESULT */
    result.appendChild(fragment);
    log(value, valueSize, target,)
}

input.addEventListener('input', onChangeInput);
log(input.style);


