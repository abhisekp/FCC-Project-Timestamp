# API Backend Project: Timestamp microservice [**`timestamp-microservice-absk`**](https://timestamp-microservice-absk.glitch.me)
Get unix and natural timestamp.

**Challenge:** <https://www.freecodecamp.com/challenges/timestamp-microservice>

## User stories:  

1. I can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016). — **DONE**  
   [https://timestamp-microservice-absk.glitch.me/api/ts/January 1, 2016](https://timestamp-microservice-absk.glitch.me/api/ts/January%201,%202016)  
   ```json
    {
      "unix": 1451606400,
      "natural": "January 01, 2016"
    }
   ```
2. If it does, it returns both the Unix timestamp and the natural language form of that date. — **DONE**  
   <https://timestamp-microservice-absk.glitch.me/api/ts/1451606400>  
   ```json
    {
      "unix": 1451606400,
      "natural": "January 01, 2016"
    }
   ```
3. If it does not contain a date or Unix timestamp, it returns null for those properties. — **DONE**  
   <https://timestamp-microservice-absk.glitch.me/api/ts/random>  
   ```json
    {
      "unix": null,
      "natural": null
    }
   ```

### Additional Features:

1. If url is `/api/ts` without any timestamp, then respond with the current time. — **DONE**  
   <https://timestamp-microservice-absk.glitch.me/api/ts>  
   ```json
    {
      "unix": 1523406140,
      "natural": "April 11, 2018"
    }
   ```


## Usage

```text
API_HOST: timestamp-microservice-absk.glitch.me
API_VERSION: v1
API_ROOT: /api
```
**OUTPUT**   

```text
{
  "unix": <time in seconds> e.g. 1492905600 or null
  "natural": "Month Day, Year" e.g. "April 23, 2017" or null
}
```

#### Example

<https://timestamp-microservice-absk.glitch.me/api>

----
### Timestamp API

```http
GET /timestamp
GET /ts
```

`https://timestamp-microservice-absk.glitch.me/api/timestamp/:timestring`  
`https://timestamp-microservice-absk.glitch.me/api/ts/:timestring`

- **`:timestring`** - Unix timestamp or natural time  
  e.g. `Jan 1, 2050`, `28th February 1995`, `1448928000`, etc.

#### Example
<https://timestamp-microservice-absk.glitch.me/api/ts/1448928000>

##### TODO

1. Support for relative time `/ts/{now,latest,today,yesterday,a year ago, etc}`.
2. Frontend of the API timeserver for easy getting the time.
3. Have a great design of the frontend.
4. If url is `/api`, then repond with a JSON document with an `error` and a `documention_url` field directing to the relevant documentation of the timeserver.
5. Add authentication and limit based on the authenticated user priviledges