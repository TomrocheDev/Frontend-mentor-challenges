function setPrimaryColor(planetName) {
    const colors = {
        Mercury: "#419ebb",
        Venus: "#eda249",
        Earth: "#6f2ed6",
        Mars: "#d14c32",
        Jupiter: "#d83a34",
        Saturn: "#cd5120",
        Uranus: "#1ec2a4",
        Neptune: "#2d68f0",
    };
    const root = document.querySelector(":root");
    root.style.setProperty("--primary-color", colors[planetName]);
}

function updatePageData(i) {
    const planetData = JSON.parse(sessionStorage.getItem("currentPlanet"));
    if (i == 0) {
        $(".img-main").attr("src", planetData.images.planet);
        $(".img-sub").hide();
        $(".text-content p").text(planetData.overview.content);
        $(".wikipedia-link").attr("href", planetData.overview.source);
    } else if (i == 1) {
        $(".img-main").attr("src", planetData.images.internal);
        $(".img-sub").hide();
        $(".text-content p").text(planetData.structure.content);
        $(".wikipedia-link").attr("href", planetData.structure.source);
    } else if (i == 2) {
        $(".img-main").attr("src", planetData.images.planet);
        $(".img-sub").show();
        $(".text-content p").text(planetData.geology.content);
        $(".wikipedia-link").attr("href", planetData.geology.source);
    }
}

function showPageData(currentPlanet) {
    $("h1").text(currentPlanet.name);
    $(".text-content p").text(currentPlanet.overview.content);
    $(".wikipedia-link").attr("href", currentPlanet.overview.source);
    $(".img-main").attr("src", currentPlanet.images.planet);
    $(".img-sub").attr("src", currentPlanet.images.geology);
    $("#rotation-data").text(currentPlanet.rotation);
    $("#revolution-data").text(currentPlanet.revolution);
    $("#radius-data").text(currentPlanet.radius);
    $("#temp-data").text(currentPlanet.temperature);
}

async function createPage(planetName) {
    const r = await fetch("data.json");
    const data = await r.json();
    const currentPlanet = data.filter((planet) => planet.name == planetName)[0];
    sessionStorage.setItem("currentPlanet", JSON.stringify(currentPlanet));
    setPrimaryColor(currentPlanet.name);
    showPageData(currentPlanet);
}

$(document).ready(function () {
    const currentPlanet = $("body").data("planet");
    $("header").load("includes/header.html");
    createPage(currentPlanet);

    $(".button-group button").on("click", function () {
        let index = $(this).data("index");
        $(".button-group button").each(function () {
            $(this).removeClass("active");
            if ($(this).data("index") == index) {
                $(this).addClass("active");
            }
        });
        updatePageData(index);
    });
});
