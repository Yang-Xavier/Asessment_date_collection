from datetime import datetime
from adc.application import *

import drop_tables
import create_tables

# users.
users = [User(id=0, name="LTM", usertype="ltm", email="ltm@sheffield.ac.uk"),
         User(id=1, name="Chris Murray", usertype="academic", email="Chris_Murray@sheffield.ac.uk"),
         User(id=2, name="Guy Brown", usertype="academic", email="Guy_Brown@sheffield.ac.uk"),
         User(id=3, name="K.Bogdanov", usertype="academic", email="K.Bogdanov@sheffield.ac.uk"),
         User(id=4, name="Paul Watton", usertype="academic", email="Paul_Watton@sheffield.ac.uk"),
         User(id=5, name="Siobhan", usertype="academic", email="Siobhan@sheffield.ac.uk"),
         User(id=6, name="Rob Gaizauskas", usertype="academic", email="Rob_Gaizauskas@sheffield.ac.uk"),
         User(id=7, name="Mark Stevenson", usertype="academic", email="Mark_Stevenson@sheffield.ac.uk"),
         User(id=8, name="Maria-Cruz Villa-Uriol", usertype="academic", email="Maria-Cruz_Villa-Uriol@sheffield.ac.uk"),
         User(id=9, name="Phil Green", usertype="academic", email="Phil_Green@sheffield.ac.uk"),
         User(id=10, name="Dirk Sudholt", usertype="academic", email="Dirk_Sudholt@sheffield.ac.uk")]

# modules.
modules = [Module(id=0, level="PG1", code="COM3301", name="Experiencing Genesys", semester="both", academic=1),
           Module(id=1, level="PG1", code="COM3550", name="Undergraduate Ambassadors Scheme in Computer Science", semester="both", academic=2),
           Module(id=2, level="PG1", code="COM1001", name="Introduction to Software Engineering", semester="one", academic=3),
           Module(id=3, level="PG1", code="COM1002", name="Foundations of Computer Science", semester="one", academic=4),
           Module(id=4, level="PG1", code="COM1003", name="Java Programming", semester="one", academic=5),
           Module(id=5, level="PG1", code="COM1005", name="Machines and Intelligence", semester="one", academic=6),
           Module(id=6, level="PG1", code="COM1002", name="Foundations of Computer Science", semester="two", academic=7),
           Module(id=7, level="PG1", code="COM1003", name="Java Programming", semester="two", academic=8),
           Module(id=8, level="PG1", code="COM1005", name="Machines and Intelligence", semester="two", academic=9),
           Module(id=9, level="PG1", code="COM1009", name="Introduction to Algorithms and Data Structures", semester="two", academic=24)]

# Forms.
forms = [Form(id=0, project_id=0, is_filled=True, module_id=0),
         Form(id=1, project_id=0, is_filled=True, module_id=1),
         Form(id=2, project_id=0, is_filled=True, module_id=2),
         Form(id=3, project_id=0, is_filled=True, module_id=3),
         Form(id=4, project_id=0, is_filled=True, module_id=4),
         Form(id=5, project_id=0, is_filled=True, module_id=5),
         Form(id=6, project_id=0, is_filled=True, module_id=6),
         Form(id=7, project_id=0, is_filled=True, module_id=7),
         Form(id=8, project_id=0, is_filled=True, module_id=8),
         Form(id=9, project_id=0, is_filled=True, module_id=9)]

# Projects.
projects = [
    Project(id=0,
        name="Assessment Data Collection for 2018/19",
        state="done",
        create_date=datetime.strptime("01/04/19","%d/%m/%y"),
        due_date=datetime.strptime("01/05/19","%d/%m/%y"),
        sem1_bgn=datetime.strptime("15/09/19","%d/%m/%y"),
        sem1_end=datetime.strptime("15/12/19","%d/%m/%y"),
        exam1_bgn=datetime.strptime("15/11/19","%d/%m/%y"),
        exam1_end=datetime.strptime("15/12/19","%d/%m/%y"),
        sem2_bgn=datetime.strptime("15/01/20","%d/%m/%y"),
        sem2_end=datetime.strptime("15/05/20","%d/%m/%y"),
        exam2_bgn=datetime.strptime("15/04/20","%d/%m/%y"),
        exam2_end=datetime.strptime("15/05/20","%d/%m/%y"),
        forms=forms)
    ]

# assessments.
Assessment(format="MOLE quiz", name="Breadth of Knowledge Test (Part 1)", marks=5, release_date=datetime.strptime("09/11/18","%d/%m/%y"), submission_date=datetime.strptime("13/11/18","%d/%m/%y"),  form=forms[0])
Assessment(format="Assignment", name="Reflection on Performance (Part 1)", marks=5, release_date=datetime.strptime("26/11/18","%d/%m/%y"), submission_date=datetime.strptime("30/11/18","%d/%m/%y"),  form=forms[0])
Assessment(format="Presentation", name="Team PRESENTATION (Part 1)", marks=5, release_date=datetime.strptime("01/12/18","%d/%m/%y"), submission_date=datetime.strptime("04/12/18","%d/%m/%y"),  form=forms[0])
Assessment(format="Assignment", name="Team Project (Part 1)", marks=35, release_date=datetime.strptime("25/09/18","%d/%m/%y"), submission_date=datetime.strptime("11/12/18","%d/%m/%y"),  form=forms[0])
Assessment(format="MOLE quiz", name="Breadth of Knowledge Test (Part 2)", marks=5, release_date=datetime.strptime("25/03/19","%d/%m/%y"), submission_date=datetime.strptime("29/03/19","%d/%m/%y"),  form=forms[0])
Assessment(format="Assignment", name="Reflection on Performance (Part 2)", marks=5, release_date=datetime.strptime("29/04/19","%d/%m/%y"), submission_date=datetime.strptime("03/05/19","%d/%m/%y"),  form=forms[0])
Assessment(format="Presentation", name="Team PRESENTATION (Part 2)", marks=5, release_date=datetime.strptime("06/05/19","%d/%m/%y"), submission_date=datetime.strptime("10/05/19","%d/%m/%y"),  form=forms[0])
Assessment(format="Assignment", name="Team Project (Part 2)", marks=35, release_date=datetime.strptime("08/02/19","%d/%m/%y"), submission_date=datetime.strptime("14/05/19","%d/%m/%y"),  form=forms[0])
Assessment(format="Assignment", name="PORTFOLIO assessment", marks=100, release_date=datetime.strptime("05/10/18","%d/%m/%y"), submission_date=datetime.strptime("20/05/19","%d/%m/%y"),  form=forms[1])
Assessment(format="MOLE quiz", name="Mole Quiz", marks=35, release_date=datetime.strptime("12/11/18","%d/%m/%y"), submission_date=datetime.strptime("12/11/18","%d/%m/%y"),  form=forms[2])
Assessment(format="Assignment", name="Individual Ruby ASSIGNMENT", marks=35, release_date=datetime.strptime("20/11/18","%d/%m/%y"), submission_date=datetime.strptime("14/12/18","%d/%m/%y"),  form=forms[2])
Assessment(format="Assignment", name="Group Requirements Elicitation ASSIGNMENT", marks=30, release_date=datetime.strptime("22/10/18","%d/%m/%y"), submission_date=datetime.strptime("23/11/18","%d/%m/%y"),  form=forms[2])
Assessment(format="MOLE quiz", name="MOLE Quiz 1", marks=35, release_date=datetime.strptime("31/10/18","%d/%m/%y"), submission_date=datetime.strptime("31/10/18","%d/%m/%y"),  form=forms[3])
Assessment(format="MOLE quiz", name="MOLE Quiz 2", marks=35, release_date=datetime.strptime("12/12/18","%d/%m/%y"), submission_date=datetime.strptime("12/12/18","%d/%m/%y"),  form=forms[3])
Assessment(format="Problem sheet", name="Exercise Sheet 1", marks=7.5, release_date=datetime.strptime("02/10/18","%d/%m/%y"), submission_date=datetime.strptime("09/10/18","%d/%m/%y"),  form=forms[3])
Assessment(format="Problem sheet", name="Exercise Sheet 2", marks=7.5, release_date=datetime.strptime("16/10/18","%d/%m/%y"), submission_date=datetime.strptime("23/10/18","%d/%m/%y"),  form=forms[3])
Assessment(format="Problem sheet", name="Exercise Sheet 3", marks=7.5, release_date=datetime.strptime("13/11/18","%d/%m/%y"), submission_date=datetime.strptime("20/11/18","%d/%m/%y"),  form=forms[3])
Assessment(format="Problem sheet", name="Exercise Sheet 4", marks=7.5, release_date=datetime.strptime("27/11/18","%d/%m/%y"), submission_date=datetime.strptime("04/12/18","%d/%m/%y"),  form=forms[3])
Assessment(format="MOLE quiz", name="Quiz 1", marks=8, release_date=datetime.strptime("18/10/18","%d/%m/%y"), submission_date=datetime.strptime("18/10/18","%d/%m/%y"),  form=forms[4])
Assessment(format="MOLE quiz", name="Quiz 2", marks=8, release_date=datetime.strptime("15/11/18","%d/%m/%y"), submission_date=datetime.strptime("15/11/18","%d/%m/%y"),  form=forms[4])
Assessment(format="MOLE quiz", name="Quiz 3", marks=8, release_date=datetime.strptime("06/12/18","%d/%m/%y"), submission_date=datetime.strptime("06/12/18","%d/%m/%y"),  form=forms[4])
Assessment(format="Assignment", name="Assignment 1", marks=6, release_date=datetime.strptime("11/10/18","%d/%m/%y"), submission_date=datetime.strptime("29/10/18","%d/%m/%y"),  form=forms[4])
Assessment(format="Assignment", name="Assignment 2", marks=10, release_date=datetime.strptime("08/11/18","%d/%m/%y"), submission_date=datetime.strptime("26/11/18","%d/%m/%y"),  form=forms[4])
Assessment(format="Assignment", name="Assignment 3", marks=10, release_date=datetime.strptime("22/11/18","%d/%m/%y"), submission_date=datetime.strptime("18/01/19","%d/%m/%y"),  form=forms[4])
Assessment(format="Formal exam", name="Exam", marks=50, release_date=datetime.strptime("20/01/19","%d/%m/%y"), submission_date=datetime.strptime("20/01/19","%d/%m/%y"),  form=forms[4])
Assessment(format="Assessed lab", name="Assessed Lab 1", marks=8, release_date=datetime.strptime("28/09/18","%d/%m/%y"), submission_date=datetime.strptime("05/10/18","%d/%m/%y"),  form=forms[5])
Assessment(format="Assessed lab", name="Assessed Lab 2", marks=8, release_date=datetime.strptime("12/10/18","%d/%m/%y"), submission_date=datetime.strptime("19/10/18","%d/%m/%y"),  form=forms[5])
Assessment(format="Assessed lab", name="Assessed Lab 3", marks=8, release_date=datetime.strptime("26/10/18","%d/%m/%y"), submission_date=datetime.strptime("09/11/18","%d/%m/%y"),  form=forms[5])
Assessment(format="Assessed lab", name="Assessed Lab 4", marks=8, release_date=datetime.strptime("16/11/18","%d/%m/%y"), submission_date=datetime.strptime("23/11/18","%d/%m/%y"),  form=forms[5])
Assessment(format="Assessed lab", name="Assessed Lab 5", marks=8, release_date=datetime.strptime("30/11/18","%d/%m/%y"), submission_date=datetime.strptime("07/12/18","%d/%m/%y"),  form=forms[5])
Assessment(format="MOLE quiz", name="Quiz 1", marks=30, release_date=datetime.strptime("05/11/18","%d/%m/%y"), submission_date=datetime.strptime("05/11/18","%d/%m/%y"),  form=forms[5])
Assessment(format="MOLE quiz", name="Quiz 2", marks=30, release_date=datetime.strptime("10/12/18","%d/%m/%y"), submission_date=datetime.strptime("10/12/18","%d/%m/%y"),  form=forms[5])
Assessment(format="Formal exam", name="Exam", marks=100, release_date=datetime.strptime("01/01/19","%d/%m/%y"), submission_date=datetime.strptime("01/01/19","%d/%m/%y"),  form=forms[6])
Assessment(format="MOLE quiz", name="MOLE Quiz 1", marks=2.5, release_date=datetime.strptime("15/02/19","%d/%m/%y"), submission_date=datetime.strptime("15/02/19","%d/%m/%y"),  form=forms[7])
Assessment(format="MOLE quiz", name="MOLE Quiz 2", marks=2.5, release_date=datetime.strptime("01/03/19","%d/%m/%y"), submission_date=datetime.strptime("01/03/19","%d/%m/%y"),  form=forms[7])
Assessment(format="MOLE quiz", name="MOLE Quiz 3", marks=2.5, release_date=datetime.strptime("15/03/19","%d/%m/%y"), submission_date=datetime.strptime("15/03/19","%d/%m/%y"),  form=forms[7])
Assessment(format="MOLE quiz", name="MOLE Quiz 4", marks=2.5, release_date=datetime.strptime("29/03/19","%d/%m/%y"), submission_date=datetime.strptime("29/03/19","%d/%m/%y"),  form=forms[7])
Assessment(format="MOLE quiz", name="MOLE Quiz 5", marks=2.5, release_date=datetime.strptime("10/05/19","%d/%m/%y"), submission_date=datetime.strptime("10/05/19","%d/%m/%y"),  form=forms[7])
Assessment(format="Problem sheet", name="Lab Problem Sheet 1", marks=5, release_date=datetime.strptime("01/03/19","%d/%m/%y"), submission_date=datetime.strptime("01/03/19","%d/%m/%y"),  form=forms[7])
Assessment(format="Problem sheet", name="Lab Problem Sheet 2", marks=5, release_date=datetime.strptime("15/03/18","%d/%m/%y"), submission_date=datetime.strptime("15/03/19","%d/%m/%y"),  form=forms[7])
Assessment(format="Assignment", name="Assignment", marks=27.5, release_date=datetime.strptime("22/11/18","%d/%m/%y"), submission_date=datetime.strptime("10/05/19","%d/%m/%y"),  form=forms[7])
Assessment(format="Formal exam", name="Exam", marks=50, release_date=datetime.strptime("02/01/19","%d/%m/%y"), submission_date=datetime.strptime("02/01/19","%d/%m/%y"),  form=forms[7])
Assessment(format="Assignment", name="ASSIGNMENT 1: Searching Word Lattices", marks=50, release_date=datetime.strptime("25/02/19","%d/%m/%y"), submission_date=datetime.strptime("18/03/19","%d/%m/%y"),  form=forms[8])
Assessment(format="Assignment", name="ASSIGNMENT 2:  Rule Networks", marks=50, release_date=datetime.strptime("25/03/19","%d/%m/%y"), submission_date=datetime.strptime("30/04/19","%d/%m/%y"),  form=forms[8])
Assessment(format="Problem sheet", name="1st marked problem sheet", marks=7.5, release_date=datetime.strptime("18/02/18","%d/%m/%y"), submission_date=datetime.strptime("25/02/18","%d/%m/%y"),  form=forms[9])
Assessment(format="Problem sheet", name="2nd marked problem sheet", marks=7.5, release_date=datetime.strptime("04/03/18","%d/%m/%y"), submission_date=datetime.strptime("11/03/18","%d/%m/%y"),  form=forms[9])
Assessment(format="Problem sheet", name="3rd marked problem sheet", marks=7.5, release_date=datetime.strptime("18/03/18","%d/%m/%y"), submission_date=datetime.strptime("25/03/18","%d/%m/%y"),  form=forms[9])
Assessment(format="Problem sheet", name="4th marked problem sheet", marks=7.5, release_date=datetime.strptime("01/04/18","%d/%m/%y"), submission_date=datetime.strptime("29/04/18","%d/%m/%y"),  form=forms[9])
Assessment(format="Formal exam", name="Exam", marks=70, release_date=datetime.strptime("01/06/18","%d/%m/%y"), submission_date=datetime.strptime("01/06/18","%d/%m/%y"),  form=forms[9])

# add to session.
for user in users:
    db.session.add(user)
for module in modules:
    db.session.add(module)
for form in forms:
    db.session.add(form)
for project in projects:
    db.session.add(project)

db.session.commit()
