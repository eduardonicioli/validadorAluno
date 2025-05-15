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
        const nota1 = parseFloat(document.getElementById("nota1").value);
        const nota2 = parseFloat(document.getElementById("nota2").value);

        // Verificando validade das notas
        if (isNaN(nota1) || isNaN(nota2)) {
            exibirErro("Por favor, insira valores numéricos válidos para as notas.");
            return;
        }

        if (nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10) {
            exibirErro("As notas devem estar entre 0 e 10.");
            return;
        }

        // Cálculo da média
        const media = (nota1 + nota2) / 2;

        // Determinar a situação do aluno
        let situacao = "";
        if (media < 5) {
            situacao = "Reprovado";
            resultDiv.style.backgroundColor = "#F8B8B8"; // Vermelho claro
        } else if (media < 7) {
            situacao = "Recuperação";
            resultDiv.style.backgroundColor = "#FFE082"; // Amarelo claro
        } else {
            situacao = "Aprovado";
            resultDiv.style.backgroundColor = "#C8E6C9"; // Verde claro
        }

        // Exibir resultado
        resultDiv.style.color = "#333";
        resultDiv.innerHTML = `
            <strong>Aluno:</strong> ${nome}<br>
            <strong>Média:</strong> ${media.toFixed(1)}<br>
            <strong>Situação:</strong> ${situacao}
        `;
    });

    function exibirErro(mensagem) {
        resultDiv.style.backgroundColor = "#FFCCBC"; // Laranja claro
        resultDiv.style.color = "#D32F2F";
        resultDiv.textContent = mensagem;
    }
});