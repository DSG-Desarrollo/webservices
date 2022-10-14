var editor, created; // use a global for the submit and return data rendering in the examples
var session = wialon.core.Session.getInstance();  
session.initSession('https://hst-api.wialon.com');
var userProfile = JSON.parse(window.localStorage.getItem('userProfile'));
console.log(userProfile);

$(document).ready(function () {
    unitList();
});

var unitList = function() {
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
        //printItems2()
    })

    if (userProfile.userId > 0) {
        obj = {
            "dom": "Bfrtip",
            "destroy":true,
            "order":[],
            "ajax": {
                "method":"POST",
                "url":"app/views/assignment_apis/ajax/unit_list_ajax.php",
                "data": {
                    "flag":"get_units_list", 
                    "user_id":userProfile.userId
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
//var token = localStorage.getItem('waToken');
session.loginToken(userProfile.waToken, loginCallback);

function printItems() {
    $('.DTE_Footer').remove();//Eliminando el footer del modal
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
                console.log(units[i]);
                // append option to select
                $("#units").append("<option value='"+ u.getId() +"'>"+ u.getName()+ "</option>");
                // select2
                var selectData = $('.js-example-basic-single').select2({
                    placeholder: 'Select an option',
                    width: 'resolve',
                    theme: "classic"
                });

                document.getElementById("wa_name").value = selectData.find("option:selected").text();
            }
            document.getElementById("save_units").addEventListener("click", function () {
                saveUnits();
            });
            // bind action to select change event
            $("#units").change( printItems2 );
        }
    );
}

function printItems2() {
    //$('.DTE_Footer').remove();//Eliminando el footer del modal
    var prms = {
        "spec": {
            "itemsType":"avl_unit",
            "propName":"sys_name",
            "propValueMask":"*",
            "sortType":"sys_name"
        },
        "force":1,
        "flags":13644935,
        "from":0,
        "to":4294967295
    }
    var remote = wialon.core.Remote.getInstance();  
    remote.remoteCall('core/search_items', prms, function (code, result) {
        if (code) {
            console.log("error",code);
        }
        for (let i = 0; i < result.items.length; i++) {
            //console.log(result);   
            $("#units").append("<option value='"+ result.items[i].id +"'>"+ result.items[i].nm + "</option>");
            var selectData = $('.js-example-basic-single').select2({
                placeholder: 'Select an option',
                width: 'resolve',
                theme: "classic"
            });      
            /*var obj = result.items[i].pflds  
            for (const key in obj) {
                if (obj[key].n === "registration_plate") {
                    if (obj[key].v === result.items[i].nm) {
                        console.log(result.items[i].pflds );
                    }
                } else {
                    console.log(false);
                }
            }*/
            document.getElementById("wa_name").value = selectData.find("option:selected").text();
            // bind action to select change event
        }
        $("#units").change( getIdUnitWialon );
    });
  }

function getIdUnitWialon() {
    var val = $("#units").val(); // get selected unit id
	if(!val) return; // exit if no unit selected
    var prms = {
        "id":val,
        "flags":13644935,
    }
    var remote = wialon.core.Remote.getInstance();  
    remote.remoteCall('core/search_item', prms, function (code, result) {
        console.log(result.item);
        var vacio = Object.keys(result.item.pflds).length === 0;
        console.log(vacio);
        if (code) {
            console.log("Error", code);
        }
        for (const key in result.item.pflds) {
            console.log(result.item.pflds[key]);
        }
    });
}