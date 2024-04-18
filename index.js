const zonaJuego = document.getElementById("zonaJuego");

class Paleta{
    element;
    y=0;
    movimiento; //guarda el setInterval para poder intervenirlo.
    velocidad = 8;
    alto = 200; //altura de la paleta (200) que se le da enel css

    constructor(){
        this.element = document.createElement("div");
        this.element.classList = "paleta";
        zonaJuego.appendChild(this.element)
    }
    subir(){
        this.movimiento = setInterval(()=>{
            this.y -= this.velocidad;
            if(this.y<0){
                this.freezer();//limite superior
            }
            this.element.style.top = this.y+"px";
        }, 20)
    }
    bajar(){
        this.movimiento = setInterval(()=>{
            this.y += this.velocidad;
            const limite = document.body.clientHeight-this.alto;
            if(this.y > limite){
                this.freezer();
            }
            this.element.style.top = this.y+"px";
        }, 20)
    }
    freezer(){
        clearInterval(this.movimiento)
    }
}

const jugador1 = new Paleta();
const jugador2 = new Paleta();
jugador1.bajar();

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
},4000);

