from datetime import datetime
from adc.application import *

import drop_tables
import create_tables

# users.
users = [User(id="37", name="User1", usertype=UserType.LTM, email="john.cena@sheffield.ac.uk"),
         User(id="36", name="User2", usertype=UserType.TUTOR, email="user.2@sheffield.ac.uk"),
       User(id="1", name="Chris Murray", usertype=UserType.ACADEMIC, email="Chris_Murray@sheffield.ac.uk"),
User(id="2", name="Guy Brown", usertype=UserType.ACADEMIC, email="Guy_Brown@sheffield.ac.uk"),
User(id="3", name="Dawn Walker", usertype=UserType.ACADEMIC, email="Dawn_Walker@sheffield.ac.uk"),
User(id="4", name="K.Bogdanov", usertype=UserType.ACADEMIC, email="K.Bogdanov@sheffield.ac.uk"),
User(id="5", name="Paul Watton", usertype=UserType.ACADEMIC, email="Paul_Watton@sheffield.ac.uk"),
User(id="6", name="Siobhan", usertype=UserType.ACADEMIC, email="Siobhan@sheffield.ac.uk"),
User(id="7", name="Rob Gaizauskas", usertype=UserType.ACADEMIC, email="Rob_Gaizauskas@sheffield.ac.uk"),
User(id="8", name="Ramsay Taylor", usertype=UserType.ACADEMIC, email="Ramsay_Taylor@sheffield.ac.uk"),
User(id="9", name="Emma Norling", usertype=UserType.ACADEMIC, email="Emma_Norling@sheffield.ac.uk"),
User(id="10", name="Mark Hepple", usertype=UserType.ACADEMIC, email="Mark_Hepple@sheffield.ac.uk"),
User(id="11", name="Jon Barker", usertype=UserType.ACADEMIC, email="Jon_Barker@sheffield.ac.uk"),
User(id="12", name="Dr Anthony J H Simons", usertype=UserType.ACADEMIC, email="Dr_Anthony_J_H_Simons@sheffield.ac.uk"),
User(id="13", name="Phil Green", usertype=UserType.ACADEMIC, email="Phil_Green@sheffield.ac.uk"),
User(id="14", name="Kirill bogdanov", usertype=UserType.ACADEMIC, email="Kirill_bogdanov@sheffield.ac.uk"),
User(id="15", name="Richard Clayton", usertype=UserType.ACADEMIC, email="Richard_Clayton@sheffield.ac.uk"),
User(id="16", name="Roger Moore", usertype=UserType.ACADEMIC, email="Roger_Moore@sheffield.ac.uk"),
User(id="17", name="steve maddock", usertype=UserType.ACADEMIC, email="steve_maddock@sheffield.ac.uk"),
User(id="18", name="Hamish Cunningham", usertype=UserType.ACADEMIC, email="Hamish_Cunningham@sheffield.ac.uk"),
User(id="19", name="Neil Walkinshaw", usertype=UserType.ACADEMIC, email="Neil_Walkinshaw@sheffield.ac.uk"),
User(id="20", name="Haiping Lu", usertype=UserType.ACADEMIC, email="Haiping_Lu@sheffield.ac.uk"),
User(id="21", name="Fabio Ciravegna", usertype=UserType.ACADEMIC, email="Fabio_Ciravegna@sheffield.ac.uk"),
User(id="22", name="John A Clark", usertype=UserType.ACADEMIC, email="John_A_Clark@sheffield.ac.uk"),
User(id="23", name="Yoshi Gotoh", usertype=UserType.ACADEMIC, email="Yoshi_Gotoh@sheffield.ac.uk"),
User(id="24", name="Heidi Christensen", usertype=UserType.ACADEMIC, email="Heidi_Christensen@sheffield.ac.uk"),
User(id="25", name="Harriet Holman", usertype=UserType.ACADEMIC, email="Harriet_Holman@sheffield.ac.uk"),
User(id="26", name="Amanda Sharkey", usertype=UserType.ACADEMIC, email="Amanda_Sharkey@sheffield.ac.uk"),
User(id="27", name="Mark Stevenson", usertype=UserType.ACADEMIC, email="Mark_Stevenson@sheffield.ac.uk"),
User(id="28", name="Maria-Cruz Villa-Uriol", usertype=UserType.ACADEMIC, email="Maria-Cruz_Villa-Uriol@sheffield.ac.uk"),
User(id="29", name="Dirk Sudholt", usertype=UserType.ACADEMIC, email="Dirk_Sudholt@sheffield.ac.uk"),
User(id="30", name="Georg Struth", usertype=UserType.ACADEMIC, email="Georg_Struth@sheffield.ac.uk"),
User(id="31", name="Mike Stannett", usertype=UserType.ACADEMIC, email="Mike_Stannett@sheffield.ac.uk"),
User(id="32", name="Achim D. Brucker", usertype=UserType.ACADEMIC, email="Achim_D._Brucker@sheffield.ac.uk"),
User(id="33", name="Haiping Lu ", usertype=UserType.ACADEMIC, email="Haiping_Lu_@sheffield.ac.uk"),
User(id="34", name="Tony Prescott", usertype=UserType.ACADEMIC, email="Tony_Prescott@sheffield.ac.uk"),
User(id="35", name="Eleni Vasilaki", usertype=UserType.ACADEMIC, email="Eleni_Vasilaki@sheffield.ac.uk")
         ]


# modules.
modules = [Module(id="0", code="COM3301", name="COM3301", semester=Semester.BOTH, academic=17),
Module(id="1", code="COM3550", name="COM3550", semester=Semester.BOTH, academic=23),
Module(id="2", code="COM4520/6520", name="COM4520/6520", semester=Semester.BOTH, academic=7),
Module(id="3", code="COM4525", name="COM4525", semester=Semester.BOTH, academic=14),
Module(id="4", code="COM1001", name="COM1001", semester=Semester.ONE, academic=32),
Module(id="5", code="COM1006", name="COM1006", semester=Semester.ONE, academic=33),
Module(id="6", code="COM1008", name="COM1008", semester=Semester.ONE, academic=15),
Module(id="7", code="COM160/161", name="COM160/161", semester=Semester.ONE, academic=10),
Module(id="8", code="COM2004/3004", name="COM2004/3004", semester=Semester.ONE, academic=15),
Module(id="9", code="COM2008/3008", name="COM2008/3008", semester=Semester.ONE, academic=28),
Module(id="10", code="COM2108", name="COM2108", semester=Semester.ONE, academic=29),
Module(id="11", code="COM3310", name="COM3310", semester=Semester.ONE, academic=14),
Module(id="12", code="COM3502", name="COM3502", semester=Semester.ONE, academic=23),
Module(id="13", code="COM3503", name="COM3503", semester=Semester.ONE, academic=13),
Module(id="14", code="COM3505", name="COM3505", semester=Semester.ONE, academic=31),
Module(id="15", code="COM4115/6115", name="COM4115/6115", semester=Semester.ONE, academic=24),
Module(id="16", code="COM4502/6502", name="COM4502/6502", semester=Semester.ONE, academic=12),
Module(id="17", code="COM4503/6503", name="COM4503/6503", semester=Semester.ONE, academic=4),
Module(id="18", code="COM4506/6506", name="COM4506/6506", semester=Semester.ONE, academic=2),
Module(id="19", code="COM4509/6509", name="COM4509/6509", semester=Semester.ONE, academic=22),
Module(id="20", code="COM4510/6510", name="COM4510/6510", semester=Semester.ONE, academic=10),
Module(id="21", code="COM6014", name="COM6014", semester=Semester.ONE, academic=27),
Module(id="22", code="COM6016", name="COM6016", semester=Semester.ONE, academic=8),
Module(id="23", code="COM6063", name="COM6063", semester=Semester.ONE, academic=10),
Module(id="24", code="COM6105", name="COM6105", semester=Semester.ONE, academic=25),
Module(id="25", code="COM6471", name="COM6471", semester=Semester.ONE, academic=8),
Module(id="26", code="COM6516", name="COM6516", semester=Semester.ONE, academic=14),
Module(id="27", code="COM6534", name="COM6534", semester=Semester.ONE, academic=19),
Module(id="28", code="COM6655", name="COM6655", semester=Semester.ONE, academic=32),
Module(id="29", code="GEE106", name="GEE106", semester=Semester.ONE, academic=20),
Module(id="30", code="COM1002", name="COM1002", semester=Semester.TWO, academic=19),
Module(id="31", code="COM1003", name="COM1003", semester=Semester.TWO, academic=33),
Module(id="32", code="COM1005", name="COM1005", semester=Semester.TWO, academic=9),
Module(id="33", code="COM1009", name="COM1009", semester=Semester.TWO, academic=24),
Module(id="34", code="COM2107", name="COM2107", semester=Semester.TWO, academic=30),
Module(id="35", code="COM2109", name="COM2109", semester=Semester.TWO, academic=33),
Module(id="36", code="COM3190", name="COM3190", semester=Semester.TWO, academic=23),
Module(id="37", code="COM3420", name="COM3420", semester=Semester.TWO, academic=16),
Module(id="38", code="COM3501", name="COM3501", semester=Semester.TWO, academic=5),
Module(id="39", code="COM4501/6501", name="COM4501/6501", semester=Semester.TWO, academic=1),
Module(id="40", code="COM4507/6507", name="COM4507/6507", semester=Semester.TWO, academic=5),
Module(id="41", code="COM6012", name="COM6012", semester=Semester.TWO, academic=30),
Module(id="42", code="COM6013", name="COM6013", semester=Semester.TWO, academic=21),
Module(id="43", code="COM6015", name="COM6015", semester=Semester.TWO, academic=7),
Module(id="44", code="COM6017", name="COM6017", semester=Semester.TWO, academic=32),
Module(id="45", code="COM6102", name="COM6102", semester=Semester.TWO, academic=23),
Module(id="46", code="COM6104", name="COM6104", semester=Semester.TWO, academic=4),
Module(id="47", code="COM6535", name="COM6535", semester=Semester.TWO, academic=17),
Module(id="48", code="COM6905", name="COM6905", semester=Semester.TWO, academic=1),
Module(id="49", code="COM3330", name="COM3330", semester=Semester.BOTH, academic=1),
Module(id="50", code="COM3001", name="COM3001", semester=Semester.TWO, academic=24),
Module(id="51", code="COM6009", name="COM6009", semester=Semester.TWO, academic=25),
Module(id="52", code="COM3240/6106", name="COM3240/6106", semester=Semester.TWO, academic=23)
	]

# assessments.
Assessment(format=AssessmentFormat.PRESENTATION, name="Team PRESENTATION (Part 2)", marks=5, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("10/05/19 23:59","%d/%m/%y %H:%M"),  module=modules[0])
Assessment(format=AssessmentFormat.PRESENTATION, name="Team PRESENTATION (Part 1)", marks=5, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("04/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[0])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="Breadth of Knowledge Test (Part 2)", marks=5, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("29/03/19 23:59","%d/%m/%y %H:%M"),  module=modules[0])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="Breadth of Knowledge Test (Part 1)", marks=5, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("13/11/18 23:59","%d/%m/%y %H:%M"),  module=modules[0])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Team Project (Part 2)", marks=35, release_date=datetime.strptime("08/02/19 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("14/05/19 23:59","%d/%m/%y %H:%M"),  module=modules[0])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Team Project (Part 1)", marks=35, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("11/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[0])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Reflection on Performance (Part 2)", marks=5, release_date=datetime.strptime("29/04/19 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("03/05/19 23:59","%d/%m/%y %H:%M"),  module=modules[0])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Reflection on Performance (Part 1)", marks=5, release_date=datetime.strptime("26/11/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("30/11/18 23:59","%d/%m/%y %H:%M"),  module=modules[0])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="PORTFOLIO assessment", marks=100, release_date=datetime.strptime("05/10/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("20/05/19 23:59","%d/%m/%y %H:%M"),  module=modules[1])
Assessment(format=AssessmentFormat.PRESENTATION, name="Initial PRESENTATION", marks=5, release_date=datetime.strptime("16/10/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("06/11/18 23:59","%d/%m/%y %H:%M"),  module=modules[2])
Assessment(format=AssessmentFormat.PRESENTATION, name="Final PRESENTATION (individual)", marks=5, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("16/05/19 23:59","%d/%m/%y %H:%M"),  module=modules[2])
Assessment(format=AssessmentFormat.GROUP_PROJECT, name="Individual performance", marks=30, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("17/05/19 23:59","%d/%m/%y %H:%M"),  module=modules[2])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Journal Paper (group)", marks=10, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("13/05/19 23:59","%d/%m/%y %H:%M"),  module=modules[2])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Interim research report (group)", marks=20, release_date=datetime.strptime("16/10/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("10/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[2])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Final report (group)", marks=30, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("03/05/19 23:59","%d/%m/%y %H:%M"),  module=modules[2])
Assessment(format=AssessmentFormat.PRESENTATION, name="Team PRESENTATION (Part 2)", marks=5, release_date=datetime.strptime("07/05/19 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("07/05/19 23:59","%d/%m/%y %H:%M"),  module=modules[3])
Assessment(format=AssessmentFormat.PRESENTATION, name="Team PRESENTATION (Part 1)", marks=5, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("03/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[3])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="Breadth of Knowledge Test (Part 2)", marks=5, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("26/03/19 23:59","%d/%m/%y %H:%M"),  module=modules[3])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="Breadth of Knowledge Test (Part 1)", marks=5, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("12/11/18 23:59","%d/%m/%y %H:%M"),  module=modules[3])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Team Project (Part 2)", marks=35, release_date=datetime.strptime("05/02/19 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("14/05/19 23:59","%d/%m/%y %H:%M"),  module=modules[3])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Team Project (Part 1)", marks=35, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("11/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[3])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Reflection on Performance (Part 2)", marks=2.5, release_date=datetime.strptime("29/04/19 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("03/05/19 23:59","%d/%m/%y %H:%M"),  module=modules[3])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Reflection on Performance (Part 1)", marks=2.5, release_date=datetime.strptime("26/11/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("30/11/18 23:59","%d/%m/%y %H:%M"),  module=modules[3])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Involvement as a Customer in COM1001", marks=5, release_date=datetime.strptime("30/10/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("08/05/19 23:59","%d/%m/%y %H:%M"),  module=modules[3])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="Mole Quiz", marks=35, release_date=datetime.strptime("12/11/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("12/11/18 23:59","%d/%m/%y %H:%M"),  module=modules[4])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Individual Ruby ASSIGNMENT", marks=35, release_date=datetime.strptime("20/11/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("14/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[4])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Group Requirements Elicitation ASSIGNMENT", marks=30, release_date=datetime.strptime("22/10/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("23/11/18 23:59","%d/%m/%y %H:%M"),  module=modules[4])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="Quiz 4", marks=25, release_date=datetime.strptime("23/11/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("07/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[5])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="Quiz 3", marks=25, release_date=datetime.strptime("23/11/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("23/11/18 23:59","%d/%m/%y %H:%M"),  module=modules[5])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="Quiz 2", marks=25, release_date=datetime.strptime("02/11/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("02/11/18 23:59","%d/%m/%y %H:%M"),  module=modules[5])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="Quiz 1", marks=25, release_date=datetime.strptime("19/10/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("19/10/18 23:59","%d/%m/%y %H:%M"),  module=modules[5])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="Mole Quiz 2", marks=15, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("07/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[6])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="Mole Quiz 1", marks=10, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("26/10/18 23:59","%d/%m/%y %H:%M"),  module=modules[6])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="ASSIGNMENT 2: Javascript", marks=25, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("10/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[6])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="ASSIGNMENT 1: Web Site", marks=50, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("26/11/18 23:59","%d/%m/%y %H:%M"),  module=modules[6])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="Final MCQ Exam", marks=60, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("10/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[7])
Assessment(format=AssessmentFormat.ASSESSED_LAB, name="Assessed Lab", marks=40, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("03/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[7])
Assessment(format=AssessmentFormat.FORMAL_EXAM, name="Exam", marks=50, release_date=datetime.strptime("31/01/19 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("31/01/19 23:59","%d/%m/%y %H:%M"),  module=modules[8])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="ASSIGNMENT", marks=50, release_date=datetime.strptime("05/11/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("12/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[8])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MOLE Formal Examination", marks=50, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("01/02/19 23:59","%d/%m/%y %H:%M"),  module=modules[9])
Assessment(format=AssessmentFormat.GROUP_PROJECT, name="Individual Testing Report", marks=10, release_date=datetime.strptime("03/12/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("07/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[9])
Assessment(format=AssessmentFormat.GROUP_PROJECT, name="Group Systems Design Project", marks=40, release_date=datetime.strptime("15/10/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("02/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[9])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="ASSIGNMENT 3: 8-off solitaire part 2", marks=50, release_date=datetime.strptime("26/11/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("13/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[10])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="ASSIGNMENT 2: 8-off Solitaire Part 1", marks=25, release_date=datetime.strptime("05/11/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("19/11/18 23:59","%d/%m/%y %H:%M"),  module=modules[10])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="ASSIGNMENT 1: Bags", marks=25, release_date=datetime.strptime("08/10/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("22/10/18 23:59","%d/%m/%y %H:%M"),  module=modules[10])
Assessment(format=AssessmentFormat.FORMAL_EXAM, name="Exam", marks=40, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("01/02/19 23:59","%d/%m/%y %H:%M"),  module=modules[11])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="ASSIGNMENT part 2", marks=30, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("14/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[11])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="ASSIGNMENT part 1", marks=30, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("19/11/18 23:59","%d/%m/%y %H:%M"),  module=modules[11])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MOLE Quiz 2", marks=25, release_date=datetime.strptime("14/11/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("05/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[12])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MOLE Quiz 1", marks=20, release_date=datetime.strptime("14/11/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("14/11/18 23:59","%d/%m/%y %H:%M"),  module=modules[12])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Main Programming Exercise", marks=45, release_date=datetime.strptime("23/10/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("07/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[12])
Assessment(format=AssessmentFormat.ASSESSED_LAB, name="Introductory Programming Exercise", marks=10, release_date=datetime.strptime("01/10/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("22/10/18 23:59","%d/%m/%y %H:%M"),  module=modules[12])
Assessment(format=AssessmentFormat.FORMAL_EXAM, name="Exam", marks=60, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("01/02/19 23:59","%d/%m/%y %H:%M"),  module=modules[13])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Programming ASSIGNMENT", marks=40, release_date=datetime.strptime("26/10/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("05/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[13])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MOLE quiz", marks=40, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("10/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[14])
Assessment(format=AssessmentFormat.ASSESSED_LAB, name="Lab assessment 2", marks=30, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("14/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[14])
Assessment(format=AssessmentFormat.ASSESSED_LAB, name="Lab assessment 1", marks=30, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("02/11/18 23:59","%d/%m/%y %H:%M"),  module=modules[14])
Assessment(format=AssessmentFormat.FORMAL_EXAM, name="Examination", marks=50, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("01/02/19 23:59","%d/%m/%y %H:%M"),  module=modules[15])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="ASSIGNMENT 2", marks=25, release_date=datetime.strptime("12/11/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("03/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[15])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="ASSIGNMENT 1", marks=25, release_date=datetime.strptime("22/10/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("12/11/18 23:59","%d/%m/%y %H:%M"),  module=modules[15])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MOLE Quiz 2", marks=25, release_date=datetime.strptime("14/11/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("05/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[16])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MOLE Quiz 1", marks=20, release_date=datetime.strptime("14/11/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("14/11/18 23:59","%d/%m/%y %H:%M"),  module=modules[16])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Main Programming Exercise", marks=45, release_date=datetime.strptime("23/10/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("07/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[16])
Assessment(format=AssessmentFormat.ASSESSED_LAB, name="Introductory Programming Exercise", marks=10, release_date=datetime.strptime("01/10/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("22/10/18 23:59","%d/%m/%y %H:%M"),  module=modules[16])
Assessment(format=AssessmentFormat.FORMAL_EXAM, name="Exam", marks=40, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("01/02/19 23:59","%d/%m/%y %H:%M"),  module=modules[17])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Programming ASSIGNMENT", marks=27, release_date=datetime.strptime("26/10/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("05/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[17])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="ASSIGNMENT 2: Research study", marks=33, release_date=datetime.strptime("26/10/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("12/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[17])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MOLE quiz 2", marks=20, release_date=datetime.strptime("20/11/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("20/11/18 23:59","%d/%m/%y %H:%M"),  module=modules[18])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="Mole Quiz 1", marks=20, release_date=datetime.strptime("23/10/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("23/10/18 23:59","%d/%m/%y %H:%M"),  module=modules[18])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="State Machine Testing ASSIGNMENT", marks=30, release_date=datetime.strptime("26/10/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("09/11/18 23:59","%d/%m/%y %H:%M"),  module=modules[18])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Lab work PORTFOLIO", marks=30, release_date=datetime.strptime("26/10/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("14/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[18])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MCQ", marks=15, release_date=datetime.strptime("05/12/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("05/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[19])
Assessment(format=AssessmentFormat.FORMAL_EXAM, name="Final Exam", marks=50, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("01/02/19 23:59","%d/%m/%y %H:%M"),  module=modules[19])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="ASSIGNMENT 7 ", marks=7, release_date=datetime.strptime("05/11/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("23/11/18 23:59","%d/%m/%y %H:%M"),  module=modules[19])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="ASSIGNMENT 6", marks=5, release_date=datetime.strptime("29/10/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("09/11/18 23:59","%d/%m/%y %H:%M"),  module=modules[19])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="ASSIGNMENT 5", marks=5, release_date=datetime.strptime("22/10/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("02/11/18 23:59","%d/%m/%y %H:%M"),  module=modules[19])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="ASSIGNMENT 4", marks=5, release_date=datetime.strptime("08/10/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("26/10/18 23:59","%d/%m/%y %H:%M"),  module=modules[19])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="ASSIGNMENT 3", marks=5, release_date=datetime.strptime("08/10/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("19/10/18 23:59","%d/%m/%y %H:%M"),  module=modules[19])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="ASSIGNMENT 2", marks=5, release_date=datetime.strptime("01/10/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("12/10/18 23:59","%d/%m/%y %H:%M"),  module=modules[19])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="ASSIGNMENT 1", marks=3, release_date=datetime.strptime("24/09/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("05/10/18 23:59","%d/%m/%y %H:%M"),  module=modules[19])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Final ASSIGNMENT", marks=100, release_date=datetime.strptime("22/10/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("14/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[20])
Assessment(format=AssessmentFormat.FORMAL_EXAM, name="Podcast Creation: Fundamental Security Properties and Mechanisms", marks=10, release_date=datetime.strptime("10/12/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("25/01/19 23:59","%d/%m/%y %H:%M"),  module=modules[21])
Assessment(format=AssessmentFormat.FORMAL_EXAM, name="Formal Examination 1: Fundmental Security Properties and Mechanisms", marks=90, release_date=datetime.strptime("01/02/19 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("01/02/18 23:59","%d/%m/%y %H:%M"),  module=modules[21])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Forensics Research ASSIGNMENT", marks=50, release_date=datetime.strptime("12/12/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("25/01/19 23:59","%d/%m/%y %H:%M"),  module=modules[22])
Assessment(format=AssessmentFormat.ASSESSED_LAB, name="Forensics Lab", marks=50, release_date=datetime.strptime("21/01/19 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("21/01/18 23:59","%d/%m/%y %H:%M"),  module=modules[22])
Assessment(format=AssessmentFormat.FORMAL_EXAM, name="formal examination", marks=80, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("01/02/19 23:59","%d/%m/%y %H:%M"),  module=modules[23])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="report ASSIGNMENT", marks=20, release_date=datetime.strptime("27/09/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("26/11/18 23:59","%d/%m/%y %H:%M"),  module=modules[23])
Assessment(format=AssessmentFormat.PORTFOLIO, name="PORTFOLIO", marks=100, release_date=datetime.strptime("24/09/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("10/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[24])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="ASSIGNMENT 3", marks=60, release_date=datetime.strptime("23/11/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("14/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[25])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="ASSIGNMENT 2", marks=30, release_date=datetime.strptime("02/11/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("09/11/18 23:59","%d/%m/%y %H:%M"),  module=modules[25])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="ASSIGNMENT 1", marks=10, release_date=datetime.strptime("05/10/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("12/10/18 23:59","%d/%m/%y %H:%M"),  module=modules[25])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Final Coursework", marks=60, release_date=datetime.strptime("04/12/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("14/01/19 23:59","%d/%m/%y %H:%M"),  module=modules[26])
Assessment(format=AssessmentFormat.ASSESSED_LAB, name="Assessed Lab 2", marks=20, release_date=datetime.strptime("10/12/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("10/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[26])
Assessment(format=AssessmentFormat.ASSESSED_LAB, name="Assessed Lab 1", marks=20, release_date=datetime.strptime("29/10/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("29/10/18 23:59","%d/%m/%y %H:%M"),  module=modules[26])
Assessment(format=AssessmentFormat.PRESENTATION, name="Team PRESENTATION", marks=10, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("04/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[27])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="Breadth of Knowledge Test", marks=10, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("13/11/18 23:59","%d/%m/%y %H:%M"),  module=modules[27])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Team Project", marks=70, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("11/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[27])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Reflection on Performance", marks=10, release_date=datetime.strptime("26/11/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("30/11/18 23:59","%d/%m/%y %H:%M"),  module=modules[27])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Final ASSIGNMENT", marks=70, release_date=datetime.strptime("22/11/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("07/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[28])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="ASSIGNMENT 1", marks=30, release_date=datetime.strptime("18/10/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("31/10/18 23:59","%d/%m/%y %H:%M"),  module=modules[28])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="Final MCQ Exam", marks=60, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("10/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[29])
Assessment(format=AssessmentFormat.ASSESSED_LAB, name="Assessed Lab", marks=40, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("03/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[29])
Assessment(format=AssessmentFormat.FORMAL_EXAM, name="Exam", marks=100, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("01/01/18 23:59","%d/%m/%y %H:%M"),  module=modules[30])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MOLE Quiz 5", marks=2.5, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("10/05/19 23:59","%d/%m/%y %H:%M"),  module=modules[31])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MOLE Quiz 4", marks=2.5, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("29/03/19 23:59","%d/%m/%y %H:%M"),  module=modules[31])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MOLE Quiz 3", marks=2.5, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("15/03/19 23:59","%d/%m/%y %H:%M"),  module=modules[31])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MOLE Quiz 2", marks=2.5, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("01/03/19 23:59","%d/%m/%y %H:%M"),  module=modules[31])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MOLE Quiz 1", marks=2.5, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("15/02/19 23:59","%d/%m/%y %H:%M"),  module=modules[31])
Assessment(format=AssessmentFormat.PROBLEM_SHEET, name="Lab Problem Sheet 2", marks=30, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("15/03/19 23:59","%d/%m/%y %H:%M"),  module=modules[31])
Assessment(format=AssessmentFormat.PROBLEM_SHEET, name="Lab Problem Sheet 1", marks=30, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("01/03/19 23:59","%d/%m/%y %H:%M"),  module=modules[31])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="ASSIGNMENT", marks=27.5, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("10/05/19 23:59","%d/%m/%y %H:%M"),  module=modules[31])
Assessment(format=AssessmentFormat.GROUP_PROJECT, name="Semester 2 Exam", marks=25, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("01/06/18 23:59","%d/%m/%y %H:%M"),  module=modules[32])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Semester 2 ASSIGNMENT 1: Searching Word Lattices", marks=50, release_date=datetime.strptime("25/02/19 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("18/03/19 23:59","%d/%m/%y %H:%M"),  module=modules[32])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="ASSIGNMENT 2:  Rule Networks", marks=50, release_date=datetime.strptime("25/03/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("30/04/18 23:59","%d/%m/%y %H:%M"),  module=modules[32])
Assessment(format=AssessmentFormat.FORMAL_EXAM, name="Exam", marks=20, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("01/06/18 23:59","%d/%m/%y %H:%M"),  module=modules[33])
Assessment(format=AssessmentFormat.PROBLEM_SHEET, name="Third marked problem sheet", marks=20, release_date=datetime.strptime("18/03/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("25/03/18 23:59","%d/%m/%y %H:%M"),  module=modules[33])
Assessment(format=AssessmentFormat.PROBLEM_SHEET, name="Second marked problem sheet", marks=20, release_date=datetime.strptime("04/03/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("11/03/18 23:59","%d/%m/%y %H:%M"),  module=modules[33])
Assessment(format=AssessmentFormat.PROBLEM_SHEET, name="Fourth marked problem sheet", marks=20, release_date=datetime.strptime("18/03/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("29/04/18 23:59","%d/%m/%y %H:%M"),  module=modules[33])
Assessment(format=AssessmentFormat.PROBLEM_SHEET, name="First marked problem sheet", marks=20, release_date=datetime.strptime("18/02/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("25/02/18 23:59","%d/%m/%y %H:%M"),  module=modules[33])
Assessment(format=AssessmentFormat.FORMAL_EXAM, name="exam", marks=100, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("06/01/18 23:59","%d/%m/%y %H:%M"),  module=modules[34])
Assessment(format=AssessmentFormat.FORMAL_EXAM, name="n/a", marks=100, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("01/06/19 23:59","%d/%m/%y %H:%M"),  module=modules[35])
Assessment(format=AssessmentFormat.FORMAL_EXAM, name="Exam", marks=70, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("01/06/19 23:59","%d/%m/%y %H:%M"),  module=modules[36])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Erlang ASSIGNMENT", marks=30, release_date=datetime.strptime("05/04/19 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("17/05/19 23:59","%d/%m/%y %H:%M"),  module=modules[36])
Assessment(format=AssessmentFormat.PRESENTATION, name="Time sheets", marks=5, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("20/05/19 23:59","%d/%m/%y %H:%M"),  module=modules[37])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Moderated Staff Assessment", marks=40, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("20/05/19 23:59","%d/%m/%y %H:%M"),  module=modules[37])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Moderated Client Assessment", marks=50, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("13/05/19 23:59","%d/%m/%y %H:%M"),  module=modules[37])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Individual reflection", marks=5, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("20/05/19 23:59","%d/%m/%y %H:%M"),  module=modules[37])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MOLE Quiz 4", marks=9, release_date=datetime.strptime("19/03/19 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("03/05/19 23:59","%d/%m/%y %H:%M"),  module=modules[38])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MOLE Quiz 3", marks=9, release_date=datetime.strptime("19/03/19 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("24/03/19 23:59","%d/%m/%y %H:%M"),  module=modules[38])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MOLE Quiz 2", marks=9, release_date=datetime.strptime("04/03/19 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("09/03/19 23:59","%d/%m/%y %H:%M"),  module=modules[38])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="Mole Quiz 1", marks=3, release_date=datetime.strptime("11/02/19 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("15/02/19 23:59","%d/%m/%y %H:%M"),  module=modules[38])
Assessment(format=AssessmentFormat.FORMAL_EXAM, name="Exam", marks=70, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("06/01/19 23:59","%d/%m/%y %H:%M"),  module=modules[38])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MOLE Quiz 4", marks=9, release_date=datetime.strptime("18/03/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("02/05/18 23:59","%d/%m/%y %H:%M"),  module=modules[39])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MOLE Quiz 3", marks=9, release_date=datetime.strptime("18/03/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("23/03/18 23:59","%d/%m/%y %H:%M"),  module=modules[39])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MOLE Quiz 2", marks=9, release_date=datetime.strptime("04/03/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("09/03/18 23:59","%d/%m/%y %H:%M"),  module=modules[39])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MOLE Quiz 1", marks=3, release_date=datetime.strptime("02/11/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("02/12/18 23:59","%d/%m/%y %H:%M"),  module=modules[39])
Assessment(format=AssessmentFormat.FORMAL_EXAM, name="Exam", marks=70, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("01/06/18 23:59","%d/%m/%y %H:%M"),  module=modules[39])
Assessment(format=AssessmentFormat.FORMAL_EXAM, name="exam", marks=100, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("06/01/18 23:59","%d/%m/%y %H:%M"),  module=modules[40])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MCQ 9", marks=2, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("03/04/19 23:59","%d/%m/%y %H:%M"),  module=modules[41])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MCQ 8", marks=2, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("27/03/19 23:59","%d/%m/%y %H:%M"),  module=modules[41])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MCQ 7", marks=2, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("20/03/19 23:59","%d/%m/%y %H:%M"),  module=modules[41])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MCQ 6", marks=2, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("13/03/19 23:59","%d/%m/%y %H:%M"),  module=modules[41])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MCQ 5", marks=2, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("06/03/19 23:59","%d/%m/%y %H:%M"),  module=modules[41])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MCQ 4", marks=20, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("27/02/19 23:59","%d/%m/%y %H:%M"),  module=modules[41])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MCQ 3", marks=20, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("20/02/19 23:59","%d/%m/%y %H:%M"),  module=modules[41])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MCQ 2", marks=20, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("13/02/19 23:59","%d/%m/%y %H:%M"),  module=modules[41])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MCQ 1", marks=30, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("06/02/19 23:59","%d/%m/%y %H:%M"),  module=modules[41])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Cybersecurity and AI Dissertation Project", marks=100, release_date=datetime.strptime("29/03/19 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("11/09/19 23:59","%d/%m/%y %H:%M"),  module=modules[42])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MOLE Quizz 2", marks=10, release_date=datetime.strptime("18/03/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("23/03/18 23:59","%d/%m/%y %H:%M"),  module=modules[43])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MOLE Quiz 3", marks=10, release_date=datetime.strptime("29/04/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("03/05/18 23:59","%d/%m/%y %H:%M"),  module=modules[43])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="MOLE Quiz 1", marks=10, release_date=datetime.strptime("04/03/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("09/03/18 23:59","%d/%m/%y %H:%M"),  module=modules[43])
Assessment(format=AssessmentFormat.FORMAL_EXAM, name="Exam", marks=70, release_date=datetime.strptime("29/04/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("01/06/18 23:59","%d/%m/%y %H:%M"),  module=modules[43])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Poster ASSIGNMENT", marks=25, release_date=datetime.strptime("29/03/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("31/05/18 23:59","%d/%m/%y %H:%M"),  module=modules[44])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Group Report", marks=75, release_date=datetime.strptime("17/05/19 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("07/06/19 23:59","%d/%m/%y %H:%M"),  module=modules[44])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Stage 3", marks=30, release_date=datetime.strptime("25/03/19 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("29/04/19 23:59","%d/%m/%y %H:%M"),  module=modules[45])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Stage 2", marks=35, release_date=datetime.strptime("04/03/19 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("25/03/19 23:59","%d/%m/%y %H:%M"),  module=modules[45])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Stage 1", marks=35, release_date=datetime.strptime("11/02/19 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("04/03/19 23:59","%d/%m/%y %H:%M"),  module=modules[45])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Software Development ASSIGNMENT", marks=100, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("20/05/19 23:59","%d/%m/%y %H:%M"),  module=modules[46])
Assessment(format=AssessmentFormat.PRESENTATION, name="Team PRESENTATION", marks=10, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("08/05/19 23:59","%d/%m/%y %H:%M"),  module=modules[47])
Assessment(format=AssessmentFormat.MOLE_QUIZ, name="Breadth of Knowledge Test", marks=10, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("27/03/19 23:59","%d/%m/%y %H:%M"),  module=modules[47])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Team Project", marks=70, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("14/05/19 23:59","%d/%m/%y %H:%M"),  module=modules[47])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Reflection on Performance", marks=10, release_date=datetime.strptime("29/04/19 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("03/05/19 23:59","%d/%m/%y %H:%M"),  module=modules[47])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="ASSIGNMENT 2 - MSc Project Background Report", marks=80, release_date=datetime.strptime("13/03/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("15/05/19 23:59","%d/%m/%y %H:%M"),  module=modules[48])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="ASSIGNMENT 1 - Peer review", marks=20, release_date=datetime.strptime("27/02/19 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("13/03/19 23:59","%d/%m/%y %H:%M"),  module=modules[48])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Semester 2 Review", marks=25, release_date=datetime.strptime("25/03/19 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("24/05/19 23:59","%d/%m/%y %H:%M"),  module=modules[49])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Semester 1 Review", marks=25, release_date=datetime.strptime("03/12/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("11/01/19 23:59","%d/%m/%y %H:%M"),  module=modules[49])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Essay", marks=50, release_date=datetime.strptime("25/02/19 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("03/05/19 23:59","%d/%m/%y %H:%M"),  module=modules[49])
Assessment(format=AssessmentFormat.FORMAL_EXAM, name="Exam", marks=60, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("01/06/19 23:59","%d/%m/%y %H:%M"),  module=modules[50])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="ABM Group ASSIGNMENT", marks=40, release_date=datetime.strptime("12/02/19 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("22/03/19 23:59","%d/%m/%y %H:%M"),  module=modules[50])
Assessment(format=AssessmentFormat.FORMAL_EXAM, name="Exam", marks=35, release_date=datetime.strptime("10/06/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("01/06/19 23:59","%d/%m/%y %H:%M"),  module=modules[51])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="Individual ASSIGNMENT", marks=35, release_date=datetime.strptime("18/03/19 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("13/05/19 23:59","%d/%m/%y %H:%M"),  module=modules[51])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="ABM Group ASSIGNMENT", marks=30, release_date=datetime.strptime("12/02/19 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("22/03/19 23:59","%d/%m/%y %H:%M"),  module=modules[51])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="ASSIGNMENT 2", marks=50, release_date=datetime.strptime("02/04/18 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("17/05/18 23:59","%d/%m/%y %H:%M"),  module=modules[52])
Assessment(format=AssessmentFormat.ASSIGNMENT, name="ASSIGNMENT 1", marks=50, release_date=datetime.strptime("26/02/19 09:00","%d/%m/%y %H:%M"), submission_date=datetime.strptime("29/03/18 23:59","%d/%m/%y %H:%M"),  module=modules[52])
# add to session.
for user in users:
    db.session.add(user)
for module in modules:
    db.session.add(module)

db.session.commit()
