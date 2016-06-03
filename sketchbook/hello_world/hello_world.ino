int ledPin=4;

void setup()
{
  pinMode(ledPin, OUTPUT);
}

void loop()
{
  digitalWrite (ledPin, HIGH);
  delay(300);
  digitalWrite (ledPin, LOW);
  delay(100);
}

