console.log('Fetching Data');

async function loadData() {
    const response = await fetch('https://prof-sears.github.io/Learning/CSVData/KY_COVID_data.csv'); // Load data from CSV file
    const rawtext = await response.text();                                                           // Get the response as text;
    
    rows = rawtext.split('\n');                  // Split the CSV file into rows.
    headers = rows[0].split(',');                // Split the first row as a header.
    console.log(`Read CSV headers: ${headers}`); // Record the headers to the console.
    for(let i = 1; i < rows.length; i++) {
        console.log(rows[i]);
    }
}

