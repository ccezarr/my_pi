import picamera

camera = picamera.PiCamera()

camera.start_preview()
sleep(5)
camera.stop_preview()
