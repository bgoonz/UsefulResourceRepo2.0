import serial
import sys

ser = serial.Serial()
ser.baudrate = 115200
ser.bytesize=serial.SEVENBITS
ser.parity=serial.PARITY_EVEN
ser.stopbits = serial.STOPBITS_ONE
ser.xonxoff=0
ser.rtscts=0
ser.timeout=20
ser.port="/dev/tty.usbmodem1411"

try:
    ser.open()
except:
    sys.exit ("Something went wrong with %s."  % ser.name)      

p1_counter=0

while p1_counter < 30:
    p1_line=''

    try:
        p1_raw = ser.readline()
    except:
        sys.exit ("Serial port %s can't be read." % ser.name )    
          
    p1_str=str(p1_raw)
    p1_line=p1_str.strip()

    energy = p1_line.startswith("b'1-0:1.8.1")
    gas = p1_line.startswith("b'0-1:24.2.1")

    if energy:
      print(p1_line)

    if gas:
      print (p1_line)
   
    p1_counter = p1_counter + 1

try:
    ser.close()
except:
    sys.exit ("Can't close serial port." % ser.name )  