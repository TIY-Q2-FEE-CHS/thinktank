Templates = {};

Templates.addPerson = [
	"<% _.each(posts, function(post, index, list){ %>",
		"<div class=\"aStudent\" data-postId=\"<%=post._id%>\" >",
	    	"<li> <span class=\"glyphicon glyphicon-ok\"> </span> <%= post.title %> </li>",
	    	"<p> <%= post.question %> </p>",
	    "</div>",

     "<% }); %>"
].join("\n");