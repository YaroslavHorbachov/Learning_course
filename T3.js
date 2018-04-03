(function () {

    var log = console.log,
        $ = document.querySelector.bind(document),
        $$ = document.querySelectorAll.bind(document),
        form = $('form'),
        result = $('.result'),
        dataSet = {};

    /* MODEL */
    function createCollection(name) {
        function Collection(name) {
            this.name = name;
            this.value = []
        }

        Collection.prototype.addValue = function (value) {
            this.value.push(value);
            return this;
        };
        Collection.prototype.getValue = function (value) {
            console.log(this);
            return this;
        };
        Collection.prototype.removeFirst = function () {
            this.value.shift();
            return this;
        };
        Collection.prototype.removeLast = function () {

            this.value.pop();
            return this;
        }
        Collection.prototype.clearAll = function () {
            this.value = [];
            return this;
        };

        var obj = new Collection(name);
        dataSet[name] = obj;
        return obj;
    }

   /* var collection1 = createCollection('Collection1').addValue({name: 'John', value: 204}).addValue({
        name: 'Johnny',
        value: 284
    }).removeLast();
    var collection2 = createCollection('Collection1').addValue({name: 'Johny Pop', value: 284}).addValue({
        name: 'Merry',
        value: 24
    }).removeLast();
    log('First collection',
        collection1,
        'Second collection',
        collection2,
        'DataSet',
        dataSet);
*/

    form.addEventListener('click', handle);

    function handle(e) {

        var type = e.type,
            target = e.target,
            node = target.nodeName,
            name = target.classList[0],
            input,
            valuesInput;

        /* INPUT FALSE RETURN */
        if (node ==='INPUT') {return}

        log('Name node', node);

        /*SWITCH WITH BUTTONS */

        if (name === 'addValueCollection') {
            /* IF FIELDS IS COUPLE  */
            input = $$('input.' + name);

             valuesInput = Array.prototype.map.call(input, input => input.value);

            var collectionName = valuesInput[0],
                valueCollection = valuesInput[1];

            try {
                dataSet[collectionName].addValue(valueCollection);
            } catch (e) {
                console.error('Wrong name', e);
                return dataSet[collectionName]
            }

            log(valuesInput);

        } else {
            /* IF FIELD IS ONE */
            input = $('input.' + name);
            valuesInput = input.value;
            switch (input.classList[0]){
                case 'addNameCollection':
                    dataSet[valuesInput] = createCollection(valuesInput);
                    break;
                case 'removeFirstChangeCollection':
                    dataSet[valuesInput].removeFirst();
                    break;
                case 'removeLastChangeCollection':
                    dataSet[valuesInput].removeLast();
                    break;
                case 'clearAllChangeCollection' :
                    dataSet[valuesInput].clearAll();
                    break;
            }
            log(input.classList[0]);
        }

        // log(inputValue);


        // --  DRAW

        result.innerHTML = '';
        var drawObject = Object.assign(dataSet);
        var fragment = new DocumentFragment();
        Object.keys(drawObject).forEach(key => {
            var h2Element = document.createElement('h2');
            var pElement = document.createElement('p');
            var strValues= '';
            drawObject[key].value.forEach(value => strValues+=' '+ value + '');
            h2Element.innerText = key;
            pElement.innerText = strValues;
            fragment.appendChild(h2Element)
            fragment.appendChild(pElement)
        });
        result.appendChild(fragment)
        log(dataSet);

        // data.forEach(obj => {
        //     var pElement = document.createElement('p');
        //     pElement.innerText = obj;
        //     result.appendChild(pElement)
        // })
        // log(data)
        e.preventDefault();
        e.stopPropagation();
    }

})()