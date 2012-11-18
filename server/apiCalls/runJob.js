module.exports = {
	page: function (req, res, next) {
		var jobInfo = {};
		var jobID = req.params.id;
		var foundStatus = '';
		var startStatus = '';
		//process job
		if (jobs.hasOwnProperty(jobID))
		{
			foundStatus = 'FOUND';
			
			if (runningJobs.hasOwnProperty(jobID))
			{
				startStatus = 'ALREADY';
			}
			else
			{
				runningJobs[jobID] = time()
				
				if (jobs.hasOwnProperty(jobID))
				{
					callScript(jobs[jobID].url, jobID);
				}
				
				saveData('runningJobs');
				
				if (nextJobs.hasOwnProperty(jobID))
				{
					delete nextJobs[jobID];
					saveData('nextJobs');
				}
				
				startStatus = 'STARTED';
			}
		}
		else
		{
			foundStatus = 'NOTFOUND';
		}
		
		//output json
		jobInfo.foundStatus = foundStatus;
		jobInfo.startStatus = startStatus;
		
		res.send(jobInfo);
	}
}