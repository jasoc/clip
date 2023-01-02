from . import CPU, GPU, Disk, NetworkInterface
from .utils import Jsonible

class Server(Jsonible):

    name: str = None
    ip: str = None

    cpu: CPU = None
    gpu: GPU = None
    disks: list[Disk] = None
    networks: list[NetworkInterface] = None
    
    # os: OS = None

    ram: float = None

    def __init__(self, name, ip, cpu, gpu, disks, networks):
        self.name = name
        self.ip = ip
        self.cpu = cpu
        self.gpu = gpu
        self.disks = disks
        self.networks = networks

    def __repr__(self):
        return f'{self.name} {self.cpu}'

    def toJson(self) -> dict:
        return self.__dict__
        return {
            'name': self.name,
            'cpu': self.cpu.toJson(),
            'networks': [n.toJson() for n in self.networks],
        }