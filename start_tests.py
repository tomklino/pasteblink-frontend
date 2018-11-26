#!/usr/bin/python

import json
from subprocess import call, check_output

call(["docker-compose", "up", "-d"])
server_docker_name = "pasteblink-frontend_server_1"
server_http_port = "3000"
test_config_file = '/tmp/pasteblink_test_config.json'

container_data = json.loads(
  check_output(['docker', 'inspect', server_docker_name])
  )[0]

server_address = "http://" + container_data["NetworkSettings"]["Networks"]["pasteblink-frontend_default"]["IPAddress"] + ":" + server_http_port

with open(test_config_file, "w") as f:
    json.dump({"server_address": server_address}, f, indent=2)

print server_address

call(["npm", "test"])

call(["docker-compose", "down"])
