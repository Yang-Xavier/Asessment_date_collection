"""
application.py
- creates a Flask app instance and registers the database object.
"""

import enum
import uuid
from functools import wraps

from flask import Flask, Blueprint, jsonify, request, make_response
from flask_sqlalchemy import SQLAlchemy
from passlib.apps import custom_app_context as pwd_context

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///../adc.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = "desidragons"
db = SQLAlchemy(app)

api = Blueprint('api', __name__)

# ---------------- Models -------------------- #

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
    password_hash = db.Column(db.String(128), nullable=False, default='$6$rounds=656000$.pX2Wd1Frzi6fm.a$Ep623xhIV95hk6H2OMlbWl18P7tClRH00GW36N5UkXYvrEQAX2dE3e7J.Kjpk/eqljv3N721RA5o6X9VRk3hn.')
    token = db.Column(db.String(32), nullable=True)

    def to_dict(self):
        return dict(id=self.id,
                    usertype=self.usertype,
                    email=self.email,
                    password=self.password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)

    def generate_token(self):
        self.token = uuid.uuid4().hex
        db.session.add(self)
        db.session.commit()
        return self.token

    def revoke_token(self):
        self.token = None
        db.session.add(self)
        db.session.commit()

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

# ---------------- Other -------------------- #

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.args.get('token')

        if not token:
            return jsonify({'message':'Token is missing'}), 403

        user = User.query.filter_by(token=token).first()
        if not user:
            return jsonify({'message':'Token is invalid'}), 403

        return f(*args, **kwargs)
    return decorated

# ---------------- Routes -------------------- #

@app.route('/login')
def login():
    auth = request.authorization

    if auth:
        # try to authenticate with username/password.
        user = User.query.filter_by(email=auth.username).first()
        if user and user.verify_password(auth.password):
            if user.token:
                token = user.token
                print("Token already exists:", token)
            else:
                token = user.generate_token()
                print("Generated token:", token)
            return jsonify({'token':token})

    return make_response('Not authorized', 401, {'WWW-Authenticate' : 'Basic realm="Login Required"'})

@app.route('/logout')
def logout():
    token = request.args.get('token')

    if not token:
        return jsonify({'message':'Token is missing'}), 403

    user = User.query.filter_by(token=token).first()
    if not user:
        return jsonify({'message':'Token is invalid'}), 403

    user.token = None
    db.session.add(user)
    db.session.commit()

    return "Logout", 401

@app.route('/restricted')
@requires_auth
def hello():
    return jsonify({'message':"Hello"})

# ---------------- Routes -------------------- #

app.register_blueprint(api, url_prefix="/api")

if __name__ == '__main__':
    app.run() # run the server.
