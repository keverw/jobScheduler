module.exports = {
	page: function (req, res, next) {
		
		var jobList = {};
		
		for (var jobID in jobs)
		{
			if (jobs.hasOwnProperty(jobID))
			{
				
				console.log(jobID);
			}
		}
		
		res.send('hello world');
		
	}
}