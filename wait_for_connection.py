#!/usr/bin/python
import socket, errno, sys
from time import sleep

def testConnction(host, port):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        s.connect((host, port))
        return True
    except socket.error as error:
        return False

def waitForConnection(host, port):
    while not testConnction(host, port):
        sleep(1)
        sys.stdout.write('.')
        sys.stdout.flush()

if __name__ == '__main__':
    host = sys.argv[1]
    port = int(sys.argv[2])
    waitForConnection(host, port)
