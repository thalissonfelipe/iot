import os
import time
import json
import random
import paho.mqtt.client as mqtt


with open(os.path.join('..', 'config.json')) as json_file:
    json_data = json.load(json_file)


def get_random_value(channel):
    value = 0
    if channel == 1:
        value = random.uniform(-10, 10)
    elif channel == 2:
        value = random.uniform(-10, 10)
    elif channel == 3:
        value = random.uniform(-10, 10)
    return round(value, 2)


def on_connect(client, userdata, _flags, rc):
    print('Connected')


def create_recipient_client(client_id):
    client = mqtt.Client(client_id)
    client.username_pw_set(json_data['mqtt']['username'], json_data['mqtt']['password'])
    client.connect(json_data['mqtt']['address'], json_data['mqtt']['port'], keepalive=60)
    client.on_connect = on_connect

    temperature_topic = f'v1/{json_data["mqtt"]["username"]}/things/{client_id}/data/1'
    humidity_topic = f'v1/{json_data["mqtt"]["username"]}/things/{client_id}/data/2'
    weight_topic = f'v1/{json_data["mqtt"]["username"]}/things/{client_id}/data/3'

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
    for id in json_data['mqtt']['recipients']:
        create_recipient_client(id)
