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
gameModeText = document.querySelector("#gameModeText"),
gameModeImg = document.querySelector("#gameModeImg"),
mapText = document.querySelector("#mapText");

// creates the map list
for (let i = 0; i < maps.length; i++) {
    let li = document.createElement("li");
    li.innerText = maps[i][0];
    li.setAttribute("data-index", i);
    li.classList.add("mapListItem")
    mapList.appendChild(li);
}

// controls whether the map dropdown is shown or hidden
function dropdownVis(e) {
    mapList.style.display = "s" === e ? "block" : "none";
    mapSearch.style.border = "s" === e ? "none" : "1px solid #ffffff";
}

// controls whether the map search option or the plain text value is shown
function mapSearchVis(e) {
    mapSearch.style.display = "s" === e ? "block" : "none";
    mapText.style.display = "s" === e ? "none" : "flex";
}

// sets the map text and map select values equal to the user input and the game mode text and image values equal to their respective value if the user input is a valid map
function setMap(e, f) {
    mapSearch.value = e;
    mapText.innerText = e;
    mapSearchVis("h");
    dropdownVis("h");
    gameModeText.innerText = f;
    gameModeImg.style.display = "block";
    gameModeImg.setAttribute("src", "../assets/Images/gameModes/" + f + ".png");
}

// every time a key is pressed filters the dropdown list for matches every time a key is pressed, runs the checkMapSelection function
function filterMaps () {
    const filter = mapSearch.value.toLowerCase();
    const li = mapList.querySelectorAll("li"); 
    dropdownVis("s");
    for (let i = 0; i < li.length; i++) {
        li[i].style.display = maps[i][0].toLowerCase().includes(filter) ? "" : "none";
    }
    for(const [mapName, gameMode] of maps) {
        if (mapName.toLowerCase() === mapSearch.value.toLowerCase()) {
            mapSearch.blur();
            setMap(mapName, gameMode);
            return;
        }
    }
    gameModeImg.setAttribute("src", "");
    gameModeImg.style.display = '';
    gameModeText.innerText = '';
}

// shows the dropdown when the Map Select item is focused
mapSearch.addEventListener("focus", () => dropdownVis("s"));


// Listener for clicks on the page 
document.addEventListener("click", (event) => {
    if (!(document.querySelector(".mapContainer").contains(event.target))) { // if the click was not on an element inside of the map selection container
        dropdownVis("h"); // hide the dropdown menu
        return;
    }
    if(mapText.contains(event.target)) { // if the click was inside of the map text element 
        mapSearchVis("s"); //show the map input element and hide the map text element
        mapSearch.focus(); // focus on the map input element
        return;
    }
    if(event.target.classList.contains("mapListItem")) { //if the click was on a map list element
        const index = event.target.getAttribute("data-index"); //get the index value of the map in the original array
        setMap(maps[index][0], maps[index][1]); //set the map to the element that was clicked on
    }
});

