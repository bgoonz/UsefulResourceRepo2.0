#include <SoftTimer.h>
#include <DelayRun.h>
#include <Servo.h>
Servo myservo;

// servo
float pos;
int minDeg = 30;
int maxDeg = 150;
float servoDir = 1;

// lasers
#define LA1 1
#define LA2 2
#define LA3 3
#define LA4 4
#define LA5 5
#define LA6 6
#define LA7 7

// tasks: lasers
boolean turnOn1  (Task* task) { digitalWrite(LA1, HIGH); return true; }
boolean turnOff1 (Task* task) { digitalWrite(LA1,  LOW); return true; }
DelayRun onTask1 (1000, turnOn1);
DelayRun offTask1(2000, turnOff1, &onTask1);

boolean turnOn2  (Task* task) { digitalWrite(LA2, HIGH); return true; }
boolean turnOff2 (Task* task) { digitalWrite(LA2,  LOW); return true; }
DelayRun onTask2 (1200, turnOn2);
DelayRun offTask2(2000, turnOff2, &onTask2);


// tasks: servo
boolean servoMove (Task* task) {
  servoDir =  myservo.read() < 30 ? 1 : myservo.read() > 150 ? -1 : servoDir;
  pos = myservo.read() + servoDir;
  Serial.println((int) pos, DEC);
  myservo.write((int) pos);
  return true;
}
DelayRun servoMoveTask(500, servoMove, &servoMoveTask);

void setup() {
  Serial.begin(9600);

  myservo.attach(9);

  pinMode(LA1, OUTPUT);
  pinMode(LA2, OUTPUT);

  onTask1.followedBy = &offTask1;
  onTask2.followedBy = &offTask2;

  onTask1.startDelayed();
  onTask2.startDelayed();

  servoMoveTask.followedBy = &servoMoveTask;
  servoMoveTask.startDelayed();
}
