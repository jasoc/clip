from abc import abstractmethod


class Jsonible:

    @abstractmethod
    def toJson(self) -> dict:
        pass