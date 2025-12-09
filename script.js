const ecosystems = {
    rainforest: { health: 60, icons: [] },
    temperate: { health: 70, icons: [] },
    grassland: { health: 40, icons: [] },
    wetland: { health: 50, icons: [] },
    dryland: { health: 55, icons: [] }
};

let currentRegion = "";

function switchRegion() {
    const select = document.getElementById('regionSelect');
    currentRegion = select.value;
    if (!currentRegion) return;

    updateHealthDisplay();
    document.getElementById('visualizer').innerHTML = "";
    ecosystems[currentRegion].icons.forEach(icon => addIcon(icon, false));
    updateSummary();
}

function applyAction(type){
    if(!currentRegion) return alert("Please select a region first!");

    let delta = 0;
    let icon = '';

    switch(type){
        case 'tree': delta = 5; icon = '🌳'; break;
        case 'pollinators': delta = 3; icon = '🐝'; break;
        case 'wildfire': delta = -15; icon = '🔥'; break;
        case 'farmland': delta = -6; icon = '🚜'; break;
        case 'urban': delta = -12; icon = '🏙️'; break;
        case 'invasive': delta = 4; icon = '🪲'; break;
    }

    ecosystems[currentRegion].health += delta;
    ecosystems[currentRegion].health = Math.max(0, Math.min(100, ecosystems[currentRegion].health));

    ecosystems[currentRegion].icons.push(icon);

    updateHealthDisplay();
    addIcon(icon, true);
    updateSummary();
}

function updateHealthDisplay(){
    const health = ecosystems[currentRegion].health;
    const bar = document.getElementById('healthBar');

    bar.style.width = health + "%";

    if(health >= 80) bar.style.background = "green";
    else if(health >= 50) bar.style.background = "gold";
    else if(health >= 30) bar.style.background = "orange";
    else bar.style.background = "red";

    document.getElementById('healthValue').textContent = "Health: " + health;
}

function updateSummary(){
    const health = ecosystems[currentRegion].health;
    let status = "";

    if (health >= 80) status = "The ecosystem is thriving! Biodiversity is high and conditions are excellent.";
    else if (health >= 50) status = "The ecosystem is stable but requires regular care.";
    else if (health >= 30) status = "The ecosystem is at risk. Restoration actions are needed.";
    else status = "Critical condition! Emergency intervention required.";

    document.getElementById('summaryText').textContent = status;
}

function addIcon(icon, save){
    const box = document.getElementById('visualizer');
    const element = document.createElement('div');
    element.classList.add('icon');
    element.textContent = icon;
    box.appendChild(element);

    if(save && currentRegion) ecosystems[currentRegion].icons.push(icon);
}
