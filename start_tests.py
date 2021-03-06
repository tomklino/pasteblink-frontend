#!/usr/bin/python

import json
import sys
from subprocess import call, check_output
from wait_for_connection import waitForConnection

call(["docker-compose", "up", "-d"])
server_docker_name = "pasteblinkfrontend_server_1"
server_http_port = 3000
test_config_file = '/tmp/pasteblink_test_config.json'

container_data = json.loads(
  check_output(['docker', 'inspect', server_docker_name])
  )[0]

server_host = container_data["NetworkSettings"]["Networks"]["pasteblinkfrontend_default"]["IPAddress"]
server_address = "http://" + server_host + ":" + str(server_http_port)

with open(test_config_file, "w") as f:
    json.dump({"server_address": server_address}, f, indent=2)

print server_address

waitForConnection(server_host, server_http_port)

test_exit_code = call(["npm", "test"])

call(["docker-compose", "down"])

sys.exit(test_exit_code)
