from .definitions import *
from .cpu import *
from .gpu import *
from .disk import *
from .network import *
from .server import *
from .detect import *

def createCurrentServer():
    return Server(
        name='Morfeo',
        ip='1',
        cpu=detectCPU(),
        gpu=detectGPU(),
        disks=detectDisks(),
        networks=detectNetworks()
    )