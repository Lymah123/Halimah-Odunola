// Exercise 1: Quiet Time

async function activityTable(day) {
  try {
    let logFileList = await textFile("camera_logs.txt");
    let logFiles = logFileList.split("\n").filter(Boolean);
    let hourCounts = new Array(24).fill(0);

    for (const logFile of logFiles) {
      try {
        let logContent = await textFile(logFile);
        let timestamps = logContent.split("\n").map(Number).filter(Boolean);

        timestamps.forEach(timestamp => {
          let date = new Date(timestamp);
          if (date.getDay() === day) {
            hourCounts[date.getHours()]++;
          }
        });
      } catch (error) {
        console.error(`Error reading log file ${logFile}:`, error);
      }
    }

    return hourCounts;
  } catch (error) {
    console.error('Error reading camera_logs.txt:', error);
  }
}

// Exercise 2: Real promise

const fs = require('fs').promises; // Import the fs module to use promises

// Define the textFile function
function textFile(filename) {
    return fs.readFile(filename, 'utf8'); // Read the file and return a promise
}

async function activityTable(day) {
    return textFile("camera_logs.txt").then(logFileList => {
        let logFiles = logFileList.split("\n").filter(Boolean); // Filter to remove empty lines
        let hourCounts = new Array(24).fill(0); // Initialize an array for 24 hours

        // Create an array of promises for reading each log file
        let promises = logFiles.map(logFile => {
            return textFile(logFile).then(logContent => {
                let timestamps = logContent.split("\n").map(Number).filter(Boolean); // Convert to numbers

                // Count occurrences for the specified day
                timestamps.forEach(timestamp => {
                    let date = new Date(timestamp);
                    if (date.getDay() === day) {
                        hourCounts[date.getHours()]++;
                    }
                });
            });
        });

        // Wait for all promises to complete
        return Promise.all(promises).then(() => hourCounts);
    });
}

function activityGraph(hourCounts) {
    // Example implementation to format output
    return hourCounts.map((count, hour) => `Hour ${hour}: ${count} events`).join('\n');
}

// Usage
activityTable(6).then(table => console.log(activityGraph(table))).catch(console.error);

// Exercise 3: Building promise.all

function Promise_all(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Input must be an array"));
    }

    const results = new Array(promises.length);
    let resolvedCount = 0;

    if (promises.length === 0) {
      // If the array is empty, resolve with an empty array
      return resolve(results);
    }

    promises.forEach((promise, index) => {
      // Use Promise.resolve to handle non-promise values
      Promise.resolve(promise)
        .then(value => {
          results[index] = value; // Store the resolved value
          resolvedCount++; // Increment the resolved count

          // If all promises have resolved, resolve the main promise
          if (resolvedCount === promises.length) {
            resolve(results);
          }
        })
        .catch(error => {
          // If any promise rejects, reject the main promise
          reject(error);
        });
    });
  });
}

// Test code.
Promise_all([]).then(array => {
  console.log("This should be []:", array);
});

function soon(val) {
  return new Promise(resolve => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}

Promise_all([soon(1), soon(2), soon(3)]).then(array => {
  console.log("This should be [1, 2, 3]:", array);
});

Promise_all([soon(1), Promise.reject("X"), soon(3)])
  .then(array => {
    console.log("We should not get here");
  })
  .catch(error => {
    if (error !== "X") {
      console.log("Unexpected failure:", error);
    }
  });

