let resultados

document.addEventListener('DOMContentLoaded', function () {


    const form = document.querySelector('form')
    form.addEventListener('submit', pesquisaEExibicao)
    const areaResultados = document.getElementById('resultados')

    async function pesquisaEExibicao(e) {
        console.log(e)
        e.preventDefault()
        const dadosForm = new FormData(form)
        const termo = encodeURIComponent(dadosForm.get('pesquisa'))

        resultados = new Resultados(termo, areaResultados)
        resultados.termo
        resultados.areaResultados
        await resultados.requisicao()
        resultados.exibirResultados()
    }
    
})


class Resultados {
    constructor(termo, areaResultados) {
        this.URL_PESQUISA = 'http://openlibrary.org/search.json'
        this.URL_CAPAS = 'http://covers.openlibrary.org/b/ID/'

        this.termo = termo
        this.total = 0
        this.areaResultados = areaResultados
        this.listagemResultados = []
    }

    async requisicao(page = 1) {
        const resp = await fetch(this.URL_PESQUISA + '?q=' + this.termo + '&page=' + page) // GET 
        const dados = await tratarResposta(resp)
        await this._tratarDados(dados)

        function tratarResposta(resp) {
            if (resp.ok) {
                return resp.json()
            }
            throw new Error("O servidor respondeu com erro!")
        }
    }

    _tratarDados(dados) {
        this.total = dados.numFound
        this.listagemResultados = dados.docs
    }

    exibirResultados(quantidade = 10, offset = 0 ) {
        const listagem = this.listagemResultados.slice(offset, offset + quantidade)
        this.areaResultados.innerHTML = ""
        
        listagem.forEach(resultado => {
        const urlCapa = this._obterURLCapa(resultado)
        const card = criarCardLivro(resultado.title, urlCapa)
        this.areaResultados.append(card)
        })
    }

    _obterURLCapa(resultado) {
        const tamanho = 'M' // S, M, L
        return `${this.URL_CAPAS}${resultado.cover_i}-${tamanho}.jpg`
    }


}


function criarCardLivro(titulo, capa) {
    const card = document.createElement('div')
    card.classList.add('card')
    card.style.width = '10rem'

    const img = document.createElement('img')
    img.src = capa;
    img.classList.add('card-img-top')

    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')

    const tituloEl = document.createElement('h3')
    tituloEl.textContent = titulo
    tituloEl.classList.add('card-title')

    cardBody.appendChild(tituloEl)
    card.append(img, cardBody)
    console.log(card)
    return card
}