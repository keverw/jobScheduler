module.exports = {
	page: function (req, res, next) {
		var jobInfo = {};
		var jobID = req.params.id;
		var foundStatus = '';
		var deleteStatus = '';
		
		if (jobs.hasOwnProperty(jobID))
		{
			delete jobs[jobID];
			
			saveData('jobs');
			
			if (runningJobs.hasOwnProperty(jobID))
			{
				delete runningJobs[jobID];
				saveData('runningJobs');
			}
			
			if (nextJobs.hasOwnProperty(jobID))
			{
				delete nextJobs[jobID];
				saveData('nextJobs');
			}
			
			deleteStatus = 'DELETED';
			foundStatus = 'FOUND';
		}
		else
		{
			foundStatus = 'NOTFOUND';
		}
		
		jobInfo.foundStatus = foundStatus;
		jobInfo.deleteStatus = deleteStatus;
		
		res.send(jobInfo);
	}
}