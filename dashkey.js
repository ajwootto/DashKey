$(document).ready( function() {
	var apps = ["music", "calculator", "clock", "safari", "phone", "messaging", "mail", "maps", "photos", "calendar", "camera", "stocks", "weather", "notes", "settings"];
	var query = "";
	$(".key").each(function(){
		$(this).bind("click", function(e) {
			if ($(e.target).hasClass("icon")) {
				$(e.target).parent().trigger("click");
				return;
			}
			if ($(e.target).hasClass("disabled"))
				return;
			var key = e.target.id;
			if (key == "clear") {
				query = "";
				curapps = [];
				resetDisabled();
			} else if (key == "del") {
				query = query.slice(0, -1);
				resetDisabled();
			} else if (key.length == 1)
				query += key;
			var nextLetters = 0;
			var dupeLetters = 0;
			var curapps = [];
			$(".key").each(function() {
				$(this).html(this.id)
				$(this).removeClass('hasIcon');
			})
				for (var i = 0; i < apps.length; i++) {
					if (apps[i].slice(0, query.length) == query || query.length == 0) {
						curapps.push(apps[i]);
						var nextLetter = apps[i].slice(query.length, query.length + 1).charCodeAt(0) - 97;
						if (!((nextLetters >> nextLetter) & 1))
							nextLetters += Math.pow(2, nextLetter);
						else if (!((dupeLetters >> nextLetter) & 1))
							dupeLetters += Math.pow(2, nextLetter);
					}
				}
				if (curapps.length == 1) {
					selectIcon(curapps[0]);
				} else
				for (var i = 0; i < curapps.length; i++)
					if (!((dupeLetters >> curapps[i].slice(query.length, query.length + 1).charCodeAt(0) - 97) & 1)) {
						makeIcon(curapps[i], query.length)
					}
				if (nextLetters == 0)
					$(".key").each(function() {
						if (this.id != "clear" && this.id != "del")
							$(this).addClass("disabled");
					})
		})
	})
	//trigger a non-letter keypress to create initial app icons
	$("#clear").trigger("click");
	$("#container").append("<br/>Possible choices: " + apps);
})

var resetDisabled = function() {
	$(".key").each(function() {
		$(this).removeClass("disabled");
	})
}
var makeIcon = function(name, key) {
	var changeKey = name.slice(key, key + 1);
	$("#" + changeKey).html('<img class="icon" src="icons/' + name + '.ico"></img>');
	$("#" + changeKey).addClass('hasIcon');
}
var selectIcon = function(name) {
	$(".selection_message").html("Selected: " + name + ". Click to reset.");
	$(".selection_message").css("display", "block");
	$(".selection_message").bind("click", function() { window.location.reload();})
}