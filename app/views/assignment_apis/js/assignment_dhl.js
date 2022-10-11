/*var session = wialon.core.Session.getInstance();  
session.initSession('https://hst-api.wialon.com');*/
$(document).ready(function () {
    clientList();
    logout();
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
                        return `<div class="form-check form-switch"><input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked> </div>`;
                    }
                    else {
                        return `<div class="form-check form-switch"><input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"></div>`;
                    }
                }
            }, { 
                "data": "api", 
                render: function ( data, type, row ) {
                    if (data == "S") {
                        return '<div class="form-check form-switch"><input class="form-check-input switch" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked> </div>';
                    }
                    else {
                        return '<div class="form-check form-switch"><input class="form-check-input switch" type="checkbox" role="switch" id="flexSwitchCheckChecked"></div>';
                    }
                }
            },  
            {"data": "nombre_flota_api"},
        ],	
        createdRow: function( row, data, dataIndex ) {
            // Set the data-status attribute, and add a class
            $( row ).find('*').attr('data-id-usuario', data.id_usuario);
            $( row ).find('*').attr('data-wa-token', data.wa_token);
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
            const waToken = $(e.target).attr("data-wa-token") || 0;
            localStorage.setItem('userId', attrUserId);
            localStorage.setItem('waToken', waToken);
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
    changeStatus("#client_list tbody", dataTable);
    authorizeApi("#client_list tbody", dataTable);
};

function changeStatus(tbody, dataTable) {
    $(tbody).on("change", "input.form-check-input", function(e){
        const userId = $(e.target).attr("data-id-usuario");
        const statusCheck = this.checked == true ? 'A' : 'I';
        formData.append("flag", "edit_status_client");
        formData.append("user_id", userId);
        formData.append("status", statusCheck);
        request.onreadystatechange = function () {  
            if (request.readyState == 4 && request.status == 200) {
                var response =JSON.parse(request.responseText);
                if (response.status) {
                    alertify.notify(response.message, 'success', 10, function(){ });
                    setInterval( function () {
                        dataTable.ajax.reload();
                    }, 30000 );
                } else {
                    alertify.error(response.message); 
                }
            }
        }
        request.open('POST', 'app/views/assignment_apis/ajax/user_list_ajax.php', true);
        request.send(formData);
    });
}

function authorizeApi(tbody, dataTable) {
    $(tbody).on("change", "input.switch", function(e){
        const userId = $(e.target).attr("data-id-usuario");
        const statusApi = this.checked == true ? 'S' : 'N';
        formData.append("flag", "authorize_api");
        formData.append("user_id", userId);
        formData.append("api", statusApi);
        request.onreadystatechange = function () {  
            if (request.readyState == 4 && request.status == 200) {
                var response =JSON.parse(request.responseText);
                if (response) {
                    setInterval( function () {
                        dataTable.ajax.reload();
                    }, 30000 );
                } else {
                    console.log("Error en el backend");
                }
            }
        }
        request.open('POST', 'app/views/assignment_apis/ajax/user_list_ajax.php', true);
        request.send(formData);
    });
}

// Logout
function logout() {
	var user = wialon.core.Session.getInstance().getCurrUser(); // get current user
	if (!user){ console.log("You are not logged, click 'login' button"); return; } 
	wialon.core.Session.getInstance().logout( // if user exist - logout
		function (code) { // logout callback
			if (code) console.log(wialon.core.Errors.getErrorText(code)); // logout failed, print error
			else console.log("Logout successfully"); // logout suceed
		}
	);
}