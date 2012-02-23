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
						{buffer:true, bufferTimeout:6000}
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
		
		//Counts all a, b, c, d, and f
		if (tweet.text.match(/a/gi)) {
			//alert(tweet.text);
			aCount=aCount+1;
			$("#A").text(aCount);
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
		
		//Check to see which grade you'll make after the count is over 10
		if ((aCount>bCount && aCount>cCount && aCount>dCount && aCount>fCount) && aCount>10) {
			alert("Wow you are one smart person. Your grade is an A, you superstar you!");
		}
		
		else if ((bCount>aCount && bCount>cCount && bCount>dCount && bCount>fCount) && bCount>10) {
			alert("You got a B. But that's not an A now is it.");
		}
		
		else if ((cCount>aCount && cCount>bCount && cCount>dCount && cCount>fCount ) && aCount>10) {
			alert("C, really? I guess I'll be 'Cing' you tomorrow morning for that review session.");
		}
		
		else if ((dCount>aCount && dCount>bCount && dCount>bCount && dCount>fCount ) && aCount>10) {
			alert("D!!! Way to go buddy, way to go and screw everything up!");
		}
	
		else if ((fCount>aCount && fCount>bCount && fCount>cCount && fCount>dCount ) && aCount>10) {
			alert("Well F you too! I don't like Failures, and I hope you don't either.");
		}
		
		else {
			if (aCount>10||bCount>10||cCount>10||dCount>10||fCount>10) {
				alert("Not good! You'll have to retry or you'll end up getting an Incomplete.");
			}
		}
		
		object_array.push(slide);
		
		if(object_array.length >= 1) {
			var object_to_remove = object_array.shift();
			object_to_remove.fadeOut(7000, function() {
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