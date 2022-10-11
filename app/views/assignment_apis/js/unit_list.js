var editor, created; // use a global for the submit and return data rendering in the examples
var session = wialon.core.Session.getInstance();  
session.initSession('https://hst-api.wialon.com');

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
        }]
    } );

    created = new $.fn.dataTable.Editor({
        table: "#unit_list",
        template: "#addUnit",
    });

    created.on('open', function(e, type){
        printItems()
    })

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
                { extend: "create", editor: created },
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
    }
    var dataTable = $('#unit_list').DataTable(obj);
    dataTable.buttons().container()
    .appendTo( $('.col-md-6:eq(0)', dataTable.table().container() ) );
};

// controlador de respuestas de autorización  
function loginCallback(code) {    
    if (code) {      
        console.log('Error de autorización: ' + code);    
    } 
    else {      
        console.log('Autorización exitosa');    
        //printItems();
    }
}

var token = localStorage.getItem('waToken');
session.loginToken(token, loginCallback);

function printItems() {
    var searchSpec = {
        itemsType:"avl_unit", // el tipo de elementos requeridos del sistema Wialon
        propName: "sys_name", // el nombre de la propiedad que se utilizará como base para la búsqueda
        propValueMask: "*",   // el valor de la propiedad — pueden utilizarse * | , > < =
        sortType: "sys_name"  // el nombre de la propiedad que se utilizará para clasificar la respuesta
    };
    var dataFlags = wialon.item.Item.dataFlag.base |        // el visto de propiedades básicas
                    wialon.item.Unit.dataFlag.lastMessage;  // el visto de datos del último mensaje

    //sess.loadLibrary("itemIcon"); // load Icon Library	
    session.updateDataFlags( // load items to current session
    [{type: "type", data: "avl_unit", flags: dataFlags, mode: 0}], // Items specification
        function (code) { // updateDataFlags callback
            if (code) { console.log(wialon.core.Errors.getErrorText(code)); return; } // exit if error code
            // get loaded 'avl_unit's items  
            var units = session.getItems("avl_unit");
            if (!units || !units.length){ console.log("Units not found"); return; } // check if units found
            for (var i = 0; i< units.length; i++){ // construct Select object using found units
                var u = units[i]; // current unit in cycle
                // append option to select
                console.log( u.getName());
                $("#units").append("<option value='"+ u.getId() +"'>"+ u.getName()+ "</option>");
                $('.js-example-basic-single').select2({
                    placeholder: 'Select an option',
                    width: 'resolve'
                });
            }
            // bind action to select change event
            //$("#units").change( getSelectedUnitInfo );
        }
    );
}