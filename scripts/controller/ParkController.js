class ParkController {

    /*
    * pankink - Sigla do estacionamento, deve ser uma letra maiuscula
    *           Deve se a mesma letra usada no html
    * numberSlots - total de vagas do estacionamento
    * slotsGuard - deve ser um array com as vagas que são monitoradas pelo beck-end
    */

    constructor(panking, numberSlots, slotsGuard){

        this.panking = panking;
        this.numberSlots = numberSlots;
        this.slotsGuard = slotsGuard;
        
        this._locale = 'pt-BR';
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._totalVagasEl = document.querySelector("#totalVagas");
        this._vagasMonitoradasEl = document.querySelector("#vagasMonitoradas");
        this._vagasLivresEl = document.querySelector("#vagasLivres");
        this._parkingEl = document.querySelectorAll("#parkingSlots > rect");
        this._currentDate;
        this.initialize();
        this.initParking();
        this.initParkingEvents();

    }

    

    get displayTime(){

        return this._timeEl.innerHTML;

    }

    set displayTime(value){

        return this._timeEl.innerHTML = value;

    }

    get displayDate(){

        return this._dateEl.innerHTML;

    }

    set displayDate(value){

        return this._dateEl.innerHTML = value;

    }

    get currentDate(){

        return new Date();

    }

    set currentDate(value){

        this._currentDate = value;

    }

    set displaytNumberSlots(value){

        this._totalVagasEl.innerHTML = value;

    }

    set displaySlotsGuard(value){

        this._vagasMonitoradasEl.innerHTML = value;

    }

    get vacantSlots(){

        return this._vagasLivresEl.innerHTML;

    }

    set vacantSlots(value){

        this._vagasLivresEl.innerHTML = value;

    }

    initialize(){

        this.setDisplayDateTime()

        setInterval(()=>{

            this.setDisplayDateTime();

        }, 1000);

    }

    initParkingEvents(){

        let buttonEl = document.querySelector("#btn-parkingP");
        let parkingEl = document.querySelector("#parking");

        buttonEl.addEventListener('click', e=> {
            parkingEl.setAttribute("display", "block");
        });

    }

    initParking(){

        const numberSlots = parseInt(this.numberSlots);
        const panking = this.panking;
        let slotsGuard = 0;

        document.querySelector("#parking").setAttribute("display", "none");

        this._parkingEl.forEach(function(elemento){
            //console.log("elemento=", elemento,i);
            elemento.setAttribute("display", "block");

        })

        this.displaytNumberSlots = numberSlots;

        this.slotsGuard.forEach(function(arrayElemento, i) {

            if (arrayElemento > 0 && arrayElemento <= numberSlots) {
                document.getElementById(`p${panking}-e${arrayElemento}`).style.setProperty("fill", "#ebc21d");
                slotsGuard++;
            }
            
        }) 
        
        this.displaySlotsGuard = slotsGuard;
        
    }

    setDisplayDateTime(){

        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

    }

    refreshParking(arrayBusy, arrayVacant){

        const localBusy = arrayBusy;
        const localVacant = arrayVacant;
        const panking = this.panking;
        let vacantSlots = 0;

        localBusy.forEach(function(arrayElemento, i) {

            document.getElementById(`p${panking}-e${arrayElemento}`).style.setProperty("fill", "#eb1d1d");
            
        }) 

        localVacant.forEach(function(arrayElemento, i) {

            document.getElementById(`p${panking}-e${arrayElemento}`).style.setProperty("fill", "#1deb4a");
            vacantSlots++;
            
        })
        this.vacantSlots = vacantSlots;

    }

}