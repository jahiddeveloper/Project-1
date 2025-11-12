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

let displayLessons = (lessons) => {

    let lessonContainer = document.getElementById("lesson-container");

    lessons.forEach((lesson) => {

        let btn = document.createElement("button");
        btn.innerHTML = `
        
                    <button class="btn btn-outline btn-primary mr-4"><i
                    class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>

        `
        lessonContainer.append(btn)
    })
}

loadLessons();