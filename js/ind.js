const loadVideos = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/1000`);
    const data = await res.json();
    const videos = data.data;
    displayVideos(videos);
}

const displayVideos = videos => {
    const videoContainer = document.getElementById('video-container');
    videoContainer.textContent = '';

    videos.forEach(video => {
        console.log(video)
        const videoCard = document.createElement('div');
        videoCard.classList = 'card card-compact bg-base-100 shadow-xl mb-4'
        videoCard.innerHTML = `
                
                <figure ><img class ="h-52 w-full" src="${video.thumbnail}" /></figure>
                <p class="relative bottom-6 left-[200px] text-[10px] font-normal bg-black w-24 text-center text-white">${video?.others?.posted_date ? convertToDate(video.others.posted_date) : ''}</p>
                <div class="card-body flex flex-row">
                   <div>
                    <img class="w-10 h-10 rounded-full" src="${video.authors[0].profile_picture}" alt="">
                   </div>
                    <div>
                        <h2 class="card-title">${video.title}</h2>
                        <div class="flex gap-1 items-center">
                        <p class="font-normal">${video.authors[0].profile_name}</p>
                        <p class="font-normal">${video?.authors[0]?.verified ? '<img src="./image/fi_10629607.svg" alt="">' : ''}</p>
                        </div>
                        <p class="font-normal">${video.others.views} <span>views</span></p>
                    </div>
                </div>`;

        videoContainer.appendChild(videoCard);
    });
}

const loadButton = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    const buttons = data.data;
    displayBtns(buttons);
}

const displayBtns = buttons => {
    const buttonContainer = document.getElementById('btn-container');

    buttons.forEach(button => {
        const btn = document.createElement('button');
        btn.classList = 'btn btn-active';
        btn.innerText = button.category;
        btn.id = button.category_id;

        // Attach a click event listener to each button
        btn.addEventListener('click', () => sortByCategory(button.category_id));

        buttonContainer.appendChild(btn);
    });
}

function sortByCategory(categoryId) {
    // Filter videos by the selected category
    const filteredVideos = allVideos.filter(video => video.category_id === categoryId);

    // Display the filtered videos
    displayVideos(filteredVideos);
}

let allVideos = []; // Store all videos for filtering

async function initializeApp() {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/1000`);
    const data = await res.json();
    allVideos = data.data; // Store all videos
    displayVideos(allVideos);

    loadButton();
}

initializeApp();
