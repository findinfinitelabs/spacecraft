class System:
    def __init__(self, name, status):
        self.name = name
        self.status = status

    def display_status(self):
        print(f"{self.name}: {self.status}")
