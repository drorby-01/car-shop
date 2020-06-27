
const colors = ["red", "green", "yellow", "black"];
const types = ["BMW", "MRCDS", "Mazda", "Subaro"];
const doors = [2, 4, 5];
const imageUrl =[
    "https://www.motoringresearch.com/wp-content/uploads/2019/09/01-fastest-cars.jpg",
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bugatti-chiron-pur-sport-106-1582836604.jpg",
    "https://www.extremetech.com/wp-content/uploads/2019/12/SONATA-hero-option1-764A5360-edit.jpg",
    "https://i.insider.com/5d9b5bff52887931e8497a36?width=1100&format=jpeg&auto=webp",
    "https://static.carsdn.co/cldstatic/wp-content/uploads/Jeep_art-final.jpg",
    "https://cars.usnews.com/dims4/USNEWS/6d48f79/2147483647/resize/640x420%3E/format/jpeg/quality/85/?url=https%3A%2F%2Fcars.usnews.com%2Fstatic%2Fimages%2Farticle%2F202002%2F128389%2F1_title_2020_kia_optima_640x420.jpg",
    "https://www.jamesedition.com/stories/wp-content/uploads/2018/02/8f35ba26fe296e36b3a96ee5416259b4.jpg",
    "https://media.caradvice.com.au/image/private/q_auto/v1578625000/nccvjom7pgi5jolixcza.jpg",
    "https://imagescdn.dealercarsearch.com/dealerimages/16298/23793/banner.jpg",
    "https://cars.usnews.com/dims4/USNEWS/c63efbe/2147483647/resize/640x420%3E/format/jpeg/quality/85/?url=https%3A%2F%2Fcars.usnews.com%2Fstatic%2Fimages%2Farticle%2F202004%2F126924%2F02_2019_Acura_RDX_Advance_1crop-min_640x420.jpg"
]

const DOM = {}

const displayFunctions = {
    "cards": getCardItem,
    "list": getListItem,
    "table": getRowItem,
};
console.log(displayFunctions)


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
    return cars;
}

function generateSingleCar(index) {
    return {
        lp: _generateLP(),
        color: _generateColor(),
        type: _generateType(),
        doors: _generateDoors(),
        imageUrl:_generateImage(),
        isSunRoof: _isSunRoof(index)
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

    function _generateImage(){
        return imageUrl[Math.floor(Math.random() * imageUrl.length)]
    }


}



(function () {
    const cars = generateCars(100, true)
    DOM.listData = document.getElementById("data");//the listview container
    DOM.cardsData = document.getElementById("data-cards");//the card view container
    DOM.tableData =document.getElementById("data-table");//the table container
    draw(cars, DOM.listData, "list");//sending to function draw the cars array and the place to put in the ui 

    const listViewButton = document.getElementById("listView"); //referance to the listview button
    const cardViewButton = document.getElementById("cardView"); //referance to the cardview button
    const tableRowButton = document.getElementById("tableView");

    const searchButton = document.getElementById("search");
    const selectType= document.getElementById("select-type")
    const selectDisplay = document.getElementById("select-display")
    searchButton.addEventListener("click",()=>{
        const carsTypeArray =cars.filter(data=>{
            return data.type === selectType.value
        })
        switch(selectDisplay.value)
        {
         case "table":draw(carsTypeArray,DOM.tableData,selectDisplay.value); break;
         case "cards":draw(carsTypeArray,DOM.cardsData,selectDisplay.value); break;
         case "list":draw(carsTypeArray,DOM.listData,selectDisplay.value); break;
        }
        
    })

    listViewButton.addEventListener("click", function () {
        draw(cars, DOM.listData, "list")
    })
    cardViewButton.addEventListener("click", function () {
        draw(cars, DOM.cardsData, "cards")
    })
    tableRowButton.addEventListener("click",()=>{
        draw(cars, DOM.tableData, "table")
    })
}())


function draw(data, domContainer, displayType) { //function how get the car data array the container to place in and wich kind of display we want 
    clearDOM()
    if (!Array.isArray(data)) return;
    if (typeof domContainer !== 'object') return;
    const displayFunction = displayFunctions[displayType]
    if(displayType === "table")
     drawTableRow(domContainer)
    if (typeof displayFunction !== 'function') return;
    data.forEach(car => {
        domContainer.append(displayFunction(car))
    });
}


function drawTableRow(domContainer){
    const table_header_lp = document.createElement("th")
    table_header_lp.innerText ="Licence Plate"
    const table_header_color = document.createElement("th")
    table_header_color.innerText ="Color"
    const table_header_doors = document.createElement("th")
    table_header_doors.innerText ="Door"
    const table_header_model = document.createElement("th")
    table_header_model.innerText ="Model"
    const table_header_isSunRoof = document.createElement("th")
    table_header_isSunRoof.innerText = "isSunRoof"
    domContainer.append(table_header_lp,table_header_color,table_header_doors,table_header_model,table_header_isSunRoof)
}



//function hwo clear the container
function clearDOM() {
    DOM.listData.innerHTML = "";
    DOM.cardsData.innerHTML = "";
    DOM.tableData.innerHTML ="";
}

//function that build the ui 
function getListItem(carData) {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.innerText = `car lp: ${carData.lp}\ncar color: ${carData.color},\ncar model: ${carData.type}\n car isSunRoof: ${carData.isSunRoof}`;
    return listItem;
}

function getCardItem(carData) {
    const card = document.createElement("div");
    card.className ="card col-lg-3 m-2"
    const card_image =document.createElement("img");
    card_image.src = carData.imageUrl;
    card_image.className ="card-img-top"
    const card_car_lp = document.createElement("p")
    card_car_lp.innerText =`car lp: ${carData.lp}`
    const card_car_color = document.createElement("p")
    card_car_color.className ="card-text"
    card_car_color.innerText =`car color: ${carData.color}`
    const card_car_door = document.createElement("p")
    card_car_door.innerText =`car doors: ${carData.doors}`
    const card_car_type = document.createElement("p")
    card_car_type.innerText =`car type: ${carData.type}`
    const card_car_sunRoof = document.createElement("p")
    card_car_sunRoof.innerText =`car is SunRoof: ${carData.isSunRoof}`
    card.append(card_image,card_car_lp,card_car_color,card_car_door,card_car_type,card_car_sunRoof);
    return card;
}

function getRowItem(carData) {

    const tableRow = document.createElement("tr");
    const tableDataCarLp = document.createElement("td");
    const tableDataCarColor = document.createElement("td");
    const tableDataCarDoor = document.createElement("td");
    const tableDataCarType = document.createElement("td");
    const tableDataCarSunRoof = document.createElement("td");
    tableDataCarLp.innerText =carData.lp;
    tableDataCarColor.innerText=carData.color;
    tableDataCarDoor.innerText = carData.doors;
    tableDataCarType.innerText = carData.type;
    tableDataCarSunRoof.innerText = carData.isSunRoof;
    tableRow.append(tableDataCarLp,tableDataCarColor,tableDataCarDoor,tableDataCarType,tableDataCarSunRoof);
    return tableRow
 }
