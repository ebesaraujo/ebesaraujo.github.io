window.parking = new ParkController("P", 94, new Array(1,2,3,10));

/*
* Parâmetro 1 - array com as vagas ocupadas
* Parâmetro 2 - array com as vagas livres
*/
window.parking.refreshParking(new Array(1,2), new Array(3,10));