
const development_env = true;
const RQ_HOST = development_env ? 'http://localhost:8081':'';

const ASM_Format_Options= ["MOLE quiz", "Assignment", "Presentation", "Assessed lab", "Group Systems Design Project", "Formal exam", "Exercise/problem sheet"];

const Form_Field_Title = {
    "asm_format": "What format will this assessment take?",
    "asm_name": 'Please state the name of this assessment (e.g. "Assignment 1", "Exercise sheet 3")',
    "asm_per": "What percentage of the module is this assessment worth?",
    "asm_period":"What dates will this assessment be released to students and handed in (if applicable)?",
};

const Semester_Selection = [ "Semester 1 only", "Semester 2 only","BOTH Semesters"];
const API = {
    token: RQ_HOST + '/api/token',
    user: RQ_HOST + '/api/user',
    project: RQ_HOST + '/api/project',
    modules: RQ_HOST + '/api/module/',
    form: RQ_HOST + '/api/form',
}


export {RQ_HOST, ASM_Format_Options, Form_Field_Title, Semester_Selection, API}
