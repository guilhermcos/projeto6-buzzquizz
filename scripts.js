const url = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes';

function getQuizzes() {
    const quizzes = axios.get(`${url}`);

    quizzes.then(res => {
        const quizzList = document.querySelector('.quizzes-part');
        quizzList.innerHTML = '';
        let quizzInfo = res.data;
        quizzInfo.forEach(res => {
            quizzList.innerHTML += `
            <div id=${res.id} class="quizz" onclick="openId(this)">
            <img src="${res.image}">
            <div class="quizz-overlay"></div>
            <h2>${res.title}</h2>
        </div>`
        })
    })
    quizzes.catch(err => console.log(err))
}
function getUnicQuizz() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/1');
    promise.then(teste);
    function teste(quiz1) {
        console.log(quiz1);
    }
}
getUnicQuizz()
getQuizzes();