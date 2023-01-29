const url = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes';
var contadorAcertos = 0;
var contadorRespostas = 0;
var data;

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
function getUnicQuizz(id) {
    const selectedQuizz = `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`;
    const promise = axios.get(selectedQuizz);
    promise.then(colocaTituloQuizz);
    promise.catch(err);
    function err {
        alert("Houve um erro no carregamento do quizz selecionado.");
        voltarHome();
    }
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

function colocaTituloQuizz(quizz) {
    data = null;
    data = quizz.data;
    console.log(data);
    const quizzPage = document.querySelector('.quizz-page');
    quizzPage.innerHTML += `
    <div class="quizz-title">
        <img src="${data.image}" alt="">
        <div class="overlay"></div>
        <h1>${data.title}</h1>
    </div>
    <div class="quizz-questions">
    </div>
    `;
    organizaPerguntas(data, quizzPage);
}
function organizaPerguntas(data, quizzPage) {
    const questions = data.questions;
    for (i = 0; i < questions.length; i++) {
        const question = questions[i];
        const answers = questions[i].answers;
        colocaPergunta(question, answers, quizzPage);
    }

}
function colocaPergunta(question, answers, quizzPage) {
    quizzQuestions = quizzPage.querySelector(".quizz-questions");
    let inQuestions = `
    <div class="quizz-question">
    <div style="background-color: ${question.color}" class="question">
        <h2>${question.title}</h2>
    </div>
    <div class="answers">
    `;

    const answersEmbaralhadas = embaralhaRespostas(answers);
    for (index = 0; index < answersEmbaralhadas.length; index++) {
        const isCorrect = answersEmbaralhadas[index].isCorrectAnswer;
        let classValidacao = "";
        if (isCorrect) {
            classValidacao = "correta";
        } else {
            classValidacao = "incorreta";
        }
        inQuestions += `
    <div onclick="analisaResposta(this)" class="answer ${classValidacao} preto">
            <img src="${answersEmbaralhadas[index].image}" alt="">
            <p>${answersEmbaralhadas[index].text}</p>
        </div>
    `;
    }
    inQuestions += `
    </div>
    </div>
    `;
    quizzQuestions.innerHTML += inQuestions;
}
function embaralhaRespostas(respostas) {
    respostas.sort(comparador);
    return respostas
}
function comparador() {
    return Math.random() - 0.5;
}
function analisaResposta(clicked) {
    const parent = clicked.parentNode;
    let answers = parent.querySelectorAll(".answer");
    answers.forEach(function (answer) {
        answer.classList.add('filtered');
        answer.onclick = null;
        answer.classList.remove('preto')
    })
    clicked.classList.remove('filtered');
    const correta = parent.querySelector('.correta');
    if (clicked === correta) {
        contadorAcertos = Number(contadorAcertos)
        contadorAcertos += 1;
    }
    contadorRespostas += 1;
    verficaSeFinalizado(contadorRespostas, contadorAcertos);
}

function rolarParaBaixoPerguntas(contador) {
    let proximo = document.querySelectorAll('.quizz-question');
    proximo = proximo[contador];
    proximo.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function verficaSeFinalizado(respondidas, acertadas) {
    totalPerguntas = data.questions.length;
    if (respondidas === totalPerguntas) {
        analisaAcertos(totalPerguntas, acertadas);
    } else {
        setTimeout(rolarParaBaixoPerguntas, 2000, respondidas);
    }
}

function analisaAcertos(total, certas) {
    const pontuacao = Math.round((certas / total) * 100);
    colocaFinal(pontuacao);
}

function colocaFinal(pontuacao) {
    console.log(pontuacao);
    const levels = data.levels;
    let minValue = 0;
    let nivelJogador = "";
    for (i = 0; i < levels.length; i++) {
        minValue = levels[i].minValue;
        if (pontuacao >= minValue) {
            nivelJogador = levels[i]
        }
    }
    const quizzPage = document.querySelector(".quizz-page");
    quizzPage.innerHTML += `
    <div class="quizz-final">
        <div class="final-text">
            <h2>${nivelJogador.title}</h2>
        </div>
        <div class="final-img-text">
            <img src="${nivelJogador.image}"
                alt="">
            <p>${nivelJogador.text}</p>
        </div>
    </div>
    `
    colocaBotoes(quizzPage);
}
function colocaBotoes(quizzPage) {
    quizzPage.innerHTML += `
    <div class="buttons">
        <div onclick="reinicioQuizz()" class="button-reinicio">
            <p>Reiniciar Quizz</p>
        </div>
        <div onclick="voltarHome()" class="button-voltar">
            <p>Voltar pra home</p>
        </div>
    </div>
    `
    setTimeout(scrollFinal, 2000);
}

function scrollFinal() {
    let final = document.querySelector('.quizz-final');
    final.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function reinicioQuizz() {
    contadorAcertos = 0;
    contadorRespostas = 0;
    quizzPage = document.querySelector('.quizz-page');
    quizzPage.innerHTML = ""
    getUnicQuizz(data.id);
}

function voltarHome() {
    contadorAcertos = 0;
    contadorRespostas = 0;
    quizzPage = document.querySelector('.quizz-page');
    quizzPage.innerHTML = "";
}

getUnicQuizz();
getQuizzes();