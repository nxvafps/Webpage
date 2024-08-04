// map array and initialising variables
let maps = [
    ["Antarctic Peninsula", "Control"],
    ["Blizzard World", "Hybrid"],
    ["Busan", "Control"],
    ["Circuit Royal", "Escort"],
    ["Colosseo", "Push"],
    ["Dorado", "Escort"],
    ["Eichenwalde", "Hybrid"],
    ["Esperanca", "Push"],
    ["Havana", "Escort"],
    ["Hollywood", "Hybrid"],
    ["Illios", "Control"],
    ["Junkertown", "Escort"],
    ["Kings Row", "Hybrid"],
    ["Lijang Tower", "Control"],
    ["Midtown", "Hybrid"],
    ["Nepal", "Control"],
    ["New Junk City", "Flashpoint"],
    ["New Queens Street", "Push"],
    ["Numbani", "Hybrid"],
    ["Oasis", "Control"],
    ["Paraiso", "Hybrid"],
    ["Rialto", "Escort"],
    ["Route 66", "Escort"],
    ["Runasapi", "Push"],
    ["Samoa", "Control"],
    ["Shambali Monastery", "Escort"],
    ["Suravasa", "Flashpoint"],
    ["Watchpoint: Gibraltar", "Escort"]
];

const mapList = document.querySelector("#mapList"),
mapSearch = document.querySelector("#mapSearch"),
gameModeContainer = document.querySelector("#gameModeContainer"),
gameModeText = document.querySelector("#gameModeText"),
gameModeImg = document.querySelector("#gameModeImg"),
mapText = document.querySelector("#mapText");

// creates the map list
for (let i = 0; i < maps.length; i++) {
    let li = document.createElement("li");
    li.innerText = maps[i][0];
    li.setAttribute("data-index", i);
    li.classList.add("mapListItem");
    mapList.appendChild(li);
    dropdownVis("hide");
}

// controls whether the map dropdown is shown or hidden
function dropdownVis(a) {
    
    mapList.classList.toggle("invisible", a === "hide");
    mapSearch.classList.toggle("border", a === "show");
}

// controls whether the map search option or the plain text value is shown
function mapSearchVis(a) {
    mapSearch.classList.toggle("invisible", a === "hide");
    mapText.classList.toggle("invisible", a === "show");
}

// sets the map text and map select values equal to the user input and the game mode text and image values equal to their respective value if the user input is a valid map
function setMap(e, f) {
    mapSearch.value = e;
    mapText.innerText = e;
    mapSearchVis("hide");
    dropdownVis("hide");
    gameModeText.innerText = f;
    gameModeImg.setAttribute("src", "../assets/Images/gameModes/" + f + ".png");
    gameModeImg.classList.remove("invisible")
}

// every time a key is pressed filters the dropdown list for matches every time a key is pressed, runs the checkMapSelection function
mapSearch.addEventListener("keyup", () => {
    const filter = mapSearch.value.toLowerCase();
    const li = mapList.querySelectorAll("li"); 
    dropdownVis();
    for (let i = 0; i < li.length; i++) {
        li[i].classList.toggle("invisible", !maps[i][0].toLowerCase().includes(filter));
    }
    for(const [mapName, gameMode] of maps) {
        if (mapName.toLowerCase() === mapSearch.value.toLowerCase()) {
            mapSearch.blur();
            setMap(mapName, gameMode);
            return;
        }
    }
    gameModeImg.classList.add("invisible");
    gameModeImg.setAttribute("src", "");
    gameModeText.innerText = "";
});

// shows the dropdown when the Map Select item is focused
mapSearch.addEventListener("focus", () => dropdownVis("show")); //() => is used because we dont need to access properties of the event 



// Listener for clicks on the page 
document.addEventListener("click", (event) => {
    if (!(document.querySelector(".mapContainer").contains(event.target))) { // if the click was not on an element inside of the map selection container
        dropdownVis("hide"); // hide the dropdown menu
        return;
    }
    if(mapText.contains(event.target)) { // if the click was inside of the map text element 
        mapSearchVis("show"); //show the map input element and hide the map text element
        dropdownVis("show");
        mapSearch.focus(); // focus on the map input element
        return;
    }
    if(event.target.classList.contains("mapListItem")) { //if the click was on a map list element
        const index = event.target.getAttribute("data-index"); //get the index value of the map in the original array
        setMap(maps[index][0], maps[index][1]); //set the map to the element that was clicked on
    }
});

