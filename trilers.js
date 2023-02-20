// Creo la variable nomUsuari
var nomUsuari;

function verificarNumero(variableNumerica){
	if (isNaN(variableNumerica)) {alert("Has d'introduir un numero")};
	if(variableNumerica == "") {alert("No s'ha introduit res")};
}

// Funció que posi un marge segons que toqui la dificultat 
function entreMarges(variableNumerica, min, max){
	if(variableNumerica<min || variableNumerica>max){alert("El numero ha de ser entre " + min + " i " + max)}
}

// Faig un bucle demanant el nom del usuari i la dificultat
do{
	nomUsuari = prompt("Entra el teu nom:");
	if(nomUsuari == "") {alert("-> No s'ha entrat res!")};
} while(nomUsuari == "");
var dificultat;
do{
	dificultat = prompt("Entra la dificultat (0 - facil | 1 - mitjana | 2 - dificil)");
	verificarNumero(dificultat);
	entreMarges(dificultat,0,2);
}while((isNaN(dificultat)) || (dificultat == "") || (dificultat<0) || (dificultat>2));
if(dificultat == null){
	location.reload();
}
dificultat = Number(dificultat);

// Saldo Total
var saldoTotal = 500;

// Variables
var numCubilet;
var quantMulti;

// Faig un switch si l'usuari escull segons la dificultat i que sortin les cubilets i multiplin segon que toqui
switch (dificultat){
	case 0:
		numCubilet = 3;
		quantMulti = 2;
		break;
	case 1:
		numCubilet = 5;
		quantMultipli = 5;
		break;
	case 2:
		numCubilet = 7;
		quantMultipli = 10;
		break;
}

// Sumem en la pàgina HTML la quantitat de cubilets seleccionat
const board = document.querySelector('#board');
for (var contador = 1; contador <= numCubilet ; contador++) {
	var cubilet = document.createElement("div");
	cubilet.id = contador;
	cubilet.className = "beaker";
	cubilet.textContent = contador;
	board.insertAdjacentElement('beforeend',cubilet);
}

// Fem que al clikar el botó surti un dialeg i comenci el joc
const boton = document.querySelector("button");
var dinersApostats;
const accion = function(){
	// Demanem l'usuari els dinres que vulgui apostar i que escolli els cubilets
	do{
		dinersApostats = prompt("Entra els diners que vols apostar");
		verificarNumero(dinersApostats);
	}while((isNaN(dinersApostats)) || (dinersApostats == ""));
	dinersApostats = Number(dinersApostats);

	// Restem els diners apostats al Saldo en cas no acerti l'usuari
	saldoTotal -= dinersApostats;

	do{
		cubiletEscollit = prompt("Entra el cubilet on creus que esta la boleta");
		verificarNumero(cubiletEscollit);
		entreMarges(cubiletEscollit,1,numCubilet);

	}while((isNaN(cubiletEscollit)) || (cubiletEscollit == "") || (cubiletEscollit<1) || (cubiletEscollit>numCubilet));
	cubiletEscollit = Number(cubiletEscollit);

	// Assignem lla bola aleatori en el cubilet
	let posicioBola = Math.floor(Math.random() * (numCubilet - 1 + 1)) + 1;

	// Comprovem si el cubilet escollit es on esta la bola o no
	var textFinal = "La boleta estava al cubilet " + posicioBola + " i tu has apostat " + dinersApostats + "€ al " + cubiletEscollit + "\n";
	if (posicioBola == cubiletEscollit) {
		// Quan l'usuari encerti els diners multipliquen
		let dinersGuanyat = dinersApostats * quantMulti;
		saldoTotal += dinersGuanyat;

        // Els misstages
        // Si l'usuari encerta...
		textFinal += "Felicitats! Has guanyat " + dinersGuanyat + "€!! \n";
	}
	else{
        // Si no encerta surti el missatge...
		textFinal += "Quina pena! No has encertat! \n";
	}
    // Mostro el Saldo total 
	textFinal += "El teu saldo actual es de " + saldoTotal + "€!! \n";

    // Pregunto si l'usuari si vol torna a jugar el joc
	textFinal += "Vols tornar a jugar? \n"

	//Mostro els misatges finals
	var continuarJugant = confirm(textFinal);

    // Si l'usuari desprès de jugar cancela el joc doncs torni a demanar el nom...
	if (!continuarJugant) {
		location.reload();
	}
}
boton.addEventListener("click", accion);