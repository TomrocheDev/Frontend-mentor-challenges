function insertRow(container) {
    const row = document.createElement("div");

    row.setAttribute("class", "row position-relative mt-4 mt-lg-0");
    container.append(row);

    return row;
}

function insertLogo(listing, row) {
    const logoContainer = document.createElement("div");
    const img = document.createElement("img");

    logoContainer.setAttribute("class", "col-lg-1 d-flex align-items-center justify-content-center");
    img.setAttribute("class", "company-logo img-fluid");
    img.setAttribute("src", listing.logo);
    logoContainer.append(img);
    row.append(logoContainer);
}

function createJobTitle(listing) {
    const title = document.createElement("h3");

    title.setAttribute("class", "job-title m-0");
    title.textContent = listing.position;

    return title;
}

function insertNewLabel(container) {
    const label = document.createElement("div");

    label.setAttribute("class", "new-label d-flex align-items-center justify-content-center");
    label.textContent = "NEW!";

    container.append(label);
}

function insertFeaturedLabel(container) {
    const label = document.createElement("div");

    label.setAttribute("class", "featured-label d-flex align-items-center justify-content-center");
    label.textContent = "FEATURED";

    container.append(label);
}

function createJobHeader(listing) {
    const headerWrapper = document.createElement("div");
    const companyName = document.createElement("h2");

    headerWrapper.setAttribute("class", "header-wrapper d-flex align-items-center gap-3");
    headerWrapper.append(companyName);
    companyName.setAttribute("class", "company-name m-0");
    companyName.textContent = listing.company;

    if (listing.new) insertNewLabel(headerWrapper);
    if (listing.featured) insertFeaturedLabel(headerWrapper);

    return headerWrapper;
}

function insertTerm(content, container) {
    const listItem = document.createElement("li");

    listItem.append(content);
    container.append(listItem);
}

function createJobTerms(listing) {
    const terms = document.createElement("ul");

    insertTerm(listing.postedAt, terms);
    insertTerm(listing.contract, terms);
    insertTerm(listing.location, terms);

    return terms;
}

function insertJobDetails(listing, row) {
    const jobDetails = document.createElement("div");
    let rowJobDetails = insertRow(jobDetails);
    let jobHeader = createJobHeader(listing);
    let jobTitle = createJobTitle(listing);
    let jobTerms = createJobTerms(listing);

    jobDetails.setAttribute("class", "job-details-wrapper col-lg-6");
    rowJobDetails.setAttribute("class", "h-100 d-flex flex-column justify-content-between gap-3 gap-lg-0");
    rowJobDetails.append(jobHeader, jobTitle, jobTerms);

    row.append(jobDetails);
}

function createTechLabels(listing, container) {
    listing.languages.map((language) => {
        const listItem = document.createElement("li");

        listItem.setAttribute("class", "tech-language");
        listItem.textContent = language;
        container.append(listItem);
    });
}

function insertTechstack(listing, row) {
    const techstack = document.createElement("ul");

    techstack.setAttribute(
        "class",
        "techstack col-lg-5 align-items-center justify-content-start justify-content-lg-end flex-wrap px-0"
    );
    createTechLabels(listing, techstack);
    row.append(techstack);
}

function createListing(listing) {
    const listingsContainer = document.querySelector(".container");
    let mainRow = insertRow(listingsContainer);

    if (listing.featured) mainRow.style.borderLeft = "4px solid var(--dark-cyan)";

    insertLogo(listing, mainRow);
    insertJobDetails(listing, mainRow);
    insertTechstack(listing, mainRow);
}

async function renderJobListings() {
    let response = await fetch("data.json");
    let data = await response.json();

    data.map((listing) => {
        createListing(listing);
    });
}

renderJobListings();
