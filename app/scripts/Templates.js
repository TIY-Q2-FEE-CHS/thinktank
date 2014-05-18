Templates = {};

Templates.addPerson = [
	"<% _.each(posts, function(post, index, list){ %>",
		"<div class=\"aStudent\" data-postId=\"<%=post._id%>\" >",
	    	"<li><h3><span class=\"glyphicon glyphicon-ok\"> </span> <%= post.title %></h3></li>",
	    	"<li><h4> <%= post.question %></h5></li>",
	    "</div>",

     "<% }); %>"
].join("\n");