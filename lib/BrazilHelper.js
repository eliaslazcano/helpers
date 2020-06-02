export default class BrazilHelper {
    static validarCpf(cpf) {
        let strCPF = cpf;
        if (typeof strCPF == 'number') strCPF = strCPF.toString();
        strCPF = strCPF.replace(/\D+/g, ''); //remove caracteres 'não-númericos'
        if (strCPF.length !== 11) return false;
        let Soma = 0;
        let Resto;
        let i;
        if (strCPF === "00000000000") return false;

        for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11))  Resto = 0;
        if (Resto !== parseInt(strCPF.substring(9, 10)) ) return false;

        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11))  Resto = 0;
        return Resto === parseInt(strCPF.substring(10, 11));
    }
    static validarCnpj(cnpj) {
        if (typeof cnpj == 'number') cnpj = cnpj.toString();
        cnpj = cnpj.replace(/\D+/g, ''); //remove caracteres 'não-númericos'
        if (cnpj.length !== 14) return false;

        // Elimina CNPJs invalidos conhecidos
        if (cnpj === "00000000000000" ||
            cnpj === "11111111111111" ||
            cnpj === "22222222222222" ||
            cnpj === "33333333333333" ||
            cnpj === "44444444444444" ||
            cnpj === "55555555555555" ||
            cnpj === "66666666666666" ||
            cnpj === "77777777777777" ||
            cnpj === "88888888888888" ||
            cnpj === "99999999999999")
            return false;

        // Valida DVs
        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0,tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        let i;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado.toString() !== digitos.charAt(0)) return false;

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        return resultado.toString() === digitos.charAt(1);
    }
    static formatarCpf(cpf) {
        return cpf.substr(0, 3) + '.'
          + cpf.substr(3, 3) + '.'
          + cpf.substr(6, 3) + '-'
          + cpf.substr(9, 2);
    }
}