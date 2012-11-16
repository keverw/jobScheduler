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
				
				//todo: add if it's pending(and when) or if it's running and when it started
				
				console.log(jobInfo);
			}
		}
		
		res.send('hello world');
		
	}
}