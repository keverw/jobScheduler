module.exports = {
	page: function (req, res, next) {
		var jobInfo = {};
		var jobID = req.params.id;
		var foundStatus = '';
		var unlockStatus = '';
		//process job
		if (jobs.hasOwnProperty(jobID))
		{
			foundStatus = 'FOUND';
			
			if (runningJobs.hasOwnProperty(jobID))
			{
				delete runningJobs[jobID];
				saveData('runningJobs');
				
				if (!runningJobs.hasOwnProperty(jobID))
				{
					var when = jobs[jobID].when;
					if (when > 0)
					{
						nextJobs[jobID] = time() + when;
						
						saveData('nextJobs');
					}
				}
				
				unlockStatus = 'UNLOCKED';
			}
			else
			{
				unlockStatus = 'NOTRunning';
			}
		}
		else
		{
			foundStatus = 'NOTFOUND';
		}
		
		//output json
		jobInfo.foundStatus = foundStatus;
		jobInfo.unlockStatus = unlockStatus;
		
		res.send(jobInfo);
	}
}