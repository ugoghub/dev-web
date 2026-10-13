
const botaoAdicionar = document.querySelector("#btn-adicionar-projeto");
const formularioProjeto = document.querySelector("#form-projeto");
const botaoCancelar = document.querySelector("#btn-cancelar-projeto");

const campoNome = document.querySelector("#nome-projeto");
const campoTecnologias = document.querySelector("#tecnologias-projeto");
const campoDescricao = document.querySelector("#descricao-projeto");

const listaProjetos = document.querySelector("#lista-projetos");
const mensagemProjetos = document.querySelector("#mensagem-projetos");
const totalProjetos = document.querySelector("#total-projetos");

let projetoEmEdicao = null;

const CHAVE_STORAGE = "devtrack-projetos";

let projetos = JSON.parse(localStorage.getItem(CHAVE_STORAGE)) ?? [];


const botaoAdicionarEstudo = document.querySelector("#btn-adicionar-estudo");
const formularioEstudo = document.querySelector("#form-estudo");
const botaoCancelarEstudo = document.querySelector("#btn-cancelar-estudo");

const campoTemaEstudo = document.querySelector("#tema-estudo");
const campoTecnologiaEstudo = document.querySelector("#tecnologia-estudo");
const campoDuracaoEstudo = document.querySelector("#duracao-estudo");
const campoDataEstudo = document.querySelector("#data-estudo");
const campoDescricaoEstudo = document.querySelector("#descricao-estudo");

const listaEstudos = document.querySelector("#lista-estudos");
const mensagemEstudos = document.querySelector("#mensagem-estudos");

const CHAVE_ESTUDOS = "devtrack-estudos";

let estudos = JSON.parse(localStorage.getItem(CHAVE_ESTUDOS)) ?? [];

const elementoHorasEstudadas = document.querySelector("#horas-estudadas");
const elementoHorasMeta = document.querySelector("#horas-meta");
const elementoMetaSemanal = document.querySelector("#meta-semanal");
const barraMeta = document.querySelector("#barra-meta");
const progressoMeta = document.querySelector("#progresso-meta");
const mensagemMeta = document.querySelector("#mensagem-meta");

const META_SEMANAL_MINUTOS = 15 * 60;

// Abre o formulário
botaoAdicionar.addEventListener("click", function () {
    projetoEmEdicao = null;
    formularioProjeto.reset();
    formularioProjeto.hidden = false;
    campoNome.focus();
});

// Cancela o cadastro
botaoCancelar.addEventListener("click", function () {
    fecharFormulario();
});

botaoAdicionarEstudo.addEventListener("click", function () {
    formularioEstudo.hidden = false;

    campoDataEstudo.value = new Date().toLocaleDateString("en-CA");
    campoTemaEstudo.focus();
});

botaoCancelarEstudo.addEventListener("click", function () {
    fecharFormularioEstudo();
});



// Salva a lista de projetos no navegador
function salvarProjetos() {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(projetos));
}


function salvarEstudos() {
    localStorage.setItem(CHAVE_ESTUDOS, JSON.stringify(estudos));
}


function fecharFormularioEstudo() {
    formularioEstudo.reset();
    formularioEstudo.hidden = true;
}

// Cria e exibe um cartão para cada projeto

function renderizarProjetos() {
    listaProjetos.replaceChildren();

    projetos.forEach(function (projeto) {
        const cartao = document.createElement("article");
        cartao.classList.add("cartao-projeto");

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

        
        const botoes = document.createElement("div");
        botoes.classList.add("acoes-projeto");

        const botaoEditar = document.createElement("button");
        botaoEditar.type = "button";
        botaoEditar.textContent = "Editar";

        botaoEditar.addEventListener("click", function () {
            editarProjeto(projeto.id);
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.type = "button";
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.classList.add("botao-excluir");

        botaoExcluir.addEventListener("click", function () {
            excluirProjeto(projeto.id);
        });

        botoes.append(botaoEditar, botaoExcluir);
        cartao.append(botoes);

        listaProjetos.append(cartao);

        });

    totalProjetos.textContent = projetos.length;
    mensagemProjetos.hidden = projetos.length > 0;
}


function renderizarEstudos() {
  listaEstudos.replaceChildren();

  const estudosOrdenados = [...estudos].sort(function (a, b) {
    return b.data.localeCompare(a.data);
  });

  estudosOrdenados.forEach(function (estudo) {
    const cartao = document.createElement("article");
    cartao.classList.add("cartao-estudo");

    const titulo = document.createElement("h4");
    titulo.textContent = estudo.tema;

    const tecnologia = document.createElement("p");
    tecnologia.textContent = `Tecnologia: ${estudo.tecnologia}`;

    const duracao = document.createElement("p");
    duracao.textContent = `Duração: ${estudo.duracao} minutos`;

    const data = document.createElement("p");
    data.textContent = `Data: ${estudo.data}`;

    cartao.append(titulo, tecnologia, duracao, data);

    if (estudo.descricao !== "") {
      const descricao = document.createElement("p");
      descricao.textContent = estudo.descricao;
      cartao.append(descricao);
    }

    listaEstudos.append(cartao);
  });

  mensagemEstudos.hidden = estudos.length > 0;
}


function editarProjeto(id) {
    const projeto = projetos.find(function (item) {
        return item.id === id;
    });

    if (!projeto) {
        return;
    }

    projetoEmEdicao = id;

    campoNome.value = projeto.nome;
    campoTecnologias.value = projeto.tecnologias;
    campoDescricao.value = projeto.descricao;

    formularioProjeto.hidden = false;
    campoNome.focus();
}


function excluirProjeto(id) {
    const confirmar = confirm("Deseja realmente excluir este projeto?");

    if (!confirmar) {
        return;
    }

    projetos = projetos.filter(function (projeto) {
        return projeto.id !== id;
    });

    salvarProjetos();
    renderizarProjetos();
}

function fecharFormulario() {
    formularioProjeto.reset();
    formularioProjeto.hidden = true;
    projetoEmEdicao = null;
}


function obterInicioDaSemana(data) {
  const inicio = new Date(data.getFullYear(), data.getMonth(), data.getDate());
  const diaDaSemana = inicio.getDay();

  // Domingo (0) volta seis dias; os demais voltam até segunda-feira.
  const diasDesdeSegunda = (diaDaSemana + 6) % 7;

  inicio.setDate(inicio.getDate() - diasDesdeSegunda);

  return inicio;
}

function obterFimDaSemana(data) {
  const fim = obterInicioDaSemana(data);

  fim.setDate(fim.getDate() + 6);
  fim.setHours(23, 59, 59, 999);

  return fim;
}


function calcularMinutosEstudadosNaSemana() {
  const hoje = new Date();
  const inicioSemana = obterInicioDaSemana(hoje);
  const fimSemana = obterFimDaSemana(hoje);

  let totalMinutos = 0;

  estudos.forEach(function (estudo) {
    const [ano, mes, dia] = estudo.data.split("-").map(Number);
    const dataEstudo = new Date(ano, mes - 1, dia);

    if (dataEstudo >= inicioSemana && dataEstudo <= fimSemana) {
      totalMinutos += estudo.duracao;
    }
  });

  return totalMinutos;
}


function atualizarResumoEstudos() {
  const minutosEstudados = calcularMinutosEstudadosNaSemana();
  const horasEstudadas = minutosEstudados / 60;

  const porcentagem = Math.min(
    (minutosEstudados / META_SEMANAL_MINUTOS) * 100,
    100
  );

  elementoHorasEstudadas.textContent =
    `${Number(horasEstudadas.toFixed(2))}h`;

  elementoHorasMeta.textContent =
    Number(horasEstudadas.toFixed(2));

  elementoMetaSemanal.textContent =
    META_SEMANAL_MINUTOS / 60;

  progressoMeta.style.width = `${porcentagem}%`;

  barraMeta.setAttribute(
    "aria-valuenow",
    String(Math.round(porcentagem))
  );

  mensagemMeta.textContent =
    `Você completou ${Math.floor(porcentagem)}% da sua meta!`;
}

// Cadastra um projeto

formularioProjeto.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const dadosProjeto = {
        nome: campoNome.value.trim(),
        tecnologias: campoTecnologias.value.trim(),
        descricao: campoDescricao.value.trim()
    };

    if (projetoEmEdicao !== null) {
        const projeto = projetos.find(function (item) {
            return item.id === projetoEmEdicao;
        });

        if (projeto) {
            projeto.nome = dadosProjeto.nome;
            projeto.tecnologias = dadosProjeto.tecnologias;
            projeto.descricao = dadosProjeto.descricao;
        }
    } else {
        const novoProjeto = {
            id: crypto.randomUUID(),
            ...dadosProjeto
        };

        projetos.push(novoProjeto);
    }

    salvarProjetos();
    renderizarProjetos();
    fecharFormulario();
});


formularioEstudo.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const duracao = Number(campoDuracaoEstudo.value);

    if (!Number.isInteger(duracao) || duracao <= 0) {
        alert("Informe uma duração em minutos maior que zero.");
        return;
    }

    const estudo = {
        id: crypto.randomUUID(),
        tema: campoTemaEstudo.value.trim(),
        tecnologia: campoTecnologiaEstudo.value.trim(),
        duracao: duracao,
        data: campoDataEstudo.value,
        descricao: campoDescricaoEstudo.value.trim()
    };

    estudos.push(estudo);
    salvarEstudos();
    renderizarEstudos();
    atualizarResumoEstudos();
    fecharFormularioEstudo();
});

// Carrega os projetos salvos ao abrir a página
renderizarProjetos();
renderizarEstudos();
atualizarResumoEstudos();