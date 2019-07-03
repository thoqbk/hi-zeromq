import os
import sys
import struct
import zmq


context = zmq.Context()
socket = context.socket(zmq.REQ)
socket.connect('tcp://127.0.0.1:3000')

filepath = sys.argv[1]

with open(filepath, 'rb') as f:
    filename = os.path.basename(filepath)
    content = struct.pack('i', len(filename)) + filename + f.read()
    socket.send(content)

print socket.recv()
