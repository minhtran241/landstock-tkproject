import os
import requests
import time
from dotenv import Dotenv

Dotenv = Dotenv(os.path.join(os.path.dirname(__file__), ".env"))
bearer_token = Dotenv.get("TEST_TOKEN")

if bearer_token is None:
    print("Bearer Token not found in .env file.")
    exit()

def get_bds_data():
    url = "https://b.thienkhoi.com/mbls/bds"
    headers = {
		"Authorization": f"Bearer ${bearer_token}" 
	}
    response = requests.get(url, headers=headers)
    return response.json()

def monitor_requests(num_requests):
    start_time = time.time()
    
    for _ in range(num_requests):
        data = get_bds_data()
        # Process the data as needed

    end_time = time.time()
    total_time = end_time - start_time
    avg_time_per_request = total_time / num_requests

    print(f"Number of requests: {num_requests}")
    print(f"Total time taken: {total_time} seconds")
    print(f"Average time per request: {avg_time_per_request} seconds")

if __name__ == "__main__":
    num_requests = 10  # Change this to the desired number of requests
    monitor_requests(num_requests)
