function main() {
	
	var count = 0;
	var object_array=[];

	var aCount=0;
	var bCount=0;
	var cCount=0;
	var dCount=0;
	var fCount=0;
	
	//Have to call on search in the Spotter function
	var search = $("#term").val();
	var s = new Spotter("twitter.search", 
						{q: search, period:750},
						{buffer:true, bufferTimeout:5000}
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
			slide.hide();
			$("#tweets").prepend(slide);
			slide.slideDown();
	
		if (tweet.text.match(/a/gi)) {
			//alert(tweet.text);
			aCount=aCount+1;
			$("#A").text(aCount);
				if (aCount===2) {
					alert("Congrats A has came up the most which means...your grade is an A!");
				}
		}

		if (tweet.text.match(/b/gi)) {
			//alert(tweet.text);
			bCount=bCount+1;
			$("#B").text(bCount);
		}
		
		if (tweet.text.match(/c/gi)) {
			//alert(tweet.text);
			cCount=cCount+1;
			$("#C").text(cCount);
		}

		if (tweet.text.match(/d/gi)) {
			//alert(tweet.text);
			dCount=dCount+1;
			$("#D").text(dCount);
		}

		if (tweet.text.match(/f/gi)) {
			//alert(tweet.text);
			fCount=fCount+1;
			$("#F").text(fCount);
		}		
		
		object_array.push(slide);
		
		if(object_array.length >= 1) {
			var object_to_remove = object_array.shift();
			object_to_remove.fadeOut(6000, function() {
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