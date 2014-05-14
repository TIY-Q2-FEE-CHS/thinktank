console.log('working...');
var itemsArray = [];
var myUrl = "http://tiy-fee-rest.herokuapp.com/collections/andrewL"

$(document).ready(function() {
    

        

$('#todoForm').on("submit",function (event) {
	event.preventDefault();
     if($('input').val() !== '') {
        var inputValue = $('input').val();

        var myHelpTicket = {
                content: inputValue
        };

        
		
		itemsArray.push(inputValue); 
        $('.todoItems').append('<li>' + inputValue 
        	+ '<a href=""><span class="glyphicon glyphicon-eject"></span></a></li>');
        $.ajax({
          url: "http://tiy-fee-rest.herokuapp.com/collections/andrewL",
          type: "POST",
          data: myHelpTicket,
          error: function(data){
            alert("not so good")
          },
          success: function(data){
            alert("successful")
          }

});;
     };
        
});

$(document).on('click', 'a', function (e) {
    e.preventDefault();
    $(this).parent().remove();

    $.ajax({
        url:"http://tyi-fee-rest.herokuapp.com/collections/andrewL",
        type: "DELETE",
        dataType: "json",
        data:data,
        error: function(data){
            alert("it didn\'t go anywhere!")
        },
        success: function(data){
                alert("It\'s gone!")
            }
        }
    )
});


});
