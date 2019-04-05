export const projects_data_parsing = (data) =>{
    const new_data = [];
    for(let i in data) {
        const item = {};
        item['project_id'] = data[i].id;
        item['project_name'] = data[i].name;

        item['checking'] = data[i].state == '';
        item['done'] = data[i].state == 'done';
        item['pending'] = data[i].state == 'created';

        // mock
        item['status'] = "00/00";
        item['project_release'] = "00/00/0000";
        item['project_due'] = "00/00/0000";

        new_data.push(item)
    }

    return new_data;

}

export const forms_data_parsing = (forms) => {

}