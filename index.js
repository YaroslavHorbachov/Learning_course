var log = console.log;
var $ = document.querySelector.bind(document);
var create = document.createElement.bind(document);


var root = $('.root');
var result = $('.result');

function Add() {
    var el = document.createElement('h1');

    el.innerText = 'QW';
    root.appendChild(el);
}

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
            .filter(function (char) {
                return char.length
            })
            .length
    }

    countWordElement.innerText = 'Count of words: ' + getCountWord(value);
    fragment.appendChild(countWordElement);


    /* COUNT NUM */
    var countNumElement = create('p');

    function getCountNum(val) {
        return val
            .replace(/\D\D/g, ' ')
            .split(' ')
            .filter(function(char){
                return char.length
            })

    }

    countNumElement.innerText = 'Count of number: ' + getCountNum(value).length;
    fragment.appendChild(countNumElement);


    /* ALL INTEGERS IN 6LET(X)*/
    var allIntegersElement = create('p');

    function getAllInteger(val) {
        return getCountNum(val)
            .filter(chr => !chr.match(/\./g))
            .map(chr => {
                 return chr.match(/\d/g).join('')
            })
            .filter(chr => chr.length <= 6)
            .map(chr => {
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

                var chr = chr.split('.');
                console.log(chr)
                if (chr[0].length === 6 && chr[1].length === 2) {
                    return chr
                }
                else {
                    var nCFirst = 6 - chr[0].length;
                    var nCSecond = 2 - chr[1].length;
                    return Array(nCFirst).fill(0).join('') + chr[0]
                        + '.' +  Array(nCSecond).fill(0).join('') + chr[1]
                }
            })
    }

    allFractionElement.innerText = 'All fractions numbers: ' + getAllFraction(value);
    fragment.appendChild(allFractionElement);


    /* RESULT */
    result.appendChild(fragment);
    log(value, valueSize, target,)
}

input.addEventListener('input', onChangeInput);
log(input.style);


