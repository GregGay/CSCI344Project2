(function(b){var a={};a.Spotter=function(f,d,n){a.Spotter.instanceCount=(a.Spotter.instanceCount===undefined)?1:a.Spotter.instanceCount+1;var h="_so"+a.Spotter.instanceCount;var m=false;var o=true;var s=null;var t=[];var l=null;var c;var q=[];var k;var v;var i;if(n&&n.buffer===true){k=true;i=(n.bufferTimeout&&n.bufferTimeout>0)?n.bufferTimeout:1000}b.spotterjs[h]=this;if(!a.modules[f.split(".")[0]]||!a.modules[f.split(".")[0]][f.split(".")[1]]){throw new Error("Spotter: Module "+f+" not found! (Did you remember to include it via a script tag?)")}try{c=new (b.spotterjs.modules[f.split(".")[0]][f.split(".")[1]])(d)}catch(r){throw new Error("problem creating "+f+" module -- "+r)}if(!c.url||!c.process){throw new Error("Spotter: spotterjs.modules."+f+" is invalid.  (Does it return an object with url and process methods?)")}var g=function(w){var x=document.getElementsByTagName("head");var e=document.createElement("script");e.id=h+"_request";e.type="text/javascript";e.src=w;if(s){x[0].removeChild(s)}x[0].appendChild(e);s=e};var u=function(w){for(var e in t){if(typeof t[e]==="object"){t[e].notify(w)}else{if(typeof t[e]==="function"){t[e](w)}else{throw new Error("observer list contains an invalid object")}}}};var p=function(){if(q.length>0){v=setTimeout(function(){u(q.pop());p()},i)}else{clearTimeout(v);v=false}};var j=function(){var e;var w=this;if(o){e=c.url();if(e instanceof Object&&e.callbackParam!==undefined){e=e.url+"&"+e.callbackParam+"=spotterjs."+h+".callback"}else{e+="&callback=spotterjs."+h+".callback"}e+="&random="+Math.floor(Math.random()*10000);g(e)}};this.start=function(){if(!m){m=true;j()}else{throw new Error("Spotter: You can't start a spotter that is already running!")}};this.callback=function(x){var e=c.process(x);var w;if(e.update){if(!k){u(e.data)}else{for(w=0;w<e.data.length;w++){q.push(e.data[w])}if(!v){p()}}}o=true;if(c.nextTimeout()>0){l=setTimeout(j,c.nextTimeout()*1000)}else{this.stop()}};this.stop=function(){if(!m){throw new Error("Spotter: You can't stop a stopped spotter!")}else{m=false;var e=document.getElementsByTagName("head");if(s){e[0].removeChild(s)}clearTimeout(l)}};this.register=function(e){if(e!==undefined&&e.notify!==undefined&&typeof e.notify==="function"){t.push(e)}else{if(e!==undefined&&typeof e==="function"){t.push(e)}else{throw new TypeError("Observer must implement a notify method.")}}}};a.util={};a.util.changes=function(e,d){var c=[];var g={};var f;for(f=0;f<d.length;f++){if(!g[d[f]]){g[d[f].name]=parseInt(f,10)}}for(f=0;f<e.length;f++){c[f]=g[e[f].name]===undefined?-1:g[e[f].name]}return c};a.util.complements=function(d,c){var h={};var l=[];var m=[];var g,f,e;for(g=0;g<d.length;g++){if(h[d[g]]===undefined){h[d[g].name]=g}}for(f=0;f<f.length;f++){if(h[c[f].name]===null){m.push(c[f])}else{h[c[f].name]=-1}}for(e in h){if(h[e]>=0){l.push(d[h[e]])}}return[l,m]};a.modules={};a.modules.Module=function(c,e){var g;var f=["period"];if(c.period!==undefined&&typeof(c.period)==="number"){g=c.period;delete c.period}else{g=45}this.nextTimeout=function(i){if(i!==undefined){g=i}else{return g}};var d=function(j,l){var k;for(k=0;k<j.length;k++){if(j[k]===l){return true}}return false};var h=function(k){var j;for(j=0;j<k.require.length;j++){if(c[k.require[j]]===undefined||c[k.require[j]]===""){throw new Error("this module requires nonempty option "+k.require[j])}}for(j in c){if(!d(k.allow,j)&&!d(f,j)&&!d(k.require,j)){throw new Error("option '"+j+"' not allowed")}}};this.baseURL=function(i){if(i&&typeof i==="string"){base=i}else{return base}};if(e){h(e)}};a.verify=function(c){var d;for(d=0;d<c.length;d++){if(!a[c[d]]||(typeof a[c[d]]!=="object"&&typeof a[c[d]]!=="function")){throw new Error(c[d]+" not loaded.  Make sure you load spotter.js before loading any modules.")}}};a.namespace=function(c){if(!a.modules[c]){a.modules[c]={};return a.modules[c]}else{if(typeof a.modules[c]!=="object"){throw new Error("spotterjs.modules."+c+" is not an object!")}}};b.spotterjs=a;b.Spotter=a.Spotter})(window);(function(d,b){var a=d.spotterjs;if(!a||!a.verify){throw new Error("problem with spotter.js file!")}a.verify(["util","modules"]);var c=a.namespace(b);c.recent=function(e){a.modules.Module.call(this,e);var g=function(j,k){for(var h=0;h<k.length;++h){if(k[h].u===j.u){return h}}return k.length};var f;this.url=function(){var h="http://feeds.delicious.com/v2/json/recent?count=100";return h};this.process=function(k){var h={};var l;if(f===undefined){f=k[0];h={data:k,update:true}}else{if(f.u===k[0].u){h={data:k,update:false}}else{l=k.length-g(f,k);for(var j=0;j<l;j++){k.pop()}h={data:k,update:true};f=k[0]}}return h}};c.tags=function(f){a.modules.Module.call(this,f);var e=f.tags;if(e===undefined||e===""){throw new Error("delicious tags module requires tags to be specified as an option")}var g;var h=function(k,l){for(var j=0;j<l.length;++j){if(l[j].u===k.u){return j}}return l.length};this.url=function(){var i="http://feeds.delicious.com/v2/json/tag/"+e+"?count=100";return i};this.process=function(l){var j={};var m;if(g===undefined){g=l[0];j={data:l,update:true}}else{if(g.u===l[0].u){j={data:l,update:false}}else{m=l.length-h(g,l);for(var k=0;k<m;k++){l.pop()}j={data:l,update:true};g=l[0]}}return j}}})(window,"delicious");(function(d,b){var a=d.spotterjs;if(!a){throw new Error("spotter not yet loaded!")}if(!a||!a.verify){throw new Error("problem with spotter.js file!")}a.verify(["util","modules"]);var c=a.namespace(b);c.search=function(g){a.modules.Module.call(this,g);var f=g.q;var e=null;var h;if(f===undefined||f===""){throw new Error("facebook search module requires a search string (q) to be specified as an option")}this.url=function(){var i="http://graph.facebook.com/search";i+="?q="+escape(f);return i};this.process=function(j){var i={};i.data=[];for(h in j.data){if((e===null||j.data[h].created_time>e)&&j.data[h].message!==undefined){j.data[h].profile_image_url="http://graph.facebook.com/"+j.data[h].from.id+"/picture";j.data[h].profile_url="http://www.facebook.com/people/"+j.data[h].from.name.replace(" ","-")+"/"+j.data[h].from.id;i.data.push(j.data[h])}}e=j.data[0].created_time;i.update=(i.data.length>0)?true:false;return i}}})(window,"facebook");(function(d,b){var a=d.spotterjs;if(!a||!a.verify){throw new Error("problem with spotter.js file!")}a.verify(["util","modules"]);var c=a.namespace(b);c.search=function(g){a.modules.Module.call(this,g);if(g===undefined||g.api_key===undefined||(g.q===undefined&&g.tags===undefined)){throw new Error("flickr search module requires an api_key and a search string (q) or tags to be defined as an option")}var j=g.api_key;var f=g.q;var e=g.tags;var i={id:-1};var h=function(l){var k="http://farm"+l.farm+".static.flickr.com/"+l.server+"/"+l.id+"_"+l.secret+".jpg";return k};this.url=function(){var k="http://api.flickr.com/services/rest/?method=flickr.photos.search";k+="&api_key="+j+"&format=json&content_type=1";if(e!==undefined){k+="&tags="+escape(e)}if(f!==undefined){k+="&text="+escape(f)}return{url:k,callbackParam:"jsoncallback"}};this.process=function(n){var k={};k.data=[];var m=n.photos.photo;var l;for(l=0;l<m.length&&m[l].id!==i.id;l++){m[l].url=h(m[l]);m[l].user_url="http://www.flickr.com/"+m[l].owner;m[l].photo_url="http://www.flickr.com/"+m[l].owner+"/"+m[l].id;k.data.push(m[l])}i=m[0];k.update=(k.data.length>0)?true:false;return k}};c.feeds=function(f){a.modules.Module.call(this,f);var e=f.tags||null;var g={id:-1};this.url=function(){var h="http://api.flickr.com/services/feeds/photos_public.gne?format=json";if(e!==null){h+="&tags="+escape(e)}return{url:h,callbackParam:"jsoncallback"}};this.process=function(l){var h={};h.data=[];var k=l.items;var j;for(j=0;j<k.length&&k[j].link!==g.link;j++){k[j].url=k[j].media.m.replace("_m","");k[j].user_url="http://www.flickr.com/"+k[j].author_id;k[j].photo_url=k[j].link;k[j].user_id=k[j].author.match(/\(([^\)]*)\)/)[1];h.data.push(k[j])}g=k[0];h.update=(h.data.length>0)?true:false;return h}}})(window,"flickr");(function(d,b){var a=d.spotterjs;if(!a||!a.verify){throw new Error("problem with spotter.js file!")}a.verify(["util","modules"]);var c=a.namespace(b);c.search=function(g){a.modules.Module.call(this,g);var f="";var e=g.q;var h=0;if(e===undefined||e===""){throw new Error("identica search module requires a search string (q) to be specified as an option")}this.url=function(){var i="http://identi.ca/api/search.json";i+=f!==""?f:"?q="+escape(e);return i};this.process=function(l){var j={};var k;j.data=[];f=l.refresh_url;if(l.results.length>0){j.update=true;for(k=0;k<l.results.length&&l.results[k].id>h;++k){j.data.unshift(l.results[k])}h=l.results[0].id}else{j.update=false}return j}};c.realtimesearch=function(f){a.modules.Module.call(this,f);var e=f.q;var i=0;var h=1000;var g=[0,0,h];if(e===undefined||e===""){throw new Error("identica search module requires searchString to be specified as an option")}this.url=function(){var j="http://identi.ca/api/statuses/public_timeline.json?count="+h;return j};this.process=function(l){var j={};var k;if(i>0){g.push(l[0].id-i);g.shift();h=Math.ceil((g[0]+g[1]+g[2])/3)+10}j.data=[];if(l.length>0){for(k=0;k<l.length&&l[k].id>i;++k){if(l[k].text.match(new RegExp(e,"i"))){j.data.unshift(l[k])}}i=l[0].id;j.update=j.data.length===0?false:true}else{j.update=false}return j}}})(window,"identica");(function(d,b){var a=d.spotterjs;if(!a||!a.verify){throw new Error("problem with spotter.js file!")}a.verify(["util","modules"]);var c=a.namespace(b);c.search=function(g){a.modules.Module.call(this,g);var f="";var e=g.q;if(e===undefined||e===""){throw new Error("twitpic search module requires a search string (q) to be specified as an option")}this.url=function(){var h="http://search.twitter.com/search.json";h+=f!==""?f:"?q="+escape(e)+"+twitpic";return h};this.process=function(m){var j={};var k;var l;var h;f=m.refresh_url||"";j.update=(m.results.length>0)?true:false;j.data=[];for(k=0;k<m.results.length;k++){l=/http\:\/\/twitpic.com\/(\w+)/.exec(m.results[k].text);if(l!==null&&!m.results[k].text.match(new RegExp("^RT"))){h=l[1];m.results[k].twitpic_url="http://twitpic.com/"+h;m.results[k].twitpic_full_url="http://twitpic.com/show/full/"+h;m.results[k].twitpic_thumb_url="http://twitpic.com/show/thumb/"+h;m.results[k].twitpic_mini_url="http://twitpic.com/show/mini/"+h;j.data.push(m.results[k])}}return j}}})(window,"twitpic");(function(d,b){var a=d.spotterjs;if(!a||!a.verify){throw new Error("problem with spotter.js file!")}a.verify(["util","modules"]);var c=a.namespace(b);c.search=function(g){a.modules.Module.call(this,g,{require:["q"],allow:["lang","exclude"]});this.baseURL("http://search.twitter.com/search.json");var f="";var e=(g.exclude!==undefined)?g.exclude.split(","):[];var j;var h="";var k="";this.url=function(){var m;var i="";var l=this.baseURL();if(f&&f!==""){l+=f}else{l+="?";for(m in g){if(g.hasOwnProperty(m)&&m!=="exclude"){l+=i+m+"="+escape(g[m]);i="&"}}}return l};this.process=function(m){var i={};f=m.refresh_url||"";if(h===""){i.data=m.results}else{i.data=[];var l=new RegExp(h);for(j in m.results){if(m.results[j].text.match(l)===null){i.data.push(m.results[j])}}}i.update=(i.data.length>0)?true:false;return i}};c.user=function(e){a.modules.Module.call(this,e,{require:["screen_name"],allow:["count"]});this.baseURL("http://api.twitter.com/1/statuses/user_timeline.json");var f;var g;this.url=function(){var j;var h="";var i=this.baseURL();i+="?";for(j in e){if(e.hasOwnProperty(j)){i+=h+j+"="+escape(e[j]);h="&"}}if(g){i+="&since_id="+g}return i};this.process=function(i){var h={};if(i.length>0){g=i[0].id_str}h.data=i;h.update=(h.data.length>0)?true:false;return h}};c.trends=function(e){a.modules.Module.call(this,e);var f;this.url=function(){var g="http://api.twitter.com/1/trends/1.json?";if(e!==undefined&&e.exclude!==undefined){g+="exclude="+e.exclude}return g};this.process=function(j){var g={};var i=j[0].trends;if(f===null){g={data:{added:i,removed:{},trends:i}}}else{var h=a.util.complements(i,f);g={data:{added:h[0],removed:h[1],trends:i}}}f=i;g.update=(g.data.added.length>0||g.data.removed.length>0)?true:false;return g}}})(window,"twitter");


/**
 * spotter.js
 * Copyright (C) 2010-2011 Semmy Purewal
 *
 * @version .2
 */

(function(window)  {
    var spotterjs = {};

    /**
     * Construct a Spotter object of the specified type with the specified
     * options.  See the specific module documentation for available
     * options.
     *
     * @constructor
     * @param {String} type the type the module type associated witht this spotter, e.g. "twitter.search"
     * @param {Object} options a hash of options for the appropriate module, e.g. {searchString: "Justin Beiber"}
     * @param {Object} optional list of options to spotter
     * @throws {Error} An error is thrown if there is a problem loading the module
     */
    spotterjs.Spotter = function(type, options, spotter_options)  {
	spotterjs.Spotter.instanceCount = (spotterjs.Spotter.instanceCount === undefined)?
	    1:
	    spotterjs.Spotter.instanceCount+1;
	var varName =  "_so"+spotterjs.Spotter.instanceCount;
	var spotting = false;
	var lastCallReturned = true;
	var lastScriptTag = null;
	var observers = [];
	var timer = null;
	var module;
	var buffer = [];
	var isBuffered;
	var bufferTimer;
	var bufferTimeout;

	if(spotter_options && spotter_options.buffer === true)  {
	    isBuffered = true;
	    bufferTimeout = (spotter_options.bufferTimeout && spotter_options.bufferTimeout > 0)?
		spotter_options.bufferTimeout:
		1000;
	}
	
	window.spotterjs[varName] = this;
	
	if(!spotterjs.modules[type.split(".")[0]] || !spotterjs.modules[type.split(".")[0]][type.split(".")[1]])  {
	    throw new Error("Spotter: Module " + type + " not found! (Did you remember to include it via a script tag?)");
	}

	try  {
	    module = new (window.spotterjs.modules[type.split(".")[0]][type.split(".")[1]])(options);
	} catch(e)  {
	    throw new Error("problem creating "+type+" module -- "+e);
	}
	
	if(!module.url || !module.process)  {
	    throw new Error("Spotter: spotterjs.modules."+type+" is invalid.  (Does it return an object with url and process methods?)");
	}


	/**
         * Function that actually makes the request.
         *
         * @private
         * @param {String} url the json request URL
         */
	var request = function(url)  {
	    var head = document.getElementsByTagName("head");
	    var script = document.createElement('script');
	    script.id = varName+'_'+'request';
	    script.type = 'text/javascript';
	    script.src = url;
	    if(lastScriptTag) {
		head[0].removeChild(lastScriptTag);
	    }
	    head[0].appendChild(script);
	    lastScriptTag = script;
	};

	/**
         * Notify this Observable's observers
         *
         * @private
         * @param {Object} data that will be sent to the observers
         */
	var notifyObservers = function(data)  {
	    for(var i in observers)  {
		if(typeof observers[i] === 'object')  {
		    observers[i].notify(data);
		}  else if(typeof observers[i] === 'function')  {
		    observers[i](data);
		}  else  {
		    throw new Error("observer list contains an invalid object");
		}
	    }
	};

	/**
         * Notify this Observable's observers in a buffered manner
         *
         * @private
         */
	var bufferedNotifyObservers = function()  {
	    if(buffer.length > 0)  {
		bufferTimer = setTimeout(function()  {
		    notifyObservers(buffer.pop());
		    bufferedNotifyObservers();
		}, bufferTimeout);
	    } else  {
		clearTimeout(bufferTimer);
		bufferTimer = false;
	    }
	};

	/**
         * A single spot request
         *
         * @private
         */
	var spot = function()  {
	    var url;
	    var obj = this;
	    
	    if(lastCallReturned)  {
		url = module.url();
		if(url instanceof Object && url.callbackParam !== undefined)  {
		    url = url.url+'&'+url.callbackParam+'=spotterjs.'+varName+'.callback';
		}
		else  {
		    url += '&callback=spotterjs.'+varName+'.callback';
		}
		url += '&random='+Math.floor(Math.random()*10000);  //add random number to help avoid caching in safari and chrome
		request(url);
	    }
	};

	/**
         * Start spotting.
         *
         * TODO: set up a time out so that if the last request doesn't return 
         *       the remaining requests are not blocked
         */
	this.start = function()  {
	    if(!spotting) { 
		spotting = true;
		spot();
	    }  else  {
		throw new Error("Spotter: You can't start a spotter that is already running!");
	    }
	};

	/**
         * Receives the response from the ajax request and send it
         * to the appropriate module for processing.  Notifies
         * observers if the module determines there is new data.
         *
         * @param {Object} rawData Unprocessed data direct from the API
         */
	this.callback = function(rawData)  {
	    var processedData = module.process(rawData); //send the raw data to the module for processing
	    var i;
	    //now the processedData has an 'update' attribute and a 'data' attribute
	    if(processedData.update) {
		if(!isBuffered)  {
		    notifyObservers(processedData.data);
		} else  {
		    for(i=0; i < processedData.data.length; i++)  {
			buffer.push(processedData.data[i]);
		    }
		    if(!bufferTimer)  {
			bufferedNotifyObservers();
		    }
		}
	    }
	    lastCallReturned = true;
	    if(module.nextTimeout() > 0)  {
		timer = setTimeout(spot, module.nextTimeout()*1000);
	    }
	    else  {
		this.stop();
	    }
	};

	/**
         * Stops this spotter if it is currently spotting.
         *
         * @throws Error An error is thrown if you try to stop a stopped spotter
         */
	this.stop = function()  {
	    if(!spotting)  {
		throw new Error("Spotter: You can't stop a stopped spotter!");
	    }
	    else  {
		spotting = false;
		var head = document.getElementsByTagName("head");
		if(lastScriptTag) {
		    head[0].removeChild(lastScriptTag);
		}
		clearTimeout(timer);
		if(bufferTimer) {
		    clearTimeout(bufferTimer);
		}
	    }
	};
    
	/**
         * Register an observer with this object
         *
         * @param {Object} observer this object will be notified when new data is available
         * @throws TypeError a TypeError is thrown if the parameter does not implement notify
         */
	this.register = function(observer) {
	    if(observer !== undefined && observer.notify !== undefined && typeof observer.notify === 'function')  {
		observers.push(observer);
	    } else if(observer !== undefined && typeof observer === 'function')  {
		observers.push(observer);
	    } else  {
		throw new TypeError('Observer must implement a notify method.');
	    }
	};
    

    }; //end spotter constructor


    /************************************ END SPOTTER ***********************************/



    /************************************ UTILS ***********************************/

    /**
     * @namespace
     * The util namespace
     */
    spotterjs.util = {};


    /**
     * Returns an array of integers that represent
     * the indices of the elements of b in the elements
     * of a.  Currently assumes these are trend objects.
     * Also assumes that all elements in a and b are uniq
     * (i.e. they are sets)
     *
     * For example
     *
     * a:      ["a","b","c","d"]
     * b:      ["c","b","d","f"]
     * result: [-1 , 1 , 0 , 2 ]  
     *
     * @param {Array} An array of length n
     * @param {Array} An array of length n
     *
     * TODO: make this more general
     * TODO: make this private
     */
    spotterjs.util.changes = function(a,b)  {
	/*a = [{'name':'a'},{'name':'b'},{'name':'c'},{'name':'d'}];
          b = [{'name':'c'},{'name':'b'},{'name':'d'},{'name':'f'}];*/
	
	var result = [];
	var indices = {};
	var i;
	for(i=0; i < b.length; i++)  {
	    //indices[b[i]]===undefined?indices[b[i].name]=parseInt(i,10):null;
	    if(!indices[b[i]])  {
		indices[b[i].name]=parseInt(i,10);
	    }
	}
	for(i=0; i < a.length; i++)  {
	    result[i] = indices[a[i].name]===undefined?-1:indices[a[i].name];
	}
	return result;
    };

    /**
     * returns an array of arrays.  the first
     * are the elements in a that are not in b
     * and the second are the elements in b that
     * are not in a.
     *
     * For now this assumes a trends object
     *
     * TODO: make more general (for arbitrary arrays)
     * TODO: use the changes algorithm as a subroutine
     */
    spotterjs.util.complements = function(a, b)  {
	var counts = {};
	var aMinusB = [];
	var bMinusA = [];
	var i, j, k;
	for(i=0; i<a.length; i++)  {
	    //counts[a[i]]===undefined?counts[a[i].name]=i:null;
	    if(counts[a[i]]===undefined)  {
		counts[a[i].name]=i;
	    }
	}
	for(j=0; j < j.length;  j++)  {
	    //counts[b[j].name]===null?bMinusA.push(b[j]):counts[b[j].name]=-1;
	    if(counts[b[j].name]===null)  {
		bMinusA.push(b[j]);
	    } else  {
		counts[b[j].name]=-1;
	    }
	}
	for(k in counts)  {
	    //counts[k] >= 0?aMinusB.push(a[counts[k]]):null;
	    if(counts[k] >= 0)  {
		aMinusB.push(a[counts[k]]);
	    }
	}
	return [aMinusB,bMinusA];
    };


    /************************************ END UTILS ***********************************/


    /************************************ MODULES ***********************************/
    /**
     * @namespace
     * The module namespace
     */
    spotterjs.modules = {};

    /**
     * @constructor
     * The general Module from which everything else inherits
     */
    spotterjs.modules.Module = function(options, opts) {
	var period;
	var generalOptions = ['period'];

	if(options.period !== undefined && typeof(options.period)==="number")  {
	    period = options.period;
	    delete options.period;
	}  else  {
	    period = 45;
	}

	this.nextTimeout = function(t)  {
	    if(t !== undefined)  {
		period = t;
	    } else  {
		return period;
	    }
	};

	var contains = function(arr, item)  {
	    var i;
	    for(i=0; i < arr.length; i++)  {
		if(arr[i]===item)  {
		    return true;
		}
	    }
	    return false;
	};

	var optionsProcess = function(opts)  {
	    var i;
	    for(i = 0; i < opts.require.length; i++)  {
		if(options[opts.require[i]] === undefined || options[opts.require[i]] === "")  {
		    throw new Error("this module requires nonempty option "+opts.require[i]);
		}
	    } 
	    for(i in options)  {
		if(!contains(opts.allow, i) && !contains(generalOptions, i) && !contains(opts.require, i))  {
		    throw new Error("option '" + i + "' not allowed");
		}
	    }
	};

	this.baseURL = function(b)  {
	    if(b && typeof b === "string")  {
		base = b;
	    }
	    else  {
		return base;
	    }
	};

	//var optionsProcess = this.options;
	if(opts)  {
	    optionsProcess(opts);
	}
    };
    /************************************ END MODULES ***********************************/


    spotterjs.verify = function(items)  {
	var i;
	for(i = 0; i < items.length; i++)  {
	    if(!spotterjs[items[i]] || (typeof spotterjs[items[i]] !== "object" && typeof spotterjs[items[i]] !== "function"))  {
		throw new Error(items[i]+" not loaded.  Make sure you load spotter.js before loading any modules.");
	    }
	}
    };
    
    spotterjs.namespace = function(name)  {
	if(!spotterjs.modules[name]) {
	    spotterjs.modules[name] = {};
	    return spotterjs.modules[name];
	} else if(typeof spotterjs.modules[name] !== "object")  {
	    throw new Error("spotterjs.modules." + name +" is not an object!");
	}
    };

    //namespace shortcuts
    window.spotterjs = spotterjs;
    window.Spotter = spotterjs.Spotter;
})(window); 
/**
 * spotter.delicious.js
 * Copyright (C) 2010 Semmy Purewal
 *
 * TODO: implement hotlist feed, should be very easy
 *
 */

(function(window, name)  {
    var spotterjs = window.spotterjs;

    if(!spotterjs || !spotterjs.verify)  {
	throw new Error("problem with spotter.js file!");
    }
    spotterjs.verify(['util','modules']);
    var ns = spotterjs.namespace(name);

    ns.recent = function(options)  {
	spotterjs.modules.Module.call(this,options);

	var find = function (item, array)  {
	    for(var i = 0; i < array.length; ++i)  {
		if(array[i].u === item.u) {
		    return i;
		}
	    }
	    return array.length;
	};

	var lastTop;
	this.url = function()  {
	    var url = 'http://feeds.delicious.com/v2/json/recent?count=100';
	    return url;
	};

	this.process = function(data)  {
	    var processedData = {};
	    var pops;
	    if(lastTop === undefined)  {
		lastTop = data[0];
		processedData = {data:data, update:true};
	    }
	    else if(lastTop.u === data[0].u)  {
		processedData = {data:data, update:false};
	    }
	    else  {
		pops = data.length - find(lastTop, data);
		for(var i = 0; i < pops; i++) {
		    data.pop();
		}
		processedData = {data:data, update:true};
		lastTop = data[0];
	    }
	    return processedData;
	};
	

    }; //end recent module

    /**
     * Required options: tags
     * Other available options: ?
     * callback return format: {update, data}
     * update: true/false depending on whether there are new bookmarks
     * data: the bookmark objects themselves
     *
     * @constructor
     */
    ns.tags = function(options)  {
	spotterjs.modules.Module.call(this,options);
	
	var tags = options.tags;
	
	if(tags === undefined || tags === "")  {
	    throw new Error("delicious tags module requires tags to be specified as an option");	
	}
	
	var lastTop;

	var find = function (item, array)  {
	    for(var i = 0; i < array.length; ++i)  {
		if(array[i].u === item.u) { 
		    return i;
		}
	    }
	    return array.length;
	};

	this.url = function()  {
	    var url = 'http://feeds.delicious.com/v2/json/tag/'+tags+'?count=100';
	    return url;
	};
	
	/**
         * process delicious data
         *
         * @param data This is the raw data from Spotter
         */
	this.process = function(data)  {
	    var processedData = {};
	    var pops;
	    if(lastTop === undefined)  {
		lastTop = data[0];
		processedData = {data:data, update:true};
	    }
	    else if(lastTop.u === data[0].u)  {
		processedData = {data:data, update:false};
	    }
	    else  {
		pops = data.length - find(lastTop, data);
		for(var i = 0; i < pops; i++) {
		    data.pop();
		}
		processedData = {data:data, update:true};
		lastTop = data[0];
	    }
	    return processedData;
	};
	

    };
})(window, "delicious");
/**
 * spotter.facebook.js
 * Copyright (C) 2010-2011 Semmy Purewal
 */

(function(window, name)  {
    var spotterjs = window.spotterjs;

    if(!spotterjs)  {
	throw new Error("spotter not yet loaded!");
    }
    
    if(!spotterjs || !spotterjs.verify)  {
	throw new Error("problem with spotter.js file!");
    }
    spotterjs.verify(['util','modules']);
    var ns = spotterjs.namespace(name);

    /**
     * Required options: q
     * Other available options: ?
     * callback return format: {update, data}
     * update: true/false depending on whether there are new tweets
     * data: the new tweet objects themselves
     */
    ns.search = function(options)  {
	spotterjs.modules.Module.call(this,options);
	
	var searchString = options.q;
	var lastCreatedTime = null;
	var i;
	
	if(searchString === undefined || searchString === "")  {
	    throw new Error("facebook search module requires a search string (q) to be specified as an option");
	}
	
	this.url = function()  {
	    var url = 'http://graph.facebook.com/search';
	    url += '?q='+escape(searchString);
	    return url;
	};

	this.process = function(rawData)  {
	    var processedData = {};
	    processedData.data = [];
	    //filter the data
	    for(i in rawData.data)  {
		if((lastCreatedTime === null || rawData.data[i].created_time > lastCreatedTime) && rawData.data[i].message !== undefined)  {
		//if((lastCreatedTime === null || rawData.data[i].created_time > lastCreatedTime))  {
		    rawData.data[i].profile_image_url = "http://graph.facebook.com/"+rawData.data[i].from.id+"/picture";
		    rawData.data[i].profile_url = "http://www.facebook.com/people/"+rawData.data[i].from.name.replace(" ","-")+"/"+rawData.data[i].from.id;
		    processedData.data.push(rawData.data[i]);
		}
	    }

	    lastCreatedTime = rawData.data[0].created_time;

	    processedData.update = (processedData.data.length>0)?true:false;

	    return processedData;
	};
    };
})(window, "facebook");
/**
 * spotter.flickr.js
 * Copyright (C) 2010 Semmy Purewal
 *
 *
 */

(function(window, name)  {
    var spotterjs = window.spotterjs;

    if(!spotterjs || !spotterjs.verify)  {
	throw new Error("problem with spotter.js file!");
    }
    spotterjs.verify(['util','modules']);
    var ns = spotterjs.namespace(name);

    ns.search = function(options)  {
	spotterjs.modules.Module.call(this,options);    

	if(options === undefined || options.api_key === undefined || (options.q === undefined && options.tags === undefined))  {
	    throw new Error("flickr search module requires an api_key and a search string (q) or tags to be defined as an option");
	}

	var api_key = options.api_key;
	var searchString = options.q;
	var tags = options.tags;
	
	var lastTop = {id:-1};  //stupid hack

	/** private method that builds a photo URL from a photo object **/
	var buildPhotoURL = function(photo)  {
	    var u = "http://farm" + photo.farm + ".static.flickr.com/"+photo.server+"/"+ photo.id + "_" + photo.secret + ".jpg";
	    return u;
	};

	
	this.url = function()  {
	    var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search';
	    url += '&api_key='+api_key+'&format=json&content_type=1';
	    if(tags !== undefined) { 
		url+= '&tags='+escape(tags);
	    }
	    if(searchString !== undefined) {
		url+= '&text='+escape(searchString);
	    }
	    return {url:url, callbackParam:"jsoncallback"};
	};
	
	this.process = function(rawData)  {
	    var processedData = {};
	    processedData.data = [];
	    var photos = rawData.photos.photo;
	    var i;
	    
	    for(i=0; i < photos.length && photos[i].id !== lastTop.id; i++)  {
		photos[i].url = buildPhotoURL(photos[i]);
		photos[i].user_url = "http://www.flickr.com/"+photos[i].owner;
		photos[i].photo_url = "http://www.flickr.com/"+photos[i].owner+"/"+photos[i].id;
		processedData.data.push(photos[i]);
	    }
	    
	    lastTop = photos[0];
	    
	    processedData.update = (processedData.data.length>0)?true:false;	
	    return processedData;
	};


    };

    ns.feeds = function(options)  {
	spotterjs.modules.Module.call(this,options);

	var tags = options.tags || null;
	
	var lastTop = {id:-1};  //stupid hack

	this.url = function()  {
	    var url = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json';
	    if(tags !== null) {
		url+= '&tags='+escape(tags);
	    }
	    return {url:url, callbackParam:"jsoncallback"};
	};
    
	this.process = function(rawData)  {
	    var processedData = {};
	    processedData.data = [];
	    var photos = rawData.items;
	    var i;
	    
	    for(i=0; i < photos.length && photos[i].link !== lastTop.link; i++)  {
		photos[i].url = photos[i].media.m.replace("_m","");
		photos[i].user_url = "http://www.flickr.com/"+photos[i].author_id;
		photos[i].photo_url = photos[i].link;
		//if(photos[i].author.match(/\(([^\)]*)\)/) === null) alert(photos[i].author);
		photos[i].user_id = photos[i].author.match(/\(([^\)]*)\)/)[1];
		processedData.data.push(photos[i]);
	    }
	    
	    lastTop = photos[0];
	    
	    processedData.update = (processedData.data.length>0)?true:false;	
	    return processedData;
	};
    };
})(window, "flickr");
/**
 * spotter.identica.js
 * Copyright (C) 2010 Semmy Purewal
 *
 */

(function(window, name)  {
    var spotterjs = window.spotterjs;

    if(!spotterjs || !spotterjs.verify)  {
	throw new Error("problem with spotter.js file!");
    }
    spotterjs.verify(['util','modules']);
    var ns = spotterjs.namespace(name);

    /**
     * Required options: q (searchString)
     * Other available options: ?
     * callback return format: {update, data}
     * update: true/false depending on whether there are new tweets
     * data: the tweet objects themselves
     *
     * TODO: Once statusnet completely implements its Twitter Compatible API
     *       this should work just like the twitter module.  It may be possible
     *       to merge the two modules somehow.
     */
    ns.search = function(options)  {
	spotterjs.modules.Module.call(this,options);

	var refreshURL = "";
	var searchString = options.q;
	
	
	var lastID = 0;  //this is a temporary fix until since_id is properly implemented
	
	if(searchString === undefined || searchString === "")  {
	    throw new Error("identica search module requires a search string (q) to be specified as an option");
	}

	this.url = function()  {
	    var url = 'http://identi.ca/api/search.json';
	    url += refreshURL !== ""?refreshURL:'?q='+escape(searchString);
	    return url;
	};

	this.process = function(rawData)  {
	    var processedData = {};
	    var i;
	    
	    processedData.data = [];
	    refreshURL = rawData.refresh_url;
	    
	    if(rawData.results.length>0)  {
		processedData.update = true;
		for(i = 0; i < rawData.results.length && rawData.results[i].id > lastID; ++i)  {
		    processedData.data.unshift(rawData.results[i]);
		}
		lastID = rawData.results[0].id;
	    }
	    else  {
		processedData.update = false;
	    }
	    
	    return processedData;
	};
    };

    ns.realtimesearch = function(options)  {
	spotterjs.modules.Module.call(this,options);
	
	var searchString = options.q;
	var lastID = 0;  //this is a temporary fix until since_id is properly implemented
	var currentCount=1000;
	var counts = [0,0,currentCount];
	
	if(searchString === undefined || searchString === "")  {
	    throw new Error("identica search module requires searchString to be specified as an option");
	}
	
	this.url = function()  {
	    var url = 'http://identi.ca/api/statuses/public_timeline.json?count='+currentCount;
	    return url;
	};

	this.process = function(rawData)  {
	    var processedData = {};
	    var i;
	    
	    if(lastID > 0)  {
		counts.push(rawData[0].id-lastID);
		counts.shift();
		currentCount = Math.ceil((counts[0]+counts[1]+counts[2])/3)+10;
	    }
	    
	    processedData.data = [];

	    if(rawData.length>0)  {
		for(i = 0; i < rawData.length && rawData[i].id > lastID; ++i)  {
		    if(rawData[i].text.match(new RegExp(searchString,"i")))  {
			processedData.data.unshift(rawData[i]);
		    }
		}
		lastID = rawData[0].id;
		processedData.update = processedData.data.length===0?false:true;
	    }
	    else  {
		processedData.update = false;
	    }
	    return processedData;
	};
    };
})(window, "identica");
/**
 * spotter.twitpic.js
 * Copyright (C) 2010 Semmy Purewal
 */

(function(window, name)  {
    var spotterjs = window.spotterjs;

    if(!spotterjs || !spotterjs.verify)  {
	throw new Error("problem with spotter.js file!");
    }
    spotterjs.verify(['util','modules']);
    var ns = spotterjs.namespace(name);

    /**
     * Required options: searchString
     * Other available options: ?
     * callback return format: {update, data}
     *
     * There is no twitpic API, this is a modification of the 
     * twitter search API
     *
     * In addition to the normal twitter API response each object
     * includes the following:
     *
     * twitpic_url
     * twitpic_thumbnail_url
     * twitpic_mini_url
     *
     * update: true/false depending on whether there are new tweets
     * data: the tweet objects themselves
     */
    ns.search = function(options)  {
	spotterjs.modules.Module.call(this,options);

	var refreshURL = "";
	var searchString = options.q;
	
	if(searchString === undefined || searchString === "")  {
	    throw new Error("twitpic search module requires a search string (q) to be specified as an option");
	}

	this.url = function()  {
	    var url = 'http://search.twitter.com/search.json';
	    url += refreshURL !== ""?refreshURL:'?q='+escape(searchString)+"+twitpic";
	    return url;
	};

	this.process = function(rawData)  {
	    var processedData = {};
	    var i;
	    var rematch;
	    var twitpic_id;
	    refreshURL = rawData.refresh_url || "";
	    processedData.update = (rawData.results.length>0)?true:false;
	    
	    //process rawData and put it in processedData
	    processedData.data = [];
	    for(i=0; i < rawData.results.length; i++)  {
		//put the processed version of the raw data in the 
		//processed data array
		rematch = /http\:\/\/twitpic.com\/(\w+)/.exec(rawData.results[i].text);
		if(rematch!== null && !rawData.results[i].text.match(new RegExp("^RT")))  {  //ignore retweets
		    twitpic_id = rematch[1];
		    rawData.results[i].twitpic_url = "http://twitpic.com/"+twitpic_id;
		    rawData.results[i].twitpic_full_url = "http://twitpic.com/show/full/"+twitpic_id;
		    rawData.results[i].twitpic_thumb_url = "http://twitpic.com/show/thumb/"+twitpic_id;
		    rawData.results[i].twitpic_mini_url = "http://twitpic.com/show/mini/"+twitpic_id;
		    processedData.data.push(rawData.results[i]);
		}
	    }
	    return processedData;
	};
    };
})(window, "twitpic");
/**
 * spotter.twitter.js
 * Copyright (C) 2010 Semmy Purewal
 *
 * TODO: test trend module more carefully
 *
 */

(function(window, name)  {
    var spotterjs = window.spotterjs;
    
    if(!spotterjs || !spotterjs.verify)  {
	throw new Error("problem with spotter.js file!");
    }
    spotterjs.verify(['util','modules']);
    var ns = spotterjs.namespace(name);

    /**
     * Required options: q
     * Other available options: ?
     * callback return format: {update, data}
     * update: true/false depending on whether there are new tweets
     * data: the new tweet objects themselves (if any)
     */
    ns.search = function(options)  {
	spotterjs.modules.Module.call(this,options, {
	    'require':['q'],
	    'allow':['lang','exclude']
	});
	this.baseURL('http://search.twitter.com/search.json');

	var refreshURL = "";
	var exclude = (options.exclude !== undefined)?options.exclude.split(","):[];
	var i;
	var excludeREString = "";
	var base = "";

	this.url = function()  {
	    var opt;
	    var a = '';
	    var url = this.baseURL();
	    if(refreshURL && refreshURL !== "")  {
		url += refreshURL;
	    } else  {
		url+='?';
		for(opt in options)  {
		    if(options.hasOwnProperty(opt) && opt !== "exclude")  {
			url += a+opt+'='+escape(options[opt]);
			a = '&';
		    }
		}
	    }
	    return url;
	};
	
	this.process = function(rawData)  {
	    var processedData = {};
	    refreshURL = rawData.refresh_url || "";
	    
	    if(excludeREString === "")  {
		processedData.data = rawData.results;
	    }
	    else  {
		processedData.data = [];
		var excludeRE = new RegExp(excludeREString);
		//filter the data
		for(i in rawData.results)  {
		    if(rawData.results[i].text.match(excludeRE) === null)  {
			processedData.data.push(rawData.results[i]);
		    }
		}
	    }

	    processedData.update = (processedData.data.length>0)?true:false;
	    return processedData;
	};
    };

    ns.user = function(options)  {
	spotterjs.modules.Module.call(this,options, {
	    'require':['screen_name'],
	    'allow':['count']
	});
	this.baseURL('http://api.twitter.com/1/statuses/user_timeline.json');

	var i;
	var last_id;

	this.url = function()  {
	    var opt;
	    var a = '';
	    var url = this.baseURL();
	    url+='?';
	    for(opt in options)  {
		if(options.hasOwnProperty(opt))  {
		    url += a+opt+'='+escape(options[opt]);
		    a = '&';
		}
	    }
	    if(last_id)  {
		url += "&since_id="+last_id;
	    }
	    return url;
	};
	
	this.process = function(rawData)  {
	    var processedData = {};
	    if(rawData.length > 0)  {
		last_id = rawData[0].id_str;
	    }
	    processedData.data = rawData;
	    processedData.update = (processedData.data.length>0)?true:false;
	    return processedData;
	};
    };


    /**
     * Required options:
     * Other available options: exclude:hashtags
     * callback return format: {added,removed,trends}
     * added: new trends since the last call
     * removed: removed trends since the last call
     * trends: all trends
     */
    ns.trends = function(options)  {
	spotterjs.modules.Module.call(this,options);
	
	var lastTrends;
	
	this.url = function()  {
	    var url = "http://api.twitter.com/1/trends/1.json?";
	    if(options !== undefined && options.exclude !== undefined) { 
		url+="exclude="+options.exclude;
	    }
	    return url;
	};
	
	this.process = function(rawData)  {
	    var processedData = {};
	    var trends = rawData[0].trends;
	    if(lastTrends === null)  {
		processedData = {data:{"added":trends, "removed":{}, "trends":trends}};
	    }
	    else  {
		var tempArray = spotterjs.util.complements(trends, lastTrends);
		processedData = {data:{"added":tempArray[0],"removed":tempArray[1], "trends":trends}};
	    }
	    lastTrends = trends;
	    processedData.update = (processedData.data.added.length>0||processedData.data.removed.length>0)?true:false;
	    return processedData;
	};
    };
})(window, "twitter");
