const zonaJuego = document.getElementById("zonaJuego");
const mensajeElement = document.getElementById("mensaje");

class Pelota{
    x;
    dx = -10;
    y;
    dy = -10;
    ancho = 15;
    movimiento;

    constructor(){
        this.element = document.createElement("div");
        this.element.classList = "pelota";
        zonaJuego.appendChild(this.element);
        this.resetPosicion();
        mensajeElement.classList.toggle("ocultarMensaje", false);//mensaje de inicar visible
    }
    resetPosicion(){
        this.x = document.body.clientWidth/2;
        this.element.style.left = this.x+"px";
        this.y = document.body.clientHeight/2;
        this.element.style.top = this.y+"px";
    }
    mover(){
        if(!this.movimiento){
            mensajeElement.classList.toggle("ocultarMensaje", true );
            this.movimiento = setInterval(()=>{
                //Movimiento Horizontal
                this.x += this.dx;

                //Choque de pelota con paletas
                    //paleta Jugador1
                    if(this.x < 5+jugador1.ancho &&  //|| this.x > document.body.clientWidth - this.ancho*2.5){//limites
                        this.y + this.ancho > jugador1.y &&
                        this.y + this.ancho < jugador1.y + jugador1.alto
                    ){
                        this.dx = this.dx*-1; //cambia direccion
                    }

                    //paleta Jugador2
                    if(this.x + this.ancho*2.5 > document.body.clientWidth - jugador2.ancho &&  //|| this.x > document.body.clientWidth - this.ancho*2.5){//limites
                        this.y + this.ancho > jugador2.y &&
                        this.y + this.ancho < jugador2.y + jugador2.alto
                    ){
                        this.dx = this.dx*-1; //cambia direccion
                    }

                //meter punto
                if(this.x < 5  || this.x > document.body.clientWidth - this.ancho*2.5){
                tablero.sumarPunto(this.x<100?2:1)
                mensajeElement.classList.textContent = 'Presiona "Espacio" para continuar';
                console.log(mensajeElement.classList.textContent);
                mensajeElement.classList.toggle("ocultarMensaje",false); //muestre mensaje al anotar punto
                //this.eliminar();
                }
                this.element.style.left = this.x+"px";

                //Movimiento vertical
                this.y += this.dy;
                if(this.y < 5  || this.y > document.body.clientHeight - this.ancho*2.5){//limites
                    this.dy = this.dy*-1; //cambia direccion
                }
                this.element.style.top = this.y+"px";
            },20);
        }
    }
    eliminar(){
        clearInterval(this.movimiento);
        zonaJuego.removeChild(this.element);
        pelota = undefined;
    }
} 

class Paleta{
    element;
    y=0;
    movimiento; //guarda el setInterval para poder intervenirlo.
    velocidad = 8;
    alto = 200; //altura de la paleta (200) que se le da enel css
    ancho = 20;

    constructor(){
        this.element = document.createElement("div");
        this.element.classList = "paleta";
        zonaJuego.appendChild(this.element);
        this.resetPosicion();
    }
    subir(){
        if(!this.movimiento){
            this.movimiento = setInterval(()=>{
            this.y -= this.velocidad;
                if(this.y<0){ //limite superior
                    this.y = 0;
                    this.freezer();
                }
                this.element.style.top = this.y+"px";
            }, 20)
        }
    }
    bajar(){
        if(!this.movimiento){
            this.movimiento = setInterval(()=>{
                this.y += this.velocidad;
                const limite = document.body.clientHeight-this.alto;
                if(this.y > limite){ //Limite inferior
                    this.y = limite;
                    this.freezer();
                }
                this.element.style.top = this.y+"px";
            }, 20)
        }
    }
    freezer(){ //Congela el movimiento
        clearInterval(this.movimiento);
        this.movimiento = undefined; //reinicia para evitar recargar mov
    }
    resetPosicion(){
        this.y = document.body.clientHeight/2 - this.alto/2;
        this.element.style.top = this.y+"px";
    }
   
}

class Tablero{
    score1 = 0;
    score2 = 0;

    constructor(){
        this.element = document.createElement("div");
        this.element.id = "tablero";
        zonaJuego.appendChild(this.element);
        this.actualizarTablero();
    }

    actualizarTablero(){
        this.element.textContent = this.score1+" - "+this.score2;
    }
    sumarPunto(jugador){
        if(jugador === 1)
            this.score1 ++;
        else
            this.score2++;
        
        this.actualizarTablero();
        pelota.eliminar();
        jugador1.resetPosicion();
        jugador2.resetPosicion();
        console.log(mensajeElement);
        if(!pelota)
        pelota = new Pelota();
    }
}

document.addEventListener("keydown",(e)=>{
    console.log(e);
    switch(e.key){
        case "w":
            jugador1.subir();
            break;
        case "s":
            jugador1.bajar();
            break;
        case "ArrowUp":
            jugador2.subir();
            break;
        case "ArrowDown":
            jugador2.bajar();
            break;
        case " ":
            pelota.mover();
            break;
    }
})

document.addEventListener("keyup",(e)=>{
    console.log(e);
    switch(e.key){
        case "w":
        case "s":
            jugador1.freezer();
            break;
        case "ArrowUp":
        case "ArrowDown":
            jugador2.freezer();
            break;
    }
})

const jugador1 = new Paleta();
const jugador2 = new Paleta();
let pelota = new Pelota();
    const audio = new Audio("https://manzdev.github.io/codevember2017/assets/eye-tiger.mp3");
    audio.loop = true;
    //audio.play();
    //pelota.mover();
const tablero = new Tablero();

/*jugador1.bajar();

setTimeout(function(){
    //jugador1.freezer();
}, 2000);

setTimeout(function(){
    jugador1.subir();
}, 2000);

setTimeout(function(){
    jugador2.bajar();

    setTimeout(function(){
        //jugador1.freezer();
    }, 2000);

    setTimeout(function(){
        jugador2.subir();
    }, 2000);
},4000);*/

