
const botaoAdicionar = document.querySelector("#btn-adicionar-projeto");
const formularioProjeto = document.querySelector("#form-projeto");
const botaoCancelar = document.querySelector("#btn-cancelar-projeto");

const campoNome = document.querySelector("#nome-projeto");
const campoTecnologias = document.querySelector("#tecnologias-projeto");
const campoDescricao = document.querySelector("#descricao-projeto");

const listaProjetos = document.querySelector("#lista-projetos");
const mensagemProjetos = document.querySelector("#mensagem-projetos");

// Abre o formulário
botaoAdicionar.addEventListener("click", function () {
    formularioProjeto.hidden = false;
});

// Cancela o cadastro
botaoCancelar.addEventListener("click", function () {
    formularioProjeto.hidden = true;
    formularioProjeto.reset();
});

// Cadastra um projeto
formularioProjeto.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const projeto = {
        nome: campoNome.value.trim(),
        tecnologias: campoTecnologias.value.trim(),
        descricao: campoDescricao.value.trim()
    };

    const cartao = document.createElement("article");

    const titulo = document.createElement("h4");
    titulo.textContent = projeto.nome;

    const tecnologias = document.createElement("p");
    tecnologias.textContent = `Tecnologias: ${projeto.tecnologias}`;

    cartao.append(titulo, tecnologias);

    if (projeto.descricao !== "") {
        const descricao = document.createElement("p");
        descricao.textContent = projeto.descricao;
        cartao.append(descricao);
    }

    listaProjetos.append(cartao);

    mensagemProjetos.hidden = true;
    formularioProjeto.hidden = true;
    formularioProjeto.reset();
});