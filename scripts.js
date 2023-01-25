const url = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes';

function getQuizzes () {
    const quizzes = axios.get(`${url}`);

    quizzes.then (res =>{
        const quizzList = document.querySelector('.quizzes-part');
        quizzList.innerHTML = '';
        let quizzInfo = res.data;
        quizzInfo.forEach( res => {
            quizzList.innerHTML += `
            <div class="quizz" onclick="openId(this)">
            <img src="${res.image}">
            <div class="quizz-overlay"></div>
            <h2>${res.title}</h2>
        </div>`
    })
    })
    quizzes.catch(err => console.log(err))
}

getQuizzes();