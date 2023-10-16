# Code to initialize the MQTT client.
import time
from umqttsimple import MQTTClient
import machine
import ubinascii

from time import sleep
from machine import Pin

# To create an MQTT client, we need to get the ESP unique ID
client_id = ubinascii.hexlify(machine.unique_id())

# MQTT Broker Data for PWP project
# Home Assistant with mosquitto addon (remember to open port 1883 in the router)
mqtt_server = ''
mqtt_port = 1883
mqtt_user = ''
mqtt_pw = ''

# Topics this ESP will publish to. Has to be specified as a bytestring (b'text').
topic2pub = b'NoteNuker'

redButton = Pin(16, Pin.IN, Pin.PULL_UP)
greenButton = Pin(26, Pin.IN, Pin.PULL_UP)

light = Pin(13, Pin.OUT)
shredder = Pin(32, Pin.OUT)

#############
# Functions #
#############

# Connects to the MQTT broker specified within the mqtt_server variable.
def connectBroker():
    global client_id, mqtt_server, mqtt_port, mqtt_user, mqtt_pw
    client = MQTTClient(client_id, mqtt_server, mqtt_port, mqtt_user, mqtt_pw)
    client.connect()
    print('Connected to MQTT broker: ' + mqtt_server)
    return client

# Resets the ESP on failed connection in order to try again later.
def restart_and_reconnect():
    print('Failed to connect to MQTT broker. Reconnecting...')
    time.sleep(10)
    machine.reset()

# Publishes a message to specified topic
def publishMsg(msg):
    try:
        client.publish(topic2pub, str.encode(msg))
    except Exception as e:
        print('Failed to publish to topic \'%s\' with error: %s' % (topic, e))

def activateShredderAndLight():
    light.value(1)
    sleep(5)
    shredder.value(1)
    sleep(5)
    shredder.value(0)
    light.value(0)
        
#####################
# Execute on start: #
#####################
try:
    client = connectBroker() # Connect to broker
    print('MQTT connection successful!')

except OSError as e:
    print('Failed MQTT connection with error: %s' % e)
    restart_and_reconnect() # Try again later on fail.

###################
# Execution loop: #
###################

while True:
    if not redButton.value():
        print("red Button is pressed")
        publishMsg('red')
        activateShredderAndLight()
        sleep(1)
    if not greenButton.value():
        print("green Button is pressed")
        publishMsg('green')
        activateShredderAndLight()
        sleep(1)