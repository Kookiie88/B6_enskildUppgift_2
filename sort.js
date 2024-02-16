const toggleMenuBtn = document.querySelector(".sortBy__sortChallenges-btn");
const menu = document.querySelector(".sortBy__sortChallenges-content");
const byRating = document.querySelector(".sortBy__rating");
const byTitle = document.querySelector(".sortBy__title");

function sortByRating(direction, array) {
    const sortedArray = array.sort((a, b) => {
        const aRating = a["data-rating"];
        const bRating = b["data-rating"];
        if(direction === "ascending") {
            return aRating - bRating;
        } else {
            return bRating - aRating;
        }
    });
    sortedArray.forEach((challenge) => {
        challenge.parentNode.appendChild(challenge);
    });
}

function sortByTitle(direction, array) {
    const sortedArray = array.sort((a, b) => {
        const aTitle = a.querySelector(".sidescroll__title").textContent;
        const bTitle = b.querySelector(".sidescroll__title").textContent;
        if(direction === "ascending") {
            return aTitle.localeCompare(bTitle);
        } else {
            return bTitle.localeCompare(aTitle);
        }
    });
    sortedArray.forEach((challenge) => {
        challenge.parentNode.appendChild(challenge);
    });
}

function toggleArrows(showArrow, hideArrow, direction) {
    const arrow = showArrow.firstElementChild;
    const hideArrowArrow = hideArrow.firstElementChild;
    hideArrowArrow.classList = "";
    arrow.classList = direction === "ascending" ? "fa fa-arrow-up" : "fa fa-arrow-down";
}

toggleMenuBtn.addEventListener("click", () => {
    const borderRadius = getComputedStyle(toggleMenuBtn).borderRadius;
    const visibility = getComputedStyle(menu).visibility;
    toggleMenuBtn.style.borderRadius = borderRadius === "8px" ? "8px 8px 0 0" : "";
    menu.style.visibility = visibility === "hidden" ? "visible" : "";
});

byRating.addEventListener("click", (e) => {
    const challengesArray = [...document.querySelectorAll(".sidescroll__card")];
    e.target['data-direction'] = e.target['data-direction'] === "descending" ? "ascending" : "descending";
    const direction = e.target['data-direction'];
    toggleArrows(byRating, byTitle, direction);
    sortByRating(direction, challengesArray);
});

byTitle.addEventListener("click", (e) => {
    const challengesArray = [...document.querySelectorAll(".sidescroll__card")];
    e.target['data-direction'] = e.target['data-direction'] === "ascending" ? "descending" : "ascending";
    const direction = e.target['data-direction'];
    toggleArrows(byTitle, byRating, direction);
    sortByTitle(direction, challengesArray);
});