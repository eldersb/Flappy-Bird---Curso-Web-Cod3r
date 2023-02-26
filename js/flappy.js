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

function Barreiras(altura, largura, abertura, espaco){ // Controle de múltiplas barreiras

}