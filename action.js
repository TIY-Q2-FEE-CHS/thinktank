$('#todoForm').on("submit",function (event) {
	event.preventDefault();
    // if($('input').val() !== '') {
        var inputValue = $('input').val();
        $('.todoItems').append('<li>' + inputValue + '<a href="">x</a></li>');
        

    // };
    $('input').val('');
    
});

$(document).on('click', 'a', function (e) {
    e.preventDefault();
    $(this).parent().remove();
});

var people[];