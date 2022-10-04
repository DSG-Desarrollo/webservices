function listUser() {
	$.ajax({
		url : "app/views/list_users.php",
		dataType : "text",
		cache: false,
		success : function(data) {
			$('#principal-contenedor').fadeIn(1000).html(data);
		}
	}); 
}