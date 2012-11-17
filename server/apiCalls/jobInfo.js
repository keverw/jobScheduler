module.exports = {
	page: function (req, res, next) {
		var jobInfo = {};
		var jobID = req.params.id;
		var foundStatus = '';
		
		if (jobs.hasOwnProperty(jobID))
		{
			foundStatus = 'FOUND';
			
			jobInfo.jobID = jobID;
			jobInfo.title = jobs[jobID].title;
			jobInfo.url = jobs[jobID].url;
			jobInfo.when = jobs[jobID].when;
			jobInfo.added = jobs[jobID].added;
			
			if (nextJobs.hasOwnProperty(jobID))
			{
				jobInfo.nextRun = +nextJobs[jobID];
			}
			else
			{
				jobInfo.nextRun = 0;
			}
			
			if (runningJobs.hasOwnProperty(jobID))
			{
				jobInfo.isRunning = true;
				jobInfo.runStart = +runningJobs[jobID];
			}
			else
			{
				jobInfo.isRunning = false;
				jobInfo.runStart = 0;
			}
		}
		else
		{
			foundStatus = 'NOTFOUND';
		}
		
		jobInfo.foundStatus = foundStatus;
		
		res.send(jobInfo);
	}
}