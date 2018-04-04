/* UTILS*/
var log = console.log,
    $ = document.querySelector.bind(document),
    create = document.createElement.bind(document);
/*ELEMENTS */
var input = $('input'),
    result = $('.result');

/* LISTENER*/
input.addEventListener('input', handlerInput);


/* HANDLER */
function handlerInput(e) {
    result.innerHTML = '';

    var target = e.target;
    var value = target.value;
    var length = value.length;
    /* CHANGE SIZE INPUT FIELD*/
    target.attributes.size.value = length + 'px';

    /* FRAGMENT */
    var fragment = new DocumentFragment();

    /* ERROR HANDLER */
    var errorFormatElement = create('p');

    function getErrorFormat(val) {
        var cleanVal = val.split(';');
        // if(cleanVal.length < 2) return true;
        return cleanVal
            .filter(pair => pair.length)
            .map(pair => pair.split(':').length === 2 && pair.split(':')[1].length > 0)// array
    }

    errorFormatElement.innerText = getErrorFormat(value)[0] ? '' : 'Some problem with parse format text';
    fragment.appendChild(errorFormatElement);

    /* CLEAN OBJECT */

    if (getErrorFormat(value)[0]) {
        var cleanObject = value.split(';')
            .filter(pair => pair.length)
            .map(pair => pair.split(':'))
            .filter(pair => pair.length <= 2);


        /* JS OBJECT */
        function consoleObject() {
            var preObj = {};
            var resObj = {};

            cleanObject.concat()
                .forEach(pair => preObj[pair[0]] = pair[1]);
            var keys = Object.keys(preObj).map(item => item.replace(/\s/g, '')),
                val = Object.values(preObj).map(item => item.replace(/\s/g, ''));
            keys.forEach((item, idx) => resObj[item] = val[idx]);
            log(resObj);
            return resObj;
        }

        consoleObject(value);

        /* CREATE OBJ IN FORMAT */

        var objFormatElement = create('div');
        (function getObjformatElement() {
            var pre = create('PRE');
            var textObj = JSON.stringify(consoleObject());
            textObj = textObj.replace(/,/g, ',\n');
            textObj = textObj.replace(/{"/, '{\n"');
            textObj = textObj.replace(/"}/, '"\n}');
            textObj = textObj.replace(/\n"/g, '\n\t"');
            pre.innerText = textObj;
            objFormatElement.appendChild(pre);
        })();

        fragment.appendChild(objFormatElement);


        /*  KEY IN OBJ WITH DASH  */
        var keysWithDashedElement = create('p');

        function getKeysWithDashed() {

            var outerStr = '';
            return Object.keys(consoleObject()).map(item => {
                if (item.replace('-', '').length === item) {
                    return item;
                }
            }).forEach(str => outerStr += ' ' + str)
        }

        keysWithDashedElement.innerText = 'All keys with dashed: ' + (getKeysWithDashed() ? getKeysWithDashed() : 'no one');
        fragment.appendChild(keysWithDashedElement);

        /* OBJECT IS EMPTY ? */

        var emptyObjectElement = create('p');

        function getEmptyObject() {
            return JSON.stringify(consoleObject()).length > 2
        }

        emptyObjectElement.innerText = 'Object is empty ? ' + !getEmptyObject();
        fragment.appendChild(emptyObjectElement);

        /* KEY OBJECT WHO GREATER  > 100*/

        var objectGreaterElement = create('p');

        function getObjectGreater() {
            var resultStringOfGreater = '';
            var indexKeys = Object.values(consoleObject())
                .map((chr, idx) => {
                    if (typeof +chr === 'number') {
                        if (+chr > 100) {
                            return idx
                        }
                    }
                }).filter(idx => idx !== undefined);

            if (indexKeys.length > 0) {
                var keyOfObject = Object.keys(consoleObject());
                indexKeys.forEach(idx => resultStringOfGreater += keyOfObject[idx].length);
            } else {
                resultStringOfGreater += ' No one'
            }
            return resultStringOfGreater
        }

        objectGreaterElement.innerText = 'key greater then 100 , and length : ' + getObjectGreater();

        fragment.appendChild(objectGreaterElement);


        /*   ALL VALUES * 2  */

        function Multiply() {
            var resObj = {};
            Object.values(consoleObject())
                .map(chr => {
                        if (typeof +chr === 'number') {
                            return +chr * 2;
                        }
                    }
                ).forEach((num, idx) => resObj[Object.keys(consoleObject())[idx]] = num);
            return resObj;
        }

        log('Multiply: ', Multiply());

        /* ALL SORTED VALUE */

        function sortedByAlph() {
            var jObj = consoleObject();
            var resObj = {};
            Object.keys(jObj)
                .sort()
                .forEach(key => resObj[key] = jObj[key]);
            return resObj;
        }

        log('Sorted: ', sortedByAlph());

        /* RANDOM VALUE */
        var randomField = create('p');

        function getRandomFiled() {
            return Object.values(consoleObject())[Math.ceil((Object.keys(consoleObject()).length - 1) * Math.random())]
        }

        randomField.innerText = 'Random value: ' + getRandomFiled();
        fragment.appendChild(randomField);


        /* LAST MODIFY */
        var lastModifyElement = create('p');

        function getLastModify() {
            var date = new Date();
            return date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()) + '-' + (date.getDay() < 10 ? '0' + date.getDay() : date.getDay())
        }

        lastModifyElement.innerText = 'Last modify : ' + getLastModify();
        fragment.appendChild(lastModifyElement);
    }
    /* APPEND  FRAGMENT*/
    result.appendChild(fragment);
}
