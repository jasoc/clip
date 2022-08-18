from importlib.machinery import all_suffixes
from socket import AddressFamily
import psutil
from enum import Enum
from dataclasses import dataclass


class NetworkKind(Enum):
    """ This enum represents the kind of a network interface. """
    WIFI = 0
    ETHERNET = 1
    OTHER = 2


class AddressKind(Enum):
    """ This enum represents the kind of a network interface. """
    IPV4 = 0
    IPV6 = 1


@dataclass
class Address:
    ipAddress: str = None
    netmask: str = None
    broadcast: str = None
    addressKind: AddressKind = None


@dataclass
class NetworkInterface:
    name: str = None
    networkKind: NetworkKind = None
    macAddress: str = None
    addresses: list[Address] = None


class NetworkScanner:

    def scanInterfaces():
        ret = []
        nets = psutil.net_if_addrs()
        for iname, iarr in nets.items():
            nif = NetworkInterface()
            nif.name = iname
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

