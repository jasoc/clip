import os
import distro
from clip_sysinfo.entities import OS, CPU

class Server:

    name: str = None
    ip: str = None
    os: OS = None
    cpu: CPU = None

    # Capacity size conversion:
    #   float(1) == 1 Mb

    ram: float = None
    disk_capacitie: float = None

    def __init__(self):
        pass

    def Detect(self = None):
        if self is None:
            self = Server()
        self.os = OS.Detect()
        self.cpu = CPU.Detect()
        self.name = self.os.name
        return self
    
    def __repr__(self):
        return f'{self.name} {self.os}'