import picamera
import picamera.array
import time

threshold = 10    # How Much pixel changes
sensitivity = 0.2 * 224 * 160 # How many pixels change

def takeMotionImage(width, height):
    with picamera.PiCamera() as camera:
        #time.sleep(1)
        camera.resolution = (width, height)
        with picamera.array.PiRGBArray(camera) as stream:
            camera.exposure_mode = 'auto'
            camera.awb_mode = 'auto'
            camera.capture(stream, format='rgb')
            return stream.array

def scanMotion(width, height):
    motionFound = False
    data1 = takeMotionImage(width, height)
    while not motionFound:
        data2 = takeMotionImage(width, height)
        diffCount = 0
        for w in range(0, width):
            for h in range(0, height):
                # get the diff of the pixel. Conversion to int
                # is required to avoid unsigned short overflow.
                diff = abs(int(data1[h][w][1]) - int(data2[h][w][1]))
                if  diff > threshold:
                    diffCount += 1
            if diffCount > sensitivity:
                break;
        if diffCount > sensitivity:
            motionFound = True
        else:
            data2 = data1
    return motionFound

def motionDetection():
    print ("Scanning for Motion threshold=%i sensitivity=%i..."  % (threshold, sensitivity))
    counter=0
    while True:
        if scanMotion(224, 160):
            print ("Motion detected")
            with picamera.PiCamera() as camera:
                camera.capture('%d.jpg'%(counter))
                counter += 1
            #    time.sleep(1)
            #    camera.start_preview()
            #    time.sleep(4)
            #    camera.stop_preview()
        else:
            print ("No motion...")
            

if __name__ == '__main__':
    try:
        motionDetection()
    finally:
        print ("Exiting Program")
