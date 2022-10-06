$(document).ready(function () {
    unitList();
});

var unitList = function() {
    const userId = localStorage.getItem('userId');
    var obj
    if (userId > 0) {
        obj = {
            "destroy":true,
            "order":[],
            "ajax": {
                "method":"POST",
                "url":"app/views/assignment_apis/ajax/unit_list_ajax.php",
                "data": {
                    "flag":"get_units_list", 
                    "user_id":userId
                }
            },
            "columns": [
                {"data": "Tid",},
                {"data": "Uid"},
                {"data": "wa_name"},
                {"data": "wa_unit_id"},
                {"data": "estado_unidad"},
            ],									
            "language": language,			
        };
    } else {
        obj = {
            "data":[],
            "language": language,
        }
        console.log("No Id valido");
    }
    $('#unit_list').DataTable(obj);
};