class Network:
    interface: str = None
    mac: str = None
    ip: str = None
    subnet: str = None
    broadcast: str = None

    def scan():
        pass

    def __init__(self, interface: str, mac: str, ip: str, subnet: str, broadcast: str):
        self.interface = interface
        self.mac = mac
        self.ip = ip
        self.subnet = subnet
        self.broadcast = broadcast