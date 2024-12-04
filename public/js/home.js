
// Chart.js script for Impact Section
const ctxBar = document.getElementById('co2BarChart').getContext('2d');
const co2BarChart = new Chart(ctxBar, {
    type: 'bar',
    data: {
        labels: ['Gmail', 'Facebook', 'Instagram', 'WhatsApp', 'Zoom'],
        datasets: [{
            label: 'Annual CO2 Emission (kg)',
            data: [1200000000, 800000000, 700000000, 500000000, 400000000],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const ctxPie = document.getElementById('energyPieChart').getContext('2d');
const energyPieChart = new Chart(ctxPie, {
    type: 'pie',
    data: {
        labels: ['Data Centers', 'Cloud Services', 'Streaming', 'Email Platforms', 'Other'],
        datasets: [{
            label: 'Energy Consumption',
            data: [40, 20, 15, 15, 10],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw + '%';
                    }
                }
            }
        }
    }
});

const ctxCountry = document.getElementById('countryEmissionChart').getContext('2d');
const countryEmissionChart = new Chart(ctxCountry, {
    type: 'bar',
    data: {
        labels: ['USA', 'China', 'India', 'Germany', 'Brazil'],
        datasets: [{
            label: 'Digital Emissions by Country (kg CO2)',
            data: [3500000000, 2500000000, 1800000000, 1200000000, 900000000],
            backgroundColor: [
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw + ' kg CO2';
                    }
                }
            }
        }
    }
});
