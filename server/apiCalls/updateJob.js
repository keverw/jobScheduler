module.exports = {
	page: function (req, res, next) {
		var outJson = {};
		var valid = true;
		var errors = {};
		var info = {};
		var jobID = req.params.id;
		var foundStatus = '';
		//process edit
		if (jobs.hasOwnProperty(jobID))
		{
			foundStatus = 'FOUND';
		
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
			
			if (valid) //update
			{
				var UpdateJobID = md5(scriptURL);
				
				if (UpdateJobID == jobID) //update info
				{
					//did when change?
					var updateWhen = false;
					if (when != jobs[jobID].when)
					{
						updateWhen = true;
					}
					
					jobs[jobID] = {
						title: title,
						url: jobs[jobID].url,
						when: when,
						added: jobs[jobID].added
					};
					
					saveData('jobs');
					
					if (updateWhen)
					{
						if (!runningJobs.hasOwnProperty(jobID))
						{
							if (when > 0)
							{
								nextJobs[jobID] = time() + when;
								saveData('nextJobs');
							}
						}
					}
					
					info.success = 'updated';
				}
				else //update info, and job id
				{
					//did when change?
					var updateWhen = false;
					if (when != jobs[jobID].when)
					{
						updateWhen = true;
					}
				
					var oldJob = jobs[jobID];
					delete jobs[jobID];
					
					jobs[UpdateJobID] = {
						title: title,
						url: scriptURL,
						when: when,
						added: oldJob.added
					};
					
					saveData('jobs');
					
					if (runningJobs.hasOwnProperty(jobID))
					{
						var oldRunningJob = runningJobs[jobID];
						delete runningJobs[jobID];
						
						runningJobs[UpdateJobID] = oldRunningJob;
						
						saveData('runningJobs');
					}
					
					if (nextJobs.hasOwnProperty(jobID))
					{
						var oldNextJobs = nextJobs[jobID];
						delete nextJobs[jobID];
						
						nextJobs[UpdateJobID] = oldNextJobs;
						
						saveData('nextJobs');
					}
					
					saveData('jobs');
					
					if (updateWhen)
					{
						if (!runningJobs.hasOwnProperty(UpdateJobID))
						{
							if (when > 0)
							{
								nextJobs[UpdateJobID] = time() + when;
								saveData('nextJobs');
							}
						}
					}
					
					info.success = 'updated';
				}
			}
			
		}
		else
		{
			foundStatus = 'NOTFOUND';
		}
		
		//output json
		outJson.foundStatus = foundStatus;
		outJson.errors = errors;
		outJson.info = info;
		res.send(outJson);
	}
}