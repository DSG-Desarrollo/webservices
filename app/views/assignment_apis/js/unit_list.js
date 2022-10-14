var editor, created; // use a global for the submit and return data rendering in the examples
var session = wialon.core.Session.getInstance();  
session.initSession('https://hst-api.wialon.com');

var userProfile = JSON.parse(window.localStorage.getItem('userProfile'));
console.log(userProfile);

$(document).ready(function () {
    unitList();
    document.getElementById("frmAddUnit").addEventListener("click", function() {
        printItems();
    });
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
        printItems()
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
            var selectData = $('#units').select2({
                placeholder: 'Select an option',
                width: 'resolve',
                theme: "classic",
                dropdownParent: $('#frmAddUnit')
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
    console.log("click");
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