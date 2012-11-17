module.exports = {
	page: function (req, res, next) {
		
		var jobList = {};
		
		for (var jobID in jobs)
		{
			if (jobs.hasOwnProperty(jobID))
			{
				var jobInfo = {};
				
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
				
				jobList[jobID] = jobInfo;
			}
		}
		
		res.send({list: jobList});
	}
}