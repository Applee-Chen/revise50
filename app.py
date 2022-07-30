from flask import Flask, render_template
import json
import yaml
import random
from flask import abort

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True

# Store the questions into a list of dictionaries
# Use YAML file rather than csv
questions = []
with open('question.yaml', 'r') as file:
    questions = yaml.load(file, Loader=yaml.FullLoader)
for i in range(len(questions)):
    questions[i]['id'] = i

@app.route('/')
def index():
    initial_questions_number = len(questions)
    if initial_questions_number > 5:
        initial_questions_number = 5
    return render_template('index.html',
                           id_range=(len(questions) - 1),
                           initial_questions = json.dumps(random.sample(questions, initial_questions_number)))


@app.route('/question/<int:id>')
def get_question(id):
    if id < len(questions) and id >= 0:
        return questions[id]
    abort(404)
