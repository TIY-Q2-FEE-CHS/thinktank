/*creating the global url*/
var waitingList = "http://tiy-fee-rest.herokuapp.com/collections/thinktank";

$(document).ready(function(){
    ourWaitingList.init();
});

var ourWaitingList = {
    init: function() {
        ourWaitingList.initStyling();
        ourWaitingList.initEvents();
        $(".google").hide();
    },

    initStyling: function() {
        ourWaitingList.renderWaitingList();
    },

    initEvents: function() {
      $("#studentForm").on("submit", function(){
          event.preventDefault();
          ourWaitingList.addStudent();
          $(".google").show();

      });

      $(".studentList").on("click", ".glyphicon", function() {
          event.preventDefault();
          //removes the data through ajax and simultaneously from the html(in a super janky process)
          if ($(this).closest("div").hasClass("completed")) {
              $(this).closest("div").removeClass("completed");
              return;
          } else {
              $(this).closest("div").addClass("completed");
              ourWaitingList.removeStudent();
              $(this).closest("div").remove();

          };
      });

    },
    toggleWaitTime : function(){
      var inline=studentObj.length;
      $("#inLine").html(inline);
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

          $.getJSON(waitingList, function(json) {  //counts up and down
                    $("#inLine").html("(" + json.length + ")");
                    $("#waitTime").html("(" + json.length * 10 + ")");
                });      
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
      var toRemove = $(".completed").data("postid"); //grabs the id of a specific post, to be used in an ajax delete
          console.log(toRemove);
      $.ajax({
          url: "http://tiy-fee-rest.herokuapp.com/collections/thinktank/" + toRemove,
          type: "DELETE",
          error: function(jqXHR, status, error) {
                alert("Failed");
            },
            success: function(data) { 
                $.getJSON(waitingList, function(json) {
                    $("#inLine").html("(" + json.length + ")");
                    $("#waitTime").html("(" + json.length * 10 + ")");
                });
            }
        });
      
    }

};

