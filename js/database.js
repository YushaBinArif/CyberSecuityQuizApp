
$( document ).ready(function() {
    
    // var data = { email: $("#inpemail").val(), password: $("#inppassword").val()};
var data = {};
					data.title = "title";
					data.message = "message";
					
    $( "#btnLogin" ).on( "click", function(e) {
        
        var mydata = {};
        mydata.email = $("#inpemail").val();
        mydata.password = $("#inppassword").val();        

        $.ajax('http://localhost:3000/login', {
          type: 'POST',  // http method
          data: mydata ,  // data to submit
          success: function (data, status, xhr) {
              alert(data);
          },
          error: function (jqXhr, textStatus, errorMessage) {
            alert(errorMessage);
          }
      });

    });
    
    
});