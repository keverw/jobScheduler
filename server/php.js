global.trim = function(str, charlist) { //Strip whitespace (or other characters) from the beginning and end of a string - http://php.net/manual/en/function.trim.php
	//http://kevin.vanzonneveld.net
	//+	original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	//+	improved by: mdsjack (http://www.mdsjack.bo.it)
	//+	improved by: Alexander Ermolaev (http://snippets.dzone.com/user/AlexanderErmolaev)
	//+		input by: Erkekjetter
	//+	improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	//+		input by: DxGx
	//+	improved by: Steven Levithan (http://blog.stevenlevithan.com)
	//+		tweaked by: Jack
	//+		bugfixed by: Onno Marsman
	//*	example 1: trim('    Kevin van Zonneveld    ');
	//*	returns 1: 'Kevin van Zonneveld'
	//*	example 2: trim('Hello World', 'Hdle');
	//*	returns 2: 'o Wor'
	//*	example 3: trim(16, 1);
	//*	returns 3: 6
	var whitespace, l = 0,
		i = 0;
	str += '';

	if (!charlist) {
		//default list
		whitespace = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
	} else {
		//preg_quote custom list
		charlist += '';
		whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
	}

	l = str.length;
	for (i = 0; i < l; i++) {
		if (whitespace.indexOf(str.charAt(i)) === -1) {
			str = str.substring(i);
			break;
		}
	}

	l = str.length;
	for (i = l - 1; i >= 0; i--) {
		if (whitespace.indexOf(str.charAt(i)) === -1) {
			str = str.substring(0, i + 1);
			break;
		}
	}

	return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}

//Not from PHP.js, rewrote to use node.js native hash - http://stackoverflow.com/questions/6755107/how-to-make-hash-in-php-and-node-js-have-the-same-value
global.md5 = function(str) { //Calculate the md5 hash of a string - http://php.net/manual/en/function.md5.php
	var crypto = require('crypto');
	return crypto.createHash('md5').update(str).digest('hex');
}

global.time = function() { //Return current Unix timestamp - http://php.net/manual/en/function.time.php
	// http://kevin.vanzonneveld.net
	//+ original by: GeekFG (http://geekfg.blogspot.com)
	//+	improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	//+	improved by: metjay
	//+	improved by: HKM
	//* example 1: timeStamp = time();
	//* results 1: timeStamp > 1000000000 && timeStamp < 2000000000
	return Math.floor(new Date().getTime() / 1000);
}

global.count = function(mixed_var, mode) { //Count all elements in an array, or something in an object - http://php.net/manual/en/function.count.php
	// http://kevin.vanzonneveld.net
	//+ original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	//+	input by: Waldo Malqui Silva
	//+	bugfixed by: Soren Hansen
	//+	input by: merabi
	//+	improved by: Brett Zamir (http://brett-zamir.me)
	//+	bugfixed by: Olivier Louvignes (http://mg-crea.com/)
	//* example 1: count([[0,0],[0,-4]], 'COUNT_RECURSIVE');
	//*	returns 1: 6
	//* example 2: count({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
	//*	returns 2: 6
	var key, cnt = 0;

	if (mixed_var === null || typeof mixed_var === 'undefined') {
		return 0;
	} else if (mixed_var.constructor !== Array && mixed_var.constructor !== Object) {
		return 1;
	}

	if (mode === 'COUNT_RECURSIVE') {
		mode = 1;
	}
	if (mode != 1) {
		mode = 0;
	}

	for (key in mixed_var) {
		if (mixed_var.hasOwnProperty(key)) {
			cnt++;
			if (mode == 1 && mixed_var[key] && (mixed_var[key].constructor === Array || mixed_var[key].constructor === Object)) {
				cnt += this.count(mixed_var[key], 1);
			}
		}
	}

	return cnt;
}