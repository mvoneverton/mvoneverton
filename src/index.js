
var $ = require("jquery");
var Backbone = require('backbone');

var app = app || {};

$(document).ready(function() {


	var project = "https://www.github.com/mvoneverton/";

	$(".project").on("click", ".graphic", function () {
		var projectID = $(this).attr("class").split(" ")[1];
		window.open(project + projectID, "_blank");
	});

	$(".contact-form").on("submit", function () {
		 
    var name = $(".name").val();
    var email = $(".email").val();
    var phone = $(".phone").val();
    var message = $(".message").val();

    var usrData = name + email + phone + message;
    
    var dataString = "name1="+ name + " &email="+ email + " &phone=" + phone + " &message=" + message;


    if(name == "" || email == "" || phone == "") {
    	console.log("you didn't fill it out");
    	alert("Please complete required fields");
    } else {
    	$.ajax({
    		type: "POST",
    		url: "../contact_form.php",
    		data: dataString,
    		cache: false,
    		success: function(result){
    			alert("Thank you");
    			$(".contact-form").reset();
    		}
    	});
    return false
    }
    	
  });
	
	var AppRouter = Backbone.Router.extend({

		routes: {
			'(/)': 'index',
			'about(/)': 'aboutMe',
			'contact(/)': 'contactMike'
		},

		index: function () {

		},

		aboutMe: function () {
			console.log("about");
		},

		contactMike: function () {
			console.log("contact");
		}

		

	});

	app.router = new AppRouter;

	Backbone.history.start();

})