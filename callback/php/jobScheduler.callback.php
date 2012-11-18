<?php
	class jobScheduler
	{
		private $server = null;
		
		function __construct($server)
		{
			$this->server = $server;
		}
		
		public function done($id)
		{
			$result = $this->DoHTTP($this->server . 'unlockJob/' . $id);	
			$result2 = $this->processHTTP($result['status'], $result['output']);
			
			if ($result2['unlockStatus'] == 'ALREADY' || $result2['unlockStatus'] == 'UNLOCKED')
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		
		private function DoHTTPCombined($URL, $post_fields = array())
		{
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
			$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
			$output = curl_exec($ch);
			
			//close connection
			curl_close($ch);	
		}
		
		private function DoHTTP($URL, $post_fields = array())
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
			$returnoutput['output'] = curl_exec($ch);
			//Get status
			$returnoutput['status'] = curl_getinfo($ch, CURLINFO_HTTP_CODE);
			//close connection
			curl_close($ch);
			return $returnoutput;
		}
		
		private function processHTTP($status, $output)
		{
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