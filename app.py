from flask import Flask, render_template
import json
import yaml
from flask import abort 

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True

# Store the questions into a list of dictionaries
# Use YAML file rather than csv
questions = []
with open('question.yaml', 'r') as file:
    questions = yaml.load(file, Loader=yaml.FullLoader)

@app.route('/')
def index():
    return render_template('index.html', id_range=(len(questions) - 1))



@app.route('/question/<int:id>')
def get_question(id):
    if id < len(questions) and id >= 0:
        return questions[id]
    abort(404)


