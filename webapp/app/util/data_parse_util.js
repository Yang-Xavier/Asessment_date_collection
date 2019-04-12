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

export const parse_date = (str, fmt) => {
    fmt = fmt || 'dd/MM/yyyy';
    var obj = {y: 0, M: 1, d: 0, H: 0, h: 0, m: 0, s: 0, S: 0};
    fmt.replace(/([^yMdHmsS]*?)(([yMdHmsS])\3*)([^yMdHmsS]*?)/g, function(m, $1, $2, $3, $4, idx, old)
    {
        str = str.replace(new RegExp($1+'(\\d{'+$2.length+'})'+$4), function(_m, _$1)
        {
            obj[$3] = parseInt(_$1);
            return '';
        });
        return '';
    });
    obj.M--;
    var date = new Date(obj.y, obj.M, obj.d, obj.H, obj.m, obj.s);
    if(obj.S !== 0) date.setMilliseconds(obj.S);
    return date;
}
