const portfolioData = {
    skills: [
        { name: "Python", icon: "terminal", category: "Language" },
        { name: "SQL (MySQL/PostgreSQL)", icon: "database", category: "Database" },
        { name: "Power BI", icon: "pie-chart", category: "Visualization" },
        { name: "Excel", icon: "table", category: "Analysis" },
        { name: "Machine Learning", icon: "brain-circuit", category: "Modeling" },
        { name: "Statistical Analysis", icon: "line-chart", category: "Analysis" },
        { name: "Data Cleaning", icon: "filter", category: "Processing" },
        { name: "Exploratory Data Analysis", icon: "search", category: "Analysis" }
    ],
    projects: [
        {
            id: 1,
            title: "Demand Forecasting & Inventory Analysis",
            role: "Data Scientist Trainee • Datamites",
            date: "June 2025 – Feb 2026",
            summary: "SQL analysis on 15K+ retail transactions to evaluate sales performance and optimize inventory planning.",
            problem: "Functional channel owners struggled with inventory planning due to slow query execution and fragmented historical sales data.",
            dataset: "15K+ retail transactions covering 80+ products.",
            process: "Conducted robust SQL analysis to evaluate sales performance. Developed multi-table queries to build weekly demand datasets. Restructured complex joins and aggregations.",
            tools: ["SQL", "MySQL", "Data Cleaning"],
            findings: "Reduced query execution time by ~70% (from 1.0s to 0.3s). Successfully translated historical data into actionable inventory planning datasets.",
            impact: "Directly supported functional channel owners in inventory restructuring and demand forecasting efficiency.",
            repo: "github.com/royalhemesh/weekly_demand_forecasting_using_sql"
        },
        {
            id: 2,
            title: "Sales Performance Dashboard",
            role: "Data Analytics Project",
            date: "2025",
            summary: "End-to-end data pipeline and storytelling dashboard to interpret logistics and Q4 seasonal spikes.",
            problem: "Management needed a high-level view of regional performance and supply chain logistics to formulate Q1 strategies.",
            dataset: "Large-scale 'Superstore' datasets loaded via Python.",
            process: "Developed a Python pipeline to load raw CSVs into PostgreSQL. Cleaned data to engineer features like 'days_to_ship'. Built an interactive Power BI dashboard with a storytelling layout.",
            tools: ["Python", "SQL", "PostgreSQL", "Power BI", "Feature Engineering"],
            findings: "Identified a recurring Q4 seasonal spike and the high-margin potential of the Technology product category.",
            impact: "Provided actionable intelligence for Q1 marketing strategies and allowed management to drill from KPIs to granular data.",
            repo: "github.com/royalhemesh/PowerBI-Sales-Dashboard"
        },
        {
            id: 3,
            title: "Bank Marketing Profit Optimization",
            role: "Machine Learning Pipeline",
            date: "2025",
            summary: "Predictive model simulating a 617% profit increase by targeting high-response banking customers.",
            problem: "Bank was wasting marketing spend on low-interest leads due to an inefficient targeting strategy.",
            dataset: "40K historical customer records from past marketing campaigns.",
            process: "Analyzed high-volume data to map engagement drivers. Developed a Gradient Boosting predictive model to target customers with the highest conversion probability.",
            tools: ["Python", "Scikit-Learn (Gradient Boosting)", "SQL", "Power BI"],
            findings: "Pinpointed the highest-probability conversion segments, reducing wasted spend.",
            impact: "Simulated a 617% profit increase (₹42,040 → ₹3,01,540) by optimizing the targeting strategy for senior leadership.",
            repo: "github.com/royalhemesh/Bank-Marketing-Profit-Optimization"
        }
    ]
};
