const url = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes';
var contadorAcertos = 0;
var contadorRespostas = 0;
var data;
var recemCriado;
var arrayCriados;
const objQuizz = { title: [], image: [], questions: [], levels: [] };
console.log(objQuizz);

// Inputs infos basicas

// Inputs pergunta 1

/*
// Resposta correta pergunta 1
const respostaPrimeiraPergunta = document.querySelector('.primeira-resposta-correta').value;
const urlRespostaPrimeiraPergunta = document.querySelector('.primeira-url-correta').value;

// Respostas incorretas pergunta 1
const incorreta1 = document.querySelector('.incorreta-um').value;
const urlIncorreta1 = document.querySelector('.url-incorreta-um').value;

const incorreta2 = document.querySelector('.incorreta').value;
const urlIncorreta2 = document.querySelector('.url-incorreta').value;

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
const tituloNivel2 = document.querySelector('.titulo-nivel').value;
const porcentagemNivel2 = document.querySelector('.porcentagem-nivel').value;
const urlNivel2 = document.querySelector('.url-nivel').value;
const descricaoNivel2 = document.querySelector('.descricao-nivel').value;

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

function checkUserQuizz() {
    const containerQuizzes = document.querySelector('.top-part');
    const quizzesUser = containerQuizzes.querySelector('.user-quizz');
    const noQuizz = containerQuizzes.querySelector('.create-a-quizz');
    if (userQuizzes.length === 0){
    quizzesUser.classList.add('display-none');
    } else  if (userQuizzes.length !== 0) {
    listUserQuizz();
    quizzesUser.classList.remove('display-none');
    noQuizz.classList.add('display-none');
    }
}

function listUserQuizz() {
    let userQuizzes = localStorage.getItem('userQuizz');
    userQuizzes = JSON.parse('userQuizzes');
    for (let i = 0; i < userQuizzes.length; i++) {
        renderUserQuizzes();
    }
}

function renderUserQuizzes () {
    const containerUserQuizzes = document.querySelector('.user-quizzes');
    containerUserQuizzes.innerHTML += `
    <div id="${userQuizzes[i].id}" class="quizz" onclick="openQuizz(this)">
    <img src="${userQuizzes[i].image}">
    <div class="quizz-overlay"></div>
    <h2>${userQuizzes[i].title}</h2>
    </div>
    `;
}

function getUnicQuizz(id) {
    document.querySelector('.finalizar-quizz').classList.add('display-none');
    document.querySelector('.quizz-page').classList.remove('display-none');
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

function openCreateQuizzWindow() {
    startLoading();
    const homepage = document.querySelector('.home-page');
    homepage.classList.add('display-none');
    stopLoading();
    const tela3 = document.querySelector('.tela-3').classList.remove('display-none');
    const telaInfoBasicaQuiz = document.querySelector('.info-basica-quiz').classList.remove('display-none');
}

//Fun????o que avan??a para tela de criar perguntas
function prosseguirCriarPerguntas() {
    objQuizz.title = document.querySelector('.titulo-quizz').value;
    objQuizz.image = document.querySelector('.url-quizz').value;
    perguntas = document.querySelector('.qtde-perguntas-quizz').value;
    niveis = document.querySelector('.qtde-niveis-quizz').value;

    console.log(objQuizz);
    const telaInfoBasicaQuiz = document.querySelector('.info-basica-quiz');
    telaInfoBasicaQuiz.classList.add('display-none');

    const telaCriarPeguntas = document.querySelector('.criar-perguntas');
    telaCriarPeguntas.classList.remove('display-none');

    let pegarQntPerguntas = document.querySelector('.qtde-perguntas-quizz').value;
    const documento = document.querySelector('.crie-perguntas');

    for (let i = 0; i < pegarQntPerguntas; i++) {
        documento.innerHTML += `   
    <div class="container">                
        <div class="caixa-pergunta ${i + 1} display-none">
        <p class="paragrafos-inputs">Pergunta ${i + 1}</p>
        <div class="gap-inputs">
            <input class="texto-pergunta inputs-padrao-tela-3 " type="text" required
            minlength="20" title="M??nimo 20 caracteres." placeholder="Texto da pergunta">

            <input class="cor-pergunta inputs-padrao-tela-3 " type="text" required
            pattern="^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{6})$"
            title="Digite uma cor em hexadecimal (come??ar em #, seguida de 6 caracteres hexadecimais, ou seja, n??meros ou letras de A a F)."
            placeholder="Cor de fundo da pergunta">
        </div>
        <p class="paragrafos-inputs">Resposta correta</p>
        <div class="gap-inputs">
            <input class="resposta-correta inputs-padrao-tela-3" type="text" required
                placeholder="Resposta correta">
            <input class="url-correta inputs-padrao-tela-3" type="url" required
                placeholder="URL da imagem">
        </div>
        <p class="paragrafos-inputs">Respostas incorretas</p>
        <div class="gap-inputs">
            <input class="incorreta inputs-padrao-tela-3 " type="text" required
                placeholder="Resposta incorreta 1">
            <input class="url-incorreta inputs-padrao-tela-3" type="url" required
                placeholder="URL da imagem 1">
            <input class="incorreta inputs-padrao-tela-3 " type="text"
                placeholder="Resposta incorreta 2">
            <input class="url-incorreta inputs-padrao-tela-3" type="url"
                placeholder="URL da imagem 2">
            <input class="incorreta inputs-padrao-tela-3" type="text"
                placeholder="Resposta incorreta 3">
            <input class="url-incorreta inputs-padrao-tela-3" type="url"
                placeholder="URL da imagem 3">
        </div>
    </div>
    <div class="pergunta-minimizada ${i + 1} box-minimizada">
        <p class="pergunta-minimizada">Pergunta ${i + 1}</p>
        <svg onclick="editarPergunta(this)" class="editar-pergunta" width="26" height="24"
            viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
            d="M18.1594 15.4969L19.6038 14.0594C19.8295 13.8348 20.2222 13.992 20.2222 14.3155V20.8471C20.2222 22.0375 19.2517 23.0034 18.0556 23.0034H2.16667C0.970486 23.0034 0 22.0375 0 20.8471V5.03462C0 3.84419 0.970486 2.87837 2.16667 2.87837H14.5122C14.8326 2.87837 14.9951 3.2647 14.7694 3.4938L13.325 4.9313C13.2573 4.99868 13.167 5.03462 13.0677 5.03462H2.16667V20.8471H18.0556V15.7485C18.0556 15.6542 18.0917 15.5643 18.1594 15.4969ZM25.2281 6.43169L13.3747 18.2282L9.2941 18.6774C8.11146 18.8077 7.10486 17.8149 7.23576 16.629L7.68715 12.568L19.5406 0.771533C20.5743 -0.257178 22.2444 -0.257178 23.2736 0.771533L25.2236 2.71216C26.2573 3.74087 26.2573 5.40747 25.2281 6.43169ZM20.7684 7.81978L18.1458 5.20981L9.75903 13.5608L9.42951 16.4942L12.3771 16.1663L20.7684 7.81978ZM23.6934 4.2395L21.7434 2.29888C21.5583 2.1147 21.2559 2.1147 21.0753 2.29888L19.6806 3.68696L22.3031 6.29692L23.6979 4.90884C23.8785 4.72017 23.8785 4.42368 23.6934 4.2395Z"
            fill="black" />
        </svg>
    </div>
</div>`;
    }
    documento.innerHTML += `
    <button class="botao-criar-niveis" type="submit">Prosseguir pra criar
    n??veis</button>`;
}

function editarPergunta(clicked) {
    const perguntaMinimizada = clicked.parentNode;
    perguntaMinimizada.classList.add('display-none');
    const divPai = perguntaMinimizada.parentNode;
    const caixaPergunta = divPai.querySelector('.caixa-pergunta');
    caixaPergunta.classList.remove('display-none');
}

//Fun????o que avan??a para tela de criar niveis
function prosseguirCriarNiveis() {
    window.scroll(0, 0,)
    coletarInfoPerguntas();
    const telaCriarPerguntas = document.querySelector('.criar-perguntas');
    telaCriarPerguntas.classList.add('display-none');

    const telaCriarNiveis = document.querySelector('.criar-niveis');
    telaCriarNiveis.classList.remove('display-none');

    let qntNiveis = document.querySelector('.qtde-niveis-quizz').value;
    console.log(qntNiveis);
    const container = document.querySelector('.niveis-quizz');

    for (let j = 0; j < qntNiveis; j++) {
        container.innerHTML += `
        <div class="container">
                        <div class="caixa-nivel display-none">

                            <p class="paragrafos-inputs">Nivel ${j + 1}</p>

                            <div class="gap-inputs">

                                <input class="titulo-nivel inputs-padrao-tela-3" type="text" required minlength="10"
                                    title="M??nimo de 10 caracteres." placeholder="T??tulo do n??vel">

                                <input class="porcentagem-nivel inputs-padrao-tela-3" type="number" required min="0"
                                    max="100" title="M??nimo 0%" placeholder="% de acerto m??nima">

                                <input class="url-nivel inputs-padrao-tela-3" type="url" required
                                    title="Digite uma URL v??lida." placeholder="URL da imagem do n??vel">

                                <input class="descricao-nivel inputs-padrao-tela-3" type="text" required
                                    title="M??nimo de 30 caracteres." placeholder="Descri????o do n??vel">

                            </div>
                        </div>
                        <div class="nivel-minimizado box-minimizada">

                            <p class="nivel-minimizado">N??vel ${j + 1}</p>

                            <svg onclick="editarNivel(this)" class="editar-nivel" width="26" height="24"
                                viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M18.1594 15.4969L19.6038 14.0594C19.8295 13.8348 20.2222 13.992 20.2222 14.3155V20.8471C20.2222 22.0375 19.2517 23.0034 18.0556 23.0034H2.16667C0.970486 23.0034 0 22.0375 0 20.8471V5.03462C0 3.84419 0.970486 2.87837 2.16667 2.87837H14.5122C14.8326 2.87837 14.9951 3.2647 14.7694 3.4938L13.325 4.9313C13.2573 4.99868 13.167 5.03462 13.0677 5.03462H2.16667V20.8471H18.0556V15.7485C18.0556 15.6542 18.0917 15.5643 18.1594 15.4969ZM25.2281 6.43169L13.3747 18.2282L9.2941 18.6774C8.11146 18.8077 7.10486 17.8149 7.23576 16.629L7.68715 12.568L19.5406 0.771533C20.5743 -0.257178 22.2444 -0.257178 23.2736 0.771533L25.2236 2.71216C26.2573 3.74087 26.2573 5.40747 25.2281 6.43169ZM20.7684 7.81978L18.1458 5.20981L9.75903 13.5608L9.42951 16.4942L12.3771 16.1663L20.7684 7.81978ZM23.6934 4.2395L21.7434 2.29888C21.5583 2.1147 21.2559 2.1147 21.0753 2.29888L19.6806 3.68696L22.3031 6.29692L23.6979 4.90884C23.8785 4.72017 23.8785 4.42368 23.6934 4.2395Z"
                                    fill="black" />
                            </svg>
                        </div>
        </div>
                `;
    }
    container.innerHTML += `
    <button class="botao-finalizar-quizz" type="submit">Finalizar Quizz</button>
    `;
}


//Fun????o para editar os niveis do quizz
function editarNivel(clicked) {
    const nivelMinimizado = clicked.parentNode;
    nivelMinimizado.classList.add('display-none');
    const divPai = nivelMinimizado.parentNode;
    const caixaNivel = divPai.querySelector('.caixa-nivel');
    caixaNivel.classList.remove('display-none');
}

//Fun????o que avan??a para tela Finalizar Quizz
function finalizarQuizz() {

    criarQuizz();
    enviarObjServidor();

    //const telaCriarNiveis = document.querySelector('.criar-niveis');
    //telaCriarNiveis.classList.add('display-none');

    //const telaFinalizarQuizz = document.querySelector('.finalizar-quizz');
    //telaFinalizarQuizz.classList.remove('display-none');
    const telaniveis = document.querySelector('.criar-niveis');
    telaniveis.classList.add('display-none');
    const container = document.querySelector('.finalizar-quizz');
    container.classList.remove('display-none');
    container.innerHTML = "";
    container.innerHTML += `

                <p class="descricao-tela">Seu quizz est?? pronto!</p>

                <div class="bkg-quizz-pronto" onclick="acessarQuizz(this)">
                    <img src="${objQuizz.image}" alt="Imagem do quizz criado">
                    <div class="titulo-quizz-criado">${objQuizz.title}</div>
                </div>


                <button class="botao-acessar-quizz" onclick="getUnicQuizz(recemCriado.data.id)">Acessar Quizz</button>

                <div class="button-voltar" onclick="voltarHome(this)">
                    <p>Voltar pra home</p>
                </div>
    `

    //const caixanNivel = document.querySelector('.caixa-nivel');
    //caixanNivel.classList.add('display-none');
    //const segundoNivelMinimizado = document.querySelector('.nivel-minimizado');
    //segundoNivelMinimizado.classList.add('display-none');

    //const caixaTerceiroNivel = document.querySelector('.caixa-nivel');
    //caixaTerceiroNivel.classList.add('display-none');
    //const teceiraNivelMinimizado = document.querySelector('.nivel-tres-minimizado');
    //teceiraNivelMinimizado.classList.add('display-none');
}

function enviarObjServidor() {
    promise = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', objQuizz);
    promise.then(recebeObj);
    function recebeObj (obj) {
        recemCriado = obj;
        saveInLocalStorage(obj.data);
    } 
    promise.catch(err);
    function err() {
        alert("Houve um erro");
    }
}

function coletarInfoPerguntas() {
    const qtdPerg = document.querySelectorAll(".caixa-pergunta");
    console.log(qtdPerg);
    const arrQuestions = [];
    for (i = 0; i < qtdPerg.length; i++) {
        arrQuestions.push({ answers: [] });
        let titleQuestion = qtdPerg[i].querySelector('.texto-pergunta').value;
        arrQuestions[i].title = titleQuestion;
        let colorQuestion = qtdPerg[i].querySelector('.cor-pergunta').value;
        arrQuestions[i].color = colorQuestion;

        let respCorreta = qtdPerg[i].querySelector('.resposta-correta');
        let imgCorreta = qtdPerg[i].querySelector('.url-correta');
        arrQuestions[i].answers.push({ text: respCorreta.value, image: imgCorreta.value, isCorrectAnswer: true });


        //const respostas = qtdPerg.querySelectorAll('');
        let respIncorreta = qtdPerg[i].querySelectorAll('.incorreta');
        let imgIncorreta = qtdPerg[i].querySelectorAll('.url-incorreta');

        for (let index = 0; index < 3; index++) {
            if (respIncorreta[index].value != "" && imgIncorreta[index].value != "") {
                arrQuestions[i].answers.push({ text: respIncorreta[index].value, image: imgIncorreta[index].value, isCorrectAnswer: false });
            }
        }
    }

    objQuizz.questions = arrQuestions;
}

function criarQuizz() {
    const containerNivel = document.querySelector('.criar-niveis');
    const niveisObj = containerNivel.querySelectorAll('.caixa-nivel');
    levelsObj = [];
    for (let i = 0; i < niveisObj.length; i++) {
        let titleLevel = niveisObj[i].querySelector('.titulo-nivel').value;
        let imageLevel = niveisObj[i].querySelector('.url-nivel').value;
        let text = niveisObj[i].querySelector('.descricao-nivel').value;
        let minvalue = Number(niveisObj[i].querySelector('.porcentagem-nivel').value);
        objQuizz.levels.push({ title: titleLevel, image: imageLevel, text: text, minValue: minvalue });
    }
    console.log(objQuizz);
}



/*let objetoQuizzCriado;
//Fun????o que recebe os valores dos inputs das infos basicas e cria o objeto predefinido para o servidor
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
    console.log(res.data);
    saveInLocalStorage(res.data)

}

function deuRuim(err) {
    console.log(err);
}*/

function saveInLocalStorage(idUserQuizz) {
    const userQuizzes = JSON.stringify(idUserQuizz);
    const quizzUser = localStorage.setItem("userQuizz", userQuizzes);
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