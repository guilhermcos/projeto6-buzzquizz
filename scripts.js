const url = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes';

function getQuizzes () {
    const quizzes = axios.get(`${url}`);

    quizzes.then (res =>{
        const quizzList = document.querySelector('.quizzes-part');
        quizzList.innerHTML = '';
        let quizzInfo = res.data;
        quizzInfo.forEach( res => {
            quizzList.innerHTML += `
            <div id=${res.id} class="quizz" onclick="openQuizz(this)">
            <img src="${res.image}">
            <div class="quizz-overlay"></div>
            <h2>${res.title}</h2>
        </div>`
    })
    })
    quizzes.catch(() => window.location.reload())
}

function openQuizz(selected) {
    const homepage = document.querySelector('.home-page');
    homepage.classList.add('display-none');
    const id = selected.getAttribute('id');
    const openQuizzId = axios.get(`${url}/${id}`);
    openQuizzId.then(res => console.log(res.data));
    openQuizzId.catch(() => window.location.reload())
}

function openCreateQuizzWindow() {
    const homepage = document.querySelector('.home-page');
    homepage.classList.add('display-none');
    const tela3 = document.querySelector('.tela-3').classList.remove('display-none');
    //aqui embaixo chamar a função da tela 3
}

function existUserQuizz(){
    const newUserQuizz = localStorage.getItem('quizzUsuario');
    const userQuizz = JSON.parse(newUserQuizz);
    return userQuizz;
}

function checksUserQuizz(){
    const userQuizz = existUserQuizz();

    if (userQuizz){
        getUserQuizz(userQuizz);
        renderNewQuizzPart();
    } else {
        return;
    }

}

function getUserQuizz (userQuizzes) {
    //vai usar a função get com o id e url
    //o then vai renderizar os quizzes do usuario, passando res como parametro
    //    //vai pegar a div nova do quizz (que vai estar em rendernewquizzpart)
    //vai fazer um foreach quizz igual no getquizzes
    //e catch que caso tenha problema vai dar reload
}

function renderNewQuizzPart(userQuizzes) {
    //vai tirar tudo do html que estiver no create a quizz usando um = ''
    //vai renderizar/colocar na tela a div nova do create-a-quizz
    //vai fazer um foreach quizz
}

//fazer tela de loading do bônus

getQuizzes();