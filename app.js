// ── CITY DATA ──
const CITIES = [
    {
        name: "Delhi", key: "delhi", flag: "🇮🇳",
        score: 28, label: "Critical", color: "var(--red)",
        transport: 38, energy: 35, industry: 18, waste: 9,
        co2: 2.1, natAvg: 1.8, pm25: 89, no2: 45,
        grid: 820, renewable: 12,
        trend: [45, 43, 40, 38, 36, 34, 31, 28],
        coords: [28.6139, 77.2090], tips: [
            "Implement massive stubble burning prevention programs",
            "Accelerate transition to BS-VI emission norms globally",
            "Establish low-emission zones in central districts",
            "Transition public bus fleet to 100% electric",
            "Enforce strict dust control on construction sites"
        ]
    },
    {
        name: "London", key: "london", flag: "🇬🇧",
        score: 74, label: "Good", color: "var(--green)",
        transport: 28, energy: 33, industry: 22, waste: 17,
        co2: 4.8, natAvg: 5.2, pm25: 12, no2: 28,
        grid: 180, renewable: 55,
        trend: [60, 63, 65, 67, 69, 70, 72, 74],
        coords: [51.5074, -0.1278], tips: [
            "Expand the ULEZ (Ultra Low Emission Zone) further",
            "Retrofit historic buildings for energy efficiency",
            "Increase segregated cycling infrastructure",
            "Mandate smart meters in all properties",
            "Adopt decentralized renewable energy grids"
        ]
    },
    {
        name: "Tokyo", key: "tokyo", flag: "🇯🇵",
        score: 58, label: "Moderate", color: "var(--yellow)",
        transport: 25, energy: 40, industry: 25, waste: 10,
        co2: 5.5, natAvg: 8.7, pm25: 15, no2: 22,
        grid: 450, renewable: 22,
        trend: [52, 53, 55, 56, 57, 57, 58, 58],
        coords: [35.6762, 139.6503], tips: [
            "Shift dependency from imported fossil fuels to renewables",
            "Promote teleworking to reduce transit energy",
            "Upgrade aging grid infrastructure for green energy",
            "Implement aggressive commercial building cooling limits",
            "Incentivize local solar adoption in dense areas"
        ]
    },
    {
        name: "New York", key: "new york", flag: "🇺🇸",
        score: 62, label: "Moderate", color: "var(--yellow)",
        transport: 32, energy: 30, industry: 20, waste: 18,
        co2: 6.2, natAvg: 14.0, pm25: 18, no2: 35,
        grid: 290, renewable: 38,
        trend: [55, 57, 58, 59, 60, 61, 62, 62],
        coords: [40.7128, -74.0060], tips: [
            "Implement congestion pricing vigorously",
            "Upgrade the MTA to fully electric efficiency",
            "Enforce Local Law 97 for building emissions strict limits",
            "Expand offshore wind deployment rapidly",
            "Divert organic waste from landfills natively"
        ]
    },
    {
        name: "Mumbai", key: "mumbai", flag: "🇮🇳",
        score: 35, label: "Poor", color: "var(--red)",
        transport: 40, energy: 32, industry: 20, waste: 8,
        co2: 1.9, natAvg: 1.8, pm25: 65, no2: 38,
        grid: 820, renewable: 14,
        trend: [42, 41, 40, 39, 38, 37, 36, 35],
        coords: [19.0760, 72.8777], tips: [
            "Improve traffic flow and reduce idling hot-spots",
            "Rapidly expand the Metro network to kill road dependency",
            "Relocate heavy industries away from dense wind corridors",
            "Tackle landfill fires securely through waste management",
            "Deploy coastal wind energy farms"
        ]
    },
    {
        name: "Berlin", key: "berlin", flag: "🇩🇪",
        score: 68, label: "Good", color: "var(--green)",
        transport: 26, energy: 35, industry: 24, waste: 15,
        co2: 5.8, natAvg: 9.0, pm25: 10, no2: 20,
        grid: 350, renewable: 42,
        trend: [55, 57, 59, 61, 63, 65, 67, 68],
        coords: [52.5200, 13.4050], tips: [
            "Accelerate the ban on combustion engine vehicles",
            "Maximize rooftop solar on unused public buildings",
            "Enhance district heating with geo-thermal",
            "Promote the 15-minute city urban model",
            "Phase out final coal dependency strictly"
        ]
    }
];

// ── CONFIG & CONSTANTS ──
const CHART_COLORS = {
    blue: "#4f8fff", green: "#00e5a0", yellow: "#f5c842", red: "#ff4f6d", 
    border: "#1a2540", card: "#0d1526", text: "#e8f0ff"
};
const SECTOR_META = [
    { name: "Transport", icon: "🚗", colorVar: "var(--blue)", hex: CHART_COLORS.blue },
    { name: "Energy", icon: "⚡", colorVar: "var(--green)", hex: CHART_COLORS.green },
    { name: "Industry", icon: "🏭", colorVar: "var(--yellow)", hex: CHART_COLORS.yellow },
    { name: "Waste", icon: "♻️", colorVar: "var(--red)", hex: CHART_COLORS.red }
];

// Reference Chartjs globals
if (typeof Chart !== 'undefined') {
    Chart.defaults.color = CHART_COLORS.text;
    Chart.defaults.font.family = "'JetBrains Mono', monospace";
}

// ── STATE ──
let activeCity = CITIES[1]; // Default London
let trendChartInst = null;
let donutChartInst = null;
let compareChartInst = null;
let mapInst = null;
let mapMarker = null;

// ── BOOT (DOMContentLoaded) ──
document.addEventListener('DOMContentLoaded', () => {
    initCityNav();
    initTabSwitching();
    initMap();
    renderCompareChart(); // Only renders once
    renderAll(activeCity);
});

// ── CITY NAV ──
function initCityNav() {
    const container = document.getElementById('city-selector');
    CITIES.forEach(city => {
        const btn = document.createElement('div');
        btn.classList.add('city-pill');
        if (city.key === activeCity.key) btn.classList.add('active');
        btn.textContent = `${city.flag} ${city.name}`;
        
        btn.addEventListener('click', () => {
            const pills = document.querySelectorAll('.city-pill');
            pills.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            activeCity = city;
            renderAll(activeCity);
        });
        
        container.appendChild(btn);
    });
}

// ── RENDER ALL ──
function renderAll(city) {
    // Inject dynamic main color to CSS variable
    // We use the hex directly from mapping to set the CSS var, since city.color holds "var(--xyz)"
    let cityHex = CHART_COLORS.green;
    if(city.score < 65) cityHex = CHART_COLORS.yellow;
    if(city.score < 45) cityHex = CHART_COLORS.red;
    
    document.documentElement.style.setProperty('--city-color', cityHex);

    renderScoreRing(city);
    renderStats(city);
    renderTrendChart(city, cityHex);
    renderSectorChart(city);
    renderSectorCards(city);
    updateMap(city);
    renderTips(city);
    fetchAirQuality(city);
}

// ── SCORE RING ──
function renderScoreRing(city) {
    const ring = document.getElementById('score-ring');
    const scoreVal = document.getElementById('score-val');
    const scoreStatus = document.getElementById('score-status');

    // Calculate offset
    const circumference = 427.26;
    const offset = circumference - (circumference * (city.score / 100));
    
    // Reset to animate smoothly
    ring.style.strokeDashoffset = circumference;
    
    setTimeout(() => {
        ring.style.strokeDashoffset = offset;
    }, 50);

    scoreVal.textContent = city.score;
    scoreStatus.textContent = city.label;
}

// ── STATS ──
function renderStats(city) {
    document.getElementById('co2-val').textContent = city.co2 + "t";
    document.getElementById('nat-val').textContent = city.natAvg + "t";
    
    // Calc Top Emitter
    const sData = { "Transport": city.transport, "Energy": city.energy, "Industry": city.industry, "Waste": city.waste };
    const topEmit = Object.keys(sData).reduce((a, b) => sData[a] > sData[b] ? a : b);
    document.getElementById('top-emitter').textContent = topEmit;

    // Grid details
    document.getElementById('grid-val').textContent = city.grid + " gCO₂/kWh";
    document.getElementById('grid-bar-ren').style.width = city.renewable + "%";
    document.getElementById('grid-bar-fos').style.width = (100 - city.renewable) + "%";
    document.getElementById('ren-txt').textContent = `Renewable (${city.renewable}%)`;

    // World Avg
    const diff = city.co2 - 4.7;
    const diffText = diff > 0 ? `+${diff.toFixed(1)}t above global avg` : `${diff.toFixed(1)}t below global avg`;
    document.getElementById('world-diff').textContent = city.co2 + "t";
    document.getElementById('world-diff-text').textContent = diffText;
    
    const cityBar = document.getElementById('world-bar-city');
    cityBar.style.width = Math.min((city.co2 / 10) * 100, 100) + "%";
    
    if (diff > 0) {
        cityBar.classList.remove('mini-bar-blue');
        cityBar.classList.add('mini-bar-red');
    } else {
        cityBar.classList.remove('mini-bar-red');
        cityBar.classList.add('mini-bar-blue');
    }

    // Reset PM2.5 while loading
    document.getElementById('pm-val').textContent = "Loading...";
    document.getElementById('weather-val').textContent = "Loading weather...";
    document.getElementById('aqi-text').textContent = "AQI Loading...";
}

// ── TREND CHART ──
function renderTrendChart(city, cityHex) {
    if (trendChartInst) trendChartInst.destroy();
    const ctxTrend = document.getElementById('trendChart').getContext('2d');
    trendChartInst = new Chart(ctxTrend, {
        type: 'line',
        data: {
            labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'],
            datasets: [{
                label: 'Score',
                data: city.trend,
                borderColor: cityHex,
                backgroundColor: cityHex + '22',
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointBackgroundColor: cityHex,
                pointBorderColor: '#050a14',
                pointBorderWidth: 2,
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
                legend: { display: false },
                tooltip: { backgroundColor: CHART_COLORS.card, borderColor: CHART_COLORS.border, borderWidth: 1 }
            },
            scales: {
                y: { min: 0, max: 100, grid: { color: CHART_COLORS.border } },
                x: { grid: { display: false } }
            }
        }
    });
}

// ── SECTOR CHART ──
function renderSectorChart(city) {
    if (donutChartInst) donutChartInst.destroy();
    const ctxDonut = document.getElementById('donutChart').getContext('2d');
    donutChartInst = new Chart(ctxDonut, {
        type: 'doughnut',
        data: {
            labels: ['Transport', 'Energy', 'Industry', 'Waste'],
            datasets: [{
                data: [city.transport, city.energy, city.industry, city.waste],
                backgroundColor: [CHART_COLORS.blue, CHART_COLORS.green, CHART_COLORS.yellow, CHART_COLORS.red],
                borderWidth: 0,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '62%',
            plugins: {
                legend: { position: 'bottom', labels: { color: CHART_COLORS.text } },
                tooltip: { backgroundColor: CHART_COLORS.card, borderColor: CHART_COLORS.border, borderWidth: 1 }
            }
        }
    });
}

// ── SECTOR CARDS ──
function renderSectorCards(city) {
    const container = document.getElementById('sectors-container');
    container.innerHTML = '';

    const dataMap = [
        { key: "Transport", val: city.transport },
        { key: "Energy", val: city.energy },
        { key: "Industry", val: city.industry },
        { key: "Waste", val: city.waste }
    ];

    dataMap.forEach((item, idx) => {
        const meta = SECTOR_META.find(m => m.name === item.key);
        
        const card = document.createElement('div');
        card.classList.add('card', `delay-${idx + 1}`);

        // Header
        const header = document.createElement('div');
        header.classList.add('sector-header');

        const nameSec = document.createElement('div');
        nameSec.classList.add('sector-name');
        nameSec.textContent = `${meta.icon} ${meta.name}`;

        const valSec = document.createElement('div');
        valSec.classList.add('sector-val');
        valSec.textContent = `${item.val}%`;
        valSec.style.color = meta.colorVar;

        header.appendChild(nameSec);
        header.appendChild(valSec);

        // Progress Bar
        const barBg = document.createElement('div');
        barBg.classList.add('sector-bar-bg');
        
        const barFg = document.createElement('div');
        barFg.classList.add('sector-bar-fg');
        barFg.style.width = item.val + "%";
        barFg.style.setProperty('--sector-color', meta.colorVar);

        barBg.appendChild(barFg);

        // Status
        const status = document.createElement('div');
        status.classList.add('sector-status');
        status.textContent = item.val > 30 ? '⚠️ High contributor — action needed' 
                           : item.val > 20 ? '🟡 Moderate — room for improvement' 
                           : '✅ Under control';

        card.appendChild(header);
        card.appendChild(barBg);
        card.appendChild(status);

        container.appendChild(card);
    });
}

// ── COMPARE CHART ──
function renderCompareChart() {
    const ctx = document.getElementById('compareChart').getContext('2d');
    const sorted = [...CITIES].sort((a,b) => b.score - a.score);
    
    // To match colors against scores exactly
    const getHexFromScore = (score) => {
        if(score >= 65) return CHART_COLORS.green;
        if(score >= 45) return CHART_COLORS.yellow;
        return CHART_COLORS.red;
    };

    compareChartInst = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sorted.map(c => c.name),
            datasets: [{
                label: 'Score',
                data: sorted.map(c => c.score),
                backgroundColor: sorted.map(c => getHexFromScore(c.score)),
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { backgroundColor: CHART_COLORS.card, borderColor: CHART_COLORS.border, borderWidth: 1 }
            },
            scales: {
                x: { min: 0, max: 100, grid: { color: CHART_COLORS.border } },
                y: { grid: { display: false } }
            }
        }
    });
}

// ── MAP ──
function initMap() {
    mapInst = L.map('map', { zoomControl: false }).setView(activeCity.coords, 11);
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        maxZoom: 20, attribution: '&copy; Stadia Maps'
    }).addTo(mapInst);
}

function updateMap(city) {
    if (!mapInst) return;
    mapInst.flyTo(city.coords, 11, { duration: 1.5 });
    
    if (mapMarker) mapInst.removeLayer(mapMarker);

    const icon = L.divIcon({
        className: 'custom-map-marker-container', // Wrapper class injected by leaflet
        html: `<div class="custom-map-marker"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });

    mapMarker = L.marker(city.coords, { icon }).addTo(mapInst);
    
    const popupContent = document.createElement('div');
    
    const popupTitle = document.createElement('div');
    popupTitle.classList.add('custom-popup');
    popupTitle.style.fontWeight = 'bold';
    popupTitle.style.marginTop = '10px';
    popupTitle.textContent = city.name;
    
    const popupScore = document.createElement('div');
    popupScore.classList.add('custom-popup');
    popupScore.textContent = `Score: ${city.score}`;

    popupContent.appendChild(popupTitle);
    popupContent.appendChild(popupScore);

    mapMarker.bindPopup(popupContent, { className: 'custom-popup' });
}

// ── TIPS ──
function renderTips(city) {
    const container = document.getElementById('tips-container');
    container.innerHTML = '';

    city.tips.forEach((tip, idx) => {
        const card = document.createElement('div');
        card.classList.add('card', 'tip-card', `delay-${idx + 1}`);

        const num = document.createElement('div');
        num.classList.add('tip-num');
        num.textContent = `0${idx + 1}`;

        const txt = document.createElement('div');
        txt.classList.add('tip-text');
        txt.textContent = tip;

        card.appendChild(num);
        card.appendChild(txt);
        container.appendChild(card);
    });
}

// ── AIR QUALITY API ──
async function fetchAirQuality(city) {
    const pmValEl = document.getElementById('pm-val');
    const weatherValEl = document.getElementById('weather-val');
    const aqiDotEl = document.getElementById('aqi-dot');
    const aqiTextEl = document.getElementById('aqi-text');

    // Weather
    try {
        const wRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.coords[0]}&longitude=${city.coords[1]}&current=temperature_2m,wind_speed_10m`);
        if(wRes.ok) {
            const data = await wRes.json();
            weatherValEl.textContent = `${data.current.temperature_2m}°C, Wind: ${data.current.wind_speed_10m}km/h`;
        }
    } catch(e) {
        weatherValEl.textContent = "Weather unavailable";
    }

    let pm25 = city.pm25; // fallback
    // OpenAQ
    try {
        const locRes = await fetch(`https://api.openaq.org/v2/locations?city=${city.name}&limit=1&has_geo=true`);
        if(locRes.ok) {
            const locData = await locRes.json();
            if(locData.results.length > 0) {
                const mRes = await fetch(`https://api.openaq.org/v2/measurements?location_id=${locData.results[0].id}&parameter=pm25&limit=1`);
                if(mRes.ok) {
                    const mData = await mRes.json();
                    if(mData.results.length > 0) {
                        pm25 = mData.results[0].value;
                    }
                }
            }
        }
    } catch(e) {}

    pmValEl.textContent = Math.round(pm25) + " μg/m³";
    
    // Calc AQI styling
    let aqiLabel = "Good";
    let aqiColorStr = "var(--green)";
    let aqiHex = CHART_COLORS.green;

    if (pm25 > 12) { aqiLabel = "Moderate"; aqiColorStr = "var(--yellow)"; aqiHex = CHART_COLORS.yellow; }
    if (pm25 > 35) { aqiLabel = "Unhealthy for Sensitive Groups"; aqiColorStr = "#f97316"; aqiHex = "#f97316"; }
    if (pm25 > 55) { aqiLabel = "Unhealthy"; aqiColorStr = "var(--red)"; aqiHex = CHART_COLORS.red; }

    aqiDotEl.style.backgroundColor = aqiColorStr;
    aqiTextEl.textContent = `AQI ${aqiLabel}`;
    aqiTextEl.style.color = aqiColorStr;
    
    const badgeEl = aqiTextEl.parentElement;
    badgeEl.style.borderColor = aqiHex + "55";
    badgeEl.style.backgroundColor = aqiHex + "11";
}

// ── TAB SWITCHING ──
function initTabSwitching() {
    const btns = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');

            // Map invalidation fix
            if(targetId === 'tab-map') {
                setTimeout(() => mapInst.invalidateSize(), 150);
            }
        });
    });
}
