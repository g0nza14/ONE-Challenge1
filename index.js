
/**********  REFERENCIAS **********/
const btnEncriptar = document.querySelector('.btn-encriptar');
const btnDesencriptar = document.querySelector('.btn-desencriptar');
const btnCopiar = document.querySelector('.btn-copy');
const textArea = document.querySelector('.text-area');
let text;
let textResult;

const caractEsp = /^[a-z\s]+$/i; //expresión regular para válidar carácteres especiales


/**********  FUNCIONES **********/
const dynamicRegExp = (msj, flag) => {
    return new RegExp(`${msj}`, flag);
}
const copyToClipboard = () => {
    text = document.querySelector('.text-resultado');
    text.select();
    document.execCommand('copy');
    text.innerText = 'Texto copiado con éxito';
    setTimeout(() => {
        text.innerText = '';
    }, 1500);
    
}
const encriptar = (text) => {
    let newMsj = '';
    text = text.toLowerCase();
    for(let i = 0; i < text.length; i++){
        let caracter = text.charAt(i);
        switch(caracter){
            case 'a': 
                caracter = 'ai';
                break;
            case 'e':
                caracter = 'enter';
                break;
            case 'i':
                caracter = 'imes';
                break;
            case 'o':
                caracter = 'ober';
                break;
            case 'u':
                caracter = 'ufat';
                break;
            default:
                caracter = caracter;
        }
        newMsj += caracter;
    }
    return newMsj;
}
const desencriptar = (text) => {
    const diccionario = { ai: 'a', enter: 'e', imes: 'i', ober: 'o', ufat: 'u'};
    let msj = text;
    for( const reemplazo in diccionario ){
        msj = msj.replace(dynamicRegExp(reemplazo, 'g'), diccionario[reemplazo]);
    }
    return msj;

}
const mostrarResultado = (flag) => {
    //encapsulo la lógica de desencriptar y encriptar en esta función. El cual dependiendo del flag, encripta el texto 
    // o lo desencripta, mandando a llamar la función correspondiente. 
    text = document.querySelector('.text-area').value;
    if( !text || !(text).match(caractEsp)){
        alert('Debes ingresar un texto. El mismo no debe contener números, tildes ni carácteres especiales');
    }else{
        textResult = document.querySelector('.text-resultado');
        textResult.classList.remove('d-none');
        btnCopiar.classList.remove('d-none');
        (document.querySelector('.content-image')).classList.add('d-none'); //oculto la foto con el texto
        textResult.innerText = flag==='e'?encriptar(text):desencriptar(text);        
    }
}

/**********  BOTONES Y EVENTOS **********/
btnEncriptar.addEventListener('click', () => { 
    mostrarResultado('e');

}); 
btnDesencriptar.addEventListener('click', () => {
    mostrarResultado('d');
    
}) 
btnCopiar.addEventListener('click', () => {
    copyToClipboard();
});

textArea.addEventListener('input', (evt) => {
    if(evt.target.value === ''){
        textResult.classList.add('d-none');
        btnCopiar.classList.add('d-none');
        (document.querySelector('.content-image')).classList.remove('d-none');
    }
})
