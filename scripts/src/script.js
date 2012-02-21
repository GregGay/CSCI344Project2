function main() {
    //your code goes here
    //alert("hello world!");


    //your tasks

    //1. Create a spotter and get it to insert tweets into the DOM
	//var limit = false;
	
	var count = 0;
	var object_array=[];
	
	var love_count=0;
	var hate_count=0;
	
	//Have to call on search in the Spotter function
	var search = $("#term").val();
	var s = new Spotter("twitter.search", 
						{q: search, period:150},
						{buffer:true, bufferTimeout:1000}
					    );
	
	s.register(function(tweet) {
		count++;
	
		//$("#tweets").append("<p>"+tweet.text+"</p>");
		
		//2. Add profile images (tweet.profile_image_url)
		
		/*var profile_image = "<img src='"+tweet.profile_image_url+"' />";
		profile_image.hide();
		$("#tweets").prepend("<p>"+profile_image+tweet.text+"</p>");
		profile_image.slideDown();*/
		//"<li style='display:none;color:blue;background-color:white;'>"
		
			/*if (count === 11)
			{ if (limit === false)
				{limit = true;
				}
				count = 1;
			}
			if (limit === true)
			{	
				var x = document.getElementById("tweets").getElementsByTagName("p")[9];
				
				x.parentNode.removeChild(x);
			
			}*/
			
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
			
		//a test to see if it works
		//var test_tweet="love";
		//check to see if the tweet has the word 'love'
		//if the tweet contains love then do 'love_count++'
		/*if (tweet.text.match(/(^|\s)love($|\s)/i) || tweet.text.match(/hate/i)) {
			alert(tweet.text);
			love_count=love_count+1;
		}*/
		
		//check to see if tweet has the word 'love'
		//if the tweet contains love
		//increment love_count
		//RegExp is used here
		//I used a global search as well by using the g modifier which I learned from W3Schools
		//var test_tweet = "love";
		/*
		var str = "love";
		var str2 = "hate";
		//or use this (\s|^)....(\s|$)
		//\s is white space
		if (tweet.text.match(/(^|\s)love($|\s)/g) || ) {
			alert(str);
			love_count=love_count+1;
			document.write("love_count = " + love_count);
		}

		if (tweet.text.match(/(^|\s)hate($|\s)/g)) {
			alert (str2);
			hate_count=hate_count+1;
			document.write("<br/>" + "hate_count = " + hate_count);
		}
*/
		
		//Played around with the trying to get love and hate to appear multiple times and count each time they appear
		//Test strings, and now I know this is working!
		/*
		var str = "i love all the love im getting. love greg!";
		var str2 = "hate";
		var str3 ="i hate not.";*/
		/*
		if (str.match(/(^|\s)love($|\s)/g)) {
			alert(tweet.text);
			love_count=love_count+1;
			//document.write("love_count = " + love_count);
			alert("hate_count = " + hate_count);
		}

		if (str2.match(/(^|\s)hate($|\s)/g)) {
			alert (tweet.text);
			hate_count=hate_count+1;
			alert(str3);
			hate_count=hate_count+1;
			//document.write("<br/>" + "hate_count = " + hate_count);
			alert("hate_count = " + hate_count);
		}
		*/
		
		object_array.push(slide);
			
		if(object_array.length >= 1) {
			var object_to_remove = object_array.shift();
			object_to_remove.fadeOut(2000, function() {
				object_to_remove.remove();
			});
		}
	});
	
	s.start();
	
    //3. Make the tweets occur so the most recent are at the top
    //4. Make the tweets slide down
    //5. Alternate the colors or the background of the tweets
    //6. Show a maximum of 10 tweets at a time (remove old tweets from the dom)

}

$(document).ready(function() {
    $("#SS").click(function() {
	alert($("#term").val());
	main();
    });
	
});