import psutil
from enum import Enum
from dataclasses import dataclass


class NetworkKind(Enum):
    """ This enum represents the kind of a network interface. """
    WIFI = 0
    ETHERNET = 1
    OTHER = 2


class Bit:
    pass

class Address:
    """ This class represents an address of a network interface.
    The constructor accepts an address in form of string, then
    split and store the single bytes, and provides method for convert
    t from decimal to hexadecimal and viceversa. """

    bytes: list[Bit]

    def __init__(self, addrstr: str) -> None:
        self.bytes = [int(b) for b in addrstr.split('.')]

class Network:
    pass

@dataclass
class NetworkInterface:
    name: str
    mac: str
    kind: NetworkKind = NetworkKind.OTHER

    interface: str = None
    mac: str = None
    ip: str = None
    subnet: str = None
    broadcast: str = None

    def scan():
        nets = psutil.net_if_addrs()
        for net in [nets[k] for k in nets.keys()]:
            yield Network(net.name, net.mac, net.address, net.netmask, net.broadcast)

    def __init__(self, interface: str, mac: str, ip: str, subnet: str, broadcast: str):
        self.interface = interface
        self.mac = mac
        self.ip = ip
        self.subnet = subnet
        self.broadcast = broadcast