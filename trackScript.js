
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


for (let i = 0; i < maps.length; i++) {
    let li = document.createElement('li');
    li.innerText = maps[i][0];
    li.setAttribute("data-gameMode", maps[i][1]);
    li.setAttribute("value", i);
    mapList.appendChild(li);
}

function filterMaps ()
{
    const input = mapSearch;
    const filter = input.value.toLowerCase();
    const li = mapList.getElementsByTagName("li"); 
    let found = false;

    mapList.style.display = 'block'; // show dropdown when typing

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
        mapList.style.display = '';
        mapSearch.value = validMap[0];
        setGameMode(validMap[1]);
    
    }
}

function checkMapSelection() {
    for(let i = 0; i < maps.length; i++) {
        if (maps[i][0].toLowerCase() === mapSearch.value.toLowerCase()) {

            return [maps[i][0], maps[i][1]];
            
        } else {

            console.log(maps[i][0].toLowerCase() + "!==" + mapSearch.value.toLowerCase());
        }
    }

    gameModeImg.setAttribute("src", "");
    gameModeImg.style.display = '';
    gameModeText.innerText = '';
    return null;

    
}

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

mapSearch.addEventListener('focus', () => {
    mapList.style.display = 'block'; // if the map input is focused, the dropdown is shown
});

mapList.addEventListener('click', function(event) { // if an element in the map list is clicked
    if (event.target.tagName === 'LI') { // if the element is a list item
        const selectedGameMode = event.target.getAttribute('data-gameMode');
        //gameModeText.innerText = selectedGameMode; // game mode text is set to the game mode 
        mapSearch.value = event.target.innerText; // search box value is set to the map
        this.style.display = 'none'; // hide dropdown after selection
        setGameMode(selectedGameMode);
    }
});

// Hide dropdown when clicking outside
document.addEventListener('click', function(event) {
    const isClickInside = document.querySelector('.mapContainer').contains(event.target); // if the mouse click was inside the map container then true
    if (!isClickInside) { // if the mouse click was outside of the map container
        mapList.style.display = ''; // hide the dropdown
    }
});

