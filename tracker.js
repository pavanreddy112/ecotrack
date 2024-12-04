const fs = require('fs');

// Track screen time and log it
let appUsage = {};

// Define emission factors in grams per minute for each app
const emissionFactors = {
    'YouTube': 0.46,
    'WhatsApp': 0.14,
    'Twitch': 0.55,
    'Telegram': 0.14,
    'Gmail': 0.3,
    'Facebook': 0.79,
    'Snapchat': 0.87,
    'Subway Surfers': 0.87,
    'Instagram': 0.72,
    'TOI App': 0.61,
    'Pinterest': 1.30,
    'Reddit': 2.48,
    'NDTV App': 0.67,
    'Spotify': 50 / 60,
    'TikTok': 2.63,
    'Netflix': 6.7,
    'Amazon Music': 56 / 60,
    'Zoom': 56 / 60,
    'Google Chrome': 0.192,
    'Microsoft Teams': 1.2,
    'DuckDuckGo': 0.54,
    'Ecosia' : 0.167,
    'Brave': 0.4,
};

// Default emission factor for unlisted apps
const defaultEmissionFactor = 0.2;

// Function to log app usage time
const logAppUsage = (appName, timeSpent) => {
    if (!appUsage[appName]) {
        appUsage[appName] = { timeSpent: 0, carbonEmissions: 0 };
    }
    appUsage[appName].timeSpent += timeSpent;

    // Use the emission factor for the app if it exists, otherwise use the default
    const emissionFactor = emissionFactors[appName] || defaultEmissionFactor;
    appUsage[appName].carbonEmissions += (timeSpent * emissionFactor);
};

// Regular expression patterns to match app names in window titles
const appTitlePatterns = [
    { regex: /YouTube/i, appName: 'YouTube' },
    { regex: /WhatsApp/i, appName: 'WhatsApp' },
    { regex: /Twitch/i, appName: 'Twitch' },
    { regex: /Telegram/i, appName: 'Telegram' },
    { regex: /Gmail/i, appName: 'Gmail' },
    { regex: /Facebook/i, appName: 'Facebook' },
    { regex: /Snapchat/i, appName: 'Snapchat' },
    { regex: /Subway Surfers/i, appName: 'Subway Surfers' },
    { regex: /Instagram/i, appName: 'Instagram' },
    { regex: /Candy Crush/i, appName: 'Candy Crush' },
    { regex: /TOI App/i, appName: 'TOI App' },
    { regex: /Pinterest/i, appName: 'Pinterest' },
    { regex: /Reddit/i, appName: 'Reddit' },
    { regex: /NDTV App/i, appName: 'NDTV App' },
    { regex: /Spotify/i, appName: 'Spotify' },
    { regex: /TikTok/i, appName: 'TikTok' },
    { regex: /Netflix/i, appName: 'Netflix' },
    { regex: /Amazon Music/i, appName: 'Amazon Music' },
    { regex: /Zoom/i, appName: 'Zoom' },
    { regex: /Google Chrome/i, appName: 'Google Chrome' },
    { regex: /Microsoft/i, appName: 'Microsoft Teams' },
    { regex: /Visual Studio Code/i, appName: 'Visual Studio' },
    { regex: /ecosia/i, appName: 'Ecosia' },
    { regex: /DuckDuckGo/i, appName: 'DuckDuckGo' },
    { regex: /Brave/i, appName: 'Brave' },
];

// Function to clean app name using regular expressions
const getAppName = (windowTitle) => {
    for (let pattern of appTitlePatterns) {
        if (pattern.regex.test(windowTitle)) {
            return pattern.appName;
        }
    }
    return windowTitle; // If no match found, return original title
};

// Function to track active windows and calculate time
const trackActiveWindows = async (onUpdate) => {
    const getWindowsModule = await import('get-windows');
    const { activeWindow, openWindows } = getWindowsModule.default || getWindowsModule;

    let lastApp = null;
    let lastAppStartTime = Date.now();

    setInterval(async () => {
        try {
            const allWindows = await openWindows(); // Get all open windows
            const window = await activeWindow();    // Get the currently active window
            const currentTime = Date.now();

            if (window && window.title && allWindows.some(w => w.title === window.title)) {
                const appName = getAppName(window.title); // Simplify app name using regex

                if (appName !== lastApp) {
                    const timeSpent = (currentTime - lastAppStartTime) / 1000 / 60; // Time in minutes
                    if (lastApp) {
                        logAppUsage(lastApp, timeSpent);
                    }

                    lastApp = appName;
                    lastAppStartTime = currentTime;
                }
            } else if (!window && lastApp && allWindows.some(w => w.title === lastApp)) {
                const timeSpent = (currentTime - lastAppStartTime) / 1000 / 60; // Time in minutes
                logAppUsage(lastApp, timeSpent);
                lastAppStartTime = currentTime;
            } else if (lastApp && !allWindows.some(w => w.title === lastApp)) {
                const timeSpent = (currentTime - lastAppStartTime) / 1000 / 60; // Time in minutes
                logAppUsage(lastApp, timeSpent);
                lastApp = null;
                lastAppStartTime = currentTime;
            }

            if (typeof onUpdate === 'function') {
                onUpdate(appUsage);
            }
        } catch (error) {
            console.error('Error getting active window:', error);
        }
    }, 5000); // Check every 5 seconds
};

module.exports = { trackActiveWindows };
