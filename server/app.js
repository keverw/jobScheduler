global.configData = {};global.running = false;global.version = 0.1;require('./php.js');global.checkForValidURL = function(value){	value = value.replace('localhost', '0.0.0.0');	var urlregex = new RegExp("^((http|https):\/\/)?(www.)?([a-zA-Z0-9]|-)+([.][a-zA-Z0-9(-|\/|=|?#)?]+)+$");	if (urlregex.test(value)) {		return true;	}	return false;}var iniparser = require('iniparser');iniparser.parse('./config.ini', function(err,data){	if (err)	{		console.log('error reading config.ini');		console.log(err);	}	else	{		var hasError = false;		var port = data.port;				if (port === undefined)		{			console.log('You must define a port in the config.ini file.');			hasError = true;		}		else if (isNaN(port))		{			console.log('Port must be a number');			hasError = true;		}		else		{			configData.port = port;		}				if (!hasError)		{			startServer();		}	}	});//save filesglobal.jobsFile = './data/jobs.json';global.nextJobsFile = './data/nextJobs.json';global.runningJobsFile = './data/runningJobs.json';//dataglobal.jobs = {};global.nextJobs = {};global.runningJobs = {};//main part of appvar fs = require('fs');loadSaveData = function(){	var returnValue = true;		//load jobs	if (fs.existsSync(jobsFile)) //load	{		jobs = JSON.parse(fs.readFileSync(jobsFile, 'utf8'));	}	else //save blank file	{		if (!saveDataSync('jobs'))		{			returnValue = false;		}	}		//load nextJobs	if (fs.existsSync(nextJobsFile)) //load	{		nextJobs = JSON.parse(fs.readFileSync(nextJobsFile, 'utf8'));	}	else //save blank file	{		if (!saveDataSync('nextJobs'))		{			returnValue = false;		}	}		//load runningJobs	if (fs.existsSync(runningJobsFile)) //load	{		runningJobs = JSON.parse(fs.readFileSync(runningJobsFile, 'utf8'));	}	else //save blank file	{		if (!saveDataSync('runningJobs'))		{			returnValue = false;		}	}		//clean up left over data, just to be safe	for (var jobID in nextJobs)	{		if (nextJobs.hasOwnProperty(jobID))		{			if (!jobs.hasOwnProperty(jobID))			{				delete nextJobs[jobID];			}		}	}		for (var jobID in runningJobs)	{		if (runningJobsFile.hasOwnProperty(jobID))		{			if (!jobs.hasOwnProperty(jobID))			{				delete runningJobsFile[jobID];			}		}	}		//add in next jobs	for (var jobID in jobs)	{		if (jobs.hasOwnProperty(jobID))		{			if (!nextJobs.hasOwnProperty(jobID))			{				if (!runningJobsFile.hasOwnProperty(jobID))				{					var when = jobs[jobID].when;					nextJobs[jobID] = time() + when;				}			}		}	}		saveData('all');		return returnValue;}saveData = function (what){	if (what == 'jobs')	{		fs.writeFile(jobsFile, JSON.stringify(jobs), 'utf8');	}	else if (what == 'nextJobs')	{		fs.writeFile(nextJobsFile, JSON.stringify(nextJobs), 'utf8');	}	else if (what == 'runningJobs')	{		fs.writeFile(runningJobsFile, JSON.stringify(runningJobs), 'utf8');	}	else if (what == 'all')	{		saveData('jobs');		saveData('nextJobs');		saveData('runningJobs');	}}saveDataSync = function (what){	if (what == 'jobs')	{		fs.writeFileSync(jobsFile, JSON.stringify(jobs), 'utf8');				if (fs.existsSync(jobsFile))		{			return true;		}		else		{			return false;		}	}	else if (what == 'nextJobs')	{		fs.writeFileSync(nextJobsFile, JSON.stringify(nextJobs), 'utf8');				if (fs.existsSync(nextJobsFile))		{			return true;		}		else		{			return false;		}	}	else if (what == 'runningJobs')	{		fs.writeFileSync(runningJobsFile, JSON.stringify(runningJobs), 'utf8');				if (fs.existsSync(runningJobsFile))		{			return true;		}		else		{			return false;		}	}}startServer = function(){	if (loadSaveData())	{		running = true;		//start job processer				//start taking API calls				var express = require('express');		var app = express();				app.use(express.bodyParser());				app.get('/listJobs', function(req, res, next){		  require('./apiCalls/listJobs.js').page(req, res, next);		});				app.post('/addJob', function(req, res, next){			require('./apiCalls/addJob.js').page(req, res, next);		});				app.all('*', function (req, res) //404 error - Keep this as the last route		{			//uh 404!			res.send('404');		});				app.listen(configData.port);				console.log('server running on port ' + configData.port + '. \nCTRL + C to shutdown');	}	else	{		console.log('Error loading saved data.');	}}