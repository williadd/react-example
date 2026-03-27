from flask import Flask, jsonify
from flask_cors import CORS
import platform
import psutil
import datetime
import random

app = Flask(__name__)
CORS(app)


@app.route('/api/system-info', methods=['GET'])
def get_system_info():
    """Return basic system information."""
    return jsonify({
        'hostname': platform.node(),
        'platform': platform.system(),
        'platform_version': platform.version(),
        'architecture': platform.machine(),
        'processor': platform.processor(),
        'python_version': platform.python_version(),
        'cpu_count': psutil.cpu_count(),
        'cpu_percent': psutil.cpu_percent(interval=0.1),
        'memory_total_gb': round(psutil.virtual_memory().total / (1024**3), 2),
        'memory_used_percent': psutil.virtual_memory().percent,
        'timestamp': datetime.datetime.now().isoformat()
    })


@app.route('/api/weather', methods=['GET'])
def get_weather():
    """Return a silly random weather forecast."""
    conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Overcast', 'Foggy', 'Rainy', 'Stormy', 'Snowy']
    return jsonify({
        'temperature_f': random.randint(20, 100),
        'temperature_c': round((random.randint(20, 100) - 32) * 5/9, 1),
        'condition': random.choice(conditions),
        'cloudiness_percent': random.randint(0, 100),
        'precipitation_percent': random.randint(0, 100),
        'humidity_percent': random.randint(20, 95),
        'wind_mph': random.randint(0, 50),
        'timestamp': datetime.datetime.now().isoformat()
    })


if __name__ == '__main__':
    app.run(debug=True, port=5000)
