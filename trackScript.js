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

const mapList = document.getElementById("mapList");
const mapSearch = document.getElementById("mapSearch");
const gameModeText = document.getElementById('gameModeText');
const gameModeImg = document.getElementById("gameModeImg");
const mapText = document.getElementById("mapText");

// creates the map list
for (let i = 0; i < maps.length; i++) {
    let li = document.createElement('li');
    li.innerText = maps[i][0];
    li.setAttribute("data-mapName", maps[i][0]);
    li.setAttribute("data-gameMode", maps[i][1]);
    li.setAttribute("data-index", i);
    mapList.appendChild(li);
}

// controls whether the map dropdown is shown or hidden
function dropdownVis(listVis) {
    mapList.style.display = listVis === "show" ? "block" : "none";
    mapSearch.style.border = listVis === "show" ? "none" : "1px solid #ffffff";
}

// controls whether the map search option or the plain text value is shown
function mapSearchVis(searchVis) {
    mapSearch.style.display = searchVis === "show" ? "block" : "none";
    mapText.style.display = searchVis === "show" ? "none" : "flex";
}

// sets the map text and map select values qual to the user input if it is a valid map
function setMap(map) {
    mapSearch.value = map;
    mapText.innerText = map;
    mapSearchVis("hide");
}

// every time a key is pressed filters the dropdown list for matches
//every time a key is pressed, runs the checkMapSelection function
function filterMaps ()
{
    const filter = mapSearch.value.toLowerCase();
    const li = mapList.getElementsByTagName("li"); 
    let found = false;

    dropdownVis("show");

    for (let i = 0; i < li.length; i++) {
        //const mapValue = maps[i][0];
        li[i].style.display = maps[i][0].toLowerCase().includes(filter) ? '' : 'none'; 
        if (li[i].style.display !== 'none') {
            found = true;
        }
    }

    const validMap = checkMapSelection();
    if (validMap) {
        mapSearch.blur();
        setMap(validMap[0]);
        dropdownVis("hide");
        setGameMode(validMap[1]);
    }
}

//checks whether a valid map has been manually typed into the field
function checkMapSelection() {
    for(const [mapName, gameMode] of maps) {
        if (mapName.toLowerCase() === mapSearch.value.toLowerCase()) {

            return [mapName, gameMode];
            
        } 
    }

    gameModeImg.setAttribute("src", "");
    gameModeImg.style.display = '';
    gameModeText.innerText = '';
    return null;

}

// sets the game mode
function setGameMode(gameMode){
    gameModeText.innerText = gameMode;
    gameModeImg.style.display = 'block';
    if(gameMode === "Control") {
        gameModeImg.setAttribute("src", "Images/gameModes/Control.png");
    } else if (gameMode === "Escort") {
        gameModeImg.setAttribute("src", "Images/gameModes/Escort.png");
    } else if (gameMode === "Flashpoint") {
        gameModeImg.setAttribute("src", "Images/gameModes/Flashpoint.png");
    } else if (gameMode === "Hybrid") {
        gameModeImg.setAttribute("src", "Images/gameModes/Hybrid.png");
    } else if (gameMode === "Push") {
        gameModeImg.setAttribute("src", "Images/gameModes/Push.png");
    }
}

// shows the dropdown when the Map Select item is highlighted
mapSearch.addEventListener('focus', () => dropdownVis("show"));

// sets the map and game mode when a list element is clicked
mapList.addEventListener('click', (event) => { // if an element in the map list is clicked
    if (event.target.tagName === 'LI') { // if the element is a list item
        const selectedMap = event.target.getAttribute('data-mapName');
        const selectedGameMode = event.target.getAttribute('data-gameMode');
        setMap(selectedMap);
        dropdownVis("hide");
        setGameMode(selectedGameMode);
    }
});

// hide dropdown when clicking outside of select or list elements
// show dropdown when clicking on the text replacement element
document.addEventListener('click', (event) => {
    if (!(document.querySelector('.mapContainer').contains(event.target))) { // if the mouse click was outside of the map container

        dropdownVis("hide");

    } else if(document.querySelector('.mapText').contains(event.target)) {

        mapSearchVis("show");
        mapSearch.focus();

    }
});

