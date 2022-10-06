$(document).ready(function () {
    clientList();
});

$('#spinner-div').show();

var clientList = function() {
    
    var dataTable = $('#client_list').DataTable({
        "destroy":true,
        "order":[],
        "ajax": {
            "method":"POST",
            "url":"app/views/assignment_apis/ajax/user_list_ajax.php",
            "data": {"flag":"get_client_list"},
            complete: function () {
                $('#spinner-div').hide();//Request is complete so hide spinner
            }
        },
        "columns": [
            {"data": "nombre_comercial",},
            {"data": "cliente"},
            {"data": "email"}, 
            {
                "data": "estado_usuario",
                render: function ( data, type, row ) {
                    if (data == "A") {
                        var value = `id_${data}`;
                        return `<div class="form-check form-switch"><input class="form-check-input" type="checkbox" role="switch" id=${value} checked> </div>`;
                    }
                    else {
                        return `<div class="form-check form-switch"><input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"></div>`;
                    }
                }
            }, { 
                "data": "api", 
                render: function ( data, type, row ) {
                    if (data == "S") {
                        return '<div class="form-check form-switch"><input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked> </div>';
                    }
                    else {
                        return '<div class="form-check form-switch"><input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"></div>';
                    }
                }
            },  
            {"data": "nombre_flota_api"},
            {"defaultContent": "<button type='button' class='btn_detele btn btn-danger' data-placement='bottom' rel='tooltip' title='Eliminar' data-toggle='modal' data-target='#modalEliminar'><i class='fa fa-trash'></i></button>"}
        ],	
        createdRow: function( row, data, dataIndex ) {
            // Set the data-status attribute, and add a class
            $( row ).find('*').attr('data-id-usuario', data.id_usuario);
        },
        "columnDefs": [
            { 
                className: "pointer", 
                "targets": [ 0,1,2,5 ],
                /*'createdCell':  function (td, cellData, rowData, row, col) {
                    $(td).attr('id', 'otherID'); 
                 } */
            }, {
                className: "text-center", 
                "targets": [ 3,4 ],
            }
          ],									
        "language": language,			
    });

    $("#client_list").on("click", "tbody tr", function(e){
        if ($(e.target).closest("td").hasClass("pointer")) {
            var userId = localStorage.getItem('userId');
            const attrUserId = $(e.target).attr("data-id-usuario") || 0;
            localStorage.setItem('userId', attrUserId);
            $.ajax({
                url : "app/views/assignment_apis/view_unit_list.php",
                data: {"user_id":userId},
                dataType : "text",
                cache: false,
                success : function(data) {
                    $('#principal-contenedor').fadeIn(1000).html(data);
                }
            });
        }
    });
};