const url = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes';

function getQuizzes() {
    const quizzes = axios.get(`${url}`);

    quizzes.then(res => {
        const quizzList = document.querySelector('.quizzes-part');
        quizzList.innerHTML = '';
        let quizzInfo = res.data;
        quizzInfo.forEach(res => {
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
    let tela2 = document.querySelector('.quizz-page');
    tela2.classList.remove('display-none');
    const id = selected.getAttribute('id');
    const openQuizzId = axios.get(`${url}/${id}`);
    openQuizzId.then(res => getUnicQuizz(res.data));
    openQuizzId.catch(() => window.location.reload())
}

function openCreateQuizzWindow() {
    const homepage = document.querySelector('.home-page');
    homepage.classList.add('display-none');
    const tela3 = document.querySelector('.tela-3').classList.remove('display-none');
    const telaInfoBasicaQuiz = document.querySelector('.info-basica-quiz').classList.remove('display-none');
    //chamar a função da tela 3
}

//Função que avança para tela de criar perguntas
function prosseguirCriarPerguntas() {
    const telaInfoBasicaQuiz = document.querySelector('.info-basica-quiz');
    telaInfoBasicaQuiz.classList.add('display-none');

    const telaCriarPeguntas = document.querySelector('.criar-perguntas');
    telaCriarPeguntas.classList.remove('display-none');

}

//Função que avança para tela de criar niveis
function prosseguirCriarNiveis() {
    window.scroll(0, 0,)

    const telaCriarPerguntas = document.querySelector('.criar-perguntas');
    telaCriarPerguntas.classList.add('display-none');

    const telaCriarNiveis = document.querySelector('.criar-niveis');
    telaCriarNiveis.classList.remove('display-none');
}

//Função que avança para tela Finalizar Quizz
function finalizarQuizz() {
    const telaCriarNiveis = document.querySelector('.criar-niveis');
    telaCriarNiveis.classList.add('display-none');

    const telaFinalizarQuizz = document.querySelector('.finalizar-quizz');
    telaFinalizarQuizz.classList.remove('display-none');
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