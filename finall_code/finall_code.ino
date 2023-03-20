#include <Servo.h>
Servo myservo;
int pos = 0;
const int GREEN_LED_PIN = 12;
const int RED_LED_PIN = 13;
const int SERVO_PIN = 9;
void setup() {
  myservo.attach(SERVO_PIN);
  myservo.write(90);
  pinMode(GREEN_LED_PIN,OUTPUT);
  pinMode(RED_LED_PIN,OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if (Serial.available()>0){
    
    char command = Serial.read();
    if (command =='C'){
      int pos1 = myservo.read(); // reads the current position of the servo in degrees
      if (pos1==90){
        return(1);
      }
      for (pos = 0;pos<=90;pos+=1){
        myservo.write(pos);
        delay(15);
      }
      digitalWrite(RED_LED_PIN,HIGH);
      digitalWrite(GREEN_LED_PIN,LOW);

    }
    else if(command=='O')
    {
      int pos1 = myservo.read(); // reads the current position of the servo in degrees
      if (pos1==0){
        return(1);
      }

      for(pos =90;pos>=0;pos-=1){
        myservo.write(pos);
        delay(15);
      }
      digitalWrite(GREEN_LED_PIN,HIGH);
      digitalWrite(RED_LED_PIN,LOW);
    }
  }
}
