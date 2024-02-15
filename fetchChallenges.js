const data = await fetchData(`https://lernia-sjj-assignments.vercel.app/api/challenges`).catch(
    (error) => console.log(error.message)
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
if (window.location.pathname.includes("ourChallenges")) {
    const container = document.querySelector(".ourChallenges");
    renderChallenges(container);
} else {
    const container = document.querySelector(".sidescroll");
    renderChallenges(container, true);
}

function renderChallenges(container, threeHighest) {
    if(!challenges) return;
    let challengesToRender
    if (threeHighest) {
        challengesToRender = challenges.sort((a, b) => b.rating - a.rating).slice(0, 3);
    } else {
        challengesToRender = challenges
    }
    challengesToRender.forEach(challenge => {
        const challengeEl = createChallenge(challenge)
        container.appendChild(challengeEl)
    })
}

function createChallenge(challenge) {
    const challengeTemplate = document.getElementById('card-template')
    const template = challengeTemplate.content.cloneNode(true)
    const card = template.querySelector('.sidescroll__card');
    const image = template.querySelector('.sidescroll__img');
    const icon = template.querySelector(".sidescroll__icon");
    const title = template.querySelector('.sidescroll__title');
    const rating = template.querySelector('.sidescroll__rating');
    const participants = template.querySelector('.sidescroll__participants');
    const description = template.querySelector('.sidescroll__text');
    const button = template.querySelector('.sidescroll__btn')
    button.textContent = challenge.type === 'online' ? 'Take challenge online' : 'Book this room'
    icon.classList.add(challenge.type === "online" ? "fa-laptop" : "fa-house");
    card.id = challenge.id
    image.src = challenge.image // `${challenge.image}?image=${Math.floor(Math.random() * 16)}` to make image random
    title.textContent = challenge.type === 'onsite' ? challenge.title + ' (on-site)' : challenge.title
    participants.textContent = challenge.minParticipants === challenge.maxParticipants ? `${challenge.minParticipants} participants` : `${challenge.minParticipants}-${challenge.maxParticipants} participants`
    participants.textContent += challenge.type === 'online' ? ' (networked)' : ''
    description.textContent = challenge.description;
    createStars(rating.firstElementChild, challenge.rating)
    return template
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
