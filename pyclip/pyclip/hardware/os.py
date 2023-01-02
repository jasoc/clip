import distro

class OS:
    
    id: str = None
    name: str = None
    version: str = None
    codename: str = None
    
    version_minor: str = None
    version_major: str = None
    version_build_number: str = None

    def __init__(self):
        self.detect()

    def detect(self):
        if self is None:
            self = OS()
        
        info = distro.info()
        self.name = distro.name()
        self.id = info['id']
        self.codename = info['codename']
        
        self.version = info['version']
        self.version_major = info['version_parts']['major']
        self.version_minor = info['version_parts']['minor']
        self.version_build_number = info['version_parts']['build_number']

        return self
    
    def __repr__(self):
        return f'{self.name} {self.version} ({self.codename})'