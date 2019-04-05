"""
application.py
- creates a Flask app instance and registers the database object.
"""

import enum
from datetime import datetime

from flask import Flask, Blueprint, jsonify, g, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_httpauth import HTTPBasicAuth
from passlib.apps import custom_app_context as pwd_context
from itsdangerous import (TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired)

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///../adc.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = "desidragons"
db = SQLAlchemy(app)

api = Blueprint('api', __name__)

auth = HTTPBasicAuth()

# ---------------- Association tables -------------------- #

student_module_table = db.Table("student_to_module",
        db.Column("student_id", db.Integer, db.ForeignKey("student.id"), primary_key=True),
        db.Column("module_id", db.Integer, db.ForeignKey("module.id"), primary_key=True))

# ---------------- Models -------------------- #

class User(db.Model):  
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), nullable=False)
    usertype = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False, default="$6$rounds=656000$Mekxk00d5L5we4/3$CwY2NGNDHX1Yt6khinGYUJm/I5s2.3bmjgMLmmsRIVzowR.LWPqIF2KrauyfjuzyWD2MrPToRVNHxYCZAPsFf1")

    def to_dict(self):
        return dict(id=self.id,
                    name=self.name,
                    usertype=str(self.usertype),
                    email=self.email)

    def hash_password(self, password):
        self.password_hash = pwd_context.encrypt(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)

    def generate_auth_token(self, expiration=600):
        s = Serializer(app.config['SECRET_KEY'], expires_in=expiration)
        return s.dumps({ 'id': self.id })

    @staticmethod
    def verify_auth_token(token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except SignatureExpired:
            return None # valid token, but expired.
        except BadSignature:
            return None # invalid token.
        user = User.query.get(data['id'])
        return user

class Module(db.Model):  
    __tablename__ = "module"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    code = db.Column(db.String(10), unique=True, nullable=False)
    name = db.Column(db.String(80), nullable=False)
    semester = db.Column(db.String(80), nullable=False)
    academic = db.Column(db.Integer, db.ForeignKey('user.id')) # foreign key.
    students = db.relationship(
            "Student",
            secondary=student_module_table,
            back_populates="modules") # many to many.

    def to_dict(self):
        return dict(id=self.id,
                    code=self.code,
                    name=self.name,
                    semester=str(self.semester),
                    academic=self.academic,
                    students=self.students)

class Assessment(db.Model):
    __tablename__ = "assessment"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    format = db.Column(db.String(80), nullable=False)
    name = db.Column(db.String(80), nullable=False)
    marks = db.Column(db.Float, nullable=False)
    release_date = db.Column(db.DateTime, nullable=False)
    submission_date = db.Column(db.DateTime, nullable=False)
    form_id = db.Column(db.Integer, db.ForeignKey('form.id'), nullable=False) # foreign key.

    def to_dict(self):
        return dict(id=self.id,
                    format=str(self.format),
                    name=self.name,
                    marks=self.marks,
                    release_date=self.release_date.strftime("%d/%m/%Y"),
                    submission_date=self.submission_date.strftime("%d/%m/%Y"))

class Student(db.Model):
    __tablename__ = "student"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), nullable=False)
    modules = db.relationship(
            "Module",
            secondary=student_module_table,
            back_populates="students") # many to many.

class Form(db.Model):
    __tablename__ = "form"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    is_filled = db.Column(db.Boolean)
    module_id = db.Column(db.Integer, db.ForeignKey('module.id'), nullable=False) # foreign key.
    assessments = db.relationship('Assessment', backref='form', lazy=True) # one to many.
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False) # foreign key.

    def to_dict(self):
        return dict(id=self.id,
                    is_filled=self.is_filled,
                    project_id=self.project_id,
                    module_id=self.module_id,
                    assessments=[a.to_dict() for a in self.assessments])

class Project(db.Model):
    __tablename__ = "project"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), nullable=False)
    state = db.Column(db.String(80), nullable=False)
    create_date = db.Column(db.DateTime, nullable=False)
    due_date = db.Column(db.DateTime, nullable=False)
    forms = db.relationship('Form', backref='project', lazy=True) # one to many.

    def to_dict(self):
        return dict(id=self.id,
                    name=self.name,
                    state=str(self.state),
                    create_date=self.create_date.strftime("%d/%m/%Y"),
                    due_date=self.due_date.strftime("%d/%m/%Y"),
                    forms=[e.to_dict() for e in self.forms])

# ---------------- Other -------------------- #

@auth.verify_password
def verify_password(email_or_token, password):
    # first try to authenticate by token
    user = User.verify_auth_token(email_or_token)
    if not user:
        # try to authenticate with username/password
        user = User.query.filter_by(email=email_or_token).first()
        if not user or not user.verify_password(password):
            return False
    g.user = user # set global user.
    return True

# ---------------- Routes -------------------- #

@app.route('/api/hello')
@auth.login_required
def get_resource():
    return jsonify({ 'data': 'Hello, %s!' % g.user.name })

@app.route('/api/token')
@auth.login_required
def get_auth_token():
    token = g.user.generate_auth_token()
    print("Returning token", token)
    return jsonify({ 'token': token.decode('ascii') })

@app.route('/api/401')
@auth.login_required
def send_401():
    return "Not authorized", 401

@app.route('/api/module/', methods=['GET'])
@auth.login_required
def get_module():
    return jsonify({"modules":[module.to_dict() for module in Module.query.all()]})

@app.route('/api/user', methods=['GET'])
@auth.login_required
def get_user():
    return jsonify({"user":g.user.to_dict()})

@app.route('/api/project', methods=['POST'])
@auth.login_required
def create_project():
    if g.user.usertype != "ltm":
        print("Only LTM can create projects")
        return jsonify({"error":"Invalid module ID in project form"})

    # Get request params.
    json = request.get_json()
    project = Project(name=json["name"],
            state="created",
            create_date=datetime.now().strftime("%d/%m/%Y"),
            due_date=json["due_date"])
    db.session.add(project)
    db.session.flush()
    db.session.refresh(project)
    for module_id in json["modules"]:
        form = Form(is_filled=False,
                module_id=module_id,
                project_id=project.id)
        db.session.add(form)
    db.session.commit()
    return jsonify({"status":"success"})

@app.route('/api/project', methods=['GET'])
@auth.login_required
def get_project():
    all_projects = Project.query.all()

    # return complete projects for LTM.
    if g.user.usertype in ("ltm", "tutor"):
        print("Returning all projects for LTM and tutor")
        return jsonify({"projects":[project.to_dict() for project in all_projects]})

    # return projects with only module forms for academic.
    elif g.user.usertype == "academic":
        print("Returning projects for user", g.user.id)

        # Find module of current academic.
        acad_module = Module.query.filter_by(academic=g.user.id).first()
        print("Module of current user", acad_module)

        ret_dict = {"projects":[project.to_dict() for project in all_projects]}

        # delete forms not relevant to current user from dict.
        for project in ret_dict["projects"]:
            new_forms = []
            for form in project["forms"]:
                if form["module_id"] == acad_module.id:
                    new_forms.append(form)
            project["forms"] = new_forms

        return jsonify(ret_dict)

@app.route('/api/project', methods=['PUT'])
@auth.login_required
def update_project():
    pass

app.register_blueprint(api, url_prefix="/api")

if __name__ == '__main__':
    app.run(port=8081) # run the server.
