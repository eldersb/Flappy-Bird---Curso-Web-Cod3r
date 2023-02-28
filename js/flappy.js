function novoElemento(tagName, className){
    const elem = document.createElement(tagName)
    elem.className = className
    return elem
}

function Barreira(reversa = false) { //Função Construtora
    this.elemento = novoElemento('div', 'barreira') //Atributo "elemento" representando o dom, para adicionar algo no dom, é importante lembrar desse elemento

    const borda = novoElemento('div', 'borda')
    const corpo = novoElemento('div', 'corpo')
    this.elemento.appendChild(reversa ? corpo : borda)
    this.elemento.appendChild(reversa ? borda : corpo)

    this.setAltura = altura => corpo.style.height = `${altura}px` //Altura da barreira 
}

//Teste 1
// const b = new Barreira(true)
// b.setAltura(300)
// document.querySelector('[wm-flappy]').appendChild(b.elemento)

function ParDeBarreiras(altura, abertura, x) { 
    this.elemento = novoElemento('div', 'par-de-barreiras')

    this.superior = new Barreira(true) //Barreira reversa
    this.inferior = new Barreira(false) 

    this.elemento.appendChild(this.superior.elemento)
    this.elemento.appendChild(this.inferior.elemento) 

    this.sortearAbertura = () => { //Sortear com uma abertura fixa 
        const alturaSuperior = Math.random() * (altura - abertura) // Calcula a altura da superior
        const alturaInferior = altura - abertura - alturaSuperior
        this.superior.setAltura(alturaSuperior)
        this.inferior.setAltura(alturaInferior)
    }

    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setX = x => this.elemento.style.left = `${x}px`
    this.getLargura = () => this.elemento.clientWidth

    this.sortearAbertura()
    this.setX(x)
}

//Teste 2 
 // const b = new ParDeBarreiras(700, 200, 800) 
 // document.querySelector('[wm-flappy').appendChild(b.elemento)

function Barreiras(altura, largura, abertura, espaco, notificarPonto){ // Controle de múltiplas barreiras
    this.pares = [ // Essas barreiras vão ficar em looping
        new ParDeBarreiras(altura, abertura, largura),
        new ParDeBarreiras(altura, abertura, largura + espaco),
        new ParDeBarreiras(altura, abertura, largura + espaco * 2),
        new ParDeBarreiras(altura, abertura, largura + espaco * 3)
    ]

    const deslocamento = 3 // Deslocamento da animação da barreira
    this.animar = () => {
        this.pares.forEach(par => {
            par.setX(par.getX() - deslocamento)

            // quando o elemento sair da área do jogo
            if (par.getX() < -par.getLargura()) {
                par.setX(par.getX() + espaco * this.pares.length)
                par.sortearAbertura()
            }

            const meio = largura / 2
            const cruzouOMeio = par.getX() + deslocamento >= meio
                && par.getX() < meio
                if(cruzouOMeio) notificarPonto()
        })
    }
}

function Passaro(alturaJogo) {
    let voando = false

    this.elemento = novoElemento('img', 'passaro')
    this.elemento.src = 'imgs/passaro.png'

    this.getY = () => parseInt(this.elemento.style.bottom.split('px')[0])
    this.setY = y => this.elemento.style.bottom = `${y}px`

    window.onkeydown = e => voando = true
    window.onkeyup = e => voando = false

    this.animar = () => {
        const novoY = this.getY() + (voando ? 8 : -5)
        const alturaMaxima = alturaJogo - this.elemento.clientHeight

        if (novoY <= 0) {
            this.setY(0)
        } else if (novoY >= alturaMaxima) {
            this.setY(alturaMaxima)
        } else {
            this.setY(novoY)
        }
    }

    this.setY(alturaJogo / 2)
}

const barreiras = new Barreiras(700, 1200, 270, 400)
const passaro = new Passaro(700)
const areaDoJogo = document.querySelector('[wm-flappy]')

areaDoJogo.appendChild(passaro.elemento)
barreiras.pares.forEach(par => areaDoJogo.appendChild(par.elemento))
setInterval(() => {
    barreiras.animar()
    passaro.animar()
}, 20)