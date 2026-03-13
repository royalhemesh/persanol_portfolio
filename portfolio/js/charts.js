document.addEventListener('DOMContentLoaded', () => {

    const ctx = document.getElementById('demoChart');
    if (!ctx) return;

    // Theme Variables Tracker
    function getThemeColors() {
        const isDarkMode = document.documentElement.classList.contains('dark');
        return {
            textColor: isDarkMode ? '#94a3b8' : '#475569',
            gridColor: isDarkMode ? '#334155' : '#e2e8f0',
            accent: isDarkMode ? '#2dd4bf' : '#0ea5e9',
            accentGlow: isDarkMode ? 'rgba(45, 212, 191, 0.2)' : 'rgba(14, 165, 233, 0.2)',
            secondaryLine: isDarkMode ? '#6366f1' : '#3b82f6'
        };
    }

    let colors = getThemeColors();
    let chartInstance = null;

    // Data Configuration mimicking complex trends with forecasting
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dataSet1 = [65, 59, 80, 81, 56, 55, 40, 70, 85, 120, 140, 150]; // Represents historic+Q4 spike
    const dataSet2 = [28, 48, 40, 19, 86, 27, 90, 60, 50, 45, 40, 35];    // Baseline comparison

    function initChart() {
        if (chartInstance) chartInstance.destroy();

        chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Q4 Seasonal Projection',
                        data: dataSet1,
                        borderColor: colors.accent,
                        backgroundColor: colors.accentGlow,
                        borderWidth: 3,
                        pointBackgroundColor: colors.accent,
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: colors.accent,
                        fill: true,
                        tension: 0.4 // Smooth curves
                    },
                    {
                        label: 'Baseline Metric',
                        data: dataSet2,
                        borderColor: colors.secondaryLine,
                        borderWidth: 2,
                        borderDash: [5, 5], // Dotted line for baseline
                        pointRadius: 0,
                        fill: false,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: colors.textColor,
                            font: { family: 'Inter', size: 12 }
                        }
                    },
                    tooltip: {
                        backgroundColor: document.documentElement.classList.contains('dark') ? '#0f172a' : '#ffffff',
                        titleColor: document.documentElement.classList.contains('dark') ? '#ffffff' : '#0f172a',
                        bodyColor: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#475569',
                        borderColor: colors.gridColor,
                        borderWidth: 1,
                        padding: 10,
                        displayColors: true,
                        titleFont: { family: 'Inter', weight: 'bold' }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false, color: colors.gridColor },
                        ticks: { color: colors.textColor, font: { family: 'Inter' } }
                    },
                    y: {
                        grid: { color: colors.gridColor },
                        ticks: { color: colors.textColor, font: { family: 'Inter' } },
                        beginAtZero: true
                    }
                }
            }
        });
    }

    initChart();

    // Re-render chart on theme change to update font and grid colors
    window.addEventListener('themeChanged', () => {
        colors = getThemeColors();
        initChart();
    });
});
