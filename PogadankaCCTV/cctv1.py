import picamera
from time import sleep

camera = picamera.PiCamera()
camera.start_preview()
sleep(5)
camera.stop_preview()
