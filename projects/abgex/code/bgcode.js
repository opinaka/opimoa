/**
2019.01.03  Adjonction de code par Bernard Gisin
 **/

var gloDivSel = 0; // pointeur sur le div lorsqu'il est sélectionné
var glnXOffset = 0; // décalage entre le clique souris et la gauche de la fenetre
var glnYOffset = 0; // décalage

function myMouseDown(myEvent, oAppelant, strDivName) {
//====================================================
// Permet de sélectionner un des deux  div  des barèmes, pour le déplacer.
gloDivSel = document.getElementById(strDivName);
oAppelant.style.cursor='move';
glnXOffset = myEvent.pageX - parseInt(gloDivSel.style.left);
glnYOffset = myEvent.pageY - parseInt(gloDivSel.style.top);
// myMouseDown
} 
function myMouseMove(myEvent) {
//=============================
// Permet de déplacer le  div  des barèmes, si un des deux a été sélectionné
// Permet de connaitre le nombre de points et la note correspondante
// en fonction de la position de la souris sur le graphique
//document.nomForm2.nomInfoAide.value = myEvent.pageX + "  " + myEvent.pageY;

if (gloDivSel != 0) {
	gloDivSel.style.left = myEvent.pageX - glnXOffset + "px";
	gloDivSel.style.top  = myEvent.pageY - glnYOffset + "px";
	}
// myMouseMove
}
