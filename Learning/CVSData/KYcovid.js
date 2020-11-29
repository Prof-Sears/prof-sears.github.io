console.log('Fetching Data');

let infChart;       // This is the chart for the cumulative invections.
let deathChart;     // This is the chart for the cumulate deaths.
let newInfChart;    // this is the chart for the average new infections.

loadData();

async function loadData() {
    const response = await fetch('https://prof-sears.github.io/Learning/CSVData/KY_COVID_data.csv'); // Load data from CSV file
    const rawtext = await response.text();                                                           // Get the response as text;
    
    const rows = rawtext.split('\n');                  // Split the CSV file into rows.
    const headers = rows[0].split(',');                // Split the first row as a header.
    console.log(`Read CSV headers: ${headers}`);       // Record the headers to the console.
    
    const labels = [];                                 // This stores the dates as labels.
    const cumInfData = [];                             // This is the data for the cumulative infections.
    const deathLabels = [];                            // This is the labels for the cumulative deaths.
    const cumDeathData = [];                           // This is the data for cumulative deaths.
        
    /* Read the data into useable arrays */
    let row = [];
    for(let i = 1; i < rows.length; i++) {
        row = rows[i].split(',');
<<<<<<< HEAD:Learning/CVSData/KYcovid.js
        if(row[2] !== '') {
            infLabels.push(row[0]);
            cumInfData.push(parseInt(row[2]));
        }
        if(row[3] !== '') {
            deathLabels.push(row[0]);
            cumDeathData.push(parseInt(row[3]));
        }
=======

        labels.push(row[0]);
        
        cumInfData.push(parseInt(row[2]));
        cumDeathData.push(parseInt(row[3]));
>>>>>>> d085cdd1bc2bca0b9c255d0d7019dd36c65c755d:Learning/CSVData/KYcovid.js
    }

    /* Calculate new cases and rolling average */
    const newInf = [NaN];                              // This is the data for the daily new infections.
    for(let i = 1; i < cumInfData.length; i++) {
        newInf.push(cumInfData[i] - cumInfData[i-1]);
    }
    const avgNewInf = [NaN,NaN,NaN,NaN,NaN,NaN,NaN];       // This is the data for the new infection rolling average.
    for(let i = 8; i<newInf.length; i++) {
        avgNewInf.push(newInf.slice(i-7,i).reduce((a,b) => a+b)/7);
    }
         
    /* Build the cumulative infections chart. */
    const infCanvas = document.getElementById('cuminf');    // Load the
    if(infChart instanceof Chart) infChart.destroy();
    infChart = new Chart(infCanvas,
    {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{label: 'KY', data: cumInfData, backgroundColor: 'blue', borderColor: 'blue', pointRadius: 0, fill: false}]
        },
        options: {
            title: {display: true, text: 'Cumulative Infections vs. Date'},
            scales: {yAxes: [{ticks: {beginAtZero: true}}]}
        }
    });

    /* Build the cumulative deaths chart. */
    const deathCanvas = document.getElementById('cumdeath');    // Load the
    if(deathChart instanceof Chart) deathChart.destroy();
    deathChart = new Chart(deathCanvas,
    {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{label: 'KY', data: cumDeathData, backgroundColor: 'blue', borderColor: 'blue', pointRadius: 0, fill: false}]
        },
        options: {
            title: {display: true, text: 'Cumulative Deaths vs. Date'},
            scales: {yAxes: [{ticks: {beginAtZero: true}}]}
        }
    });
    
    /* Build the new infections chart. */
    const newCasesCanvas = document.getElementById('newinf');
    if(newInfChart instanceof Chart) newInfChart.destroy();
    deathChart = new Chart(newCasesCanvas,
        {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {label: '7 Day Average - KY', data: avgNewInf, backgroundColor: 'red', borderColor: 'red', pointRadius: 0, fill: false},
                    {label: 'New Cases - KY', data: newInf, backgroundColor: 'blue', borderColor: 'rgba(0,0,255,0.4)', pointRadius: 0, fill: false}]
            },
            options: {
                title: {display: true, text: 'New Cases vs. Date'},
                scales: {yAxes: [{ticks: {beginAtZero: true}}]}
            }
        });
}

