# Import os in order to interact with files on the esp.
import os

# Other imports:
import network

# Turn off vendor OS debugging messages, in order to see only own debugging.
import esp
esp.osdebug(None)

# Run the garbage collector to reclaim memory occupied by objects that are no longer in use by the program.
# This is useful to save space in the flash memory
import gc
gc.collect()

# Network credentials. (Change to yours.)
ssid = 'Phips IPhone'
password = 'phips123'

station = network.WLAN(network.STA_IF)

station.active(True)
station.connect(ssid, password)

while station.isconnected() == False:
  pass

print('Connection successful')
print(station.ifconfig())
# End network connection procedure (if we get here we can assume we're connected).