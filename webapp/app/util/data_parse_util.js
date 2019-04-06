export const projects_data_parsing = (data) =>{
    const new_data = [];
    for(let i in data) {
        let item = {};
        item['status'] = (data[i].forms.filter(asm => asm.is_filled)).length + "/" + data[i].forms.length;
        item['checking'] = data[i].state == '';
        item['done'] = data[i].state == 'done';
        item['pending'] = data[i].state != 'done';
        item = Object.assign(data[i], item);

        item['forms'] = forms_data_parsing(data[i], item);
        new_data.push(item)
    }

    return new_data;
}

export const forms_data_parsing = (data, project) => {
    const forms = [];

    for(let i in data.forms) {

        let form = {};
        form["form_name"] = project["project_name"];
        form["form_id"] = data.forms[i]["id"];
        form["filled"] = data.forms[i]["is_filled"];
        form["module_id"] = data.forms[i]["module_id"];
        form["form_submitted_date"] = data.forms[i]["form_submitted_date"];
        form["assessments"] = data.forms[i]["assessments"];
        form["module"] = [].filter.call(window.global.modules, module => module.id == data.forms[i]["module_id"])[0];
        forms.push(form);
    }

    return forms;
}