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

const mapList = document.getElementById("mapList"),
mapSearch = document.getElementById("mapSearch"),
gameModeText = document.getElementById('gameModeText'),
gameModeImg = document.getElementById("gameModeImg"),
mapText = document.getElementById("mapText");

// creates the map list
for (let i = 0; i < maps.length; i++) {
    let li = document.createElement('li');
    li.innerText = maps[i][0];
    li.setAttribute("data-index", i);
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
    gameModeImg.style.display = 'block';
    gameModeImg.setAttribute("src", "Images/gameModes/" + f + ".png");
}

// every time a key is pressed filters the dropdown list for matches every time a key is pressed, runs the checkMapSelection function
function filterMaps () {
    const filter = mapSearch.value.toLowerCase();
    const li = mapList.getElementsByTagName("li"); 
    dropdownVis("s");
    for (let i = 0; i < li.length; i++) {
        li[i].style.display = maps[i][0].toLowerCase().includes(filter) ? '' : 'none';
    }
    checkMapSelection();
}

//checks whether a valid map has been manually typed into the field
function checkMapSelection() {
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

// shows the dropdown when the Map Select item is highlighted
mapSearch.addEventListener('focus', () => dropdownVis("s"));

// sets the map and game mode when a list element is clicked
mapList.addEventListener('click', (event) => { // if an element in the map list is clicked
    if (event.target.tagName === 'LI') { // if the element is a list item
        const index = event.target.getAttribute('data-index');
        setMap(maps[index][0], maps[index][1]);
    }
});

// hide dropdown when clicking outside of select or list elements, show dropdown when clicking on the text replacement element
document.addEventListener('click', (event) => {
    if (!(document.querySelector('.mapContainer').contains(event.target))) { // if the mouse click was outside of the map container
        dropdownVis("h");
    } else if(document.querySelector('.mapText').contains(event.target)) {
        mapSearchVis("s");
        mapSearch.focus();
    }
});

