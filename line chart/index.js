
function ChuyenMauNhietDo() {
    
    let tempInput = document.querySelector(".temp-input");
    
    let temp = tempInput.innerHTML;
    
    temp = parseFloat(temp);
    let divTemp = document.querySelector(".temp");
    if (temp <= 18) {
        divTemp.classList.remove("bg-danger");
        divTemp.classList.remove("bg-warning");
        divTemp.classList.add("bg-info");
    } else if (temp > 18 && temp <= 40) {
        divTemp.classList.remove("bg-warning")
        divTemp.classList.remove("bg-info");
        divTemp.classList.add("bg-warning");
    } else {
        divTemp.classList.remove("bg-warning");
        divTemp.classList.remove("bg-info");
        divTemp.classList.add("bg-danger");
    }
}

function ChuyenMauDoAm() {
    let humInput = document.querySelector(".hum-input");
    let hum = humInput.innerHTML;
    let divHum = document.querySelector(".hum");
    hum = parseFloat(hum);
    if (hum < 30) {
        divHum.classList.remove("bg-info");
        divHum.classList.remove("bg-danger");
        divHum.classList.add("bg-warning");
    } else if (hum >= 30 && hum <= 60) {
        divHum.classList.remove("bg-warning");
        divHum.classList.remove("bg-danger");
        divHum.classList.add("bg-info");
    } else {
        divHum.classList.remove("bg-warning");
        divHum.classList.remove("bg-infor");
        divHum.classList.add("bg-danger");
    }
}

function ChuyenMauAnhSang() {
    let lightInput = document.querySelector(".light-input");
    let light = lightInput.innerHTML;
    let divLight = document.querySelector(".light");
    light = parseFloat(light);
    if (light < 20) {
        divLight.classList.remove("bg-warning");
        divLight.classList.remove("bg-danger");
        divLight.classList.add("bg-info");
    } else if (light >= 20 && light <= 50) {
        divLight.classList.remove("bg-info");
        divLight.classList.remove("bg-danger");
        divLight.classList.add("bg-warning");
    } else {
        divLight.classList.remove("bg-warning");
        divLight.classList.remove("bg-infor");
        divLight.classList.add("bg-danger");
    }
}
function ChuyenMauGa() {
    let gaInput = document.querySelector(".ga-input");
    let ga = gaInput.innerHTML;
    let divga = document.querySelector(".ga");
    ga = parseFloat(ga);
    if (ga < 20) {
        divga.classList.remove("bg-warning");
        divga.classList.remove("bg-danger");
        divga.classList.add("bg-info");
    } else if (ga >= 20 && ga <= 50) {
        divga.classList.remove("bg-info");
        divga.classList.remove("bg-danger");
        divga.classList.add("bg-warning");
    } else {
        divga.classList.remove("bg-warning");
        divga.classList.remove("bg-infor");
        divga.classList.add("bg-danger");
    }
}
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





function getRandomNumber() {
    let value = Math.floor(Math.random() * 100);
    return value.toString();
}

function changeTemp() {
    let tempInput = document.querySelector(".temp-input");
    tempInput.innerHTML = getRandomNumber();
    tempData.push(parseInt(tempInput.innerHTML));
}

function changeHum() {
    let humInput = document.querySelector(".hum-input");
    humInput.innerHTML = getRandomNumber();
    humData.push(parseInt(humInput.innerHTML));
}

function changeLight() {
    let lightInput = document.querySelector(".light-input");
    lightInput.innerHTML = getRandomNumber();
    lightData.push(parseInt(lightInput.innerHTML));
}

function changeGa() {
    let gaInput = document.querySelector(".ga-input");
    gaInput.innerHTML = getRandomNumber();
    gaData.push(parseInt(gaInput.innerHTML));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    while (true) {
        changeTemp();
        ChuyenMauNhietDo();
        changeHum();
        ChuyenMauDoAm();
        changeLight();
        ChuyenMauAnhSang();
        changeGa();
        ChuyenMauGa();
        show();
        await sleep(4000);
    }
}

let humData = [];
let tempData = [];
let lightData = [];
let gaData = [];

function show() {
    Highcharts.chart('chart', {
        chart: {
            type: 'bar'
        },
        title: {
            text: ' Chart'
        },
        xAxis: {
            categories: 1
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'Humidity',

            data: humData

        }, {
            name: 'Temperature',
            data: tempData
        },
        {
            name: 'GA',
            data: gaData
        },
        {
            name: 'Light',
            data: lightData
        }]
    })
}

run();