const url = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes';
var contadorAcertos = 0;
var contadorRespostas = 0;
var data;


// Inputs infos basicas

 // Inputs pergunta 1

/*
// Resposta correta pergunta 1
const respostaPrimeiraPergunta = document.querySelector('.primeira-resposta-correta').value;
const urlRespostaPrimeiraPergunta = document.querySelector('.primeira-url-correta').value;

// Respostas incorretas pergunta 1
const incorreta1 = document.querySelector('.incorreta-um').value;
const urlIncorreta1 = document.querySelector('.url-incorreta-um').value;

const incorreta2 = document.querySelector('.incorreta-dois').value;
const urlIncorreta2 = document.querySelector('.url-incorreta-dois').value;

const incorreta3 = document.querySelector('.incorreta-tres').value;
const urlIncorreta3 = document.querySelector('.url-incorreta-tres').value;

// Inputs pergunta 2
const tituloSegundaPergunta = document.querySelector('.texto-segunda-pergunta').value;
const corSegundaPergunta = document.querySelector('.cor-segunda-pegunta').value;

// Resposta correta pergunta 2
const respostaSegundaPergunta = document.querySelector('.segunda-resposta-correta').value;
const urlRespostaSegundaPergunta = document.querySelector('.segunda-url-correta').value;

// Respostas incorretas pergunta 2
const incorreta4 = document.querySelector('.incorreta-quatro').value;
const urlIncorreta4 = document.querySelector('.url-incorreta-quatro').value;

const incorreta5 = document.querySelector('.incorreta-cinco').value;
const urlIncorreta5 = document.querySelector('.url-incorreta-cinco').value;

const incorreta6 = document.querySelector('.incorreta-seis').value;
const urlIncorreta6 = document.querySelector('.url-incorreta-seis').value;

// Inputs pergunta 3
const tituloTerceiraPergunta = document.querySelector('.texto-terceira-pergunta').value;
const corTerceiraPergunta = document.querySelector('.cor-terceira-pegunta').value;

// Resposta correta pergunta 2
const respostaTerceiraPergunta = document.querySelector('.terceira-resposta-correta').value;
const urlRespostaTerceiraPergunta = document.querySelector('.terceira-url-correta').value;

// Respostas incorretas pergunta 2
const incorreta7 = document.querySelector('.incorreta-sete').value;
const urlIncorreta7 = document.querySelector('.url-incorreta-quatro').value;

const incorreta8 = document.querySelector('.incorreta-oito').value;
const urlIncorreta8 = document.querySelector('.url-incorreta-cinco').value;

const incorreta9 = document.querySelector('.incorreta-nove').value;
const urlIncorreta9 = document.querySelector('.url-incorreta-seis').value;

// Inputs nivel 1
const tituloNivel1 = document.querySelector('.titulo-nivel-um').value;
const porcentagemNivel1 = document.querySelector('.porcentagem-nivel-um').value;
const urlNivel1 = document.querySelector('.url-nivel-um').value;
const descricaoNivel1 = document.querySelector('.descricao-nivel-um').value;

//Inputs nivel 2
const tituloNivel2 = document.querySelector('.titulo-nivel-dois').value;
const porcentagemNivel2 = document.querySelector('.porcentagem-nivel-dois').value;
const urlNivel2 = document.querySelector('.url-nivel-dois').value;
const descricaoNivel2 = document.querySelector('.descricao-nivel-dois').value;

//Inputs nivel 3
const tituloNivel3 = document.querySelector('.titulo-nivel-tres').value;
const porcentagemNivel3 = document.querySelector('.porcentagem-nivel-tres').value;
const urlNivel3 = document.querySelector('.url-nivel-tres').value;
const descricaoNivel3 = document.querySelector('.descricao-nivel-tres').value;
*/

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
    console.log(id);
    const selectedQuizz = `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`;
    const promise = axios.get(selectedQuizz);
    promise.then(colocaTituloQuizz);
    promise.catch(err);
    function err() {
        alert("Houve um erro no carregamento do quizz selecionado.");
        voltarHome();
    }
}
function openQuizz(selected) {
    const homepage = document.querySelector('.home-page');
    homepage.classList.add('display-none');
    let tela2 = document.querySelector('.quizz-page');
    tela2.classList.remove('display-none');
    startLoading();
    const id = selected.getAttribute('id');
    const openQuizzId = axios.get(`${url}/${id}`);
    openQuizzId.then(res => getUnicQuizz(res.data.id));
    openQuizzId.catch(() => window.location.reload())
    openQuizzId.finally(() => stopLoading());
}

let titulo;
let urlQuizz;
let perguntas;
let niveis;
function openCreateQuizzWindow() {
    startLoading();
    const homepage = document.querySelector('.home-page');
    homepage.classList.add('display-none');
    stopLoading();
    const tela3 = document.querySelector('.tela-3').classList.remove('display-none');
    const telaInfoBasicaQuiz = document.querySelector('.info-basica-quiz').classList.remove('display-none');
    //chamar a função da tela 3

}

console.log(titulo, urlQuizz, perguntas, niveis);

//Função que avança para tela de criar perguntas
function prosseguirCriarPerguntas() {
    titulo = document.querySelector('.titulo-quizz').value;
    urlQuizz = document.querySelector('.url-quizz').value;
    perguntas = document.querySelector('.qtde-perguntas-quizz').value;
    niveis = document.querySelector('.qtde-niveis-quizz').value;

    console.log(titulo, urlQuizz, perguntas, niveis);
    const telaInfoBasicaQuiz = document.querySelector('.info-basica-quiz');
    telaInfoBasicaQuiz.classList.add('display-none');

    const telaCriarPeguntas = document.querySelector('.criar-perguntas');
    telaCriarPeguntas.classList.remove('display-none');

let pegarQntPerguntas = document.querySelector('.qtde-perguntas-quizz').value;

for (let i = 0; i < pegarQntPerguntas; i++ ){
    const documento = document.querySelector('.euvouvomitar');
    documento.innerHTML += `   
    <div class="container">                
    <div class="caixa-pergunta ${i+1} display-none">
    <p class="paragrafos-inputs">Pergunta ${i+1}</p>
    <div class="gap-inputs">
        <input class="texto-segunda-pergunta inputs-padrao-tela-3 " type="text" required
            minlength="20" title="Mínimo 20 caracteres." placeholder="Texto da pergunta">

        <input class="cor-segunda-pegunta inputs-padrao-tela-3 " type="text" required
            pattern="^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{6})$"
            title="Digite uma cor em hexadecimal (começar em #, seguida de 6 caracteres hexadecimais, ou seja, números ou letras de A a F)."
            placeholder="Cor de fundo da pergunta">
    </div>
    <p class="paragrafos-inputs">Resposta correta</p>
    <div class="gap-inputs">
        <input class="segunda-resposta-correta inputs-padrao-tela-3" type="text" required
            placeholder="Resposta correta">
        <input class="segunda-url-correta inputs-padrao-tela-3" type="url" required
            placeholder="URL da imagem">
    </div>
    <p class="paragrafos-inputs">Respostas incorretas</p>
    <div class="gap-inputs">
        <input class="incorreta-quatro inputs-padrao-tela-3 " type="text" required
            placeholder="Resposta incorreta 1">
        <input class="url-incorreta-quatro inputs-padrao-tela-3" type="url" required
            placeholder="URL da imagem 1">
        <input class="incorreta-cinco inputs-padrao-tela-3 " type="text" required
            placeholder="Resposta incorreta 2">
        <input class="url-incorreta-cinco inputs-padrao-tela-3" type="url" required
            placeholder="URL da imagem 2">
        <input class="incorreta-seis inputs-padrao-tela-3" type="text" required
            placeholder="Resposta incorreta 3">
        <input class="url-incorreta-seis inputs-padrao-tela-3" type="url" required
            placeholder="URL da imagem 3">
    </div>
</div>
<div class="pergunta-minimizada ${i+1} box-minimizada">
    <p class="pergunta-minimizada">Pergunta ${i+1}</p>
    <svg onclick="editarPergunta(this)" class="editar-pergunta" width="26" height="24"
        viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M18.1594 15.4969L19.6038 14.0594C19.8295 13.8348 20.2222 13.992 20.2222 14.3155V20.8471C20.2222 22.0375 19.2517 23.0034 18.0556 23.0034H2.16667C0.970486 23.0034 0 22.0375 0 20.8471V5.03462C0 3.84419 0.970486 2.87837 2.16667 2.87837H14.5122C14.8326 2.87837 14.9951 3.2647 14.7694 3.4938L13.325 4.9313C13.2573 4.99868 13.167 5.03462 13.0677 5.03462H2.16667V20.8471H18.0556V15.7485C18.0556 15.6542 18.0917 15.5643 18.1594 15.4969ZM25.2281 6.43169L13.3747 18.2282L9.2941 18.6774C8.11146 18.8077 7.10486 17.8149 7.23576 16.629L7.68715 12.568L19.5406 0.771533C20.5743 -0.257178 22.2444 -0.257178 23.2736 0.771533L25.2236 2.71216C26.2573 3.74087 26.2573 5.40747 25.2281 6.43169ZM20.7684 7.81978L18.1458 5.20981L9.75903 13.5608L9.42951 16.4942L12.3771 16.1663L20.7684 7.81978ZM23.6934 4.2395L21.7434 2.29888C21.5583 2.1147 21.2559 2.1147 21.0753 2.29888L19.6806 3.68696L22.3031 6.29692L23.6979 4.90884C23.8785 4.72017 23.8785 4.42368 23.6934 4.2395Z"
            fill="black" />
    </svg>
</div>
</div>`;
}

}

function editarPergunta(clicked){
    const perguntaMinimizada = clicked.parentNode;
    const divPai = perguntaMinimizada.parentNode;
    const caixaPergunta = divPai.querySelector('.caixa-pergunta');
    caixaPergunta.classList.remove('display-none');
    const div = perguntaMinimizada.classList.add('display-none');
    }

//Função que avança para tela de criar niveis
function prosseguirCriarNiveis() {
    window.scroll(0, 0,)

    const telaCriarPerguntas = document.querySelector('.criar-perguntas');
    telaCriarPerguntas.classList.add('display-none');

    const telaCriarNiveis = document.querySelector('.criar-niveis');
    telaCriarNiveis.classList.remove('display-none');

    const caixaPergunta = document.querySelector('.caixa-segunda-pergunta');
    caixaPergunta.classList.add('display-none');
    const perguntaMinimizada = document.querySelector('.pergunta-dois-minimizada');
    perguntaMinimizada.classList.remove('display-none');

    const caixaTerceiraPergunta = document.querySelector('.caixa-terceira-pergunta');
    caixaTerceiraPergunta.classList.add('display-none');
    const teceiraPerguntaMinimizada = document.querySelector('.pergunta-tres-minimizada');
    teceiraPerguntaMinimizada.classList.remove('display-none');
}

//Função para editar os niveis do quizz
function editarSegundoNivel() {
    const nivelMinimizado = document.querySelector('.nivel-dois-minimizado');
    nivelMinimizado.classList.add('display-none');

    const caixaNivel = document.querySelector('.caixa-segundo-nivel');
    caixaNivel.classList.remove('display-none');
}
function editarTerceiroNivel() {
    const nivelMinimizado = document.querySelector('.nivel-tres-minimizado');
    nivelMinimizado.classList.add('display-none');

    const caixaNivel = document.querySelector('.caixa-terceiro-nivel');
    caixaNivel.classList.remove('display-none');
}

//Função que avança para tela Finalizar Quizz
function finalizarQuizz() {

    createQuizz();

    const telaCriarNiveis = document.querySelector('.criar-niveis');
    telaCriarNiveis.classList.add('display-none');

    const telaFinalizarQuizz = document.querySelector('.finalizar-quizz');
    telaFinalizarQuizz.classList.remove('display-none');

    const caixanNivel = document.querySelector('.caixa-segundo-nivel');
    caixanNivel.classList.add('display-none');
    const segundoNivelMinimizado = document.querySelector('.nivel-dois-minimizado');
    segundoNivelMinimizado.classList.remove('display-none');

    const caixaTerceiroNivel = document.querySelector('.caixa-terceiro-nivel');
    caixaTerceiroNivel.classList.add('display-none');
    const teceiraNivelMinimizado = document.querySelector('.nivel-tres-minimizado');
    teceiraNivelMinimizado.classList.remove('display-none');
}

/*let objetoQuizzCriado;
//Função que recebe os valores dos inputs das infos basicas e cria o objeto predefinido para o servidor
function createQuizz() {

    objetoQuizzCriado = {
        title: titulo,
        image: urlQuizz,
        questions: [
            {
                title: tituloPrimeiraPergunta,
                color: corPrimeiraPergunta,
                answers: [
                    {
                        text: respostaPrimeiraPergunta,
                        image: urlRespostaPrimeiraPergunta,
                        isCorrectAnswer: true
                    },
                    {
                        text: incorreta1,
                        image: urlIncorreta1,
                        isCorrectAnswer: false
                    },
                    {
                        text: incorreta2,
                        image: urlIncorreta2,
                        isCorrectAnswer: false
                    },
                    {
                        text: incorreta3,
                        image: urlIncorreta3,
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: tituloSegundaPergunta,
                color: corSegundaPergunta,
                answers: [
                    {
                        text: respostaSegundaPergunta,
                        image: urlRespostaSegundaPergunta,
                        isCorrectAnswer: true
                    },
                    {
                        text: incorreta4,
                        image: urlIncorreta4,
                        isCorrectAnswer: false
                    },
                    {
                        text: incorreta5,
                        image: urlIncorreta5,
                        isCorrectAnswer: false
                    },
                    {
                        text: incorreta6,
                        image: urlIncorreta6,
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: tituloTerceiraPergunta,
                color: corTerceiraPergunta,
                answers: [
                    {
                        text: respostaTerceiraPergunta,
                        image: urlRespostaTerceiraPergunta,
                        isCorrectAnswer: true
                    },
                    {
                        text: incorreta7,
                        image: urlIncorreta7,
                        isCorrectAnswer: false
                    },
                    {
                        text: incorreta8,
                        image: urlIncorreta8,
                        isCorrectAnswer: false
                    },
                    {
                        text: incorreta9,
                        image: urlIncorreta9,
                        isCorrectAnswer: false
                    }
                ]
            }
        ],
        levels: [
            {
                title: tituloNivel1,
                image: urlNivel1,
                text: descricaoNivel1,
                minValue: porcentagemNivel1
            },
            {
                title: tituloNivel2,
                image: urlNivel2,
                text: descricaoNivel2,
                minValue: porcentagemNivel2
            },
            {
                title: tituloNivel3,
                image: urlNivel3,
                text: descricaoNivel3,
                minValue: porcentagemNivel3
            }
        ]
    }

    const postQuizzCriado = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', objetoQuizzCriado);
    postQuizzCriado.then(deuBom);
    postQuizzCriado.catch(deuRuim);
}

function deuBom(res) {
    let idQuizzCriado = res.data;
    console.log(res.data);
    localStorage.setItem("id", idQuizzCriado);
}

function deuRuim(err) {
    console.log(err);
}*/

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
    const homepage = document.querySelector('.home-page');
    homepage.classList.remove('display-none');
    let tela2 = document.querySelector('.quizz-page');
    tela2.classList.add('display-none');
    const telaFinalizarQuizz = document.querySelector('.finalizar-quizz');
    telaFinalizarQuizz.classList.add('display-none');
    const tela3 = document.querySelector('.tela-3').classList.add('display-none');
    getQuizzes();
    window.scrollTo(0, 0);
}

//loading functions
function startLoading() {
    const main = document.querySelector('main');
    main.innerHTML += `
    <div class="loading">
        <img src="./img/loading.gif" alt="loading gif">
    </div>
    `;
}

function stopLoading() {
    const halfASecond = 500;
    setTimeout(() =>
        document.querySelector('.loading').remove(), halfASecond)
}

getQuizzes();