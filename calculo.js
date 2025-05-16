// calculo.js

/**
 * Função para validar se uma nota é válida (número entre 0 e 10)
 * @param {string|number} nota - Valor da nota inserido pelo usuário
 * @returns {boolean} true se for válida, false caso contrário
 */
function validarNota(nota) {
    if (nota === null || nota === undefined) return false;

    const valor = typeof nota === "string" ? parseFloat(nota) : nota;

    return typeof valor === "number" && !isNaN(valor) && valor >= 0 && valor <= 10;
}

/**
 * Função para calcular a média de duas notas
 * @param {number} nota1 - Primeira nota do aluno
 * @param {number} nota2 - Segunda nota do aluno
 * @returns {number|null} Média calculada ou null em caso de erro
 */
function calcularMedia(nota1, nota2) {
    if (!validarNota(nota1) || !validarNota(nota2)) return null;

    return (parseFloat(nota1) + parseFloat(nota2)) / 2;
}

/**
 * Função para determinar a situação do aluno com base na média
 * @param {number} media - Média calculada
 * @returns {string} Situação do aluno: Aprovado, Recuperação ou Reprovado
 */
function determinarSituacao(media) {
    if (media < 5) return "Reprovado";
    if (media < 7) return "Recuperação";
    return "Aprovado";
}

/**
 * Lógica principal que escuta o envio do formulário e atualiza o DOM
 */
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const resultDiv = document.createElement("div");

    // Estilizando a div de resultados
    resultDiv.id = "resultado";
    resultDiv.style.marginTop = "2rem";
    resultDiv.style.padding = "1rem";
    resultDiv.style.borderRadius = "8px";
    resultDiv.style.fontSize = "1.1rem";
    resultDiv.style.textAlign = "center";
    resultDiv.style.maxWidth = "500px";
    resultDiv.style.marginLeft = "auto";
    resultDiv.style.marginRight = "auto";

    // Adicionando a div de resultados após o formulário
    form.parentNode.appendChild(resultDiv);

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Pegando os valores dos campos
        const nome = document.getElementById("nome").value.trim();
        const nota1 = document.getElementById("nota1").value;
        const nota2 = document.getElementById("nota2").value;

        // Validação das notas
        if (!validarNota(nota1) || !validarNota(nota2)) {
            exibirErro("As notas devem estar entre 0 e 10.");
            return;
        }

        const media = calcularMedia(nota1, nota2);

        if (media === null) {
            exibirErro("Por favor, insira valores numéricos válidos para as notas.");
            return;
        }

        const situacao = determinarSituacao(media);

        // Exibir resultado
        resultDiv.style.color = "#333";
        if (situacao === "Aprovado") {
            resultDiv.style.backgroundColor = "#C8E6C9"; // Verde claro
        } else if (situacao === "Recuperação") {
            resultDiv.style.backgroundColor = "#FFE082"; // Amarelo claro
        } else {
            resultDiv.style.backgroundColor = "#F8B8B8"; // Vermelho claro
        }

        resultDiv.innerHTML = `
            <strong>Aluno:</strong> ${nome}<br>
            <strong>Média:</strong> ${media.toFixed(1)}<br>
            <strong>Situação:</strong> ${situacao}
        `;
    });

    /**
     * Função auxiliar para exibir mensagens de erro
     * @param {string} mensagem - Mensagem a ser exibida
     */
    function exibirErro(mensagem) {
        resultDiv.style.backgroundColor = "#FFCCBC"; // Laranja claro
        resultDiv.style.color = "#D32F2F";
        resultDiv.textContent = mensagem;
    }
});

// Exportar funções para uso nos testes
module.exports = {
    validarNota,
    calcularMedia,
    determinarSituacao
};