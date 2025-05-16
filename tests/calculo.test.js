const { validarNota, calcularMedia, determinarSituacao } = require('../calculo');

describe("Validação de Notas", () => {
    test("deve aceitar notas válidas entre 0 e 10", () => {
        expect(validarNota(0)).toBe(true);
        expect(validarNota(5)).toBe(true);
        expect(validarNota(10)).toBe(true);
    });

    test("deve rejeitar notas fora do intervalo", () => {
        expect(validarNota(-1)).toBe(false);
        expect(validarNota(11)).toBe(false);
    });

    test("deve rejeitar valores não numéricos", () => {
        expect(validarNota("abc")).toBe(false);
        expect(validarNota(NaN)).toBe(false);
        expect(validarNota(null)).toBe(false);
        expect(validarNota(undefined)).toBe(false);
    });
});

describe("Cálculo da Média", () => {
    test("deve calcular corretamente a média", () => {
        expect(calcularMedia(7, 8)).toBe(7.5);
        expect(calcularMedia(6, 6)).toBe(6);
        expect(calcularMedia(9, 10)).toBe(9.5);
    });

    test("deve retornar null se alguma nota for inválida", () => {
        expect(calcularMedia("abc", 5)).toBeNull();
        expect(calcularMedia(11, 5)).toBeNull();
        expect(calcularMedia(5, -1)).toBeNull();
    });
});

describe("Determinação da Situação", () => {
    test("deve retornar 'Reprovado' se a média for menor que 5", () => {
        expect(determinarSituacao(4.9)).toBe("Reprovado");
    });

    test("deve retornar 'Recuperação' se a média estiver entre 5 e 7", () => {
        expect(determinarSituacao(5)).toBe("Recuperação");
        expect(determinarSituacao(6.9)).toBe("Recuperação");
    });

    test("deve retornar 'Aprovado' se a média for 7 ou mais", () => {
        expect(determinarSituacao(7)).toBe("Aprovado");
        expect(determinarSituacao(10)).toBe("Aprovado");
    });
});