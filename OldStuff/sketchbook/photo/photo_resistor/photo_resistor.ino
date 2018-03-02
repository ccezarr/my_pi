/* Simple test of the functionality of the photo resistor

Connect the photoresistor one leg to pin 0, and pin to +5V
Connect a resistor (around 10k is a good value, higher
values gives higher readings) from pin 0 to GND. (see appendix of arduino notebook page 37 for schematics).

----------------------------------------------------

           PhotoR     10K
 +5    o---/\/\/--.--/\/\/---o GND
                  |
 Pin 0 o-----------

----------------------------------------------------
*/

int lightPin = 0;  //define a pin for Photo resistor
int photoResistorVcc=7;
int soundPin=6;
int ledPin=5;
int readLightLevel;
unsigned long whenLightWentHigh=0;
const unsigned long HighThreshold = 1200000; //in milliseconds

//#define DEBUG

void setup()
{
    #ifdef DEBUG
      Serial.begin(9600);  //Begin serial communcation
    #endif
   pinMode(soundPin, OUTPUT);
   pinMode(ledPin, OUTPUT);
   pinMode(photoResistorVcc, OUTPUT);
}

void MakeSound()
{
  digitalWrite (ledPin, HIGH);
  unsigned char i, j ;
    for (i = 0; i <80; i++)
    { // number of cycles to sound
      digitalWrite (soundPin, HIGH); // turn buzzer ON
      delay (1) ;// Delay 1ms set frequency 1
      digitalWrite (soundPin, LOW); // turn buzzer OFF
      delay (1) ;// delay ms
    }
    for (i = 0; i <100; i++)
    { // number of cycles to sound
      digitalWrite (soundPin, HIGH); // turn buzzer ON
      delay (2) ;// delay 2ms set frequency 2
      digitalWrite (soundPin, LOW); // turn buzzer OFF
      delay (2) ;// delay 2ms
    }
    digitalWrite (ledPin, LOW);
}

int ReadLightLevel()
{
  digitalWrite (photoResistorVcc, HIGH);
  delay(10);
  int readValue = analogRead(lightPin);
  digitalWrite (photoResistorVcc, LOW);
  return readValue;
}

void loop()
{
    readLightLevel = ReadLightLevel();
    #ifdef DEBUG
      Serial.println(readLightLevel); //Write the value of the photoresistor to the serial monitor.
    #endif
  
  if (readLightLevel > 750)
  {
    if (whenLightWentHigh <= 0)
    {
      whenLightWentHigh = millis();
    }
  }    
  else
  {
    whenLightWentHigh = 0;
  }
  
  if (whenLightWentHigh > 0)
  {
    unsigned long timePassed = millis() - whenLightWentHigh;
    if (timePassed > HighThreshold)
    {
      #ifdef DEBUG
        Serial.print("Time passed: ");
        Serial.println(timePassed);
        Serial.print("High threshold: ");
        Serial.println(HighThreshold);  
      #endif    
      MakeSound();
    }
  }   
    
   delay(100); //short delay for faster response to light.
     
}

