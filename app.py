from flask import Flask, render_template
import json

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/statistics')
def statistics():
    return render_template('statistics.html')

@app.route('/statistics/api')
def statistics_api():
    data = {
        'statistics': True
    }
    return json.dumps(data)

if __name__ == '__main__':
    app.run(debug=True)