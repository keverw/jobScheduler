<?php
	/*
		basic example file. logs data to php2console, but should give you an idea on how the job script should tell the job scheduler server that it's done.
	*/
	require('../../../../Downloads/PHP-to-Console-master/php/php2console.php'); //https://github.com/keverw/PHP-to-Console
	
	require('../../../../Documents/projects/GitHub/jobScheduler/callback/php/jobScheduler.callback.php');
	
	$jobSchedulerHost = 'http://localhost:5188/';
	
	$jobSchedulerCB = new jobSchedulerCB($jobSchedulerHost);
	
	$php_console = new php_console('localhost', '5088');
	$php_console->output('Got a request!!!');
	
	// sleep for 10 seconds - just to simulate doing somthing
	sleep(10);
	
	//tell the job scheduler that we're done.
	if ($jobSchedulerCB->done($_POST['jobID']))
	{
		$php_console->output('Unlocked!');
	}
	else
	{
		$php_console->output('Failed unlocking...');
	}
?>