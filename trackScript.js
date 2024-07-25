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

let mapList = document.getElementById("mapList");
let mapSearch = document.getElementById("mapSearch");
let gameModeText = document.getElementById('gameModeText');
let gameModeImg = document.getElementById("gameModeImg");
let mapText = document.getElementById("mapText");

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
function dropdownVis(value) {
    if (value === "show") {
        mapList.style.display = 'block'; // show dropdown when typing
        mapSearch.style.width='200px';
        mapSearch.style.border = 'none';
    } else if (value === "hide") {
        mapList.style.display = 'none';
        mapSearch.style.width ='auto';
        mapSearch.style.border = '1px solid #ffffff';
    }

}

// controls whether the map search option or the plain text value is shown
function mapSearchVis(value) {
    if(value === "show") {

        mapSearch.style.display = 'block';
        mapText.style.display = 'none';

    } else if (value === "hide") {
        mapSearch.style.display = 'none';
        mapText.style.display = 'flex';
    }
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
    const input = mapSearch;
    const filter = input.value.toLowerCase();
    const li = mapList.getElementsByTagName("li"); 
    let found = false;

    dropdownVis("show");

    for (let i = 0; i < li.length; i++) {
        const mapValue = maps[i][0];
        if (mapValue.toLowerCase().indexOf(filter) > -1) { //if input text does match the map
            li[i].style.display = ''; // sets elements display property to default
            found = true; // matches are found so this is true
        } else { // if input text does not match the map
            li[i].style.display = 'none'; // hide the element 
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
    for(let i = 0; i < maps.length; i++) {
        if (maps[i][0].toLowerCase() === mapSearch.value.toLowerCase()) {

            return [maps[i][0], maps[i][1]];
            
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
    if(gameModeText.innerText === "Control") {
    
        gameModeImg.setAttribute("src", "Images/gameModes/Control.png");
        gameModeImg.style.display = 'block';
    
    } else if (gameModeText.innerText === "Escort") {
    
        gameModeImg.setAttribute("src", "Images/gameModes/Escort.png");
        gameModeImg.style.display = 'block';
    
    } else if (gameModeText.innerText === "Flashpoint") {
        
        gameModeImg.setAttribute("src", "Images/gameModes/Flashpoint.png");
        gameModeImg.style.display = 'block';
        
    } else if (gameModeText.innerText === "Hybrid") {
        
        gameModeImg.setAttribute("src", "Images/gameModes/Hybrid.png");
        gameModeImg.style.display = 'block';
        
    } else if (gameModeText.innerText === "Push") {
        
        gameModeImg.setAttribute("src", "Images/gameModes/Push.png");
        gameModeImg.style.display = 'block';
        
    }
}

// shows the dropdown when the Map Select item is highlighted
mapSearch.addEventListener('focus', () => {
    dropdownVis("show") // if the map input is focused, the dropdown is shown
});

// sets the map and game mode when a list element is clicked
mapList.addEventListener('click', function(event) { // if an element in the map list is clicked
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
document.addEventListener('click', function(event) {
    if (!(document.querySelector('.mapContainer').contains(event.target))) { // if the mouse click was outside of the map container

        dropdownVis("hide");

    } else if(document.querySelector('.mapText').contains(event.target)) {

        mapSearchVis("show");
        mapSearch.focus();

    }
});

