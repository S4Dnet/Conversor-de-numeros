// Inputs do form
const user_input = document.getElementById("numero_entrada");
const user_select_de = document.getElementById("conversor_de");
const user_select_para = document.getElementById("conversor_para");
const cta = document.getElementById("converter")

//Resultado
const resultado_container = document.getElementById("resultado")
const original_number = document.getElementById("numero_original")
const original_base = document.getElementById("base_origem")
const numero_convertido = document.getElementById("numero_convertido")
const base_escolhida = document.getElementById("base_destino")


//Regra de se o usuário escolher uma opção em um select input, ele não pode escolher a mesma opção no outro
function atualizar_select_para() {
    let valor_selecionado = user_select_de.value;

    for (let option of user_select_para.options) {
        if (option.value === valor_selecionado) {
            option.disabled = true;
            option.hidden = true;
        } else {
            option.disabled = false;
            option.hidden = false;
        }
    }

    if (user_select_para.value === valor_selecionado) {
        for (let option of user_select_para.options) {
            if (!option.disabled) {
                user_select_para.value = option.value;
                break;
            }
        }
    }
}

atualizar_select_para();
user_select_de.addEventListener("change", atualizar_select_para);

// Função principal de conversão aplicada ao botão converter
// É aqui que chama as outras funções, através de um switch case, com base na escolha do usuário
function convert(){
    let valor = user_input.value.trim()
    if (valor === ""){
        return window.alert("Digite um número válido para ser convertido!")
    }

    base_combinada = user_select_de.value + "_" + user_select_para.value

    switch (base_combinada) {
        //Decimal
        case "decimal_binario":
            decimal_binario();
            break;
        case "decimal_octal":
            decimal_octal();
            break;
        case "decimal_hexadecimal":
            decimal_hexadecimal();
            break;
        //Binario
        case "binario_decimal":
            binario_decimal();
            break;
        case "binario_octal":
            binario_octal();
            break;
        case "binario_hexadecimal":
            binario_hexadecimal();
            break;
        //Octal
        case "octal_decimal":
            octal_decimal();
            break;
        case "octal_binario":
            octal_binario();
            break;
        case "octal_hexadecimal":
            octal_hexadecimal();
            break;
        //Hexadecimal
        case "hexadecimal_decimal":
            hexadecimal_decimal();
            break;
        case "hexadecimal_binario":
            hexadecimal_binario();
            break;
        case "hexadecimal_octal":
            hexadecimal_octal();
            break;
    }
}



// Funções de conversão

// DECIMAL PARA BINÁRIO
function decimal_binario(){
    let quociente = parseInt(user_input.value)
    let restos = [];
    original_number.textContent = user_input.value
    original_base.textContent = user_select_de.value

    while (quociente > 0){
        let resto = quociente % 2 // 0 - 1
        quociente = Math.floor(quociente / 2) // 5 - 2
        restos.push(resto) // [0, 1]
    }

    let resultado = restos.reverse().join("");

    numero_convertido.textContent = resultado;
    base_escolhida.textContent = user_select_para.value
    resultado_container.style.display = "block"
}

// DECIMAL PARA OCTAL
function decimal_octal(){
    let quociente = parseInt(user_input.value)
    let restos = [];
    original_number.textContent = user_input.value
    original_base.textContent = user_select_de.value

    while (quociente > 0){
        let resto = quociente % 8
        quociente = Math.floor(quociente / 8) 
        restos.push(resto)
    }

    let resultado = restos.reverse().join("");

    numero_convertido.textContent = resultado;
    base_escolhida.textContent = user_select_para.value
    resultado_container.style.display = "block"
}

// DECIMAL PARA HEXADECIMAL;
function decimal_hexadecimal(){
    let quociente = parseInt(user_input.value)
    let hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    let restos = [];
    original_number.textContent = user_input.value
    original_base.textContent = user_select_de.value

    while (quociente > 0){
        let resto = quociente % 16 
        quociente = Math.floor(quociente / 16) 
        restos.push(hex[resto])
    }

    let resultado = restos.reverse().join("");


    numero_convertido.textContent = resultado;
    base_escolhida.textContent = user_select_para.value
    resultado_container.style.display = "block"
}


// BINÁRIO PARA DECIMAL
function binario_decimal(){
    let valor = user_input.value;
    let digitos = valor.split("").reverse();
    let resultado = 0;
    original_number.textContent = user_input.value
    original_base.textContent = user_select_de.value

    for (let i = 0; i < digitos.length; i++){
        resultado += parseInt(digitos[i]) * Math.pow(2,i)
        // 1011 = [1,1,0,1] resultado = 1+2+0+8 = 11 GG
    }

    numero_convertido.textContent = resultado;
    base_escolhida.textContent = user_select_para.value
    resultado_container.style.display = "block"
}

// BINARIO PARA HEXADEXIMAL
// Aqui meu truque foi usar o que ja estava pronto ao meu favor. Primeiro transforma de binário para decimal de decimal para hexadecimal

// Primeiro de binário da decimal
function binario_hexadecimal(){
    let valor = user_input.value;
    let digitos = valor.split("").reverse();
    let resultado_decimal = 0;
    original_number.textContent = user_input.value
    original_base.textContent = user_select_de.value

    for (let i = 0; i < digitos.length; i++){
        resultado_decimal += parseInt(digitos[i]) * Math.pow(2,i)
    }

// Agora de decimal para hexadecimal
    let quociente = resultado_decimal
    let hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    let restos = [];
    original_number.textContent = user_input.value
    original_base.textContent = user_select_de.value

    while (quociente > 0){
        let resto = quociente % 16 
        quociente = Math.floor(quociente / 16) 
        restos.push(hex[resto])
    }

    let resultado = restos.reverse().join("");

    numero_convertido.textContent = resultado;
    base_escolhida.textContent = user_select_para.value
    resultado_container.style.display = "block"
}

// BINARIO PARA OCTAL
// MESMA LÓGICA DE MANDAR PRO DECIMAL DEPOIS OCTAL

function binario_octal(){
    let valor = user_input.value;
    let digitos = valor.split("").reverse();
    let resultado_decimal = 0;
    original_number.textContent = user_input.value
    original_base.textContent = user_select_de.value

    for (let i = 0; i < digitos.length; i++){
        resultado_decimal += parseInt(digitos[i]) * Math.pow(2,i)
    }

    let quociente = resultado_decimal
    let restos = [];
    original_number.textContent = user_input.value
    original_base.textContent = user_select_de.value

    while (quociente > 0){
        let resto = quociente % 8
        quociente = Math.floor(quociente / 8) 
        restos.push(resto)
    }

    let resultado = restos.reverse().join("");

    numero_convertido.textContent = resultado;
    base_escolhida.textContent = user_select_para.value
    resultado_container.style.display = "block"
}

// OCTAL PARA DECIMAL
function octal_decimal(){
    let valor = user_input.value;
    let digitos = valor.split("").reverse();
    let resultado = 0;
    original_number.textContent = user_input.value
    original_base.textContent = user_select_de.value

    for (let i = 0; i < digitos.length; i++){
        resultado += parseInt(digitos[i]) * Math.pow(8,i)

    }

    numero_convertido.textContent = resultado;
    base_escolhida.textContent = user_select_para.value
    resultado_container.style.display = "block"
}

// OCTAL PARA BINARIO
// Então decidi que vai ser assim pra todos para economizar tempo. Vai ser tudo, Octal e Hexadecimal depois, transformado em decimal e depois para a base escolhida.

function octal_binario(){
    let valor = user_input.value;
    let digitos = valor.split("").reverse();
    let resultado_decimal = 0;
    original_number.textContent = user_input.value
    original_base.textContent = user_select_de.value

    for (let i = 0; i < digitos.length; i++){
        resultado_decimal += parseInt(digitos[i]) * Math.pow(8,i)
    }

    let quociente = resultado_decimal
    let restos = [];
    original_number.textContent = user_input.value
    original_base.textContent = user_select_de.value

    while (quociente > 0){
        let resto = quociente % 2 // 0 - 1
        quociente = Math.floor(quociente / 2) // 5 - 2
        restos.push(resto) // [0, 1]
    }

    let resultado = restos.reverse().join("");

    numero_convertido.textContent = resultado;
    base_escolhida.textContent = user_select_para.value
    resultado_container.style.display = "block"
}

// OCTAL PARA HEXADECIMAL
function octal_hexadecimal(){
    let valor = user_input.value;
    let digitos = valor.split("").reverse();
    let resultado_decimal = 0;
    original_number.textContent = user_input.value
    original_base.textContent = user_select_de.value

    for (let i = 0; i < digitos.length; i++){
        resultado_decimal += parseInt(digitos[i]) * Math.pow(8,i)
    }

    let quociente = resultado_decimal
    let hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    let restos = [];
    original_number.textContent = user_input.value
    original_base.textContent = user_select_de.value

    while (quociente > 0){
        let resto = quociente % 16 
        quociente = Math.floor(quociente / 16) 
        restos.push(hex[resto])
    }

    let resultado = restos.reverse().join("");


    numero_convertido.textContent = resultado;
    base_escolhida.textContent = user_select_para.value
    resultado_container.style.display = "block"
}

//HEXADECIMAL PARA DECIMAL
function hexadecimal_decimal(){
    let valor = user_input.value;
    let digitos = valor.split("").reverse();
    let resultado = 0;
    let hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    original_number.textContent = user_input.value
    original_base.textContent = user_select_de.value

    for (let i = 0; i < digitos.length; i++){
        let valor_do_digito = hex.indexOf(digitos[i].toUpperCase());
        resultado += valor_do_digito * Math.pow(16, i)
    }

    numero_convertido.textContent = resultado;
    base_escolhida.textContent = user_select_para.value
    resultado_container.style.display = "block"
}

//HEXADECIMAL PARA BINARIO
function hexadecimal_binario(){
    let valor = user_input.value;
    let digitos = valor.split("").reverse();
    let resultado_decimal = 0;
    let hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    original_number.textContent = user_input.value
    original_base.textContent = user_select_de.value

    for (let i = 0; i < digitos.length; i++){
        let valor_do_digito = hex.indexOf(digitos[i].toUpperCase());
        resultado_decimal += valor_do_digito * Math.pow(16, i)
    }

    let quociente = resultado_decimal
    let restos = [];
    original_number.textContent = user_input.value
    original_base.textContent = user_select_de.value

    while (quociente > 0){
        let resto = quociente % 2 // 0 - 1
        quociente = Math.floor(quociente / 2) // 5 - 2
        restos.push(resto) // [0, 1]
    }

    let resultado = restos.reverse().join("");

    numero_convertido.textContent = resultado;
    base_escolhida.textContent = user_select_para.value
    resultado_container.style.display = "block"
}

//HEXADECIMAL PARA OCTAL
function hexadecimal_octal(){
    let valor = user_input.value;
    let digitos = valor.split("").reverse();
    let resultado_decimal = 0;
    let hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    original_number.textContent = user_input.value
    original_base.textContent = user_select_de.value

    for (let i = 0; i < digitos.length; i++){
        let valor_do_digito = hex.indexOf(digitos[i].toUpperCase());
        resultado_decimal += valor_do_digito * Math.pow(16, i)
    }

    let quociente = resultado_decimal
    let restos = [];
    original_number.textContent = user_input.value
    original_base.textContent = user_select_de.value

    while (quociente > 0){
        let resto = quociente % 8
        quociente = Math.floor(quociente / 8) 
        restos.push(resto)
    }

    let resultado = restos.reverse().join("");

    numero_convertido.textContent = resultado;
    base_escolhida.textContent = user_select_para.value
    resultado_container.style.display = "block"
}
