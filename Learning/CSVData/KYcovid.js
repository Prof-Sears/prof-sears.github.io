console.log('Fetching Data');

let infChart;       // This is the chart for the cumulative invections.
let deathChart;     // This is the chart for the cumulate deaths.
let newInfChart;    // this is the chart for the average new infections.

console.log(moment());

const loadData = async () => {
    const response = await fetch('https://prof-sears.github.io/Learning/CSVData/KY_COVID_data.csv'); // Load data from CSV file
    const rawtext = await response.text();                                                           // Get the response as text;
    
    const rows = rawtext.split('\n');                  // Split the CSV file into rows.
    const headers = rows[0].split(',');                // Split the first row as a header.
    console.log(`Read CSV headers: ${headers}`);       // Record the headers to the console.
    
    const labels = [];                                 // This stores the dates as labels.
    const cumInfData = [];                             // This is the data for the cumulative infections.
    const cumDeathData = [];                           // This is the data for cumulative deaths.
        
    /* Read the data into useable arrays */
    let row = [];
    for(let i = 1; i < rows.length; i++) {
        row = rows[i].split(',');
        let date = moment(row[0]);
        if(date.isValid()) {
          cumInfData.push({t: date, y: parseInt(row[2]), state: 'KY'});
          cumDeathData.push({t: date, y: parseInt(row[3]), state: 'KY'});
        } else {
          console.log(`Invalid date: ${row[0]}: ${date}`);
        }
        labels.push(row[0]);
    }
    
    let KyCumInfData = cumInfData.sort((a,b) => (a.t).format('YYYYMMDD') - (b.t).format('YYYYMMDD'));       // Kentucky Cumulative Infections Data
    let KyCumDeathData = cumDeathData.sort((a,b) => (a.t).format('YYYYMMDD') - (b.t).format('YYYYMMDD'));   // Kentucky Cumulative Deaths Data
    
    /* Calculate new cases and rolling average */
    const KyNewInf = [{t: KyCumInfData[0].t, y: NaN, state:'KY'}];                              // This is the data for the daily new infections.
    for(let i = 1; i < KyCumInfData.length; i++) {
        KyNewInf.push({t: KyCumInfData[i].t, y: KyCumInfData[i].y - KyCumInfData[i-1].y, state: 'KY'});
    }
    const KyAvgNewInf = [];
    for(let i = 7; i<KyNewInf.length; i++) {
      KyAvgNewInf.push({t: KyNewInf[i].t, y: averageY(KyNewInf.slice(i-6,i+1)), state: 'KY'});
    }
    console.log(KyAvgNewInf);
         
    /* Build the cumulative infections chart. */
    const infCanvas = document.getElementById('cuminf');    // Load the
    if(infChart instanceof Chart) infChart.destroy();
    infChart = new Chart(infCanvas,
    {
        type: 'line',
        data: {
            datasets: [{label: 'KY', data: KyCumInfData, backgroundColor: 'blue', borderColor: 'blue', pointRadius: 0, fill: false}]
        },
        options: {
            title: {display: true, text: 'Cumulative Infections vs. Date'},
            scales: {yAxes: [{ticks: {beginAtZero: true}}], xAxes: [{type: 'time', distribution: 'linear', time: {unit:'day'}}]}
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
            scales: {yAxes: [{ticks: {beginAtZero: true}}], xAxes: [{type: 'time', distribution: 'linear', time: {unit:'day'}}]}
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
                    {label: '7 Day Average - KY', data: KyAvgNewInf, backgroundColor: 'red', borderColor: 'red', pointRadius: 0, fill: false},
                    {label: 'New Cases - KY', data: KyNewInf, backgroundColor: 'blue', borderColor: 'rgba(0,0,255,0.4)', pointRadius: 0, fill: false}]
            },
            options: {
                title: {display: true, text: 'New Cases vs. Date'},
                scales: {yAxes: [{ticks: {beginAtZero: true}}], xAxes: [{type: 'time', distribution: 'linear', time: {unit:'day'}}]}
            }
        });
}

const averageY = (data) => {let sum = 0; for(let datum of data) sum += datum.y; return sum/data.length; }

loadData();