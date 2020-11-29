console.log('Fetching Data');

let infChart;   // This is the chart for the cumulative invections.
let deathChart; // This is the chart for the cumulate deaths.

loadData();

async function loadData() {
    const response = await fetch('https://prof-sears.github.io/Learning/CSVData/KY_COVID_data.csv'); // Load data from CSV file
    const rawtext = await response.text();                                                           // Get the response as text;
    
    const rows = rawtext.split('\n');                  // Split the CSV file into rows.
    const headers = rows[0].split(',');                // Split the first row as a header.
    console.log(`Read CSV headers: ${headers}`);       // Record the headers to the console.
    
    const infLabels = [];                                 // This stores the dates as labels.
    const cumInfData = [];                                // This is the data for the cumulative infections.
    const deathLabels = [];                               // This is the labels for the cumulative deaths.
    const cumDeathData = [];                              // This is the data for cumulative deaths.
    
    let row = [];
    for(let i = 1; i < rows.length; i++) {
        row = rows[i].split(',');
        if(row[2] !== '') {
            infLabels.push(row[0]);
            cumInfData.push(parseInt(row[2]));
        }
        if(row[3] !== '') {
            deathLabels.push(row[0]);
            cumDeathData.push(parseInt(row[3]));
        }
    }
     
    /* Build the cumulative infections chart. */
    const infCanvas = document.getElementById('cuminf');    // Load the
    if(infChart instanceof Chart) infChart.destroy();
    console.log(cumInfData);
    infChart = new Chart(infCanvas,
    {
        type: 'line',
        data: {
            labels: infLabels,
            datasets: [{label: 'KY', data: cumInfData, backgroundColor: 'blue', borderColor: 'blue', pointRadius: 0, fill: false}]
        },
        options: {
            title: {display: true, text: 'Cumulative Infections vs. Date'},
        }
    });

    /* Build the cumulative deaths chart. */
    const deathCanvas = document.getElementById('cumdeath');    // Load the
    if(deathChart instanceof Chart) deathChart.destroy();
    deathChart = new Chart(deathCanvas,
        {
            type: 'line',
            data: {
                labels: deathLabels,
                datasets: [{label: 'KY', data: cumDeathData, backgroundColor: 'blue', borderColor: 'blue', pointRadius: 0, fill: false}]
            },
            options: {
                title: {display: true, text: 'Cumulative Deaths vs. Date'},
            }
        });
}

