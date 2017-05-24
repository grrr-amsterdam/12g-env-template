# 12g-env-template

This package creates a template file based on your local `.env` file.
It will empty out all values, but it will leave comments and newlines in.


## Usage
Install the dependency:
```bash
$ npm install --save 12g-env-template
```

Then require it in your code:
```
var template = require('12g-env-template');
```

Then create a template file:
```
template.create()
```

Or with options:
```
template.create('.env.production', '.env.example')
```

## Methods

### `.create([input file], [output file])`
By default, it will take `.env` as input and use `.env.template` as output.


### `.exists()`
Returns whether the template file already exists.
