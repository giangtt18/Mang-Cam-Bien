function ChuyenMauButtonLed1() {
    ledOn = document.querySelector(".on-led");
    ledOff = document.querySelector(".off-led");
    lightImg = document.querySelector(".lightImg");
    ledOff.classList.remove("bg-info");
    ledOn.classList.add("bg-warning");
    lightImg.src = "https://www.w3schools.com/js/pic_bulbon.gif";
}

function ChuyenMauButtonLed2() {
    ledOn = document.querySelector(".on-led");
    ledOff = document.querySelector(".off-led");
    lightImg = document.querySelector(".lightImg");
    ledOn.classList.remove("bg-warning");
    ledOff.classList.add("bg-info");
    lightImg.src = "https://www.w3schools.com/js/pic_bulboff.gif";

}

        var total = function() {
            var NHIETDO= Math.round(Math.random()*100);
            document.querySelector('.temp').innerText = NHIETDO ;
            var DOAM= Math.round(Math.random()*100);
            document.querySelector('.hum').innerText = DOAM ;
            var ANHSANG= Math.round(Math.random()*100);
            document.querySelector('.light').innerText = ANHSANG ;

            function myNHIETDO(){
                if(NHIETDO<=10){
                    document.getElementById("NHIETDO").style.background = "#32a852";
                }
                else if(NHIETDO<=35){
                    document.getElementById("NHIETDO").style.background = "#1b522a";
                }
                else {
                    document.getElementById("NHIETDO").style.background = "#1018b3";
                }
            }
            function myDOAM(){
                if(DOAM <=10){
                    document.getElementById("DOAM").style.backgroundColor = "pink";
                }
                else if(DOAM <=35){
                    document.getElementById("DOAM").style.backgroundColor = "gray";
                }
                else {
                    document.getElementById("DOAM").style.backgroundColor = "red";
                }
            }
            function myANHSANG(){
                if(ANHSANG <=10){
                    document.getElementById("ANHSANG").style.backgroundColor = "orange";
                }
                else if(ANHSANG <=35){
                    document.getElementById("ANHSANG").style.backgroundColor = "gray";
                }
                else{
                    document.getElementById("ANHSANG").style.backgroundColor = "red";
                }
            }
            myNHIETDO();
            myDOAM();
            myANHSANG();
        }
        setInterval(total,1000);
