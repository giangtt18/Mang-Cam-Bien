#include "DHT.h"
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "ArduinoJson.h"
#include <Wire.h>
#include <RTClib.h>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <SimpleKalmanFilter.h>
// #include <TaskScheduler.h>

/*
SimpleKalmanFilter(e_mea, e_est, q);
 e_mea: Mức độ không chắc chắn phép đo(mong đợi phép đo)
 e_est: Ước tính không chắc chắn
 q: Phương sai khuyến nghị 0,0001 -> 1
 */
SimpleKalmanFilter locnhieu(2, 2, 0.01);

#define Addr 0x4A

#define ssid "Tap Doan NNT"
#define password "wifihongroi"
#define mqtt_server "test.mosquitto.org"
const uint16_t mqtt_port = 1883;  //Port của MQTT

#define topic1 "GSMA/sensors/humidity-temperature"

#define DHTPIN D2
#define DHTTYPE DHT11
#define LIGHTPIN D6
#define FANPIN D7

DHT dht(DHTPIN, DHTTYPE);

WiFiClient espClient;
PubSubClient client(espClient);
int state = 1;
int work = 0;
int v_intTime = 0;
// void ledBlink();

// Scheduler runner;
// Task tBlink(1000, TASK_FOREVER, &ledBlink);

void setup() {
  Serial.begin(115200);

  //  Wire.begin();
  // Initialise serial communication
  //  Wire.beginTransmission(Addr);
  //  Wire.write(0x02);
  //  Wire.write(0x40);
  //  Wire.endTransmission();
  delay(50);

  setup_wifi();                              //thực hiện kết nối Wifi
  client.setServer(mqtt_server, mqtt_port);  // cài đặt server và lắng nghe client ở port 1883
  client.setCallback(callback);              // gọi hàm callback để thực hiện các chức năng publish/subcribe

  if (!client.connected()) {  // Kiểm tra kết nối
    reconnect();
  }
  client.subscribe("Light");

  // runner.addTask(tBlink);
  // tBlink.enable();
  //pinMode(D1, OUTPUT);  // livingroomLight
  pinMode(LIGHTPIN, OUTPUT);  // livingroomAirConditioner
  pinMode(FANPIN, OUTPUT);
  pinMode(DHTPIN, INPUT);   //cam bien nhiet do, do am
  pinMode(A0, INPUT);   //cam bien anh sang
  digitalWrite(LIGHTPIN, LOW);
  dht.begin();
}

// Hàm kết nối wifi
void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  // in ra thông báo đã kết nối và địa chỉ IP của ESP8266
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

// Hàm call back để nhận dữ liệu
void callback(char *topic, byte *payload, unsigned int length) {
  //-----------------------------------------------------------------
  //in ra tên của topic và nội dung nhận được
  //{"work": "0","time": "20","state": "0"}

  // const char *Ltype = NULL;
  // StaticJsonDocument<256> docs;
  // deserializeJson(docs, payload, length);
  // const char *timeS = NULL;
  // const char *w = NULL;
  // const char *s = NULL;
  // timeS = docs["time"];
  // w = docs["work"];
  // s = docs["state"];
  char p[length + 1];
  memcpy(p, payload, length);
  p[length] = NULL;
  String message(p);

  Serial.print("Co tin nhan moi tu topic: ");
  Serial.println(message);
  // if (timeS != NULL) {
  //   sscanf(timeS, "%d", &v_intTime);
  // }
  // if(w!=NULL){
  //   sscanf(w,"%d",&work);
  // }
  // if(s!=NULL){
  //   sscanf(s,"%d",&state);
  // }
  // Serial.println(work);`````````````
  Serial.println(String(topic));
  // Serial.println(state);
  if (String(topic) == "Light") {
    if (message == "on") {
      digitalWrite(LIGHTPIN, HIGH);
    } else if (message == "off") {
      digitalWrite(LIGHTPIN, LOW);
    }
    if (message == "on1") {
      digitalWrite(FANPIN, HIGH);
    } else if (message == "off1") {
      digitalWrite(FANPIN, LOW);
    }
    if (message == "on2") {
      digitalWrite(FANPIN, HIGH);
      digitalWrite(LIGHTPIN, HIGH);
    } else if (message == "off2") {
      digitalWrite(FANPIN, LOW);
      digitalWrite(LIGHTPIN, LOW);
    }
  }

  //Serial.println(message);
  //Serial.write(payload, length);
  // Serial.println();
  //-------------------------------------------------------------------------
}

// Hàm reconnect thực hiện kết nối lại khi mất kết nối với MQTT Broker
void reconnect() {
  while (!client.connected())  // Chờ tới khi kết nối
  {
    if (client.connect("DoAn-ESP8266"))  //kết nối vào broker
    {
      Serial.println("Đã kết nối:");
      //đăng kí nhận dữ liệu từ topic
      client.subscribe("Light");
      client.subscribe("livingroomAirConditioner");
    } else {
      // in ra trạng thái của client khi không kết nối được với broker
      Serial.print("Lỗi:, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Đợi 5s
      delay(5000);
    }
  }
}

long lastMsg = 0;
void loop() {
  if (!client.connected()) {  // Kiểm tra kết nối
    reconnect();
  }
  //    float ADC_value = 0.0048828125;
  //
  //    int luminance = 250/(LDR_value*ADC_value)-50;
  client.loop();
  // runner.execute();
  unsigned int data[2];
  // Convert the data to lux

  long now = millis();
  if (now - lastMsg > 3000) {
    lastMsg = now;
    int h = dht.readHumidity();
    // Read humidity as RH relative humidity (the default)
    int t = dht.readTemperature();
    float ADC_value = 0.0048828125;
    float LDR_value = 0;
    for (int i = 0; i < 10; i++) {
      LDR_value += analogRead(A0);
    }
    LDR_value = (LDR_value / 10);
    int luminance = (int)(250 / (LDR_value * ADC_value) - 50);
    // Read temperature as Fahrenheit (isFahrenheit = true)
    // Check if any reads failed and exit early (to try again).
    if (isnan(h) || isnan(t)) {
      Serial.println(F("Failed to read from DHT sensor!"));
      return;
    }

    char lightString[10];
    sprintf(lightString, "%d", luminance);
    Serial.print("  Light: ");
    Serial.print(luminance);

    char tempString[10];
    sprintf(tempString, "%d", t);
    Serial.print("  Temp: ");
    Serial.print(tempString);

    char humiString[10];
    sprintf(humiString, "%d", h);
    Serial.print("  Humi: ");
    Serial.println(humiString);

    StaticJsonDocument<100> doc;
    if (t < 100) {
      doc["Temp"] = t;
    }
    if (h < 100) {
      doc["Humi"] = h;
    }
    if (luminance > 0) {
      doc["Light"] = lightString;
    }
    else{
      doc["Light"] = 1;
    }
    char buffer[100];
    serializeJson(doc, buffer);
    client.publish(topic1, buffer);
    Serial.println(buffer);
  }
}

// void ledBlink() {
//   v_intTime -= 1;
//   if(v_intTime<=0) {
//     v_intTime=0;
//   }
//   if (work == 0) {
//     if (state == 0) {
//       if(v_intTime<=0) {
//         digitalWrite(LIGHTPIN, LOW);
//         v_intTime=0;
//       }
//     } else if (state == 1) {
//       if(v_intTime<=0) {
//         digitalWrite(LIGHTPIN, HIGH);
//         v_intTime=0;
//       }
//     }
//   }
// }