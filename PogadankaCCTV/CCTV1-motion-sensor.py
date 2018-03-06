import RPi.GPIO as GPIO
import time
import picamera

GPIO.setmode(GPIO.BCM)

PRI_PIN=4
GPIO.setup(PRI_PIN, GPIO.IN)
counter=1

try:
    print ("PRI module test (CTRL+C to exit)")
    time.sleep(2)
    print ("Ready")

    camera = picamera.PiCamera()
    camera.rotation=180
    cameraOn=False

    while True:
        if GPIO.input(PRI_PIN):
            print ("Motion detected")
            if cameraOn == False:
                print ("Camera ON")
                camera.start_preview()
                cameraOn=True
        else:
            print ("No motion...")
            if cameraOn == True:
                print ("Camera OFF")
                camera.stop_preview()
                cameraOn = False
        time.sleep(0.1)
        
except:
    print ("Quit")
   # gfh
    GPIO.cleanup()
    camera.stop_preview()
