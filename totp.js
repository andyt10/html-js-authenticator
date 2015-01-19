

var mySites = [];

function Site(_siteName,_siteUser,_siteSeed)
{
	this.siteName = _siteName;
	this.siteUser = _siteUser;
	this.siteSeed = _siteSeed;
}

function start()
{
	
	   $.ajax({
        type: 'GET',
        url: 'data.json',
        dataType: 'json',
        success: function(data) {

	    $.each( data.sites, function( siteName, val ) {
		  mySites.push(new Site(val.siteName,val.siteUser,val.seed));
		});
		
        },
        async: false
    });


	for(var i1=0;i1<mySites.length;i1++)
	{

		var divID = "#site" + i1 + "_code";
		$("#codeList").append('<div class="col-xs-12 col-md-12"><h3 id="site' + i1 + '_name" class="text-center">' + mySites[i1].siteName + ' - <small>' + mySites[i1].siteUser+ ' </small></h3><h2 class="text-center" id="site' + i1 + '_code"></h2></div>');
		
		
		$(divID).text(generateOTP(mySites[i1].siteSeed));		
	}

	   
	   setInterval(autoUpdate, 1000);	
	
}

function autoUpdate(base32secret)
{
	var progressPercent;
    var unixTime = Math.round(new Date().getTime() / 1000);
    var countDown = 30 - (unixTime % 30);    
    
    progressPercent = (3.44827586207 * (30-countDown));
    
    $(".moduloTime").text(countDown);
    
    var progressPercentString = parseInt(progressPercent).toString();
    progressPercentString = progressPercentString + "%";
    
    $("#timerBar").width(progressPercentString);
    
    
    if (unixTime % 30 == 0)
    {
		for(var i1=0;i1<keys.length;i1++)
		{
			var divID = "#site" + i1 + "_code";
			
			var OTP = generateOTP(mySites[i1].siteSeed);
			
			var OTPstring = OTP.toString();
			
			OTPstring = leftpad(OTPstring, 6, '0');
		
			$(divID).text(OTPstring);		
		}

    }
 
}


function generateOTP(base32secret)
{
    var hexTime  = get30Increment();
    var hexKey = base32tohex(base32secret);
    var keyTime = hasheyHashey(hexTime,hexKey);
    
    return keyTime;
}

function get30Increment()
{
    var time = Math.round(new Date().getTime() / 1000);
    var message = Math.floor(time/30).toString(16);
    var hexMessage = '000000000' + message;//harded coded addition of 0s...needs to be dynamic. Deadline some time around year 2300
  
    return hexMessage;
}


function hasheyHashey(messageHex,keyHex)
{
    var messageWords = CryptoJS.enc.Hex.parse(messageHex);
    var keyWords = CryptoJS.enc.Hex.parse(keyHex);
    var hash = CryptoJS.HmacSHA1(messageWords,keyWords);
    var hexHash = hash.toString(CryptoJS.enc.Hex);
    
    
     /*
    *GET THE LAST NIBBLE OFFSET VALUE
    */
    var lastNibble =hexHash.substring(hexHash.length-1);
    lastNibble = "0x" + lastNibble;
    lastNibble = parseInt(lastNibble);   

    /*
    * Truncate the HMAC-SHA1 output 
    */
    var truncation = hexHash.substr((lastNibble)*2,8);
    var tempy = truncation;
    truncation = "0x" + truncation;
    truncation = parseInt(truncation);
 

    truncation = 0x7FFFFFFF &truncation;

    var OTP = truncation % 1000000;
    
    return OTP;
    
}

   
/*String manipulation functions
*  leftpad - padd the 'left side' of a string with a specific character to a specified length.
* base32tohex...exactly as it sounds, converts a base32 secret to hexidecimal
* removeSpaces  - removes the spaces between segments of a secret. Spaces are usually added to aid in readability.
*/
function leftpad(str, len, pad) 
{
    if (len + 1 >= str.length) 
    {
	    //make an array of chars with enough pads at the start to make pad + str = len
        str = new Array(len + 1 - str.length).join(pad) + str;
    }
    return str;
}


//I....I stole this from somewhere, don't recall where.
function base32tohex(base32)
{
        var base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
        var bits = "";
        var hex = "";

		//convert to uppercase
        for (var i = 0; i < base32.length; i++)
        {
            var val = base32chars.indexOf(base32.charAt(i).toUpperCase());
            bits += leftpad(val.toString(2), 5, '0');
        }
        
		//convert to hex in 4 character 'chunks'
        for ( i = 0; i+4 <= bits.length; i+=4) 
        {
            var chunk = bits.substr(i, 4);
            hex = hex + parseInt(chunk, 2).toString(16) ;
        }
        return hex;

}

function removeSpaces(base32)
{
	var str = base32.replace(/\s+/g, '');
	return str;
}

