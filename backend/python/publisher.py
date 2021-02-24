import os
import time
import json
import random
import pandas as pd
from threading import Thread
import paho.mqtt.client as mqtt


with open(os.path.join('..', 'config.json')) as json_file:
    config = json.load(json_file)


def fahrenheit_to_celsius(temp):
    return (temp - 32) / 1.8


df = pd.read_csv('reduced_dataset.csv', sep=',')
df['inTemp'] = df['inTemp'].apply(fahrenheit_to_celsius)
df['outTemp'] = df['outTemp'].apply(fahrenheit_to_celsius)

index = 0

def get_random_value(channel):
    global index
    value = 0
    if channel == 1:
        value = df['inTemp'].values[index]
    elif channel == 2:
        value = df['inHum'].values[index]
    elif channel == 3:
        value = random.uniform(100, 500)

    index += 1
    if index == len(df['inTemp'].values):
        index = 0

    return round(value, 2)


def on_connect(client, userdata, _flags, rc):
    print('Connected with cayenne broker!')


def create_recipient_client(client_id):
    client = mqtt.Client(client_id)
    client.username_pw_set(config['mqtt']['username'], config['mqtt']['password'])
    client.connect(config['mqtt']['address'], config['mqtt']['port'], keepalive=60)
    client.on_connect = on_connect

    temperature_topic = f'v1/{config["mqtt"]["username"]}/things/{client_id}/data/1'
    humidity_topic = f'v1/{config["mqtt"]["username"]}/things/{client_id}/data/2'
    weight_topic = f'v1/{config["mqtt"]["username"]}/things/{client_id}/data/3'

    time.sleep(1)
    client.loop_start()

    while True:
        client.publish(temperature_topic, get_random_value(1))
        client.publish(humidity_topic, get_random_value(2))
        client.publish(weight_topic, get_random_value(3))

        time.sleep(3)

    client.loop_stop()
    client.disconnect()


if __name__ == '__main__':
    for id in config['mqtt']['recipients']:
        Thread(target=create_recipient_client, args=[id]).start()
