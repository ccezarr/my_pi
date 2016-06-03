import serial
import traceback
import time
import sys
import datetime  # This is required to include time module.
from subprocess import call 

print ("App started.")

photofile = "/home/pi/Dropbox-Uploader/dropbox_uploader.sh upload /home/pi/moisture.txt moisture.txt"   

while 1:
    try:
        ser = serial.Serial('/dev/ttyACM0', 9600)
        ser.readline()

        counter = 1

        while 1 :
            localdate = datetime.datetime.now().date()   
            localtime = datetime.datetime.now().time()    
            dataRead = ser.readline()

            dataToWrite = "{} {} {}".format(localdate, localtime, dataRead)
            
            print (dataToWrite)

            counter = counter+1
            if counter > 60:
                counter=1
                with open("moisture.txt", "a") as myFile:
                    myFile.write(dataToWrite)     
                call ([photofile], shell=True)
                print ("File uploaded")

    except:
        e = sys.exc_info()[0]
        print ( "Error: %s" % traceback.format_exc() )
        print ( "Will retry in a sec...")
        time.sleep(10)   
