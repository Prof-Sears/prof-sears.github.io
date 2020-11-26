console.log('Fetching Data');

async function loadData() {
    const response = await fetch('file:///KY_COVID_data.csv'); // Load data from CSV file
    const dataset = await response.text();             // Get the response as text;
    console.log(dataset);
}
