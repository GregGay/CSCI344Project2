function main() {
	
	var count = 0;
	var object_array=[];
	
	//Have to call on search in the Spotter function
	var search = $("#term").val();
	var s = new Spotter("twitter.search", 
						{q: search, period:150},
						{buffer:true, bufferTimeout:1000}
					    );
	
	s.register(function(tweet) {
		count++;
		
		/*hide the search bar div*/
		var hide = $("#hide");
			hide.hide();
		
		var color;

		var profile_image="<img src='"+tweet.profile_image_url+"' />";
				
		if (count % 2 === 0) {
			color = "red";
		}
		
		else {
			color = "blue";
		}
		
		var slide = $("<p class='"+color+" id="+count+"'>"+profile_image+tweet.text+"</p>");
			slide.hide(10000);
			$("#tweets").prepend(slide);
			slide.slideDown();
	
	var aCount=0;
		if (tweet.text.match(/a/gi)) {
			//alert(tweet.text);
			aCount=aCount+1;
			$("#a").text(aCount);
			/*var obj_array.length=[];
			if(obj_array.length >= 1) {
				var obj_to_remove = obj_array.shift();
				obj_to_remove.fadeOut(200, function() {
					obj_to_remove.remove();
				});
			}*/
			/*
			String.prototype.countOccurrences = function(a) {
			var counter=0;
			for(var i = 0; i < this.length; i++){
				if(this.charAt(i) == a){
					counter++;
				 }
			}
			return counter;
			$().prepend(a);
		};*/
		}

	var bCount=0;
		if (tweet.text.match(/b/gi)) {
			//alert(tweet.text);
			bCount=bCount+1;
			$("#b").text(bCount);
		}
		
	var cCount=0;
		if (tweet.text.match(/c/gi)) {
			//alert(tweet.text);
			cCount=cCount+1;
			$("#c").text(cCount);
		}
	
	var dCount=0;
		if (tweet.text.match(/d/gi)) {
			//alert(tweet.text);
			dCount=dCount+1;
			$("#d").text(dCount);
		}
	
	var fCount=0;
		if (tweet.text.match(/f/gi)) {
			//alert(tweet.text);
			fCount=fCount+1;
			$("#f").text(fCount);
		}
		
		
		
		object_array.push(slide);
		
		if(object_array.length >= 1) {
			var object_to_remove = object_array.shift();
			object_to_remove.fadeOut(2000, function() {
				object_to_remove.remove();
			});
		}
	});
	
	s.start();
}

$(document).ready(function() {
	$("#term").val("");
    $("#Search").click(function() {
	$("#searchAgain").fadeIn(5000);
	$("#searchAgain").css("visibility", "visible");
	main();
    });
});