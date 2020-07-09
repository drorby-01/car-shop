$(document).ready(()=>{

    const colors = ["red", "green", "yellow", "black"];
    const generatedTypes = ["BMW", "MRCDS", "Mazda", "Subaro"];
    const types = generatedTypes.map(s => s.toLocaleLowerCase())
    const doors = [2, 4, 5];
    const DOM = {}
    const DATA = generateCars(100, true)
    
    const displayFunctions = {
        "cards": getCardItem,
        "list": getListItem,
        "table": getRowItem,
        "tableHeader": getRowHeaderItem,
        "getCheckboxes": getCheckboxes,
        "searchOptions": getSearchOptions,
    };
    
    const TIME_TO_HIDE_MODAL = 4 * 1000;
    const START_TIME_TO_SHOW_MODAL = 2 * 1000;
    
    
    
    
    
    const headers = [[
        {
            value: "lp",
            label: "LP",
            isVisible: true,
            isConstant: false,
            isSearchable: true
        },
        {
            value: "color",
            label: "Color",
            isVisible: true,
            isConstant: true,
            isSearchable: true,
    
        },
        {
            value: "type",
            label: "Type",
            isVisible: true,
            isConstant: false,
            isSearchable: true,
        },
        {
            value: "doors",
            label: "Doors",
            isVisible: true,
            isConstant: false,
            isSearchable: false,
    
        },
        {
            value: "isSunRoof",
            label: "Sun Roof",
            isVisible: false,
            isConstant: false,
            isSearchable: false,
        },
        {
            value: "isAWD",
            label: "4 X 4",
            isVisible: false,
            isConstant: false,
            isSearchable: false,
        },
        {
            value: "year",
            label: "Year Created",
            isVisible: true,
            isConstant: false,
            isSearchable: false,
        }
    ]]
    
    
    function generateCars(numberOfCars, isArray) { //return array with Cars ( each car is an object in JS)
        if (typeof numberOfCars !== 'number') return;
        const cars = isArray ? [] : {};
        for (let index = 0; index < numberOfCars; index++) {
            if (isArray) cars.push(generateSingleCar(index))
            else {
                const singleCar = generateSingleCar(index)
                cars[singleCar.lp.toString()] = singleCar;
            }
        }
        cars.push(generateSingleCar(1, 123456789));
        return cars;
    }
    
    function generateSingleCar(index, lp) {
        return {
            lp: lp || _generateLP(),
            color: _generateColor(),
            type: _generateType(),
            doors: _generateDoors(),
            isSunRoof: _isSunRoof(index),
            isAWD: _isAWD(index),
            year: _generateYear()
        };
    
    
        function _generateLP() {
            return Math.ceil(Math.random() * 999999);
        }
        function _generateColor() {
            return colors[Math.floor(Math.random() * colors.length)];
        }
        function _generateDoors() {
            return doors[Math.floor(Math.random() * doors.length)];
        }
        function _isSunRoof(index) {
            return index % 2 === 0 ? true : false
        }
        function _generateType() {
            return types[Math.floor(Math.random() * types.length)];
        }
        function _isAWD(index) {
            return index % 2 === 0 ? true : false
        }
        function _generateYear() {
            return new Date().toUTCString();
        }
    
    
    }
    
    // array [....]
    // filter - filter by boolean statment
    // find - like filter but exactly one, the first one.
    // findIndex - exactly like find, but return only the index.
    // map - return partial result
    // reduce - next time..
    
    
    (function () {
        
    
        DOM.listData = $("#data");
        DOM.cardsData = $("#data-cards");
        DOM.tableData = $("#table-data");
        DOM.tableHead = $("#table-head");
        DOM.checkboxes = $("#checkboxes");
        searchOptions = $("#searchOptions");
        DOM.whatToDraw = "list"
    
        draw(DATA, DOM.listData, DOM.whatToDraw);
        draw(headers, searchOptions, "searchOptions", false);
    
        const listViewButton = $("#listView");
        const cardViewButton = $("#cardView");
        const tableViewButton = $("#tableView");
        const searchOperation = $("#searchOperation");
          
        listViewButton.on("click", function () {
            DOM.whatToDraw = "list";
            draw(DATA, DOM.listData, "list")
        })
        cardViewButton.on("click", function () {
            DOM.whatToDraw = "cards"
            draw(DATA, DOM.cardsData, "cards")
        })
        tableViewButton.on("click", function () {
            _drawTable(DATA, headers)
        })
        searchOperation.on("click", function () {
            const value = $("#searchValue").val();
            const searchBy = $("#search-select").val();
            if (!value) return;
    
            const currentValue = typeof value === 'string' ? value.toLowerCase() : value;
            console.log(currentValue, searchBy)
            const result = DATA.filter(car => {
                const stringValue = car[searchBy].toString();
                return stringValue === currentValue
            })
            if (DOM.whatToDraw === "table") return _drawTable(result, headers);
            if (DOM.whatToDraw === "cards") return draw(result, DOM.cardsData, "cards")
            return draw(result, DOM.listData, "list")
        })
          
        //startNotifications();
        
    }())
    
    function _drawTable(cars, headers) {
        DOM.whatToDraw = "table"
        draw(cars, DOM.tableData, "table")
        draw(headers, DOM.tableHead, "tableHeader", false)
        draw(headers, DOM.checkboxes, "getCheckboxes", false)
    }
    
    
    function draw(data, domContainer, displayType, clear = true) {
        if (clear) clearDOM()
        if (!Array.isArray(data)) return;
        if (typeof domContainer !== 'object') return;
        const displayFunction = displayFunctions[displayType]
        if (typeof displayFunction !== 'function') return;
        data.forEach(item => {
            const result = displayFunction(item)
            domContainer.append(result)
        });
    }
    
    function clearDOM() {
        // DOM.listData.innerHTML = "";
        // DOM.cardsData.innerHTML = "";
        // DOM.tableData.innerHTML = "";
    
        // this is more dynamic
    
        Object.keys(DOM).forEach((keyInDom) => {
            if (typeof DOM[keyInDom] !== "object") return;
            DOM[keyInDom].innerHTML = "";
        })
    
    }
    function getListItem(carData) {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.innerText = `car lp: ${carData.lp}, car color: ${carData.color}`;
        return listItem;
    }
    
    function getCardItem(carData) {
        const card = document.createElement("div");
        card.style.border = "1px solid black";
        card.style.height = "50px";
        card.style.width = "300px";
        card.style.display = "inline-block";
        card.innerText = `car lp: ${carData.lp}, car color: ${carData.color} , car type: ${carData.type}`;
        return card;
    }
    
    function getRowHeaderItem(myHeaders) {
        const ths = myHeaders.filter((header) => { return header.isVisible }).map(header => {
            const { label, isVisible } = header;
            if (isVisible) return _getTH(label)
        })
    
        const tr = _getTR();
        tr.append(...ths);
        return tr;
        function _getTR() {
            return document.createElement("TR");
        }
    
        function _getTH(value) {
            const th = document.createElement("TH");
            th.style.color = "red";
            th.innerText = value;
            return th;
        }
    }
    
    function getCheckboxes(internalHeders) {
        const checkboxedDivs = internalHeders.filter((header) => { return !header.isConstant }).map((header) => {
            return _getCheckbox(header)
        })
    
        const div = document.createElement("DIV")
        div.append(...checkboxedDivs);
        return div;
    
        function _getCheckbox(header) {
            const { label, isVisible, value } = header;
    
            const div = document.createElement("DIV");
            const span = document.createElement("span");
            const input = document.createElement("input");
            input.addEventListener("change", _displayColumn)
            input.id = value;
            span.innerText = label;
            input.checked = isVisible;
            input.type = "checkbox"
            div.append(span, input)
            return div;
        }
    
        function _displayColumn() {
            //this = input
    
    
            // const [headersConfig] = headers;
            const elementId = this.id;
            const isChecked = this.checked;
    
            const headersConfig = headers[0];
            if (!Array.isArray(headersConfig)) return;
            const isSunRoofHeaderObj = headersConfig.find(function (headerObj) {
                console.log(this)
                return headerObj.val() === elementId
            })
            // const isSunRoofHeaderObj = headersConfig.find(h => h.value === "isSunRoof") shorter way
            isSunRoofHeaderObj.isVisible = isChecked;
            _drawTable(DATA, headers)
        }
    }
    function getRowItem(carData) {
        // const lp = carData.lp;
        // const color = carData.color;
        // const type = carData.type;
        // const doors = carData.doors;
        const { lp, type, doors, color } = carData; // destructuring es6 
        // return getRowItem;
    
        const tr = _getTR();
        const firstRowFromHeaders = headers[0];
        const visibleHeaders = firstRowFromHeaders.filter((header) => { return header.isVisible });
        const tds = visibleHeaders.map((header) => {
            const { value } = header;
            const currentValue = carData[value];
            return _getTD(currentValue)
        })
    
        // const tdLP = _getTD(lp);
        // const tdColor = _getTD(color);
        // const tdType = _getTD(type);
        // const tdDoors = _getTD(doors);
        tr.append(...tds)
        return tr;
        function _getTR() {
            return document.createElement("TR");
        }
    
    
    
        function _getTD(value) {
            const allowedTypes = ["string", "number", "boolean"];
            const theType = typeof value;
            // if (!allowedTypes.includes(theType)) return;
            let currentValue = !allowedTypes.includes(theType) ? "-" : value
            // if (theType !== "string" && theType !== "number") return;
            const td = document.createElement("TD");
            td.innerText = currentValue;
            return td;
        }
    }
    
    function getSearchOptions(headers) {
        const isSearchableHeaders = headers.filter(({ isSearchable }) => isSearchable);
        const HTMLSelect = _getSelect();
        const HTMLOptions = _getOptions(isSearchableHeaders);
        HTMLSelect.append(...HTMLOptions);
        return HTMLSelect;
    
        function _getSelect() {
            const select = document.createElement("SELECT");
            select.id = "search-select";
            select.classList.add("form-control");
            return select;
        }
    
        function _getOptions(h) {
            const options = h.map(({ value, label }) => {
                const currentOption = document.createElement("OPTION");
                currentOption.value = value;
                currentOption.innerText = label;
                return currentOption;
            })
            return options;
        }
    }
    
    




})