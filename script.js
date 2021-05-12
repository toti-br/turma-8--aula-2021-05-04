document.addEventListener('DOMContentLoaded', main)


function main() {

    for (let i = 0; i < 2; i ++) {
        fetch('https://thatcopy.pw/catapi/rest/')
        .then(tratarResposta)
        .then(tratarDados)
        .catch(tratarErro)    
    }
    

    function tratarResposta(resp) {
        if (resp.ok) {
            return resp.json()
        }
        throw new Error("O servidor respondeu com erro!")
    }

    function tratarDados(dados) {
        console.log(dados)
        let container = document.querySelector('#imagens')
        let img = criarImagem(dados.webpurl)
        let p = criarParagrafo('lorem ipsum')

        container.append(img, p)
    }

    function tratarErro(error) {
        alert(error)
    }
}

function criarParagrafo(conteudo) {
    let p = document.createElement('p')
    p.textContent = conteudo

    return p
}

function criarImagem(src) {
    let img = document.createElement('img')
    img.src = src
    img.style.width = '300px'

    return img
}