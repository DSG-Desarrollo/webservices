$(document).ready(function () {
    clientList();
});

var clientList = function() {
    
    var dataTable = $('#client_list').DataTable({
        "destroy":true,
        "order":[],
        "ajax": {
            "method":"POST",
            "url":"app/views/assignment_apis/ajax/user_list_ajax.php"
        },
        "columns": [
            {"data": "nombre_comercial"},
            {"data": "cliente"},
            {"data": "email"},
            {"data": "estado_usuario"},
            {"data": "api"},
            {"data": "nombre_flota_api"},
            {"defaultContent": "<button type='button' class='btn_detele btn btn-danger' data-placement='bottom' rel='tooltip' title='Eliminar' data-toggle='modal' data-target='#modalEliminar'><i class='fa fa-trash'></i></button>"}
        ],										
        "language": language,			
    });

    $('#client_list tbody').on('click', 'tr td', function () {
        var data = dataTable.row(this).data();
        console.log("hola");
    });
};