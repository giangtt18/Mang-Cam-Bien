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
            document.getElementById("ANHSANG").style.backgroundColor = "pink";
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
setInterval(total,3000);
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

const data = {
  labels: labels,
  datasets: [
    {
      label: 'Temperature',
      backgroundColor: 'red',
      borderColor: 'red',
      data: [20, 22, 24, 28 , 23, 30, 34],
      tension: 0.4,
    },
    {
      label: 'Humidity',
      backgroundColor: 'blue',
      borderColor: 'blue',
      data: [40, 70, 57, 100, 59, 70,89],
      tension: 0.4,
    },
    {
      label: 'Light',
      backgroundColor: 'yellow',
      borderColor: 'yellow',
      data: [79, 32, 82, 55, 93, 52, 53 ],
      tension: 0.4,
    },
  ],
}
const config = {
  type: 'line',
  data: data,
}

const canvas = document.getElementById('canvas')
const chart = new Chart(canvas, config)