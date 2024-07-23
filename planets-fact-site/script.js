function setPrimaryColor(planetName) {
    const colors = {Mercury: "#419ebb", Venus: "#eda249", Earth: "#6f2ed6", Mars: "#d14c32", Jupiter: "#d83a34", Saturn:"#cd5120", Uranus: "#1ec2a4", Neptune: "#2d68f0" }
    const root = document.querySelector(":root");
    root.style.setProperty("--primary-color", colors[planetName]);
}

async function setCurrentPlanet(planetName) {
    const r = await fetch("data.json");
    const data = await r.json();
    const currentPlanet = data.filter(planet => planet.name == planetName)[0];
    sessionStorage.setItem("currentPlanet", JSON.stringify(currentPlanet));
    setPrimaryColor(currentPlanet.name);
}

$(document).ready(function() {
    $("header").load("../includes/header.html");

    const currentPlanet = $("body").data("planet");
    setCurrentPlanet(currentPlanet);
})