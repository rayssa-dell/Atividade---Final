const botaoTema = document.querySelector("#mudar-tema");

if (localStorage.getItem("tema") === "escuro") {
    document.body.classList.add("escuro");
}

if (botaoTema) {
    botaoTema.addEventListener("click", () => {
        document.body.classList.toggle("escuro");

        const temaAtual = document.body.classList.contains("escuro")
            ? "escuro"
            : "claro";

        localStorage.setItem("tema", temaAtual);
    });
}
const imagensSlider = document.querySelector(".imagens");
const janelaSlide = document.querySelector(".janela-slide");
const botaoProximo = document.querySelector("#proximo");
const botaoAnterior = document.querySelector("#anterior");

if (
    imagensSlider &&
    janelaSlide &&
    botaoProximo &&
    botaoAnterior
) {
    const imagens = imagensSlider.querySelectorAll("img");
    let posicao = 0;

    function atualizarSlider() {
        if (imagens.length === 0) {
            return;
        }

        const largura = janelaSlide.clientWidth;

        imagensSlider.style.transform =
            `translateX(-${posicao * largura}px)`;
    }

    botaoProximo.addEventListener("click", () => {
        posicao = (posicao + 1) % imagens.length;
        atualizarSlider();
    });

    botaoAnterior.addEventListener("click", () => {
        posicao = (posicao - 1 + imagens.length) % imagens.length;
        atualizarSlider();
    });

    window.addEventListener("resize", atualizarSlider);
    imagens.forEach((imagem) => {
        imagem.addEventListener("load", atualizarSlider);
    });

    atualizarSlider();
}
const campoPesquisa = document.querySelector("#pesquisa");
const filtro = document.querySelector("#filtro");
const cards = document.querySelectorAll(".cards article.card");
const mensagemBusca = document.querySelector("#mensagem-busca");

function filtrarCards() {
    if (!campoPesquisa || !filtro) return;

    const termo = campoPesquisa.value.toLowerCase().trim();
    const categoria = filtro.value;
    let encontrados = 0;

    cards.forEach(card => {
        const texto = card.textContent.toLowerCase();
        const categorias = (card.dataset.categoria || "").split(/\s+/);

        const combinaTexto = texto.includes(termo);
        const combinaCategoria =
            categoria === "todos" || categorias.includes(categoria);

        if (combinaTexto && combinaCategoria) {
            card.hidden = false;
            encontrados++;
        } else {
            card.hidden = true;
        }
    });

    if (mensagemBusca) {
        mensagemBusca.hidden = encontrados > 0;
    }
}

if (campoPesquisa && filtro) {
    campoPesquisa.addEventListener("input", filtrarCards);
    filtro.addEventListener("change", filtrarCards);
    filtrarCards();

}
const quizForm = document.querySelector("#quiz-form");

if (quizForm) {
    const resultado = document.querySelector("#resultado-quiz");

    const respostasCorretas = {
        q1: "b",
        q2: "a",
        q3: "c",
        q4: "a",
        q5: "b"
    };

    quizForm.addEventListener("submit", (evento) => {
        evento.preventDefault();

        let pontuacao = 0;

        for (let questao in respostasCorretas) {
            const resposta = document.querySelector(
                `input[name="${questao}"]:checked`
            );

            const feedback = document.querySelector(`#feedback-${questao}`);

            if (resposta) {
                if (resposta.value === respostasCorretas[questao]) {
                    pontuacao++;

                    if (feedback) {
                        feedback.textContent = "Você acertou!";
                    }
                } else {
                    if (feedback) {
                        feedback.textContent =
                            "Você errou! A resposta correta é: " +
                            respostasCorretas[questao].toUpperCase();
                    }
                }
            } else {
                if (feedback) {
                    feedback.textContent = "Você não respondeu essa questão.";
                }
            }
        }

        if (resultado) {
            resultado.textContent =
                `Você acertou ${pontuacao} de 5 questões!`;
        }
    });
    quizForm.addEventListener("reset", () => {
        if (resultado) {
            resultado.textContent = "";
        }

        for (let i = 1; i <= 5; i++) {
            const feedback = document.querySelector(`#feedback-q${i}`);

            if (feedback) {
                feedback.textContent = "";
            }
        }
    });
}
document.querySelectorAll(".texto-extra").forEach(area => {
    const texto = area.querySelector("p");
    const botao = area.querySelector(".botao-extra");

    if (texto && botao) {
        botao.addEventListener("click", () => {
            texto.hidden = !texto.hidden;

            botao.textContent = texto.hidden
                ? "Ver mais"
                : "Ver menos";
        });
    }
});
const modal = document.querySelector("#modal-lipidios");
const abrirModal = document.querySelector("#abrir-modal");
const fecharModal = document.querySelector("#fechar-modal");

if (modal && abrirModal && fecharModal) {
    abrirModal.addEventListener("click", () => {
        modal.hidden = false;
    });

    fecharModal.addEventListener("click", () => {
        modal.hidden = true;
    });

    modal.addEventListener("click", evento => {
        if (evento.target === modal) {
            modal.hidden = true;
        }
    });
}
const botaoDNA = document.querySelector("#mostrar-dna");
const botaoRNA = document.querySelector("#mostrar-rna");
const informacaoDNA = document.querySelector("#informacao-dna");
const informacaoRNA = document.querySelector("#informacao-rna");

if (botaoDNA && botaoRNA && informacaoDNA && informacaoRNA) {
    botaoDNA.addEventListener("click", () => {
        informacaoDNA.hidden = false;
        informacaoRNA.hidden = true;
    });

    botaoRNA.addEventListener("click", () => {
        informacaoDNA.hidden = true;
        informacaoRNA.hidden = false;
    });
}
document.querySelectorAll(".botao-aba").forEach(botao => {
    botao.addEventListener("click", () => {
        document.querySelector("#aba-simples").hidden = true;
        document.querySelector("#aba-complexos").hidden = true;

        const abaEscolhida = botao.dataset.aba;

        document.querySelector("#aba-" + abaEscolhida).hidden = false;
    });
});
const botaoMenu = document.querySelector(".menu-botao");
const menuNavegacao = document.querySelector(".menu");

if (botaoMenu && menuNavegacao) {
    botaoMenu.addEventListener("click", () => {
        menuNavegacao.classList.toggle("menu-aberto");
    });
}