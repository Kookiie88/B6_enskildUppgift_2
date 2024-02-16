const data = await fetchData(`https://lernia-sjj-assignments.vercel.app/api/challenges`).catch(
    (error) => {
        console.log(error.message);
        renderError();
    }
);

async function fetchData(url) {
    const response = await fetch(url);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error(`Something went wrong with the request. Error code: ${response.status}`);
    }
}

export const challenges = data?.challenges;
const container = document.querySelector(".sidescroll") || document.querySelector(".ourChallenges");
if(container) {
    renderChallenges(container, container === document.querySelector(".sidescroll"));
}

function renderChallenges(container, threeHighest) {
    const loadingIndicator = document.querySelector(".loading");
    if (!challenges) return;
    loadingIndicator.style.display = "none";
    let challengesToRender;
    if (threeHighest) {
        challengesToRender = challenges.sort((a, b) => b.rating - a.rating).slice(0, 3);
    } else {
        challengesToRender = challenges;
    }
    let i = 1;
    challengesToRender.forEach((challenge) => {
        setTimeout(() =>{
            const challengeEl = createChallenge(challenge);
            container.appendChild(challengeEl);
        }, 50 * i++)
    });
}

function renderError() {
    const loadingIndicator = document.querySelector(".loading");
    const container = document.querySelector(".sidescroll") || document.querySelector(".ourChallenges");
    if(container && loadingIndicator) {
        const h3 = document.createElement("h3");
        h3.textContent = "Something went wrong with the request. Please try again later.";
        container.appendChild(h3);
        loadingIndicator.style.display = "none";
    }
}

function createChallenge(challenge) {
    const challengeTemplate = document.getElementById("card-template");
    const template = challengeTemplate.content.cloneNode(true);
    const card = template.querySelector(".sidescroll__card");
    const image = template.querySelector(".sidescroll__img");
    const icon = template.querySelector(".sidescroll__icon");
    const title = template.querySelector(".sidescroll__title");
    const rating = template.querySelector(".sidescroll__rating");
    const participants = template.querySelector(".sidescroll__participants");
    const description = template.querySelector(".sidescroll__text");
    const button = template.querySelector(".sidescroll__btn");
    card['data-rating'] = challenge.rating;
    button.textContent = challenge.type === "online" ? "Take challenge online" : "Book this room";
    icon.classList.add(challenge.type === "online" ? "fa-laptop" : "fa-house");
    card.id = challenge.id;
    image.src = challenge.image; // `${challenge.image}?image=${Math.floor(Math.random() * 16)}` to make image random
    title.textContent =
        challenge.type === "onsite" ? challenge.title + " (on-site)" : challenge.title;
    participants.textContent =
        challenge.minParticipants === challenge.maxParticipants
            ? `${challenge.minParticipants} participants`
            : `${challenge.minParticipants}-${challenge.maxParticipants} participants`;
    participants.textContent += challenge.type === "online" ? " (networked)" : "";
    description.textContent = challenge.description;
    createStars(rating.firstElementChild, challenge.rating);
    return template;
}

function createStars(parent, rating) {
    for (let i = 0; i < 5; i++) {
        const iTag = document.createElement("i");
        iTag.classList.add("fa-star", "star");
        if (i + 0.5 === rating) {
            iTag.classList = "fa-solid fa-star-half-stroke";
            parent.appendChild(iTag);
            continue;
        }
        i < rating ? iTag.classList.add("fa-solid") : iTag.classList.add("fa-regular");
        parent.appendChild(iTag);
    }
}
