console.log('Fetching Data');

async function loadData() {
    const response = await fetch('https://prof-sears.github.io/Learning/CSVData/KY_COVID_data.csv'); // Load data from CSV file
    const dataset = await response.text();             // Get the response as text;
    console.log(dataset);
}

