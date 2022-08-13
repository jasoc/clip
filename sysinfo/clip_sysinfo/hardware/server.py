from . import CPU, GPU, Disk

class Server:

    name: str = None
    ip: str = None

    cpu: CPU = None
    gpu: GPU = None
    disks: list[Disk] = None
    
    # os: OS = None

    ram: float = None

    def __init__(self, name, ip, cpu, gpu, disks):
        self.name = name
        self.ip = ip
        self.cpu = cpu
        self.gpu = gpu
        self.disks = disks

    def __repr__(self):
        return f'{self.name} {self.cpu}'