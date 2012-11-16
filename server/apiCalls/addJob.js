module.exports = {
	page: function (req, res, next) {

		var outJson = {};
		var valid = true;
		var errors = {};
		var info = {};
		
		var title = trim(req.body.title);
		var scriptURL = trim(req.body.scriptURL);
		var when = +trim(req.body.when);
		
		//validate title
		if (title.length > 0)
		{
			if (title.length > 255)
			{
				errors.title = 'long';
				valid = false;
			}
		}
		else
		{
			errors.title = 'short';
			valid = false;
		}
		
		//validate scriptURL
		if (scriptURL.length > 0)
		{
			if (scriptURL.length > 255)
			{
				errors.url = 'long';
				valid = false;
			}
			else
			{
				if (!checkForValidURL(scriptURL))
				{
					errors.url = 'invalid';
					valid = false;
				}
			}
		}
		else
		{
			errors.url = 'short';
			valid = false;
		}
		
		//validate when
		if (isNaN(when))
		{
			errors.when = 'notNumber';
			valid = false;
		}
		else if (when < 0) //be 0 or higher
		{
			errors.when = 'notPos';
			valid = false;
		}
		
		if (valid) //start adding to job list
		{
			var jobID = md5(scriptURL);
			
			if (jobs.hasOwnProperty(jobID))
			{
				errors.err = 'already';
			}
			else
			{
				info.jobID = jobID;
				
				jobs[jobID] = {
					title: title,
					url: scriptURL,
					when: when,
					added: time()
				};
				
				saveData('jobs');
				
				if (when > 0)
				{
					nextJobs[jobID] = time() + when;
					saveData('nextJobs');
				}
				
				info.success = 'added';
			}
			
		}
		
		//output json
		outJson.errors = errors;
		outJson.info = info;
		res.send(outJson);	
	
	}
}