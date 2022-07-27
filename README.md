# revise50

A tool to help you revise CS50.

## Things that we need
* HTML template + AJAX for frontend
* A db(database) to store our questions 
(we should adopt the approach that options and questions are stored seperately and they should only be linked by ids)
* Python + Flask for the backend


## Frontend Design

### `index.html`

- Question
- Option buttons
- AJAX loading
- Settings option (light/dark theme, difficulty, week selection)
- Logo
- Link to `statistics.html`

### `statistics.html`

- Question
- Percentage
- Rankings 


## Backend design

### `/`

#### `GET`

Return `index.html`

### `/question`

#### `GET`

Get a new question

```json
{
    "id": "1",
    "content": "what is 1+1?",
    "options": [
        {
            "name": "OptionA"
        }
    ]
}
```

#### `POST`

questionid

return response correct or not, details

### `/statistics`

#### `GET`

return `statistics.html`

### `/statistics/api`

return 

```
{
    ""
}
```