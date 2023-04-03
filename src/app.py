import random
import subprocess
from flask import Flask, render_template, jsonify

app = Flask(__name__)

# Define the route for the index page
@app.route('/')
def index():
    return render_template('index.html')

# Define the route for the data API
@app.route('/get_data')
def get_data():
    # Generate random values for the matter and antimatter streams, oxygen level, and carbon dioxide level
    matter_stream = random.randint(0, 100)
    antimatter_stream = random.randint(0, 100)
    oxygen_level = 99
    carbon_dioxide_level = 4

    # Set the propulsion and life support system statuses to 'online'
    propulsion_status = 'online'
    life_support_status = 'online'

    # If there is more antimatter than matter, change the propulsion status to 'offline'
    if antimatter_stream > matter_stream:
        propulsion_status = 'offline'

    # Create a dictionary of the data and return it as JSON
    data = {
        'matter_stream': matter_stream,
        'antimatter_stream': antimatter_stream,
        'oxygen_level': oxygen_level,
        'carbon_dioxide_level': carbon_dioxide_level,
        'propulsion_status': propulsion_status,
        'life_support_status': life_support_status
    }
    return jsonify(data)

# Start the Flask application
if __name__ == '__main__':
    app.run(debug=True)
