import psutil
from socket import AddressFamily
from enum import Enum
from dataclasses import dataclass

from .utils import Jsonible


class NetworkKind(Enum):
    """ This enum represents the kind of a network interface. """
    WIRELESS = 0
    ETHERNET = 1
    LOOPBACK = 2
    OTHER = 3

    def __str__(self):
        return str(self.name.capitalize())

    def recognizeFromName(name: str):
        """ This method recognizes the kind of a network interface from its name. """
        
        if name.startswith('lo'):
            return NetworkKind.LOOPBACK
        if name.startswith(('wlan', 'wlp')):
            return NetworkKind.WIRELESS
        elif name.startswith(('eth', 'enp')):
            return NetworkKind.ETHERNET
        else:
            return NetworkKind.OTHER
    

class AddressKind(Enum):
    """ This enum represents the kind of an IP address. """
    IPV4 = 0
    IPV6 = 1


@dataclass
class Address:
    ipAddress: str = None
    netmask: str = None
    broadcast: str = None
    addressKind: AddressKind = None

    def __repr__(self):
        return f"{self.ipAddress}/{self.netmask}"
    

@dataclass
class NetworkInterface(Jsonible):
    name: str = None
    networkKind: NetworkKind = None
    macAddress: str = None
    addresses: list[Address] = None

    def __repr__(self):
        return f'{self.name} ({self.networkKind}) {self.macAddress}'


class NetworkScanner:

    def scanInterfaces() -> list[NetworkInterface]:
        ret = []
        nets = psutil.net_if_addrs()
        for iname, iarr in nets.items():
            nif = NetworkInterface()
            nif.name = iname
            nif.networkKind = NetworkKind.recognizeFromName(iname)
            nif.addresses = []
            for iaddr in iarr:
                if iaddr.family == psutil.AF_LINK:
                    nif.macAddress = iaddr.address
                    continue
                if iaddr.family == AddressFamily.AF_INET:
                    nif.addresses.append(
                        Address(iaddr.address, iaddr.netmask, iaddr.broadcast, AddressKind.IPV4))
                if iaddr.family == AddressFamily.AF_INET6:
                    nif.addresses.append(
                        Address(iaddr.address, iaddr.netmask, iaddr.broadcast, AddressKind.IPV6))
            ret.append(nif)
        return ret

    def __init__(self, interface: str, mac: str, ip: str, subnet: str, broadcast: str):
        self.interface = interface
        self.mac = mac
        self.ip = ip
        self.subnet = subnet
        self.broadcast = broadcast