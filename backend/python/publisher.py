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


df = pd.read_csv('recipeful_fridge_dataset.csv', sep=',')
df['Temperature_A'] = df['Temperature_A'].apply(fahrenheit_to_celsius)
df['Temperature_B'] = df['Temperature_B'].apply(fahrenheit_to_celsius)
df['Temperature_C'] = df['Temperature_C'].apply(fahrenheit_to_celsius)

index = 0

priority = {
    'Baixa': 0,
    'Média': 1,
    'Media': 1,
    'Alta': 2
}

def get_random_value(recipient, channel):
    global index
    value = df[f'{channel}_{recipient}'].values[index]
    index += 1
    if index == len(df):
        index = 0

    return round(value, 2) if isinstance(value, float) else priority[value]


def on_connect(client, userdata, _flags, rc):
    print('Connected with cayenne broker!')


def create_recipient_client(client_id, recipient):
    client = mqtt.Client(client_id)
    client.username_pw_set(config['mqtt']['username'], config['mqtt']['password'])
    client.connect(config['mqtt']['address'], config['mqtt']['port'], keepalive=60)
    client.on_connect = on_connect

    temperature_topic = f'v1/{config["mqtt"]["username"]}/things/{client_id}/data/1'
    humidity_topic = f'v1/{config["mqtt"]["username"]}/things/{client_id}/data/2'
    weight_topic1 = f'v1/{config["mqtt"]["username"]}/things/{client_id}/data/3'
    weight_topic2 = f'v1/{config["mqtt"]["username"]}/things/{client_id}/data/4'
    weight_topic3 = f'v1/{config["mqtt"]["username"]}/things/{client_id}/data/5'
    priority_topic = f'v1/{config["mqtt"]["username"]}/things/{client_id}/data/6'

    time.sleep(1)
    client.loop_start()

    while True:
        client.publish(temperature_topic, get_random_value(recipient, 'Temperature'))
        client.publish(humidity_topic, get_random_value(recipient, 'Humidity'))
        client.publish(weight_topic1, get_random_value(recipient+'1', 'Weight'))
        client.publish(weight_topic2, get_random_value(recipient+'2', 'Weight'))
        client.publish(weight_topic3, get_random_value(recipient+'3', 'Weight'))
        client.publish(priority_topic, get_random_value(recipient, 'Priority'))

        time.sleep(3)

    client.loop_stop()
    client.disconnect()


if __name__ == '__main__':
    for id, recipient in zip(config['mqtt']['recipients'], ['A', 'B', 'C']):
        Thread(target=create_recipient_client, args=[id, recipient]).start()
