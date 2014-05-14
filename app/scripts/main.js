/*creating the global url*/
var waitingList = "http://tiy-fee-rest.herokuapp.com/collections/thinktank";

$(document).ready(function(){
    ourWaitingList.init();
});

var ourWaitingList = {
    init: function() {
        ourWaitingList.initStyling();
        ourWaitingList.initEvents();
    },

    initStyling: function() {
        ourWaitingList.render();
    },

    initEvents: function() {

    },

    render: function($el, template, data) {
        var tmpl = _.template(template, data);
        $el.html(tmpl);
    },

    renderWaitingList: function() {
      $.ajax({
        url: waitingList,
        type: "GET",
        dataType: "json",
        error: function(jqXHR, status, error) {
          alert("Failed");
        },
        success: function(data) { 
          var posts = window.posts = data;  //allows the use of underscore
          ourWaitingList.render($(""), Templates., posts);      
        }
      });
    },

   addStudent: function() {
    var studentItem = $("input:text").val();
    var studentObj = {
        title: studentItem
      };

      $.ajax({
        url: waitingList,
        type: "POST",
        data: studentObj,
        dataType: "json",
        error: function(jqXHR, status, error) {
            alert("Failed");
          },
          success: function(data) {  
            $("input:text").val("");     
            ourWaitingList.renderWaitingList();
          }
      });
    },

    removeToDo: function(e) {
      var toRemove = $().data("postid"); //grabs the id of a specific post, to be used in an ajax delete

        $.ajax({
          url: "http://tiy-fee-rest.herokuapp.com/collections/thinktank/" + toRemove,
          type: "DELETE",
          error: function(jqXHR, status, error) {
              alert("Failed");
            },
            success: function(data) {      
                
            }
        });
      
    }

};

