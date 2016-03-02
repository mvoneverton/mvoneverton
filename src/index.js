
var $ = require("jquery");
var Backbone = require('backbone');

var app = app || {};

$(function() {

	var composeHtml = $('#template-compose').text();
  var composeTmpl = Handlebars.compile(composeHtml);

  var commentHtml = $('#template-comment').text();
  var commentTmpl = Handlebars.compile(commentHtml);

  var threadHtml = $('#template-thread').text();
  var threadTmpl = Handlebars.compile(threadHtml);

  var renderCompose = function() {
    return composeTmpl();
  };

  var renderComment = function(message) {
    return commentTmpl({
      commentMessage: message,
    });
  };

  var renderThread = function(comment, compose) {
    return threadTmpl({
      commentTmpl: comment,
      composeTmpl: compose
    });
  };

	var project = "https://www.github.com/mvoneverton/";

	$(".project").on("click", ".graphic", function () {
		var projectID = $(this).attr("class").split(" ")[1];
		window.open(project + projectID, "_blank");
	});

	$('.page').on('click', 'textarea', function () {
    $(this).parent('.compose').addClass('expand');
    return false;
  });

	$('.comments').on('click', '.comment', function () {
    $(this).parent('.thread').toggleClass('expand');
    return false;
  });

	$(".page").on("submit", "form", function () {
		var message = $(this).find("textarea").val();
		$(this)
      .find('textarea')
      .val('')
      .parent('.compose')
      .removeClass('expand');

		if ($(this).parent("header").length) {
			$(".comments").append(renderThread(renderComment(message), renderCompose()));

		} else {
			$(this).parent(".replies").append(renderComment(message));

		};
		return false
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