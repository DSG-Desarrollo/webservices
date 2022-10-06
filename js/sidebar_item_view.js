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