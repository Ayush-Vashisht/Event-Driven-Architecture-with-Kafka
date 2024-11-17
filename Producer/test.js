import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10,        
  duration: '30s', 
};

export default function () {
  const url = "http://localhost:3000/post";
  const payload = JSON.stringify({
    title: "Test 1",
    content: "Test",
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Perform the POST request
  const res = http.post(url, payload, params);

  // Check if the status is 200 (OK)
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time is < 200ms': (r) => r.timings.duration < 200,
  });

  // Pause for 1 second between requests
  sleep(1);
}

