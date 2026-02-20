#!/bin/bash
API_KEY="dcfaf327aa8054d3d057cfe17004a9725dbbc15038fccc462e5ad29d99c5e361"
HOST="https://astro-api-1qnc.onrender.com"

echo "=== Testing Standard Synastry API on HOST: $HOST ==="
echo "Endpoint: /api/v1/western/synastry"
curl -s -X POST "$HOST/api/v1/western/synastry" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "person_a": {
      "datetime": "1990-06-15T10:00:00",
      "tz_str": "Europe/Paris",
      "location": {"lat": 48.8566, "lng": 2.3522, "city": "Paris"}
    },
    "person_b": {
      "datetime": "1993-03-20T14:30:00",
      "tz_str": "Europe/London",
      "location": {"lat": 51.5074, "lng": -0.1278, "city": "London"}
    }
  }' > synastry_response.json

if [ -s synastry_response.json ]; then
  echo "Response received (saved to synastry_response.json)"
  head -n 20 synastry_response.json
else
  echo "Empty response"
fi

echo -e "\n\n=== Testing Geo Search V1 (fallback) ==="
curl -s "$HOST/api/v1/geo/search?q=Paris&limit=1"
