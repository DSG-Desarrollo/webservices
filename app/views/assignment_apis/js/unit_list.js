var editor; // use a global for the submit and return data rendering in the examples
$(document).ready(function () {
    unitList();
});

var unitList = function() {
    const userId = localStorage.getItem('userId');
    var obj = {};
    var option = {"Activo":"A", "Inactivo":"I"};
    editor = new $.fn.dataTable.Editor( {
        ajax: "app/views/assignment_apis/ajax/unit_list_ajax.php",
        table: "#unit_list",
        template: "#customForm",
        idSrc: "id_unidad",
        fields: [ {
                label: "Tid:",
                name: "Tid"
            }, {
                label: "Uid:",
                name: "Uid"
            }, {
                label: "Placa:",
                name: "wa_name"
            }, {
                label: "Wialon ID:",
                name: "wa_unit_id"
            },{
                label: "Nombre flota:",
                name: "FleetName"
            }, {
                label: "Estado:",
                name: "estado_unidad",
                placeholder: "Estado de la unidad",
                type: "select",
                ipOpts: option
            }
        ]
    } );
    
    if (userId > 0) {
        obj = {
            "dom": "Bfrtip",
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
            select: true,
            buttons: [
                { extend: "create", editor: editor },
                { extend: "edit",   editor: editor },
                { extend: "remove", editor: editor }
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
    var dataTable = $('#unit_list').DataTable(obj);
    dataTable.buttons().container()
    .appendTo( $('.col-md-6:eq(0)', dataTable.table().container() ) );
};