// load Lessons

let loadLessons = () => {
    let url = "https://openapi.programming-hero.com/api/levels/all"
    fetch(url)
        .then(res => res.json())
        .then(json => {
            // console.log(json.data);
            displayLessons(json.data);
        })
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}


let manegeSpinner = (status) => {
    if (status === true) {
        document.getElementById("spinner").classList.remove("hidden")
        document.getElementById("cart-container").classList.add("hidden")
    }
    else {
        document.getElementById("cart-container").classList.remove("hidden")
        document.getElementById("spinner").classList.add("hidden")
    }
}


let removeActive = () => {
    let lessonsBtn = document.querySelectorAll(".lessons-btn")

    lessonsBtn.forEach((btn) => {
        btn.classList.remove("active");
    })
}


let loadLevelWord = (id) => {

    manegeSpinner(true);

    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
        .then(res => res.json())
        .then(json => {

            removeActive()
            let clickBtn = document.getElementById(`lesson-btn-${id}`)
            // console.log(clickBtn)
            clickBtn.classList.add("active");
            displayLevelWord(json.data)
        })
}


let loadWordDetail = (id) => {
    fetch(`https://openapi.programming-hero.com/api/word/${id}`)
        .then(res => res.json())
        .then(json => {
            // console.log(json.data)
            displayWordDetail(json.data);
        })
}

let displayWordDetail = (details) => {

    let detailsContainer = document.getElementById("details-container");

    detailsContainer.innerHTML = `
    
    <h1 class="text-xl font-bold">${details.word} (<i class="fa-solid fa-microphone-lines"></i> : ${details.pronunciation})</h1>
                    <h3 class="text-lg font-semibold mt-6">Meaning</h3>
                    <h3 class="text-lg mt-2">${details.meaning}</h3>

                    <h3 class="text-lg font-semibold mt-6">Example</h3>
                    <p class="text-lg mt-2">${details.sentence}</p>

                    <h3 class="text-lg font-semibold mt-6">সমার্থক শব্দ গুলো</h3>
                    <div class="flex gap-3 mt-2">
                        <p class="px-5 py-3 bg-[#edf7ff] rounded-lg">${details.synonyms[0]}</p>
                        <p class="px-5 py-3 bg-[#edf7ff] rounded-lg">${details.synonyms[1]}</p>
                        <p class="px-5 py-3 bg-[#edf7ff] rounded-lg">${details.synonyms[2]}</p>
                    </div>

                    <button class="btn btn-outline btn-primary mt-10">Complete Learning</button>

    `
    document.getElementById("my_modal_5").showModal();

}


let displayLevelWord = (words) => {

    let cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = "";

    if (words.length === 0) {
        cartContainer.innerHTML = `
        <div class="col-span-full py-10">
                    <img class="mx-auto block" src="./assets/alert-error.png" alt="">     
                    <p class="text-sm text-center mt-4">আপনি এখনো কোন Lesson Select করেন নি।</p>
                    <h1 class="mt-4 text-3xl font-bold text-center">একটি Lesson Select করুন।</h1>
                </div>
        `
        manegeSpinner(false);
        return;
    }

    words.forEach((word) => {
        let div = document.createElement("div")

        div.innerHTML = `
        <div class="bg-white py-8 px-4 rounded-xl shadow-sm">
                    <h1 class="text-2xl font-bold text-center">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h1>
                    <p class="mt-6 text-center text-lg">Meaning /Pronounciation</p>
                    <h2 class="text-2xl text-center mt-6 font-semibold">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}"</h2>

                    <div class="flex justify-between mt-10 items-center">
                        <div onclick="loadWordDetail(${word.id})" class="h-14 w-14 bg-[#1a91ff1a] flex justify-center items-center rounded-lg ml-5 cursor-pointer hover:bg-[#0f579b1a] hover:transition duration-300">
                            <i class="fa-solid fa-circle-info"></i>
                        </div>

                        <div onclick="pronounceWord('${word.word}')" class="h-14 w-14 bg-[#1a91ff1a] flex justify-center items-center rounded-lg mr-5 cursor-pointer hover:bg-[#0f579b1a] hover:transition duration-300">
                            <i class="fa-solid fa-volume-high"></i>
                        </div>
                    </div>
                </div>
        `

        cartContainer.append(div);
    })

    manegeSpinner(false);

}


let displayLessons = (lessons) => {

    let lessonContainer = document.getElementById("lesson-container");

    lessons.forEach((lesson) => {

        let btn = document.createElement("button");
        btn.innerHTML = `
        
                    <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary mr-4 lessons-btn"><i
                    class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>

        `
        lessonContainer.append(btn)
    })
}

loadLessons();