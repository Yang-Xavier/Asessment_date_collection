from datetime import datetime
from adc.application import *

import drop_tables
import create_tables

# users.
users = [User(id="37", name="LTM", usertype="ltm", email="ltm@sheffield.ac.uk"),
         User(id="36", name="Tutor", usertype="tutor", email="tutor@sheffield.ac.uk"),
       User(id="1", name="Chris Murray", usertype="academic", email="Chris_Murray@sheffield.ac.uk"),
User(id="2", name="Guy Brown", usertype="academic", email="Guy_Brown@sheffield.ac.uk"),
User(id="3", name="Dawn Walker", usertype="academic", email="Dawn_Walker@sheffield.ac.uk"),
User(id="4", name="K.Bogdanov", usertype="academic", email="K.Bogdanov@sheffield.ac.uk"),
User(id="5", name="Paul Watton", usertype="academic", email="Paul_Watton@sheffield.ac.uk"),
User(id="6", name="Siobhan", usertype="academic", email="Siobhan@sheffield.ac.uk"),
User(id="7", name="Rob Gaizauskas", usertype="academic", email="Rob_Gaizauskas@sheffield.ac.uk"),
User(id="8", name="Ramsay Taylor", usertype="academic", email="Ramsay_Taylor@sheffield.ac.uk"),
User(id="9", name="Emma Norling", usertype="academic", email="Emma_Norling@sheffield.ac.uk"),
User(id="10", name="Mark Hepple", usertype="academic", email="Mark_Hepple@sheffield.ac.uk"),
User(id="11", name="Jon Barker", usertype="academic", email="Jon_Barker@sheffield.ac.uk"),
User(id="12", name="Dr Anthony J H Simons", usertype="academic", email="Dr_Anthony_J_H_Simons@sheffield.ac.uk"),
User(id="13", name="Phil Green", usertype="academic", email="Phil_Green@sheffield.ac.uk"),
User(id="14", name="Kirill bogdanov", usertype="academic", email="Kirill_bogdanov@sheffield.ac.uk"),
User(id="15", name="Richard Clayton", usertype="academic", email="Richard_Clayton@sheffield.ac.uk"),
User(id="16", name="Roger Moore", usertype="academic", email="Roger_Moore@sheffield.ac.uk"),
User(id="17", name="steve maddock", usertype="academic", email="steve_maddock@sheffield.ac.uk"),
User(id="18", name="Hamish Cunningham", usertype="academic", email="Hamish_Cunningham@sheffield.ac.uk"),
User(id="19", name="Neil Walkinshaw", usertype="academic", email="Neil_Walkinshaw@sheffield.ac.uk"),
User(id="20", name="Haiping Lu", usertype="academic", email="Haiping_Lu@sheffield.ac.uk"),
User(id="21", name="Fabio Ciravegna", usertype="academic", email="Fabio_Ciravegna@sheffield.ac.uk"),
User(id="22", name="John A Clark", usertype="academic", email="John_A_Clark@sheffield.ac.uk"),
User(id="23", name="Yoshi Gotoh", usertype="academic", email="Yoshi_Gotoh@sheffield.ac.uk"),
User(id="24", name="Heidi Christensen", usertype="academic", email="Heidi_Christensen@sheffield.ac.uk"),
User(id="25", name="Harriet Holman", usertype="academic", email="Harriet_Holman@sheffield.ac.uk"),
User(id="26", name="Amanda Sharkey", usertype="academic", email="Amanda_Sharkey@sheffield.ac.uk"),
User(id="27", name="Mark Stevenson", usertype="academic", email="Mark_Stevenson@sheffield.ac.uk"),
User(id="28", name="Maria-Cruz Villa-Uriol", usertype="academic", email="Maria-Cruz_Villa-Uriol@sheffield.ac.uk"),
User(id="29", name="Dirk Sudholt", usertype="academic", email="Dirk_Sudholt@sheffield.ac.uk"),
User(id="30", name="Georg Struth", usertype="academic", email="Georg_Struth@sheffield.ac.uk"),
User(id="31", name="Mike Stannett", usertype="academic", email="Mike_Stannett@sheffield.ac.uk"),
User(id="32", name="Achim D. Brucker", usertype="academic", email="Achim_D._Brucker@sheffield.ac.uk"),
User(id="33", name="Haiping Lu ", usertype="academic", email="Haiping_Lu_@sheffield.ac.uk"),
User(id="34", name="Tony Prescott", usertype="academic", email="Tony_Prescott@sheffield.ac.uk"),
User(id="35", name="Eleni Vasilaki", usertype="academic", email="Eleni_Vasilaki@sheffield.ac.uk")
         ]


# modules.
modules = [Module(id="0", code="COM3301", name="COM3301", semester="both", academic=17),
Module(id="1", code="COM3550", name="COM3550", semester="both", academic=23),
Module(id="2", code="COM4520/6520", name="COM4520/6520", semester="both", academic=7),
Module(id="3", code="COM4525", name="COM4525", semester="both", academic=14),
Module(id="4", code="COM1001", name="COM1001", semester="one", academic=32),
Module(id="5", code="COM1006", name="COM1006", semester="one", academic=33),
Module(id="6", code="COM1008", name="COM1008", semester="one", academic=15),
Module(id="7", code="COM160/161", name="COM160/161", semester="one", academic=10),
Module(id="8", code="COM2004/3004", name="COM2004/3004", semester="one", academic=15),
Module(id="9", code="COM2008/3008", name="COM2008/3008", semester="one", academic=28),
Module(id="10", code="COM2108", name="COM2108", semester="one", academic=29),
Module(id="11", code="COM3310", name="COM3310", semester="one", academic=14),
Module(id="12", code="COM3502", name="COM3502", semester="one", academic=23),
Module(id="13", code="COM3503", name="COM3503", semester="one", academic=13),
Module(id="14", code="COM3505", name="COM3505", semester="one", academic=31),
Module(id="15", code="COM4115/6115", name="COM4115/6115", semester="one", academic=24),
Module(id="16", code="COM4502/6502", name="COM4502/6502", semester="one", academic=12),
Module(id="17", code="COM4503/6503", name="COM4503/6503", semester="one", academic=4),
Module(id="18", code="COM4506/6506", name="COM4506/6506", semester="one", academic=2),
Module(id="19", code="COM4509/6509", name="COM4509/6509", semester="one", academic=22),
Module(id="20", code="COM4510/6510", name="COM4510/6510", semester="one", academic=10),
Module(id="21", code="COM6014", name="COM6014", semester="one", academic=27),
Module(id="22", code="COM6016", name="COM6016", semester="one", academic=8),
Module(id="23", code="COM6063", name="COM6063", semester="one", academic=10),
Module(id="24", code="COM6105", name="COM6105", semester="one", academic=25),
Module(id="25", code="COM6471", name="COM6471", semester="one", academic=8),
Module(id="26", code="COM6516", name="COM6516", semester="one", academic=14),
Module(id="27", code="COM6534", name="COM6534", semester="one", academic=19),
Module(id="28", code="COM6655", name="COM6655", semester="one", academic=32),
Module(id="29", code="GEE106", name="GEE106", semester="one", academic=20),
Module(id="30", code="COM1002", name="COM1002", semester="two", academic=19),
Module(id="31", code="COM1003", name="COM1003", semester="two", academic=33),
Module(id="32", code="COM1005", name="COM1005", semester="two", academic=9),
Module(id="33", code="COM1009", name="COM1009", semester="two", academic=24),
Module(id="34", code="COM2107", name="COM2107", semester="two", academic=30),
Module(id="35", code="COM2109", name="COM2109", semester="two", academic=33),
Module(id="36", code="COM3190", name="COM3190", semester="two", academic=23),
Module(id="37", code="COM3420", name="COM3420", semester="two", academic=16),
Module(id="38", code="COM3501", name="COM3501", semester="two", academic=5),
Module(id="39", code="COM4501/6501", name="COM4501/6501", semester="two", academic=1),
Module(id="40", code="COM4507/6507", name="COM4507/6507", semester="two", academic=5),
Module(id="41", code="COM6012", name="COM6012", semester="two", academic=30),
Module(id="42", code="COM6013", name="COM6013", semester="two", academic=21),
Module(id="43", code="COM6015", name="COM6015", semester="two", academic=7),
Module(id="44", code="COM6017", name="COM6017", semester="two", academic=32),
Module(id="45", code="COM6102", name="COM6102", semester="two", academic=23),
Module(id="46", code="COM6104", name="COM6104", semester="two", academic=4),
Module(id="47", code="COM6535", name="COM6535", semester="two", academic=17),
Module(id="48", code="COM6905", name="COM6905", semester="two", academic=1),
Module(id="49", code="COM3330", name="COM3330", semester="both", academic=1),
Module(id="50", code="COM3001", name="COM3001", semester="two", academic=24),
Module(id="51", code="COM6009", name="COM6009", semester="two", academic=25),
Module(id="52", code="COM3240/6106", name="COM3240/6106", semester="two", academic=23)
	]

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
           Form(id=9, project_id=0, is_filled=True, module_id=9),
           Form(id=10, project_id=0, is_filled=True, module_id=10),
           Form(id=11, project_id=0, is_filled=True, module_id=11),
           Form(id=12, project_id=0, is_filled=True, module_id=12),
           Form(id=13, project_id=0, is_filled=True, module_id=13),
           Form(id=14, project_id=0, is_filled=True, module_id=14),
           Form(id=15, project_id=0, is_filled=True, module_id=15),
           Form(id=16, project_id=0, is_filled=True, module_id=16),
           Form(id=17, project_id=0, is_filled=True, module_id=17),
           Form(id=18, project_id=0, is_filled=True, module_id=18),
           Form(id=19, project_id=0, is_filled=True, module_id=19),
           Form(id=20, project_id=0, is_filled=True, module_id=20),
           Form(id=21, project_id=0, is_filled=True, module_id=21),
           Form(id=22, project_id=0, is_filled=True, module_id=22),
           Form(id=23, project_id=0, is_filled=True, module_id=23),
           Form(id=24, project_id=0, is_filled=True, module_id=24),
           Form(id=25, project_id=0, is_filled=True, module_id=25),
           Form(id=26, project_id=0, is_filled=True, module_id=26),
           Form(id=27, project_id=0, is_filled=True, module_id=27),
           Form(id=28, project_id=0, is_filled=True, module_id=28),
           Form(id=29, project_id=0, is_filled=True, module_id=29),
           Form(id=30, project_id=0, is_filled=True, module_id=30),
           Form(id=31, project_id=0, is_filled=True, module_id=31),
           Form(id=32, project_id=0, is_filled=True, module_id=32),
           Form(id=33, project_id=0, is_filled=True, module_id=33),
           Form(id=34, project_id=0, is_filled=True, module_id=34),
           Form(id=35, project_id=0, is_filled=True, module_id=35),
           Form(id=36, project_id=0, is_filled=True, module_id=36),
           Form(id=37, project_id=0, is_filled=True, module_id=37),
           Form(id=38, project_id=0, is_filled=True, module_id=38),
           Form(id=39, project_id=0, is_filled=True, module_id=39),
           Form(id=40, project_id=0, is_filled=True, module_id=40),
           Form(id=41, project_id=0, is_filled=True, module_id=41),
           Form(id=42, project_id=0, is_filled=True, module_id=42),
           Form(id=43, project_id=0, is_filled=True, module_id=43),
           Form(id=44, project_id=0, is_filled=True, module_id=44),
           Form(id=45, project_id=0, is_filled=True, module_id=45),
           Form(id=46, project_id=0, is_filled=True, module_id=46),
           Form(id=47, project_id=0, is_filled=True, module_id=47),
           Form(id=48, project_id=0, is_filled=True, module_id=48),
           Form(id=49, project_id=0, is_filled=True, module_id=49),
           Form(id=50, project_id=0, is_filled=True, module_id=50),
           Form(id=51, project_id=0, is_filled=True, module_id=51),
           Form(id=52, project_id=0, is_filled=True, module_id=52)
    ]

# Projects.
projects = [
    Project(id=0,
        name="Assessment Data Collection for 2018/19",
        state="done",
        create_date=datetime.now(),
        due_date=datetime.strptime("03/05/19","%d/%m/%y"),
        forms=forms)
    ]

# assessments.
Assessment(format="Presentation", name="Team PRESENTATION (Part 2)", marks=5, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("10/05/19","%d/%m/%y"),  form=forms[0])
Assessment(format="Presentation", name="Team PRESENTATION (Part 1)", marks=5, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("04/12/18","%d/%m/%y"),  form=forms[0])
Assessment(format="MOLE quiz", name="Breadth of Knowledge Test (Part 2)", marks=5, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("29/03/19","%d/%m/%y"),  form=forms[0])
Assessment(format="MOLE quiz", name="Breadth of Knowledge Test (Part 1)", marks=5, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("13/11/18","%d/%m/%y"),  form=forms[0])
Assessment(format="Assignment", name="Team Project (Part 2)", marks=35, release_date=datetime.strptime("08/02/19","%d/%m/%y"), submission_date=datetime.strptime("14/05/19","%d/%m/%y"),  form=forms[0])
Assessment(format="Assignment", name="Team Project (Part 1)", marks=35, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("11/12/18","%d/%m/%y"),  form=forms[0])
Assessment(format="Assignment", name="Reflection on Performance (Part 2)", marks=5, release_date=datetime.strptime("29/04/19","%d/%m/%y"), submission_date=datetime.strptime("03/05/19","%d/%m/%y"),  form=forms[0])
Assessment(format="Assignment", name="Reflection on Performance (Part 1)", marks=5, release_date=datetime.strptime("26/11/18","%d/%m/%y"), submission_date=datetime.strptime("30/11/18","%d/%m/%y"),  form=forms[0])
Assessment(format="Assignment", name="PORTFOLIO assessment", marks=100, release_date=datetime.strptime("05/10/18","%d/%m/%y"), submission_date=datetime.strptime("20/05/19","%d/%m/%y"),  form=forms[1])
Assessment(format="Presentation", name="Initial PRESENTATION", marks=5, release_date=datetime.strptime("16/10/18","%d/%m/%y"), submission_date=datetime.strptime("06/11/18","%d/%m/%y"),  form=forms[2])
Assessment(format="Presentation", name="Final PRESENTATION (individual)", marks=5, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("16/05/19","%d/%m/%y"),  form=forms[2])
Assessment(format="Group project", name="Individual performance", marks=30, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("17/05/19","%d/%m/%y"),  form=forms[2])
Assessment(format="Assignment", name="Journal Paper (group)", marks=10, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("13/05/19","%d/%m/%y"),  form=forms[2])
Assessment(format="Assignment", name="Interim research report (group)", marks=20, release_date=datetime.strptime("16/10/18","%d/%m/%y"), submission_date=datetime.strptime("10/12/18","%d/%m/%y"),  form=forms[2])
Assessment(format="Assignment", name="Final report (group)", marks=30, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("03/05/19","%d/%m/%y"),  form=forms[2])
Assessment(format="Presentation", name="Team PRESENTATION (Part 2)", marks=5, release_date=datetime.strptime("07/05/19","%d/%m/%y"), submission_date=datetime.strptime("07/05/19","%d/%m/%y"),  form=forms[3])
Assessment(format="Presentation", name="Team PRESENTATION (Part 1)", marks=5, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("03/12/18","%d/%m/%y"),  form=forms[3])
Assessment(format="MOLE quiz", name="Breadth of Knowledge Test (Part 2)", marks=5, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("26/03/19","%d/%m/%y"),  form=forms[3])
Assessment(format="MOLE quiz", name="Breadth of Knowledge Test (Part 1)", marks=5, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("12/11/18","%d/%m/%y"),  form=forms[3])
Assessment(format="Assignment", name="Team Project (Part 2)", marks=35, release_date=datetime.strptime("05/02/19","%d/%m/%y"), submission_date=datetime.strptime("14/05/19","%d/%m/%y"),  form=forms[3])
Assessment(format="Assignment", name="Team Project (Part 1)", marks=35, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("11/12/18","%d/%m/%y"),  form=forms[3])
Assessment(format="Assignment", name="Reflection on Performance (Part 2)", marks=2.5, release_date=datetime.strptime("29/04/19","%d/%m/%y"), submission_date=datetime.strptime("03/05/19","%d/%m/%y"),  form=forms[3])
Assessment(format="Assignment", name="Reflection on Performance (Part 1)", marks=2.5, release_date=datetime.strptime("26/11/18","%d/%m/%y"), submission_date=datetime.strptime("30/11/18","%d/%m/%y"),  form=forms[3])
Assessment(format="Assignment", name="Involvement as a Customer in COM1001", marks=5, release_date=datetime.strptime("30/10/18","%d/%m/%y"), submission_date=datetime.strptime("08/05/19","%d/%m/%y"),  form=forms[3])
Assessment(format="MOLE quiz", name="Mole Quiz", marks=35, release_date=datetime.strptime("12/11/18","%d/%m/%y"), submission_date=datetime.strptime("12/11/18","%d/%m/%y"),  form=forms[4])
Assessment(format="Assignment", name="Individual Ruby ASSIGNMENT", marks=35, release_date=datetime.strptime("20/11/18","%d/%m/%y"), submission_date=datetime.strptime("14/12/18","%d/%m/%y"),  form=forms[4])
Assessment(format="Assignment", name="Group Requirements Elicitation ASSIGNMENT", marks=30, release_date=datetime.strptime("22/10/18","%d/%m/%y"), submission_date=datetime.strptime("23/11/18","%d/%m/%y"),  form=forms[4])
Assessment(format="MOLE quiz", name="Quiz 4", marks=25, release_date=datetime.strptime("23/11/18","%d/%m/%y"), submission_date=datetime.strptime("07/12/18","%d/%m/%y"),  form=forms[5])
Assessment(format="MOLE quiz", name="Quiz 3", marks=25, release_date=datetime.strptime("23/11/18","%d/%m/%y"), submission_date=datetime.strptime("23/11/18","%d/%m/%y"),  form=forms[5])
Assessment(format="MOLE quiz", name="Quiz 2", marks=25, release_date=datetime.strptime("02/11/18","%d/%m/%y"), submission_date=datetime.strptime("02/11/18","%d/%m/%y"),  form=forms[5])
Assessment(format="MOLE quiz", name="Quiz 1", marks=25, release_date=datetime.strptime("19/10/18","%d/%m/%y"), submission_date=datetime.strptime("19/10/18","%d/%m/%y"),  form=forms[5])
Assessment(format="MOLE quiz", name="Mole Quiz 2", marks=15, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("07/12/18","%d/%m/%y"),  form=forms[6])
Assessment(format="MOLE quiz", name="Mole Quiz 1", marks=10, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("26/10/18","%d/%m/%y"),  form=forms[6])
Assessment(format="Assignment", name="ASSIGNMENT 2: Javascript", marks=25, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("10/12/18","%d/%m/%y"),  form=forms[6])
Assessment(format="Assignment", name="ASSIGNMENT 1: Web Site", marks=50, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("26/11/18","%d/%m/%y"),  form=forms[6])
Assessment(format="MOLE quiz", name="Final MCQ Exam", marks=60, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("10/12/18","%d/%m/%y"),  form=forms[7])
Assessment(format="Assessed lab", name="Assessed Lab", marks=40, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("03/12/18","%d/%m/%y"),  form=forms[7])
Assessment(format="Formal exam", name="Exam", marks=50, release_date=datetime.strptime("31/01/19","%d/%m/%y"), submission_date=datetime.strptime("31/01/19","%d/%m/%y"),  form=forms[8])
Assessment(format="Assignment", name="ASSIGNMENT", marks=50, release_date=datetime.strptime("05/11/18","%d/%m/%y"), submission_date=datetime.strptime("12/12/18","%d/%m/%y"),  form=forms[8])
Assessment(format="MOLE quiz", name="MOLE Formal Examination", marks=50, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("01/02/19","%d/%m/%y"),  form=forms[9])
Assessment(format="Group project", name="Individual Testing Report", marks=10, release_date=datetime.strptime("03/12/18","%d/%m/%y"), submission_date=datetime.strptime("07/12/18","%d/%m/%y"),  form=forms[9])
Assessment(format="Group project", name="Group Systems Design Project", marks=40, release_date=datetime.strptime("15/10/18","%d/%m/%y"), submission_date=datetime.strptime("02/12/18","%d/%m/%y"),  form=forms[9])
Assessment(format="Assignment", name="ASSIGNMENT 3: 8-off solitaire part 2", marks=50, release_date=datetime.strptime("26/11/18","%d/%m/%y"), submission_date=datetime.strptime("13/12/18","%d/%m/%y"),  form=forms[10])
Assessment(format="Assignment", name="ASSIGNMENT 2: 8-off Solitaire Part 1", marks=25, release_date=datetime.strptime("05/11/18","%d/%m/%y"), submission_date=datetime.strptime("19/11/18","%d/%m/%y"),  form=forms[10])
Assessment(format="Assignment", name="ASSIGNMENT 1: Bags", marks=25, release_date=datetime.strptime("08/10/18","%d/%m/%y"), submission_date=datetime.strptime("22/10/18","%d/%m/%y"),  form=forms[10])
Assessment(format="Formal exam", name="Exam", marks=40, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("01/02/19","%d/%m/%y"),  form=forms[11])
Assessment(format="Assignment", name="ASSIGNMENT part 2", marks=30, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("14/12/18","%d/%m/%y"),  form=forms[11])
Assessment(format="Assignment", name="ASSIGNMENT part 1", marks=30, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("19/11/18","%d/%m/%y"),  form=forms[11])
Assessment(format="MOLE quiz", name="MOLE Quiz 2", marks=25, release_date=datetime.strptime("14/11/18","%d/%m/%y"), submission_date=datetime.strptime("05/12/18","%d/%m/%y"),  form=forms[12])
Assessment(format="MOLE quiz", name="MOLE Quiz 1", marks=20, release_date=datetime.strptime("14/11/18","%d/%m/%y"), submission_date=datetime.strptime("14/11/18","%d/%m/%y"),  form=forms[12])
Assessment(format="Assignment", name="Main Programming Exercise", marks=45, release_date=datetime.strptime("23/10/18","%d/%m/%y"), submission_date=datetime.strptime("07/12/18","%d/%m/%y"),  form=forms[12])
Assessment(format="Assessed lab", name="Introductory Programming Exercise", marks=10, release_date=datetime.strptime("01/10/18","%d/%m/%y"), submission_date=datetime.strptime("22/10/18","%d/%m/%y"),  form=forms[12])
Assessment(format="Formal exam", name="Exam", marks=60, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("01/02/19","%d/%m/%y"),  form=forms[13])
Assessment(format="Assignment", name="Programming ASSIGNMENT", marks=40, release_date=datetime.strptime("26/10/18","%d/%m/%y"), submission_date=datetime.strptime("05/12/18","%d/%m/%y"),  form=forms[13])
Assessment(format="MOLE quiz", name="MOLE quiz", marks=40, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("10/12/18","%d/%m/%y"),  form=forms[14])
Assessment(format="Assessed lab", name="Lab assessment 2", marks=30, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("14/12/18","%d/%m/%y"),  form=forms[14])
Assessment(format="Assessed lab", name="Lab assessment 1", marks=30, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("02/11/18","%d/%m/%y"),  form=forms[14])
Assessment(format="Formal exam", name="Examination", marks=50, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("01/02/19","%d/%m/%y"),  form=forms[15])
Assessment(format="Assignment", name="ASSIGNMENT 2", marks=25, release_date=datetime.strptime("12/11/18","%d/%m/%y"), submission_date=datetime.strptime("03/12/18","%d/%m/%y"),  form=forms[15])
Assessment(format="Assignment", name="ASSIGNMENT 1", marks=25, release_date=datetime.strptime("22/10/18","%d/%m/%y"), submission_date=datetime.strptime("12/11/18","%d/%m/%y"),  form=forms[15])
Assessment(format="MOLE quiz", name="MOLE Quiz 2", marks=25, release_date=datetime.strptime("14/11/18","%d/%m/%y"), submission_date=datetime.strptime("05/12/18","%d/%m/%y"),  form=forms[16])
Assessment(format="MOLE quiz", name="MOLE Quiz 1", marks=20, release_date=datetime.strptime("14/11/18","%d/%m/%y"), submission_date=datetime.strptime("14/11/18","%d/%m/%y"),  form=forms[16])
Assessment(format="Assignment", name="Main Programming Exercise", marks=45, release_date=datetime.strptime("23/10/18","%d/%m/%y"), submission_date=datetime.strptime("07/12/18","%d/%m/%y"),  form=forms[16])
Assessment(format="Assessed lab", name="Introductory Programming Exercise", marks=10, release_date=datetime.strptime("01/10/18","%d/%m/%y"), submission_date=datetime.strptime("22/10/18","%d/%m/%y"),  form=forms[16])
Assessment(format="Formal exam", name="Exam", marks=40, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("01/02/19","%d/%m/%y"),  form=forms[17])
Assessment(format="Assignment", name="Programming ASSIGNMENT", marks=27, release_date=datetime.strptime("26/10/18","%d/%m/%y"), submission_date=datetime.strptime("05/12/18","%d/%m/%y"),  form=forms[17])
Assessment(format="Assignment", name="ASSIGNMENT 2: Research study", marks=33, release_date=datetime.strptime("26/10/18","%d/%m/%y"), submission_date=datetime.strptime("12/12/18","%d/%m/%y"),  form=forms[17])
Assessment(format="MOLE quiz", name="MOLE quiz 2", marks=20, release_date=datetime.strptime("20/11/18","%d/%m/%y"), submission_date=datetime.strptime("20/11/18","%d/%m/%y"),  form=forms[18])
Assessment(format="MOLE quiz", name="Mole Quiz 1", marks=20, release_date=datetime.strptime("23/10/18","%d/%m/%y"), submission_date=datetime.strptime("23/10/18","%d/%m/%y"),  form=forms[18])
Assessment(format="Assignment", name="State Machine Testing ASSIGNMENT", marks=30, release_date=datetime.strptime("26/10/18","%d/%m/%y"), submission_date=datetime.strptime("09/11/18","%d/%m/%y"),  form=forms[18])
Assessment(format="Assignment", name="Lab work PORTFOLIO", marks=30, release_date=datetime.strptime("26/10/18","%d/%m/%y"), submission_date=datetime.strptime("14/12/18","%d/%m/%y"),  form=forms[18])
Assessment(format="MOLE quiz", name="MCQ", marks=15, release_date=datetime.strptime("05/12/18","%d/%m/%y"), submission_date=datetime.strptime("05/12/18","%d/%m/%y"),  form=forms[19])
Assessment(format="Formal exam", name="Final Exam", marks=50, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("01/02/19","%d/%m/%y"),  form=forms[19])
Assessment(format="Assignment", name="ASSIGNMENT 7 ", marks=7, release_date=datetime.strptime("05/11/18","%d/%m/%y"), submission_date=datetime.strptime("23/11/18","%d/%m/%y"),  form=forms[19])
Assessment(format="Assignment", name="ASSIGNMENT 6", marks=5, release_date=datetime.strptime("29/10/18","%d/%m/%y"), submission_date=datetime.strptime("09/11/18","%d/%m/%y"),  form=forms[19])
Assessment(format="Assignment", name="ASSIGNMENT 5", marks=5, release_date=datetime.strptime("22/10/18","%d/%m/%y"), submission_date=datetime.strptime("02/11/18","%d/%m/%y"),  form=forms[19])
Assessment(format="Assignment", name="ASSIGNMENT 4", marks=5, release_date=datetime.strptime("08/10/18","%d/%m/%y"), submission_date=datetime.strptime("26/10/18","%d/%m/%y"),  form=forms[19])
Assessment(format="Assignment", name="ASSIGNMENT 3", marks=5, release_date=datetime.strptime("08/10/18","%d/%m/%y"), submission_date=datetime.strptime("19/10/18","%d/%m/%y"),  form=forms[19])
Assessment(format="Assignment", name="ASSIGNMENT 2", marks=5, release_date=datetime.strptime("01/10/18","%d/%m/%y"), submission_date=datetime.strptime("12/10/18","%d/%m/%y"),  form=forms[19])
Assessment(format="Assignment", name="ASSIGNMENT 1", marks=3, release_date=datetime.strptime("24/09/18","%d/%m/%y"), submission_date=datetime.strptime("05/10/18","%d/%m/%y"),  form=forms[19])
Assessment(format="Assignment", name="Final ASSIGNMENT", marks=100, release_date=datetime.strptime("22/10/18","%d/%m/%y"), submission_date=datetime.strptime("14/12/18","%d/%m/%y"),  form=forms[20])
Assessment(format="Formal exam", name="Podcast Creation: Fundamental Security Properties and Mechanisms", marks=10, release_date=datetime.strptime("10/12/18","%d/%m/%y"), submission_date=datetime.strptime("25/01/19","%d/%m/%y"),  form=forms[21])
Assessment(format="Formal exam", name="Formal Examination 1: Fundmental Security Properties and Mechanisms", marks=90, release_date=datetime.strptime("01/02/19","%d/%m/%y"), submission_date=datetime.strptime("01/02/18","%d/%m/%y"),  form=forms[21])
Assessment(format="Assignment", name="Forensics Research ASSIGNMENT", marks=50, release_date=datetime.strptime("12/12/18","%d/%m/%y"), submission_date=datetime.strptime("25/01/19","%d/%m/%y"),  form=forms[22])
Assessment(format="Assessed lab", name="Forensics Lab", marks=50, release_date=datetime.strptime("21/01/19","%d/%m/%y"), submission_date=datetime.strptime("21/01/18","%d/%m/%y"),  form=forms[22])
Assessment(format="Formal exam", name="formal examination", marks=80, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("01/02/19","%d/%m/%y"),  form=forms[23])
Assessment(format="Assignment", name="report ASSIGNMENT", marks=20, release_date=datetime.strptime("27/09/18","%d/%m/%y"), submission_date=datetime.strptime("26/11/18","%d/%m/%y"),  form=forms[23])
Assessment(format="Portfolio", name="PORTFOLIO", marks=100, release_date=datetime.strptime("24/09/18","%d/%m/%y"), submission_date=datetime.strptime("10/12/18","%d/%m/%y"),  form=forms[24])
Assessment(format="Assignment", name="ASSIGNMENT 3", marks=60, release_date=datetime.strptime("23/11/18","%d/%m/%y"), submission_date=datetime.strptime("14/12/18","%d/%m/%y"),  form=forms[25])
Assessment(format="Assignment", name="ASSIGNMENT 2", marks=30, release_date=datetime.strptime("02/11/18","%d/%m/%y"), submission_date=datetime.strptime("09/11/18","%d/%m/%y"),  form=forms[25])
Assessment(format="Assignment", name="ASSIGNMENT 1", marks=10, release_date=datetime.strptime("05/10/18","%d/%m/%y"), submission_date=datetime.strptime("12/10/18","%d/%m/%y"),  form=forms[25])
Assessment(format="Assignment", name="Final Coursework", marks=60, release_date=datetime.strptime("04/12/18","%d/%m/%y"), submission_date=datetime.strptime("14/01/19","%d/%m/%y"),  form=forms[26])
Assessment(format="Assessed lab", name="Assessed Lab 2", marks=20, release_date=datetime.strptime("10/12/18","%d/%m/%y"), submission_date=datetime.strptime("10/12/18","%d/%m/%y"),  form=forms[26])
Assessment(format="Assessed lab", name="Assessed Lab 1", marks=20, release_date=datetime.strptime("29/10/18","%d/%m/%y"), submission_date=datetime.strptime("29/10/18","%d/%m/%y"),  form=forms[26])
Assessment(format="Presentation", name="Team PRESENTATION", marks=10, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("04/12/18","%d/%m/%y"),  form=forms[27])
Assessment(format="MOLE quiz", name="Breadth of Knowledge Test", marks=10, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("13/11/18","%d/%m/%y"),  form=forms[27])
Assessment(format="Assignment", name="Team Project", marks=70, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("11/12/18","%d/%m/%y"),  form=forms[27])
Assessment(format="Assignment", name="Reflection on Performance", marks=10, release_date=datetime.strptime("26/11/18","%d/%m/%y"), submission_date=datetime.strptime("30/11/18","%d/%m/%y"),  form=forms[27])
Assessment(format="Assignment", name="Final ASSIGNMENT", marks=70, release_date=datetime.strptime("22/11/18","%d/%m/%y"), submission_date=datetime.strptime("07/12/18","%d/%m/%y"),  form=forms[28])
Assessment(format="Assignment", name="ASSIGNMENT 1", marks=30, release_date=datetime.strptime("18/10/18","%d/%m/%y"), submission_date=datetime.strptime("31/10/18","%d/%m/%y"),  form=forms[28])
Assessment(format="MOLE quiz", name="Final MCQ Exam", marks=60, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("10/12/18","%d/%m/%y"),  form=forms[29])
Assessment(format="Assessed lab", name="Assessed Lab", marks=40, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("03/12/18","%d/%m/%y"),  form=forms[29])
Assessment(format="Formal exam", name="Exam", marks=100, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("01/01/18","%d/%m/%y"),  form=forms[30])
Assessment(format="MOLE quiz", name="MOLE Quiz 5", marks=2.5, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("10/05/19","%d/%m/%y"),  form=forms[31])
Assessment(format="MOLE quiz", name="MOLE Quiz 4", marks=2.5, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("29/03/19","%d/%m/%y"),  form=forms[31])
Assessment(format="MOLE quiz", name="MOLE Quiz 3", marks=2.5, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("15/03/19","%d/%m/%y"),  form=forms[31])
Assessment(format="MOLE quiz", name="MOLE Quiz 2", marks=2.5, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("01/03/19","%d/%m/%y"),  form=forms[31])
Assessment(format="MOLE quiz", name="MOLE Quiz 1", marks=2.5, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("15/02/19","%d/%m/%y"),  form=forms[31])
Assessment(format="Problem sheet", name="Lab Problem Sheet 2", marks=30, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("15/03/19","%d/%m/%y"),  form=forms[31])
Assessment(format="Problem sheet", name="Lab Problem Sheet 1", marks=30, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("01/03/19","%d/%m/%y"),  form=forms[31])
Assessment(format="Assignment", name="ASSIGNMENT", marks=27.5, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("10/05/19","%d/%m/%y"),  form=forms[31])
Assessment(format="Group project", name="Semester 2 Exam", marks=25, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("01/06/18","%d/%m/%y"),  form=forms[32])
Assessment(format="Assignment", name="Semester 2 ASSIGNMENT 1: Searching Word Lattices", marks=50, release_date=datetime.strptime("25/02/19","%d/%m/%y"), submission_date=datetime.strptime("18/03/19","%d/%m/%y"),  form=forms[32])
Assessment(format="Assignment", name="ASSIGNMENT 2:  Rule Networks", marks=50, release_date=datetime.strptime("25/03/18","%d/%m/%y"), submission_date=datetime.strptime("30/04/18","%d/%m/%y"),  form=forms[32])
Assessment(format="Formal exam", name="Exam", marks=20, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("01/06/18","%d/%m/%y"),  form=forms[33])
Assessment(format="Problem sheet", name="Third marked problem sheet", marks=20, release_date=datetime.strptime("18/03/18","%d/%m/%y"), submission_date=datetime.strptime("25/03/18","%d/%m/%y"),  form=forms[33])
Assessment(format="Problem sheet", name="Second marked problem sheet", marks=20, release_date=datetime.strptime("04/03/18","%d/%m/%y"), submission_date=datetime.strptime("11/03/18","%d/%m/%y"),  form=forms[33])
Assessment(format="Problem sheet", name="Fourth marked problem sheet", marks=20, release_date=datetime.strptime("18/03/18","%d/%m/%y"), submission_date=datetime.strptime("29/04/18","%d/%m/%y"),  form=forms[33])
Assessment(format="Problem sheet", name="First marked problem sheet", marks=20, release_date=datetime.strptime("18/02/18","%d/%m/%y"), submission_date=datetime.strptime("25/02/18","%d/%m/%y"),  form=forms[33])
Assessment(format="Formal exam", name="exam", marks=100, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("06/01/18","%d/%m/%y"),  form=forms[34])
Assessment(format="Formal exam", name="n/a", marks=100, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("01/06/19","%d/%m/%y"),  form=forms[35])
Assessment(format="Formal exam", name="Exam", marks=70, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("01/06/19","%d/%m/%y"),  form=forms[36])
Assessment(format="Assignment", name="Erlang ASSIGNMENT", marks=30, release_date=datetime.strptime("05/04/19","%d/%m/%y"), submission_date=datetime.strptime("17/05/19","%d/%m/%y"),  form=forms[36])
Assessment(format="Presentation", name="Time sheets", marks=5, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("20/05/19","%d/%m/%y"),  form=forms[37])
Assessment(format="Assignment", name="Moderated Staff Assessment", marks=40, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("20/05/19","%d/%m/%y"),  form=forms[37])
Assessment(format="Assignment", name="Moderated Client Assessment", marks=50, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("13/05/19","%d/%m/%y"),  form=forms[37])
Assessment(format="Assignment", name="Individual reflection", marks=5, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("20/05/19","%d/%m/%y"),  form=forms[37])
Assessment(format="MOLE quiz", name="MOLE Quiz 4", marks=9, release_date=datetime.strptime("19/03/19","%d/%m/%y"), submission_date=datetime.strptime("03/05/19","%d/%m/%y"),  form=forms[38])
Assessment(format="MOLE quiz", name="MOLE Quiz 3", marks=9, release_date=datetime.strptime("19/03/19","%d/%m/%y"), submission_date=datetime.strptime("24/03/19","%d/%m/%y"),  form=forms[38])
Assessment(format="MOLE quiz", name="MOLE Quiz 2", marks=9, release_date=datetime.strptime("04/03/19","%d/%m/%y"), submission_date=datetime.strptime("09/03/19","%d/%m/%y"),  form=forms[38])
Assessment(format="MOLE quiz", name="Mole Quiz 1", marks=3, release_date=datetime.strptime("11/02/19","%d/%m/%y"), submission_date=datetime.strptime("15/02/19","%d/%m/%y"),  form=forms[38])
Assessment(format="Formal exam", name="Exam", marks=70, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("06/01/19","%d/%m/%y"),  form=forms[38])
Assessment(format="MOLE quiz", name="MOLE Quiz 4", marks=9, release_date=datetime.strptime("18/03/18","%d/%m/%y"), submission_date=datetime.strptime("02/05/18","%d/%m/%y"),  form=forms[39])
Assessment(format="MOLE quiz", name="MOLE Quiz 3", marks=9, release_date=datetime.strptime("18/03/18","%d/%m/%y"), submission_date=datetime.strptime("23/03/18","%d/%m/%y"),  form=forms[39])
Assessment(format="MOLE quiz", name="MOLE Quiz 2", marks=9, release_date=datetime.strptime("04/03/18","%d/%m/%y"), submission_date=datetime.strptime("09/03/18","%d/%m/%y"),  form=forms[39])
Assessment(format="MOLE quiz", name="MOLE Quiz 1", marks=3, release_date=datetime.strptime("02/11/18","%d/%m/%y"), submission_date=datetime.strptime("02/12/18","%d/%m/%y"),  form=forms[39])
Assessment(format="Formal exam", name="Exam", marks=70, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("01/06/18","%d/%m/%y"),  form=forms[39])
Assessment(format="Formal exam", name="exam", marks=100, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("06/01/18","%d/%m/%y"),  form=forms[40])
Assessment(format="MOLE quiz", name="MCQ 9", marks=2, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("03/04/19","%d/%m/%y"),  form=forms[41])
Assessment(format="MOLE quiz", name="MCQ 8", marks=2, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("27/03/19","%d/%m/%y"),  form=forms[41])
Assessment(format="MOLE quiz", name="MCQ 7", marks=2, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("20/03/19","%d/%m/%y"),  form=forms[41])
Assessment(format="MOLE quiz", name="MCQ 6", marks=2, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("13/03/19","%d/%m/%y"),  form=forms[41])
Assessment(format="MOLE quiz", name="MCQ 5", marks=2, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("06/03/19","%d/%m/%y"),  form=forms[41])
Assessment(format="MOLE quiz", name="MCQ 4", marks=20, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("27/02/19","%d/%m/%y"),  form=forms[41])
Assessment(format="MOLE quiz", name="MCQ 3", marks=20, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("20/02/19","%d/%m/%y"),  form=forms[41])
Assessment(format="MOLE quiz", name="MCQ 2", marks=20, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("13/02/19","%d/%m/%y"),  form=forms[41])
Assessment(format="MOLE quiz", name="MCQ 1", marks=30, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("06/02/19","%d/%m/%y"),  form=forms[41])
Assessment(format="Assignment", name="Cybersecurity and AI Dissertation Project", marks=100, release_date=datetime.strptime("29/03/19","%d/%m/%y"), submission_date=datetime.strptime("11/09/19","%d/%m/%y"),  form=forms[42])
Assessment(format="MOLE quiz", name="MOLE Quizz 2", marks=10, release_date=datetime.strptime("18/03/18","%d/%m/%y"), submission_date=datetime.strptime("23/03/18","%d/%m/%y"),  form=forms[43])
Assessment(format="MOLE quiz", name="MOLE Quiz 3", marks=10, release_date=datetime.strptime("29/04/18","%d/%m/%y"), submission_date=datetime.strptime("03/05/18","%d/%m/%y"),  form=forms[43])
Assessment(format="MOLE quiz", name="MOLE Quiz 1", marks=10, release_date=datetime.strptime("04/03/18","%d/%m/%y"), submission_date=datetime.strptime("09/03/18","%d/%m/%y"),  form=forms[43])
Assessment(format="Formal exam", name="Exam", marks=70, release_date=datetime.strptime("29/04/18","%d/%m/%y"), submission_date=datetime.strptime("01/06/18","%d/%m/%y"),  form=forms[43])
Assessment(format="Assignment", name="Poster ASSIGNMENT", marks=25, release_date=datetime.strptime("29/03/18","%d/%m/%y"), submission_date=datetime.strptime("31/05/18","%d/%m/%y"),  form=forms[44])
Assessment(format="Assignment", name="Group Report", marks=75, release_date=datetime.strptime("17/05/19","%d/%m/%y"), submission_date=datetime.strptime("07/06/19","%d/%m/%y"),  form=forms[44])
Assessment(format="Assignment", name="Stage 3", marks=30, release_date=datetime.strptime("25/03/19","%d/%m/%y"), submission_date=datetime.strptime("29/04/19","%d/%m/%y"),  form=forms[45])
Assessment(format="Assignment", name="Stage 2", marks=35, release_date=datetime.strptime("04/03/19","%d/%m/%y"), submission_date=datetime.strptime("25/03/19","%d/%m/%y"),  form=forms[45])
Assessment(format="Assignment", name="Stage 1", marks=35, release_date=datetime.strptime("11/02/19","%d/%m/%y"), submission_date=datetime.strptime("04/03/19","%d/%m/%y"),  form=forms[45])
Assessment(format="Assignment", name="Software Development ASSIGNMENT", marks=100, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("20/05/19","%d/%m/%y"),  form=forms[46])
Assessment(format="Presentation", name="Team PRESENTATION", marks=10, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("08/05/19","%d/%m/%y"),  form=forms[47])
Assessment(format="MOLE quiz", name="Breadth of Knowledge Test", marks=10, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("27/03/19","%d/%m/%y"),  form=forms[47])
Assessment(format="Assignment", name="Team Project", marks=70, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("14/05/19","%d/%m/%y"),  form=forms[47])
Assessment(format="Assignment", name="Reflection on Performance", marks=10, release_date=datetime.strptime("29/04/19","%d/%m/%y"), submission_date=datetime.strptime("03/05/19","%d/%m/%y"),  form=forms[47])
Assessment(format="Assignment", name="ASSIGNMENT 2 - MSc Project Background Report", marks=80, release_date=datetime.strptime("13/03/18","%d/%m/%y"), submission_date=datetime.strptime("15/05/19","%d/%m/%y"),  form=forms[48])
Assessment(format="Assignment", name="ASSIGNMENT 1 - Peer review", marks=20, release_date=datetime.strptime("27/02/19","%d/%m/%y"), submission_date=datetime.strptime("13/03/19","%d/%m/%y"),  form=forms[48])
Assessment(format="Assignment", name="Semester 2 Review", marks=25, release_date=datetime.strptime("25/03/19","%d/%m/%y"), submission_date=datetime.strptime("24/05/19","%d/%m/%y"),  form=forms[49])
Assessment(format="Assignment", name="Semester 1 Review", marks=25, release_date=datetime.strptime("03/12/18","%d/%m/%y"), submission_date=datetime.strptime("11/01/19","%d/%m/%y"),  form=forms[49])
Assessment(format="Assignment", name="Essay", marks=50, release_date=datetime.strptime("25/02/19","%d/%m/%y"), submission_date=datetime.strptime("03/05/19","%d/%m/%y"),  form=forms[49])
Assessment(format="Formal exam", name="Exam", marks=60, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("01/06/19","%d/%m/%y"),  form=forms[50])
Assessment(format="Assignment", name="ABM Group ASSIGNMENT", marks=40, release_date=datetime.strptime("12/02/19","%d/%m/%y"), submission_date=datetime.strptime("22/03/19","%d/%m/%y"),  form=forms[50])
Assessment(format="Formal exam", name="Exam", marks=35, release_date=datetime.strptime("10/06/18","%d/%m/%y"), submission_date=datetime.strptime("01/06/19","%d/%m/%y"),  form=forms[51])
Assessment(format="Assignment", name="Individual ASSIGNMENT", marks=35, release_date=datetime.strptime("18/03/19","%d/%m/%y"), submission_date=datetime.strptime("13/05/19","%d/%m/%y"),  form=forms[51])
Assessment(format="Assignment", name="ABM Group ASSIGNMENT", marks=30, release_date=datetime.strptime("12/02/19","%d/%m/%y"), submission_date=datetime.strptime("22/03/19","%d/%m/%y"),  form=forms[51])
Assessment(format="Assignment", name="ASSIGNMENT 2", marks=50, release_date=datetime.strptime("02/04/18","%d/%m/%y"), submission_date=datetime.strptime("17/05/18","%d/%m/%y"),  form=forms[52])
Assessment(format="Assignment", name="ASSIGNMENT 1", marks=50, release_date=datetime.strptime("26/02/19","%d/%m/%y"), submission_date=datetime.strptime("29/03/18","%d/%m/%y"),  form=forms[52])

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
