// ========================================
// CONFIGURAÇÕES DA AUTOFIX
// ========================================

const telefoneAutoFix = "5511987654321";

const mensagemInicial =
    "Olá! Gostaria de conhecer os serviços da AutoFix.";


// ========================================
// LINKS DO WHATSAPP
// ========================================

function criarLinkWhatsApp(mensagem) {
    const telefone = telefoneAutoFix.replace(/\D/g, "");

    return `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
}

document.querySelectorAll(".whatsapp-link").forEach((link) => {
    link.href = criarLinkWhatsApp(mensagemInicial);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
});


// ========================================
// MENU RESPONSIVO
// ========================================

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
    const aberto = navMenu.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(aberto));

    menuToggle.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );

    menuToggle.innerHTML = aberto
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});


// Fecha o menu ao selecionar uma seção
navMenu.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");

        menuToggle.innerHTML =
            '<i class="fa-solid fa-bars"></i>';
    });
});


// ========================================
// FORMULÁRIO DE ORÇAMENTO
// ========================================

const quoteForm = document.getElementById("quote-form");

quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!quoteForm.reportValidity()) {
        return;
    }

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const veiculo = document.getElementById("veiculo").value.trim();
    const servico = document.getElementById("servico").value;
    const detalhes = document.getElementById("mensagem").value.trim();

    const mensagem = [
        "Olá! Gostaria de solicitar um orçamento na AutoFix.",
        "",
        `Nome: ${nome}`,
        `Telefone: ${telefone}`,
        `Veículo: ${veiculo}`,
        `Serviço desejado: ${servico}`,
        `Detalhes: ${detalhes || "Não informado"}`
    ].join("\n");

    const link = criarLinkWhatsApp(mensagem);

    window.open(link, "_blank", "noopener,noreferrer");
});


// ========================================
// MÁSCARA SIMPLES DE TELEFONE
// ========================================

const campoTelefone = document.getElementById("telefone");

campoTelefone.addEventListener("input", () => {
    let numero = campoTelefone.value.replace(/\D/g, "");

    if (numero.length > 11) {
        numero = numero.slice(0, 11);
    }

    if (numero.length > 10) {
        numero = numero.replace(
            /^(\d{2})(\d{5})(\d{4})$/,
            "($1) $2-$3"
        );
    } else if (numero.length > 6) {
        numero = numero.replace(
            /^(\d{2})(\d{4})(\d{0,4})$/,
            (_, ddd, inicio, final) =>
                `(${ddd}) ${inicio}-${final}`
        );
    } else if (numero.length > 2) {
        numero = numero.replace(
            /^(\d{2})(\d+)/,
            "($1) $2"
        );
    }

    campoTelefone.value = numero;
});


// ========================================
// ANO AUTOMÁTICO DO RODAPÉ
// ========================================

document.getElementById("current-year").textContent =
    new Date().getFullYear();
