let alertTriggered = false;

const updateTable = async () => {
    const response = await fetch('/api/app-usage');
    const appUsage = await response.json();
    const tbody = document.querySelector('#usageTable tbody');
    tbody.innerHTML = ''; // Clear existing table rows

    const labels = []; // To hold app names
    const timeSpentData = []; // To hold time spent data
    const carbonEmissionsData = []; // To hold carbon emissions data

    let totalCarbonEmissions = 0;
    let highestEmissionApp = null;
    let highestEmissionValue = 0;

    for (const app in appUsage) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${app}</td>
            <td>${appUsage[app].timeSpent.toFixed(2)}</td>
            <td>${appUsage[app].carbonEmissions.toFixed(2)}</td>
        `;
        tbody.appendChild(row);

        // Push data for chart
        labels.push(app);
        timeSpentData.push(appUsage[app].timeSpent);
        carbonEmissionsData.push(appUsage[app].carbonEmissions);

        // Calculate total emissions and find the highest-emitting app
        totalCarbonEmissions += appUsage[app].carbonEmissions;
        if (appUsage[app].carbonEmissions > highestEmissionValue) {
            highestEmissionApp = app;
            highestEmissionValue = appUsage[app].carbonEmissions;
        }
    }

    // Update chart with new data
    updateChart(labels, timeSpentData, carbonEmissionsData);

    // Check if total carbon emissions exceed threshold and trigger flash message
    const flashMessage = document.getElementById('flashMessage');
    if (totalCarbonEmissions > 2 && !alertTriggered) {
        flashMessage.style.display = 'block';
        flashMessage.textContent = `Warning: Your total carbon emissions have exceeded the limit. Please close the highest-emitting app: ${highestEmissionApp}.`;
        alertTriggered = true;

        // Hide the flash message after 5 seconds
        setTimeout(() => {
            flashMessage.style.display = 'none';
            alertTriggered = false;
        }, 5000);
    }
};

// Initialize Chart.js
const ctx = document.getElementById('usageChart').getContext('2d');
const usageChart = new Chart(ctx, {
    type: 'bar', // Bar chart
    data: {
        labels: [], // Will be updated dynamically
        datasets: [
            {
                label: 'Time Spent (minutes)',
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.6)', // Light blue color
            },
            {
                label: 'Carbon Emissions (grams)',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.6)', // Light red color
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    }
});

const updateChart = (labels, timeSpentData, carbonEmissionsData) => {
    usageChart.data.labels = labels;
    usageChart.data.datasets[0].data = timeSpentData;
    usageChart.data.datasets[1].data = carbonEmissionsData;
    usageChart.update(); // Update the chart with new data
};

// Update the table and chart every 5 seconds
setInterval(updateTable, 5000);