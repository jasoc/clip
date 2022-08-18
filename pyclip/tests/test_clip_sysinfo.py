from hardware import CPU

import psutil
import json

from hardware.network import NetworkScanner

def test_server_object():
    cpu = CPU()
    cpu.detect()

    print(f"""
    CPU:              {cpu}

    CPU.cores:        {cpu.cores}

    CPU.threads:      {cpu.threads}

    CPU.minFreq:      {cpu.minFreq}

    CPU.maxFreq:      {cpu.maxFreq}

    CPU.allCoresFreq: {[round(c, 2) for c in cpu.allCoresFreq()[0:int(cpu.cores / 2)]]}
                      {[round(c, 2) for c in cpu.allCoresFreq()[int(cpu.cores / 2):cpu.cores]]}

    CPU.currCpuFreq:  {cpu.currCpuFreq()}

    CPU.currCpuPerc:  {cpu.currCpuPerc()}
    """)

    def get_json(obj):
        return json.loads(
            json.dumps(obj, default=lambda o: getattr(o, '__dict__', str(o)))
        )

    for net in NetworkScanner.scanInterfaces():
        print(json.dumps(get_json(net), indent=4))