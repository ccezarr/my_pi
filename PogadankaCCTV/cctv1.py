# https://www.raspberrypi.org/documentation/usage/camera/python/README.md
# https://maker.pro/education/bluetooth-basics-how-to-control-an-led-using-a-smartphone-and-arduino-1

import RPi.GPIO as GPIO
import time
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(11, GPIO.IN)         #Read output from PIR motion sensor

while True:
    i=GPIO.input(11)
    if i==0:                 #When output from motion sensor is LOW
        print ("No intruders")
        time.sleep(0.5)
    elif i==1:               #When output from motion sensor is HIGH
        print ("Intruder detected")
        time.sleep(0.5)
