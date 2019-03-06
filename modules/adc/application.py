"""
application.py
- creates a Flask app instance and registers the database object.
"""

import enum

from flask import Flask, Blueprint, jsonify, request
from flask_sqlalchemy import SQLAlchemy

# configuration.
SECRET_KEY = 'mysecretkey'

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////Users/mangesh/ws/uni/tsp/project/modules/adc.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

api = Blueprint('api', __name__)

class UserType(enum.Enum):
    LTM = 1
    ACADEMIC = 2
    TUTOR = 3

class Semester(enum.Enum):
    ONE = 1
    TWO = 2
    BOTH = 3

class AssessmentFormat(enum.Enum):
    MOLE_QUIZ = 1
    ASSIGNMENT = 2
    PRESENTATION = 3
    FORMAL_EXAM = 4
    ASSESSED_LAB = 5
    GROUP_PROJECT = 6
    PORTFOLIO = 7

class User(db.Model):  
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    usertype = db.Column(db.Enum(UserType))
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False, default="5f4dcc3b5aa765d61d8327deb882cf99")

    def to_dict(self):
        return dict(id=self.id,
                    usertype=self.usertype,
                    email=self.email,
                    password=self.password)

class Module(db.Model):  
    __tablename__ = "module"

    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(10), unique=True, nullable=False)
    name = db.Column(db.String(80), nullable=False)
    semester = db.Column(db.Enum(Semester))
    academic = db.Column(db.Integer, db.ForeignKey('user.id'))

    def to_dict(self):
        return dict(id=self.id,
                    code=self.code,
                    name=self.name,
                    semester=self.semester,
                    academic=self.academic)

class Assessment(db.Model):
    __tablename__ = "assessment"

    id = db.Column(db.Integer, primary_key=True)
    format = db.Column(db.Enum(AssessmentFormat), nullable=False)
    name = db.Column(db.String(80), nullable=False)
    marks = db.Column(db.Float, nullable=False)
    release_date = db.Column(db.DateTime, nullable=False)
    submission_date = db.Column(db.DateTime, nullable=False)
    module_id = db.Column(db.Integer, db.ForeignKey('module.id'))
    module = db.relationship("Module", backref=db.backref("assessments", lazy=True))

@api.route('/hello/<string:name>/')
def say_hello(name):
    response = { 'msg': "Hello {}".format(name) }
    return jsonify(response)

app.register_blueprint(api, url_prefix="/api")

if __name__ == '__main__':
    app.run() # run the server.
