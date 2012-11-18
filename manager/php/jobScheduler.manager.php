<?php
	class jobScheduler
	{
		private $server = null;
		
		function __construct($server)
		{
			$this->server = $server;
		}
		
		public function jobInfo($id)
		{
			return $this->request($this->server . 'jobInfo/' . $id);
		}
		
		public function jobList()
		{
			return $this->request($this->server . 'listJobs');
		}
		
		public function addJob($title, $scriptURL, $when)
		{
			return $this->request(
				$this->server . 'addJob',
				array(
					'title' => $title,
					'scriptURL' => $scriptURL,
					'when' => $when
				)
			);
		}
		
		public function updateJob($id, $title, $scriptURL, $when)
		{
			return $this->request(
				$this->server . 'updateJob/' . $id,
				array(
					'title' => $title,
					'scriptURL' => $scriptURL,
					'when' => $when
				)
			);
		}
		
		public function deleteJob($id)
		{
			return $this->request($this->server . 'deleteJob/' . $id);
		}
		
		public function runJob($id)
		{
			return $this->request($this->server . 'runJob/' . $id);
		}
		
		public function unlockJob($id)
		{
			return $this->request($this->server . 'unlockJob/' . $id);	
		}
		
		private function request($URL, $post_fields = array())
		{
			$returnoutput = array();
			//open connection
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $URL);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			//url-ify data for POST
			if (count($post_fields) > 0)
			{
				foreach ($post_fields as $key => $value)
				{
					$fields_string .= $key . '=' . $value . '&';
				}
		
				rtrim($fields_string, '&');
				curl_setopt($ch, CURLOPT_POST, count($post_fields));
				curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
			}
		
			//execute post
			$output = curl_exec($ch);
			$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
			curl_close($ch);
			
			//process output
			$outputArray = array(
				'HttpStatusCode' => $status
			);
			
			if ($status == 200)
			{
				$data = @json_decode($output, true);
				
				if (is_array($data))
				{
					$outputArray = array_merge($outputArray, $data);
				}
				
				return $outputArray;
			}
			else
			{
				return $outputArray;
			}
		}
	}
?>