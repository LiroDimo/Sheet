const btnNivel = document.getElementById("botao-nivel");
const btnEscola = document.getElementById("botao-escola");
const btnClube = document.getElementById("botao-clube");
const btnLinhagem = document.getElementById("botao-linhagem");
const btnClasse = document.getElementById("botao-classe");

const listaNivel = document.getElementById("lista-nivel");
const listaEscola = document.getElementById("lista-escola");
const listaClube = document.getElementById("lista-clube");
const listaLinhagem = document.getElementById("lista-linhagem");
const listaClasse = document.getElementById("lista-classe");

const niveis = listaNivel.querySelectorAll("li");
const escolas = listaEscola.querySelectorAll("li");
const clubes = listaClube.querySelectorAll("li");
const linhagens = listaLinhagem.querySelectorAll("li");
const classes = listaClasse.querySelectorAll("li");

let nivelPersonagem = Number(localStorage.getItem("nivel")) || 1;

function dropMenus(butao, lista, itens, memoriaKey, memoriaPadrao){

    let memoriaItem = localStorage.getItem(memoriaKey);

    if (memoriaItem === null) {
        memoriaItem = memoriaPadrao;
        localStorage.setItem(memoriaKey, memoriaItem); 
    }

    butao.textContent = memoriaItem;

    butao.addEventListener("click", ()=> {
        lista.classList.toggle("ativo");
    });

    itens.forEach((item) => {
        item.addEventListener("click", () => {
            let itemSelecionado = item.textContent;
            localStorage.setItem(memoriaKey, itemSelecionado);
            butao.textContent = itemSelecionado;
            lista.classList.remove("ativo");
        });
    });

    document.addEventListener("click", function(event) {
        if (butao !== event.target && !lista.contains(event.target)){
            lista.classList.remove("ativo");
        }
    })
}

const studantId = document.getElementById("studant-id");

function idAleatorio(){

    let idStudant =  localStorage.getItem("studantId");

    if (idStudant === null) {
        let id = Math.floor(Math.random() * 10000);
        idStudant = id.toString().padStart(4, '0');
        localStorage.setItem("studantId", idStudant);
    }

    const idSpan = document.createElement("span");
    idSpan.textContent = `ID: ${idStudant}`;
    studantId.appendChild(idSpan);
    
}

const playerName = document.getElementById("player-name");
const charName = document.getElementById("character-name");

function escreverNome(elemento, memoriaKey, memoriaPadrao){

    const tipoTexto = elemento.tagName === "INPUT" ? "value" : "textContent";

    elemento[tipoTexto] = localStorage.getItem(memoriaKey) || memoriaPadrao;
    elemento.addEventListener("input", () => {
        localStorage.setItem(memoriaKey, elemento[tipoTexto]);
    });
}

const charPhoto = document.getElementById('character-photo');
const fileUpload = document.getElementById('file-upload');
const profileImg = document.getElementById('person-photo');

const savedImage = localStorage.getItem('profileImage');
if (savedImage) {
    profileImg.src = savedImage;
}

charPhoto.addEventListener('click', () => {
    fileUpload.click();
});

function imgPerfil(){
    fileUpload.addEventListener('change', function(event){
        const file = event.target.files[0];
            if (file) {
            const reader = new FileReader();
            reader.onload = function(e){
                profileImg.src = e.target.result;
                localStorage.setItem('profileImage', e.target.result);
            };

            reader.readAsDataURL(file);
        }
    });
}

function perfil(){
    dropMenus(btnNivel, listaNivel, niveis, "nivel", "NÍVEL 01");
    dropMenus(btnEscola, listaEscola, escolas, "escola", "ABYDOS HIGH SCHOOL");
    dropMenus(btnClube, listaClube, clubes, "clube", "SEM CLUBE");
    dropMenus(btnLinhagem, listaLinhagem, linhagens, "linhagem", "HUMANO");
    dropMenus(btnClasse, listaClasse, classes, "classe", "ASSALTO");
    escreverNome(charName, "characterName", "HATSUNE MIKU");
    escreverNome(playerName, "playerName", "");
    idAleatorio();
    imgPerfil();
}

perfil()

const forAtributo = document.getElementById("for-atributo");
const desAtributo = document.getElementById("des-atributo");
const cosAtributo = document.getElementById("cos-atributo");
const intAtributo = document.getElementById("int-atributo");
const sabAtributo = document.getElementById("sab-atributo");
const carAtributo = document.getElementById("car-atributo");

const forModificador = document.getElementById("for-modificador");
const desModificador = document.getElementById("des-modificador");
const cosModificador = document.getElementById("cos-modificador");
const intModificador = document.getElementById("int-modificador");
const sabModificador = document.getElementById("sab-modificador");
const carModificador = document.getElementById("car-modificador");

let forAtr = Number(localStorage.getItem("forAtributo") || 10);
let desAtr = Number(localStorage.getItem("desAtributo") || 10);
let cosAtr = Number(localStorage.getItem("cosAtributo") || 10);
let intAtr = Number(localStorage.getItem("intAtributo") || 10);
let sabAtr = Number(localStorage.getItem("sabAtributo") || 10);
let carAtr = Number(localStorage.getItem("carAtributo") || 10);

let forMod = Number(localStorage.getItem("forModificador") || 0);
let desMod = Number(localStorage.getItem("desModificador") || 0);
let cosMod = Number(localStorage.getItem("cosModificador") || 0);
let intMod = Number(localStorage.getItem("intModificador") || 0);
let sabMod = Number(localStorage.getItem("sabModificador") || 0);
let carMod = Number(localStorage.getItem("carModificador") || 0);

function manterAtributo(atributo, modificador, atrAtual, modAtual){
    atributo.value = atrAtual;
    modificador.value = modAtual;
}

function alterarAtributo(atributo, modificador, memoriaAtrKey, memoriaModKey){
    atributo.addEventListener("input", () => {
        calcModifcador(atributo, modificador, memoriaAtrKey, memoriaModKey);
        console.log(localStorage);
    });
}

function calcModifcador(atributo, modificador, memoriaAtrKey, memoriaModKey){
    modificador.value = Math.floor((Number(atributo.value) - 10) / 2);
    localStorage.setItem(memoriaAtrKey, atributo.value);
    localStorage.setItem(memoriaModKey, modificador.value);
    atualizarTodasAsPericias();
}

function atributo(){
    alterarAtributo(forAtributo, forModificador, "forAtributo", "forModificador");
    alterarAtributo(desAtributo, desModificador, "desAtributo", "desModificador");
    alterarAtributo(cosAtributo, cosModificador, "cosAtributo", "cosModificador");
    alterarAtributo(intAtributo, intModificador, "intAtributo", "intModificador");
    alterarAtributo(sabAtributo, sabModificador, "sabAtributo", "sabModificador");
    alterarAtributo(carAtributo, carModificador, "carAtributo", "carModificador");
    manterAtributo(forAtributo, forModificador, forAtr, forMod);
    manterAtributo(desAtributo, desModificador, desAtr, desMod);
    manterAtributo(cosAtributo, cosModificador, cosAtr, cosMod);
    manterAtributo(intAtributo, intModificador, intAtr, intMod);
    manterAtributo(sabAtributo, sabModificador, sabAtr, sabMod);
    manterAtributo(carAtributo, carModificador, carAtr, carMod);
}

atributo()

const pericasDados = {
    FOR: forModificador,
    DES: desModificador,
    CON: cosModificador,
    INT: intModificador,
    SAB: sabModificador,
    CAR: carModificador
};

const periciaCards = document.querySelectorAll('.pericia-card');

function atualizarTodasAsPericias() {
    periciaCards.forEach(card => {
        const atributoSpan = card.querySelector('.pericia-atributo');
        const dominioInput = card.querySelector('.dominio-input');
        const bonusInput = card.querySelector('.bonus-input');
        const modificadorOutput = card.querySelector('output');

        const atributoTexto = atributoSpan.textContent.trim();
        let valorAtributo = 0;

        if (atributoTexto !== "-" && pericasDados[atributoTexto]) {
            valorAtributo = Number(pericasDados[atributoTexto].value) || 0;
        }

        const valorDominio = Number(dominioInput.value) || 0;
        const valorBonus = Number(bonusInput.value) || 0;

        modificadorOutput.value = valorAtributo + valorDominio + valorBonus;
    });
}

function inicializarPericias() {
    periciaCards.forEach(card => {
        const periciaNomeBase = card.getAttribute('data-ir').replace('pericia-', '');
        const dominioInput = card.querySelector('.dominio-input');
        const bonusInput = card.querySelector('.bonus-input');

        const storageDominioKey = `${periciaNomeBase}Dominio`;
        const storageBonusKey = `${periciaNomeBase}Bonus`;

        dominioInput.value = Number(localStorage.getItem(storageDominioKey)) || 0;
        bonusInput.value = Number(localStorage.getItem(storageBonusKey)) || 0;

        dominioInput.addEventListener('input', () => {
            localStorage.setItem(storageDominioKey, dominioInput.value);
            atualizarTodasAsPericias(); 
        });

        bonusInput.addEventListener('input', () => {
            localStorage.setItem(storageBonusKey, bonusInput.value);
            atualizarTodasAsPericias();
        });
    });

    atualizarTodasAsPericias();
}

inicializarPericias();

const vidaAtualInput = document.getElementById("life-input-now");
const vidaTotalInput = document.getElementById("life-input-total");
const barraVida = document.querySelector(".barra-status.life");

const luzAtualInput = document.getElementById("ligth-input-now");
const luzTotalInput = document.getElementById("ligth-input-total");
const barraLuz = document.querySelector(".barra-status.light");

let vidaAtual = localStorage.getItem("vidaAtual") || 10;
let vidaTotal = localStorage.getItem("vidaTotal") || 10;

let luzAtual = localStorage.getItem("LuzAtual") || 3;
let luzTotal = localStorage.getItem("LuzTotal") || 3;

function salvaBarra(atualInput, totalInput, memoriaAtualKey, memoriaTotalKey, barraElemento){
    
    atualInput.addEventListener("input", () => {
        let valorAtual = atualInput.value;
        let valorTotal = totalInput.value;
        
        localStorage.setItem(memoriaAtualKey, valorAtual);
        calcularBarra(valorAtual, valorTotal, barraElemento);
    });

    totalInput.addEventListener("input", () => {
        let valorAtual = atualInput.value;
        let valorTotal = totalInput.value; 
        
        localStorage.setItem(memoriaTotalKey, valorTotal);
        calcularBarra(valorAtual, valorTotal, barraElemento);
    });
}

function calcularBarra(atual, total, barra){

    if (total == 0) total = 1; 

    let porcentagem = (atual / total) * 100;
    porcentagem = Math.max(0, Math.min(100, porcentagem));
    barra.style.setProperty("--barra", porcentagem + "%");
}

function desenhaBarra(){
    vidaAtualInput.value = vidaAtual;
    vidaTotalInput.value = vidaTotal;

    luzAtualInput.value = luzAtual;
    luzTotalInput.value = luzTotal;
    
    calcularBarra(vidaAtual, vidaTotal, barraVida);
    calcularBarra(luzAtual, luzTotal, barraLuz);
    
    salvaBarra(vidaAtualInput, vidaTotalInput, "vidaAtual", "vidaTotal", barraVida);
    salvaBarra(luzAtualInput, luzTotalInput, "LuzAtual", "LuzTotal", barraLuz);
}

desenhaBarra();

const defesaInput = document.getElementById('defesa-input');
const vidaTemporariaInput = document.getElementById('vida-temporaria-input');

let defesa = localStorage.getItem('defesa') || 9;
let vidaTemporaria = localStorage.getItem('vidaTemporaria') || 0;

defesaInput.addEventListener('input', function() {
    defesa = defesaInput.value;
    localStorage.setItem('defesa', defesa);
})

vidaTemporariaInput.addEventListener('input', function() {
    vidaTemporaria = vidaTemporariaInput.value;
    localStorage.setItem('vidaTemporaria', vidaTemporaria);
});

function updateInputs() {
    defesaInput.value = defesa;
    vidaTemporariaInput.value = vidaTemporaria;
}

updateInputs();

const inputArma = document.getElementById("input-arma");
const inputCritico = document.getElementById("input-critico");
const inputDano = document.getElementById("input-dano");
const inputRajada = document.getElementById("input-rajada");
const inputCargas = document.getElementById("input-cargas");
const inputAlcance = document.getElementById("input-alcance");
const inputEmpunhadura = document.getElementById("input-empunhadura");
const inputPropriedade = document.getElementById("input-propriedade");

const btnPlus = document.getElementById("btn-plus");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const btnDel = document.getElementById("btn-less");
const paginaInfo = document.getElementById("pagina-info");

let paginaAtual = 0;

const camposArma = [
    { elemento: inputArma, chave: 'nome' },
    { elemento: inputCritico, chave: 'critico' },
    { elemento: inputDano, chave: 'dano' },
    { elemento: inputRajada, chave: 'rajada' },
    { elemento: inputCargas, chave: 'cargas' },
    { elemento: inputAlcance, chave: 'alcance' },
    { elemento: inputEmpunhadura, chave: 'empunhadura' },
    { elemento: inputPropriedade, chave: 'propriedade' }
];

function criarArmaVazia() {
    return {
        nome: '', critico: '', dano: '', rajada: '',
        cargas: '', alcance: '', empunhadura: '', propriedade: ''
    };
}

function lerArmas() {
    const armasSalvas = localStorage.getItem('lista_armas');
    if (!armasSalvas) return [];

    let armas = JSON.parse(armasSalvas);

    armas = armas.map(arma => {
        if (typeof arma === 'string') {
            return { ...criarArmaVazia(), nome: arma };
        }
        return arma;
    });

    return armas;
}

function salvarArmas(armas) {
    localStorage.setItem('lista_armas', JSON.stringify(armas));
}

function atualizarInterface() {
    const armas = lerArmas();

    if (armas.length === 0) {
        paginaAtual = 0;
        camposArma.forEach(campo => campo.elemento.value = '');

        btnPrev.style.display = 'none';
        btnNext.style.display = 'none';
        btnDel.style.display = 'none';
        paginaInfo.textContent = '(Nova Arma)';
        return;
    }

    const armaAtual = armas[paginaAtual];

    camposArma.forEach(campo => {
        campo.elemento.value = armaAtual[campo.chave] || '';
    });

    paginaInfo.textContent = `(${paginaAtual + 1} de ${armas.length})`;

    btnPrev.style.display = (paginaAtual > 0) ? 'inline-block' : 'none';
    btnNext.style.display = (paginaAtual < armas.length - 1) ? 'inline-block' : 'none';
    btnDel.style.display = 'inline-block';
}

camposArma.forEach(campo => {
    campo.elemento.addEventListener('input', () => {
        let armas = lerArmas();

        if (armas.length === 0) {
            armas = [criarArmaVazia()];
        }

        armas[paginaAtual][campo.chave] = campo.elemento.value;
        salvarArmas(armas);
    });
});

btnPlus.addEventListener('click', () => {
    const armas = lerArmas();

    if (inputArma.value.trim() === '') {
        return;
    }

    armas.push(criarArmaVazia());
    salvarArmas(armas);
    paginaAtual = armas.length - 1;
    atualizarInterface();
});

btnPrev.addEventListener('click', () => {
    if (paginaAtual > 0) {
        paginaAtual--;
        atualizarInterface();
    }
});

btnNext.addEventListener('click', () => {
    const armas = lerArmas();
    if (paginaAtual < armas.length - 1) {
        paginaAtual++;
        atualizarInterface();
    }
});

btnDel.addEventListener('click', () => {
    const armas = lerArmas();

    if (confirm('Apagar arma?')) {
        armas.splice(paginaAtual, 1);
        salvarArmas(armas);

        if (paginaAtual > 0 && paginaAtual === armas.length) {
            paginaAtual--;
        }

        atualizarInterface();
    }
});
atualizarInterface();

const inputColete = document.getElementById("input-colete");
const inputDefesa = document.getElementById("input-defesa-colete");
const inputRd = document.getElementById("input-rd-colete");
const inputPenalidade = document.getElementById("input-penalidade-colete");
const inputRequisito = document.getElementById("input-requisito-colete");
const inputPropriedadeColete = document.getElementById("input-propriedade-colete");

const btnPlusColete = document.getElementById("btn-plus-colete");
const btnPrevColete = document.getElementById("btn-prev-colete");
const btnNextColete = document.getElementById("btn-next-colete");
const btnDelColete = document.getElementById("btn-less-colete");
const paginaInfoColete = document.getElementById("pagina-info-colete");

let paginaAtualColete = 0;

const camposColete = [
    { elemento: inputColete, chave: 'nome' },
    { elemento: inputDefesa, chave: 'defesa' },
    { elemento: inputRd, chave: 'rd' },
    { elemento: inputPenalidade, chave: 'penalidade' },
    { elemento: inputRequisito, chave: 'requisito' },
    { elemento: inputPropriedadeColete, chave: 'propriedade' }
];

function criarColeteVazio() {
    return {
        nome: '', defesa: '', rd: '', penalidade: '', requisito: '', propriedade: ''
    };
}

function lerColetes() {
    const coletesSalvos = localStorage.getItem('lista_coletes');
    return coletesSalvos ? JSON.parse(coletesSalvos) : [];
}

function salvarColetes(coletes) {
    localStorage.setItem('lista_coletes', JSON.stringify(coletes));
}

function atualizarInterfaceColetes() {
    const coletes = lerColetes();

    if (coletes.length === 0) {
        paginaAtualColete = 0;
        camposColete.forEach(campo => campo.elemento.value = '');

        btnPrevColete.style.display = 'none';
        btnNextColete.style.display = 'none';
        btnDelColete.style.display = 'none';
        paginaInfoColete.textContent = '(Novo Colete)';
        return;
    }

    const coleteAtual = coletes[paginaAtualColete];

    camposColete.forEach(campo => {
        campo.elemento.value = coleteAtual[campo.chave] || '';
    });

    paginaInfoColete.textContent = `(${paginaAtualColete + 1} de ${coletes.length})`;

    btnPrevColete.style.display = (paginaAtualColete > 0) ? 'inline-block' : 'none';
    btnNextColete.style.display = (paginaAtualColete < coletes.length - 1) ? 'inline-block' : 'none';
    btnDelColete.style.display = 'inline-block';
}

camposColete.forEach(campo => {
    campo.elemento.addEventListener('input', () => {
        let coletes = lerColetes();

        if (coletes.length === 0) {
            coletes = [criarColeteVazio()];
        }

        coletes[paginaAtualColete][campo.chave] = campo.elemento.value;
        salvarColetes(coletes);
    });
});


btnPlusColete.addEventListener('click', () => {
    const coletes = lerColetes();

    if (inputColete.value.trim() === '') {
        return;
    }

    coletes.push(criarColeteVazio());
    salvarColetes(coletes);
    paginaAtualColete = coletes.length - 1;
    atualizarInterfaceColetes();
});


btnPrevColete.addEventListener('click', () => {
    if (paginaAtualColete > 0) {
        paginaAtualColete--;
        atualizarInterfaceColetes();
    }
});

btnNextColete.addEventListener('click', () => {
    const coletes = lerColetes();
    if (paginaAtualColete < coletes.length - 1) {
        paginaAtualColete++;
        atualizarInterfaceColetes();
    }
});

btnDelColete.addEventListener('click', () => {
    const coletes = lerColetes();

    if (confirm('Apagar este item?')) {
        coletes.splice(paginaAtualColete, 1);
        salvarColetes(coletes);

        if (paginaAtualColete > 0 && paginaAtualColete === coletes.length) {
            paginaAtualColete--;
        }

        atualizarInterfaceColetes();
    }
});

atualizarInterfaceColetes();

const sufixosInventario = ['i', 'ii', 'iii', 'iv', 'v', 'vi'];

const camposInventario = sufixosInventario.map((sufixo, index) => {
    return {
        elementoItem: document.getElementById(`iventario-input-${sufixo}`),
        elementoCount: document.getElementById(`iventario-input-count-${sufixo}`),
        chaveItem: `item${index + 1}`,
        chaveCount: `count${index + 1}`
    };
});

const btnPlusInventario = document.getElementById("btn-plus-iventario");
const btnPrevInventario = document.getElementById("btn-prev-iventario");
const btnNextInventario = document.getElementById("btn-next-iventario");
const btnDelInventario = document.getElementById("btn-less-iventario");
const paginaInfoInventario = document.getElementById("pagina-info-inventario");

let paginaAtualInventario = 0;

function criarPaginaInventarioVazia() {
    let pagina = {};
    for (let i = 1; i <= 6; i++) {
        pagina[`item${i}`] = '';
        pagina[`count${i}`] = '0';
    }
    return pagina;
}

function lerInventario() {
    const inventarioSalvo = localStorage.getItem('lista_inventario');
    return inventarioSalvo ? JSON.parse(inventarioSalvo) : [];
}

function salvarInventario(inventario) {
    localStorage.setItem('lista_inventario', JSON.stringify(inventario));
}

function atualizarInterfaceInventario() {
    const inventario = lerInventario();

    if (inventario.length === 0) {
        paginaAtualInventario = 0;
        camposInventario.forEach(campo => {
            campo.elementoItem.value = '';
            campo.elementoCount.value = '0';
        });

        btnPrevInventario.style.display = 'none';
        btnNextInventario.style.display = 'none';
        btnDelInventario.style.display = 'none';
        paginaInfoInventario.textContent = '(Pág. 1)';
        return;
    }

    const paginaAtualObj = inventario[paginaAtualInventario];

    camposInventario.forEach(campo => {
        campo.elementoItem.value = paginaAtualObj[campo.chaveItem] || '';
        campo.elementoCount.value = paginaAtualObj[campo.chaveCount] || '0';
    });

    paginaInfoInventario.textContent = `(Pág ${paginaAtualInventario + 1} de ${inventario.length})`;

    btnPrevInventario.style.display = (paginaAtualInventario > 0) ? 'inline-block' : 'none';
    btnNextInventario.style.display = (paginaAtualInventario < inventario.length - 1) ? 'inline-block' : 'none';
    btnDelInventario.style.display = 'inline-block';
}

camposInventario.forEach(campo => {
    campo.elementoItem.addEventListener('input', () => {
        let inventario = lerInventario();

        if (inventario.length === 0) {
            inventario = [criarPaginaInventarioVazia()];
        }

        inventario[paginaAtualInventario][campo.chaveItem] = campo.elementoItem.value;
        salvarInventario(inventario);
    });

    campo.elementoCount.addEventListener('input', () => {
        let inventario = lerInventario();

        if (inventario.length === 0) {
            inventario = [criarPaginaInventarioVazia()];
        }

        inventario[paginaAtualInventario][campo.chaveCount] = campo.elementoCount.value;
        salvarInventario(inventario);
    });
});

btnPlusInventario.addEventListener('click', () => {
    const inventario = lerInventario();
    inventario.push(criarPaginaInventarioVazia());
    salvarInventario(inventario);
    paginaAtualInventario = inventario.length - 1;
    atualizarInterfaceInventario();
});

btnPrevInventario.addEventListener('click', () => {
    if (paginaAtualInventario > 0) {
        paginaAtualInventario--;
        atualizarInterfaceInventario();
    }
});

btnNextInventario.addEventListener('click', () => {
    const inventario = lerInventario();
    if (paginaAtualInventario < inventario.length - 1) {
        paginaAtualInventario++;
        atualizarInterfaceInventario();
    }
});

btnDelInventario.addEventListener('click', () => {
    const inventario = lerInventario();

    if (confirm('Apagar esta página do inventário?')) {
        inventario.splice(paginaAtualInventario, 1);
        salvarInventario(inventario);

        if (paginaAtualInventario > 0 && paginaAtualInventario === inventario.length) {
            paginaAtualInventario--;
        }

        atualizarInterfaceInventario();
    }
});

atualizarInterfaceInventario();

const habilidadesContainer = document.querySelector('.habilidades-container');
const btnPlusHabilidade = document.getElementById('btn-plus-habilidade');
const btnPrevHabilidade = document.getElementById('btn-prev-habilidade');
const btnNextHabilidade = document.getElementById('btn-next-habilidade');
const paginaInfoHabilidades = document.getElementById('pagina-info-habilidades');
const btnDeletarModal = document.getElementById('btn-deletar-habilidade');

const modalHabilidade = document.querySelector('.habilidade-show');
const btnModalHabilide = document.querySelector('.habilidade-show-buttons')
const btnFecharModal = document.getElementById('btn-fechar-modal');
const listaOrigem = document.getElementById('lista-habilidasdes-origem');
const outputOrigem = document.getElementById('habilidade-show-origem-output');
const btnOrigem = document.getElementById('habilidade-show-origem');

const inputsModal = {
    titulo: document.getElementById('habilidade-show-input'),
    custo: document.getElementById('habilidade-show-custo'),
    acao: document.getElementById('habilidade-show-acao'),
    duracao: document.getElementById('habilidade-show-duracao'),
    limite: document.getElementById('habilidade-show-limite'),
    area: document.getElementById('habilidade-show-area'),
    resistencia: document.getElementById('habilidade-show-resistencia'),
    descricao: document.getElementById('habilidade-show-descricao')
};

const LIMITE_POR_PAGINA = 20;
let paginaAtualHabilidades = 0;
let indexHabilidadeAberta = -1;

const iconesOrigem = {
    'Linhagem': '<span class="fas fa-dna"></span>',
    'Escola': '<span class="fas fa-atom"></span>',
    'Clube': '<span class="fas fa-award"></span>',
    'Classe': '<span class="fas fa-fire"></span>'
};

function criarHabilidadeVazia() {
    return {
        titulo: 'Nova Habilidade', origem: '', custo: '', acao: '',
        duracao: '', limite: '', area: '', resistencia: '', descricao: ''
    };
}

function lerHabilidades() {
    const salvas = localStorage.getItem('lista_habilidades');
    return salvas ? JSON.parse(salvas) : [];
}

function salvarHabilidades(habilidades) {
    localStorage.setItem('lista_habilidades', JSON.stringify(habilidades));
}

function atualizarInterfaceHabilidades() {
    let habilidades = lerHabilidades();
    
    document.querySelectorAll('.habilidade-card').forEach(el => el.remove());

    const totalPaginas = Math.max(1, Math.ceil(habilidades.length / LIMITE_POR_PAGINA));
    if (paginaAtualHabilidades >= totalPaginas) paginaAtualHabilidades = totalPaginas - 1;

    const inicio = paginaAtualHabilidades * LIMITE_POR_PAGINA;
    const fim = inicio + LIMITE_POR_PAGINA;
    const habilidadesPagina = habilidades.slice(inicio, fim);

    habilidadesPagina.forEach((hab, indexAtual) => {
        const card = document.createElement('div');
        card.className = 'habilidade-card';

        card.style.lineHeight = '24px'; 
        card.style.overflow = 'hidden'; 
        card.style.whiteSpace = 'nowrap';
        
        const icone = iconesOrigem[hab.origem] ? `${iconesOrigem[hab.origem]} ` : '';
        card.innerHTML = icone + hab.titulo;
        card.addEventListener('click', () => {
            abrirModal(inicio + indexAtual, hab);
        });


        habilidadesContainer.insertBefore(card, modalHabilidade);
    });

    paginaInfoHabilidades.textContent = `(Pág ${paginaAtualHabilidades + 1} de ${totalPaginas})`;
    btnPrevHabilidade.style.display = paginaAtualHabilidades > 0 ? 'inline-block' : 'none';
    btnNextHabilidade.style.display = paginaAtualHabilidades < totalPaginas - 1 ? 'inline-block' : 'none';
}

btnPlusHabilidade.addEventListener('click', () => {
    const habilidades = lerHabilidades();
    habilidades.push(criarHabilidadeVazia());
    salvarHabilidades(habilidades);
    paginaAtualHabilidades = Math.ceil(habilidades.length / LIMITE_POR_PAGINA) - 1;
    atualizarInterfaceHabilidades();
});

btnPrevHabilidade.addEventListener('click', () => {
    if (paginaAtualHabilidades > 0) { paginaAtualHabilidades--; atualizarInterfaceHabilidades(); }
});

btnNextHabilidade.addEventListener('click', () => {
    let habilidades = lerHabilidades();
    if (paginaAtualHabilidades < Math.ceil(habilidades.length / LIMITE_POR_PAGINA) - 1) {
        paginaAtualHabilidades++; atualizarInterfaceHabilidades();
    }
});

function abrirModal(indexGlobal, dadosHabilidade) {
    indexHabilidadeAberta = indexGlobal;
    
    Object.keys(inputsModal).forEach(chave => {
        inputsModal[chave].value = dadosHabilidade[chave] || '';
    });

    if (!dadosHabilidade.origem) {
        outputOrigem.textContent = 'Classe';
        outputOrigem.style.opacity = '0.5';
    } else {
        outputOrigem.textContent = dadosHabilidade.origem;
        outputOrigem.style.opacity = '1';
    }

    listaOrigem.style.display = 'none'; 
    modalHabilidade.style.display = 'grid';
    btnModalHabilide.style.display = 'block';
}

if(btnFecharModal) {
    btnFecharModal.addEventListener('click', () => {
        modalHabilidade.style.display = 'none';
        btnModalHabilide.style.display = 'none';
        indexHabilidadeAberta = -1;
    });
}

btnDeletarModal.addEventListener('click', () => {
    if (indexHabilidadeAberta !== -1) {
        if (confirm('Tem certeza que deseja apagar esta habilidade?')) {
            let habilidades = lerHabilidades();
            
            habilidades.splice(indexHabilidadeAberta, 1);
            salvarHabilidades(habilidades);
            
            modalHabilidade.style.display = 'none';
            btnModalHabilide.style.display = 'none';
            indexHabilidadeAberta = -1;
            
            atualizarInterfaceHabilidades();
        }
    }
});

Object.keys(inputsModal).forEach(chave => {
    inputsModal[chave].addEventListener('input', (e) => {
        if (indexHabilidadeAberta === -1) return;
        
        let habilidades = lerHabilidades();
        habilidades[indexHabilidadeAberta][chave] = e.target.value;
        salvarHabilidades(habilidades);
        
        if (chave === 'titulo') {
            atualizarInterfaceHabilidades();
        }
    });
});

btnOrigem.addEventListener('click', () => {
    listaOrigem.style.display = listaOrigem.style.display === 'none' ? 'block' : 'none';
});
outputOrigem.addEventListener('click', () => {
    listaOrigem.style.display = listaOrigem.style.display === 'none' ? 'block' : 'none';
});

listaOrigem.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', (e) => {
        if (indexHabilidadeAberta === -1) return;
        
        const origemSelecionada = e.target.textContent;
        outputOrigem.textContent = origemSelecionada;
        outputOrigem.style.opacity = '1';
        listaOrigem.style.display = 'none';

        let habilidades = lerHabilidades();
        habilidades[indexHabilidadeAberta].origem = origemSelecionada;
        salvarHabilidades(habilidades);
        
        atualizarInterfaceHabilidades();
    });
});

modalHabilidade.style.display = 'none';
btnModalHabilide.style.display = 'none';
atualizarInterfaceHabilidades();