from .hardware import *
from .detect import *

def createCurrentServer():
    return Server(
        name='Morfeo',
        ip='1',
        cpu=detectCPU(),
        gpu=detectGPU(),
        disk=detectDisks()
    )