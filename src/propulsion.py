import random
from system import System

class Propulsion(System):
    def __init__(self, status):
        super().__init__("Propulsion System", status)
        self.matter_stream = 0
        self.antimatter_stream = 0

    def generate_stream_data(self):
        self.matter_stream = random.uniform(0.0, 100.0)
        self.antimatter_stream = random.uniform(0.0, 100.0)

    def display_status(self):
        super().display_status()
        print(f"Matter Stream: {self.matter_stream:.2f}")
        print(f"Antimatter Stream: {self.antimatter_stream:.2f}")

