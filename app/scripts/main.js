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
        ourWaitingList.renderWaitingList();
    },

    initEvents: function() {
      $("#studentForm").on("click", "button", function(){
          event.preventDefault();
          ourWaitingList.addStudent();

      });

      $(".studentList").on("click", ".glyphicon", function() {
          event.preventDefault();
          //removes the data through ajax and simultaneously from the html
          $(this).closest("div").remove() && ourWaitingList.removeStudent();
      });

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
          var posts = window.posts = data.reverse();  //allows the use of underscore, reverses the data so newest addition is posted last
          ourWaitingList.render($(".studentList"), Templates.addPerson, posts);      
        }
      });
    },

   addStudent: function() {
    var studentItem = $("input:text").val(); //adds the text from an input to an object, which is then posted in the array through ajax
    var studentQuestion = $(".summary").val();  //takes a student's problem description
    var studentObj = {
        title: studentItem,
        question: studentQuestion
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
            $(".summary").val("");     
            ourWaitingList.renderWaitingList();
          }
      });
    },

    removeStudent: function(e) {
      var toRemove = $(".aStudent").data("postid"); //grabs the id of a specific post, to be used in an ajax delete

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

