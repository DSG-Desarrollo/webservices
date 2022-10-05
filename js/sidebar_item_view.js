function listUser() {
	$.ajax({
		url : "app/views/view_list_users.php",
		dataType : "text",
		cache: false,
		success : function(data) {
			$('#principal-contenedor').fadeIn(1000).html(data);
		}
	}); 
}

function assignmentDHL() {
	$.ajax({
		url : "app/views/assignment_apis/view_assignment_dhl.php",
		dataType : "text",
		cache: false,
		success : function(data) {
			$('#principal-contenedor').fadeIn(1000).html(data);
		}
	}); 
}