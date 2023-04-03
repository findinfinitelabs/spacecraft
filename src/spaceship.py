from propulsion import Propulsion
from life_support import LifeSupport

class Spaceship:
    def __init__(self):
        self.systems = []

    def add_system(self, system):
        self.systems.append(system)

    def remove_system(self, system):
        self.systems.remove(system)

    def control_center(self):
        for system in self.systems:
            system.display_status()

if __name__ == '__main__':
    spaceship = Spaceship()
    propulsion_system = Propulsion("Online")
    life_support_system = LifeSupport("Online")

    spaceship.add_system(propulsion_system)
    spaceship.add_system(life_support_system)

    spaceship.control_center()
