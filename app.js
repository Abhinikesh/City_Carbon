// ── CITY DATA ──
const CITIES = [
{ name:"Delhi",      country:"India",         key:"delhi",
  flag:"🇮🇳", score:28, label:"Critical", color:"#ff4f6d",
  transport:38, energy:35, industry:18, waste:9,
  co2:2.1, natAvg:1.8, pm25:89, no2:45, grid:820, renewable:12,
  trend:[45,43,40,38,36,34,31,28], coords:[28.6139,77.2090], tips: [
    "Implement massive stubble burning prevention programs",
    "Accelerate transition to BS-VI emission norms globally",
    "Establish low-emission zones in central districts",
    "Transition public bus fleet to 100% electric",
    "Enforce strict dust control on construction sites"
] },
{ name:"Mumbai",     country:"India",         key:"mumbai",
  flag:"🇮🇳", score:35, label:"Poor", color:"#ff4f6d",
  transport:40, energy:32, industry:20, waste:8,
  co2:1.9, natAvg:1.8, pm25:65, no2:38, grid:820, renewable:14,
  trend:[42,41,40,39,38,37,36,35], coords:[19.0760,72.8777], tips: [
    "Improve traffic flow and reduce idling hot-spots",
    "Rapidly expand the Metro network to kill road dependency",
    "Relocate heavy industries away from dense wind corridors",
    "Tackle landfill fires securely through waste management",
    "Deploy coastal wind energy farms"
] },
{ name:"Bangalore",  country:"India",         key:"bangalore",
  flag:"🇮🇳", score:42, label:"Moderate", color:"#f5c842",
  transport:35, energy:30, industry:22, waste:13,
  co2:1.6, natAvg:1.8, pm25:45, no2:30, grid:720, renewable:22,
  trend:[38,39,40,41,41,42,42,42], coords:[12.9716,77.5946], tips: [
    "Increase investment in electric public buses",
    "Enhance strict water and waste recycling compliance",
    "Expand tree coverage across IT corridors",
    "Promote sustainable electric transit for commuters",
    "Mandate solar roofs on all new business parks"
] },
{ name:"London",     country:"UK",            key:"london",
  flag:"🇬🇧", score:74, label:"Good", color:"#00e5a0",
  transport:28, energy:33, industry:22, waste:17,
  co2:4.8, natAvg:5.2, pm25:12, no2:28, grid:180, renewable:55,
  trend:[60,63,65,67,69,70,72,74], coords:[51.5074,-0.1278], tips: [
    "Expand the ULEZ (Ultra Low Emission Zone) further",
    "Retrofit historic buildings for energy efficiency",
    "Increase segregated cycling infrastructure",
    "Mandate smart meters in all properties",
    "Adopt decentralized renewable energy grids"
] },
{ name:"Paris",      country:"France",        key:"paris",
  flag:"🇫🇷", score:72, label:"Good", color:"#00e5a0",
  transport:30, energy:28, industry:25, waste:17,
  co2:4.2, natAvg:6.8, pm25:14, no2:32, grid:85, renewable:78,
  trend:[60,62,64,66,68,69,71,72], coords:[48.8566,2.3522], tips: [
    "Transition to the 15-minute city model fully",
    "Expand 'Plan Vélo' to pedestrianize more areas",
    "Aggressively convert city heating to renewables",
    "Limit commercial jet flights strictly",
    "Scale up residential retrofitting programs"
] },
{ name:"Berlin",     country:"Germany",       key:"berlin",
  flag:"🇩🇪", score:68, label:"Good", color:"#00e5a0",
  transport:26, energy:35, industry:24, waste:15,
  co2:5.8, natAvg:9.0, pm25:10, no2:20, grid:350, renewable:42,
  trend:[55,57,59,61,63,65,67,68], coords:[52.5200,13.4050], tips: [
    "Accelerate the ban on combustion engine vehicles",
    "Maximize rooftop solar on unused public buildings",
    "Enhance district heating with geo-thermal",
    "Promote the 15-minute city urban model",
    "Phase out final coal dependency strictly"
] },
{ name:"Amsterdam",  country:"Netherlands",   key:"amsterdam",
  flag:"🇳🇱", score:76, label:"Good", color:"#00e5a0",
  transport:22, energy:30, industry:28, waste:20,
  co2:3.9, natAvg:7.4, pm25:9, no2:18, grid:290, renewable:52,
  trend:[62,65,67,69,71,72,75,76], coords:[52.3676,4.9041], tips: [
    "Further eliminate non-resident vehicle access",
    "Expand electric boat fleets along major canals",
    "Transition gas-reliant households safely",
    "Encourage zero-emission goods delivery",
    "Incentivize large-scale offshore wind farms"
] },
{ name:"Stockholm",  country:"Sweden",        key:"stockholm",
  flag:"🇸🇪", score:88, label:"Good", color:"#00e5a0",
  transport:20, energy:22, industry:35, waste:23,
  co2:2.8, natAvg:4.2, pm25:6, no2:12, grid:45, renewable:90,
  trend:[80,81,83,84,85,86,87,88], coords:[59.3293,18.0686], tips: [
    "Completely divest from fossil heating natively",
    "Expand carbon-capture at waste generation points",
    "Promote sustainable wood-based constructions",
    "Increase bio-gas usage in heavy transport fleets",
    "Enforce stricter circular economy policies"
] },
{ name:"Copenhagen", country:"Denmark",       key:"copenhagen",
  flag:"🇩🇰", score:85, label:"Good", color:"#00e5a0",
  transport:18, energy:25, industry:32, waste:25,
  co2:2.5, natAvg:5.8, pm25:7, no2:14, grid:90, renewable:82,
  trend:[74,76,78,80,81,82,84,85], coords:[55.6761,12.5683], tips: [
    "Increase wind reliance natively and locally",
    "Further expand cycle superhighways regionally",
    "Enhance strict eco-building certifications",
    "Promote active plant-based diets socially",
    "Drive down remaining fossil reliance securely"
] },
{ name:"New York",   country:"USA",           key:"new-york",
  flag:"🇺🇸", score:62, label:"Moderate", color:"#f5c842",
  transport:32, energy:30, industry:20, waste:18,
  co2:6.2, natAvg:14.0, pm25:18, no2:35, grid:290, renewable:38,
  trend:[55,57,58,59,60,61,62,62], coords:[40.7128,-74.0060], tips: [
    "Implement congestion pricing vigorously",
    "Upgrade the MTA to fully electric efficiency",
    "Enforce Local Law 97 for building emissions strict limits",
    "Expand offshore wind deployment rapidly",
    "Divert organic waste from landfills natively"
] },
{ name:"Los Angeles",country:"USA",           key:"los-angeles",
  flag:"🇺🇸", score:48, label:"Moderate", color:"#f5c842",
  transport:48, energy:28, industry:16, waste:8,
  co2:8.4, natAvg:14.0, pm25:28, no2:42, grid:310, renewable:35,
  trend:[42,43,44,45,46,47,48,48], coords:[34.0522,-118.2437], tips: [
    "Aggressively convert traffic lights and sync",
    "Deploy rapid EV charging networks city-wide",
    "Mandate zero-emission trucks at massive ports",
    "Enhance extreme water recycling mandates natively",
    "Shift focus to dense transit-oriented zoning"
] },
{ name:"Chicago",    country:"USA",           key:"chicago",
  flag:"🇺🇸", score:52, label:"Moderate", color:"#f5c842",
  transport:35, energy:32, industry:22, waste:11,
  co2:7.8, natAvg:14.0, pm25:22, no2:38, grid:380, renewable:28,
  trend:[46,47,48,49,50,51,52,52], coords:[41.8781,-87.6298], tips: [
    "Enhance resilience of local power grids",
    "Retrofit massive skyscrapers dynamically",
    "Secure public transit electrification funding",
    "Support heavy lake wind power transitions",
    "Expand local green corridors to buffer heat"
] },
{ name:"San Francisco",country:"USA",         key:"san-francisco",
  flag:"🇺🇸", score:71, label:"Good", color:"#00e5a0",
  transport:30, energy:22, industry:26, waste:22,
  co2:5.1, natAvg:14.0, pm25:12, no2:22, grid:180, renewable:62,
  trend:[62,64,65,66,68,69,70,71], coords:[37.7749,-122.4194], tips: [
    "Achieve 100% renewable power reliably natively",
    "Strictly enforce zero-waste ordinances regionally",
    "Expand rapid transit across bay systems",
    "Increase safe urban bike pathways rapidly",
    "Incentivize water conservation extensively"
] },
{ name:"Tokyo",      country:"Japan",         key:"tokyo",
  flag:"🇯🇵", score:58, label:"Moderate", color:"#f5c842",
  transport:25, energy:40, industry:25, waste:10,
  co2:5.5, natAvg:8.7, pm25:15, no2:22, grid:450, renewable:22,
  trend:[52,53,55,56,57,57,58,58], coords:[35.6762,139.6503], tips: [
    "Shift dependency from imported fossil fuels to renewables",
    "Promote teleworking to reduce transit energy",
    "Upgrade aging grid infrastructure for green energy",
    "Implement aggressive commercial building cooling limits",
    "Incentivize local solar adoption in dense areas"
] },
{ name:"Beijing",    country:"China",         key:"beijing",
  flag:"🇨🇳", score:32, label:"Poor", color:"#ff4f6d",
  transport:35, energy:38, industry:20, waste:7,
  co2:9.2, natAvg:7.6, pm25:72, no2:52, grid:750, renewable:18,
  trend:[38,37,36,35,34,34,33,32], coords:[39.9042,116.4074], tips: [
    "Relocate massive industrial coal hubs securely",
    "Accelerate transition to pure EV adoption",
    "Enforce rigorous factory emission limits",
    "Implement stringent winter heating regulations effectively",
    "Scale up urban afforestation projects aggressively"
] },
{ name:"Shanghai",   country:"China",         key:"shanghai",
  flag:"🇨🇳", score:38, label:"Poor", color:"#ff4f6d",
  transport:33, energy:36, industry:22, waste:9,
  co2:8.8, natAvg:7.6, pm25:55, no2:48, grid:720, renewable:20,
  trend:[42,41,41,40,40,39,39,38], coords:[31.2304,121.4737], tips: [
    "Phase out highly emitting marine vessels completely",
    "Expand stringent low-emission zones actively",
    "Secure massive deployment of EV fleets",
    "Mitigate localized heavy industry emissions carefully",
    "Invest locally into green supply chains entirely"
] },
{ name:"Singapore",  country:"Singapore",     key:"singapore",
  flag:"🇸🇬", score:64, label:"Moderate", color:"#f5c842",
  transport:22, energy:45, industry:25, waste:8,
  co2:7.2, natAvg:7.2, pm25:16, no2:24, grid:440, renewable:4,
  trend:[56,58,59,60,61,62,63,64], coords:[1.3521,103.8198], tips: [
    "Secure massive solar energy imports reliably",
    "Aggressively convert building limits natively",
    "Limit personal vehicle ownership definitively",
    "Advance extreme resource circularity quickly",
    "Push for vast decentralized battery storage"
] },
{ name:"Dubai",      country:"UAE",           key:"dubai",
  flag:"🇦🇪", score:30, label:"Poor", color:"#ff4f6d",
  transport:45, energy:38, industry:12, waste:5,
  co2:14.8, natAvg:15.2, pm25:38, no2:40, grid:680, renewable:8,
  trend:[28,28,29,29,30,30,30,30], coords:[25.2048,55.2708], tips: [
    "Rethink air cooling dependency systemically",
    "Maximize reliance on solar panels immensely",
    "Expand extensive public rail networks natively",
    "Reduce extreme waste generation culturally",
    "Promote sustainable desalinization practices fully"
] },
{ name:"Sydney",     country:"Australia",     key:"sydney",
  flag:"🇦🇺", score:55, label:"Moderate", color:"#f5c842",
  transport:35, energy:38, industry:18, waste:9,
  co2:8.8, natAvg:14.9, pm25:8, no2:20, grid:620, renewable:28,
  trend:[48,49,50,51,52,53,54,55], coords:[-33.8688,151.2093], tips: [
    "Drastically cut historical coal grid reliance natively",
    "Convert all public transport ferries entirely",
    "Increase rooftop solar adoption actively",
    "Promote high-density urban transit correctly",
    "Enhance strict eco-regulations on constructions"
] },
{ name:"Toronto",    country:"Canada",        key:"toronto",
  flag:"🇨🇦", score:60, label:"Moderate", color:"#f5c842",
  transport:38, energy:28, industry:20, waste:14,
  co2:6.8, natAvg:14.2, pm25:10, no2:22, grid:120, renewable:68,
  trend:[52,54,55,56,57,58,59,60], coords:[43.6532,-79.3832], tips: [
    "Reduce strong personal vehicle commuter rates natively",
    "Retrofit extreme winter heating efficiencies quickly",
    "Enhance rapid regional train networks locally",
    "Incentivize local green infrastructure fully",
    "Mitigate organic waste emissions entirely"
] },
{ name:"São Paulo",  country:"Brazil",        key:"sao-paulo",
  flag:"🇧🇷", score:45, label:"Moderate", color:"#f5c842",
  transport:42, energy:28, industry:20, waste:10,
  co2:3.8, natAvg:2.8, pm25:32, no2:40, grid:180, renewable:65,
  trend:[40,41,42,43,43,44,45,45], coords:[-23.5505,-46.6333], tips: [
    "Control excessive traffic congestion effectively",
    "Expand electric public transit networks correctly",
    "Manage municipal solid waste securely",
    "Utilize rich regional biofuels efficiently",
    "Enhance strict local urban zoning regulations natively"
] },
{ name:"Buenos Aires",country:"Argentina",    key:"buenos-aires",
  flag:"🇦🇷", score:50, label:"Moderate", color:"#f5c842",
  transport:40, energy:30, industry:20, waste:10,
  co2:4.2, natAvg:4.8, pm25:20, no2:30, grid:320, renewable:35,
  trend:[44,45,46,47,48,49,50,50], coords:[-34.6037,-58.3816], tips: [
    "Increase rapid transit corridors effectively",
    "Promote extreme active micro-mobility natively",
    "Rethink aging power grid structures locally",
    "Enforce stringent heavy vehicle limits fully",
    "Expand urban forestry efforts aggressively"
] },
{ name:"Lagos",      country:"Nigeria",       key:"lagos",
  flag:"🇳🇬", score:25, label:"Critical", color:"#ff4f6d",
  transport:42, energy:30, industry:18, waste:10,
  co2:0.7, natAvg:0.6, pm25:62, no2:28, grid:580, renewable:10,
  trend:[28,27,27,26,26,25,25,25], coords:[6.5244,3.3792], tips: [
    "Combat old informal polluting transport heavily",
    "Ban extremely high-polluting heavy vehicles locally",
    "Improve vast centralized clean power effectively",
    "Manage pervasive open waste burning natively",
    "Invest dynamically in mass transit locally"
] },
{ name:"Cairo",      country:"Egypt",         key:"cairo",
  flag:"🇪🇬", score:30, label:"Poor", color:"#ff4f6d",
  transport:44, energy:32, industry:16, waste:8,
  co2:2.4, natAvg:2.2, pm25:70, no2:48, grid:640, renewable:12,
  trend:[32,31,31,31,30,30,30,30], coords:[30.0444,31.2357], tips: [
    "Combat extreme road congestion vigorously",
    "Control dense localized industrial zones effectively",
    "Improve vast desert-climate cooling efficiencies",
    "Enforce absolute strict vehicle emissions natively",
    "Maximize regional massive solar investments completely"
] },
{ name:"Nairobi",    country:"Kenya",         key:"nairobi",
  flag:"🇰🇪", score:55, label:"Moderate", color:"#f5c842",
  transport:38, energy:20, industry:28, waste:14,
  co2:1.0, natAvg:0.9, pm25:22, no2:18, grid:80, renewable:88,
  trend:[48,50,51,52,53,54,55,55], coords:[-1.2921,36.8219], tips: [
    "Address aging informal vehicle fleets locally",
    "Leverage incredible geothermal grids correctly",
    "Establish clear formal mass transit aggressively",
    "Control localized open wood burning essentially",
    "Improve structured active urban planning natively"
] },
{ name:"Oslo",       country:"Norway",        key:"oslo",
  flag:"🇳🇴", score:91, label:"Good", color:"#00e5a0",
  transport:16, energy:18, industry:38, waste:28,
  co2:1.9, natAvg:7.5, pm25:5, no2:10, grid:28, renewable:98,
  trend:[84,85,87,88,89,90,90,91], coords:[59.9139,10.7522], tips: [
    "Perfect robust carbon capture processes securely",
    "Reduce remaining small marine transport footprints",
    "Maintain absolutely zero non-electric car sales explicitly",
    "Expand advanced extreme efficiency codes universally",
    "Innovate zero-emission heavy construction limits explicitly"
] },
{ name:"Helsinki",   country:"Finland",       key:"helsinki",
  flag:"🇫🇮", score:82, label:"Good", color:"#00e5a0",
  transport:20, energy:28, industry:30, waste:22,
  co2:3.2, natAvg:6.8, pm25:7, no2:12, grid:120, renewable:75,
  trend:[72,74,76,77,79,80,81,82], coords:[60.1699,24.9384], tips: [
    "Fully shift off district coal heating securely",
    "Promote extreme low-carbon winter efficiency clearly",
    "Expand amazing cycling grids through winters essentially",
    "Optimize extensive clean marine networks effectively",
    "Increase extensive native bio-energy usage locally"
] },
{ name:"Seoul",      country:"South Korea",   key:"seoul",
  flag:"🇰🇷", score:48, label:"Moderate", color:"#f5c842",
  transport:30, energy:38, industry:22, waste:10,
  co2:7.6, natAvg:11.8, pm25:28, no2:38, grid:520, renewable:18,
  trend:[42,43,44,45,46,47,48,48], coords:[37.5665,126.9780], tips: [
    "Diminish massive coal grid reliance locally",
    "Optimize extreme high-density consumption perfectly",
    "Promote widespread robust transit adoption effectively",
    "Enhance strict regional fine dust protocols essentially",
    "Enforce commercial cooling strict controls perfectly"
] },
{ name:"Mexico City",country:"Mexico",        key:"mexico-city",
  flag:"🇲🇽", score:38, label:"Poor", color:"#ff4f6d",
  transport:45, energy:28, industry:18, waste:9,
  co2:3.2, natAvg:3.8, pm25:42, no2:44, grid:480, renewable:25,
  trend:[42,41,41,40,40,39,38,38], coords:[19.4326,-99.1332], tips: [
    "Combat immense basin trapping pollutants strongly",
    "Regulate enormous localized transport fleets thoroughly",
    "Expand vast clean electric metro arrays effectively",
    "Implement stringent heavy industry protocols accurately",
    "Control intense localized suburban sprawl sensibly"
] },
{ name:"Zurich",     country:"Switzerland",   key:"zurich",
  flag:"🇨🇭", score:86, label:"Good", color:"#00e5a0",
  transport:18, energy:20, industry:36, waste:26,
  co2:3.4, natAvg:4.6, pm25:6, no2:12, grid:38, renewable:92,
  trend:[78,79,81,82,83,84,85,86], coords:[47.3769,8.5417], tips: [
    "Tackle embedded footprint in rich consumption cleanly",
    "Refine completely perfect rail grids cleanly",
    "Improve intense passive solar implementations securely",
    "Optimize extreme urban density accurately",
    "Ensure zero imported fossil allocations purely"
] }
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
let activeCity = CITIES.find(c => c.key === "london"); // Default London per user requirement
let trendChartInst = null;
let donutChartInst = null;
let compareChartInst = null;
let mapInst = null;
let mapMarker = null;

// ── BOOT (DOMContentLoaded) ──
document.addEventListener('DOMContentLoaded', () => {
    initSearchDropdown();
    initTabSwitching();
    initMap();
    renderCompareChart(); // Only renders once
    renderAll(activeCity);
    
    // Set initial input
    const inputEl = document.getElementById('search-input');
    if(inputEl && activeCity) {
        inputEl.value = activeCity.name;
    }
});

// ── CITY NAV ──
function initSearchDropdown() {
    const input = document.getElementById('search-input');
    const wrap = document.getElementById('search-wrap');
    const dropdown = document.getElementById('city-dropdown');
    
    let filtered = CITIES;
    let focusObj = -1; // For keyboard navigation

    const toggleDropdown = (state) => {
        if (state) dropdown.classList.add('open');
        else dropdown.classList.remove('open');
    };

    const renderDropdown = () => {
        dropdown.innerHTML = '';
        if (filtered.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'dropdown-item';
            empty.style.justifyContent = 'center';
            empty.style.color = 'var(--muted)';
            empty.textContent = 'No cities found';
            dropdown.appendChild(empty);
            return;
        }

        filtered.slice(0, 8).forEach((city, idx) => {
            const item = document.createElement('div');
            item.className = 'dropdown-item';
            
            if (activeCity && city.key === activeCity.key) {
                item.classList.add('selected-city');
            }
            if (idx === focusObj) {
                item.classList.add('focused');
            }

            const left = document.createElement('div');
            left.className = 'dropdown-item-left';
            
            const txtWrap = document.createElement('div');
            
            const nameEl = document.createElement('div');
            nameEl.className = 'dropdown-item-name';
            nameEl.textContent = `${city.flag} ${city.name}`;
            
            const ctryEl = document.createElement('div');
            ctryEl.className = 'dropdown-item-country';
            ctryEl.textContent = city.country;

            txtWrap.appendChild(nameEl);
            txtWrap.appendChild(ctryEl);
            left.appendChild(txtWrap);

            const scoreBadge = document.createElement('div');
            scoreBadge.className = 'dropdown-score';
            scoreBadge.textContent = city.score;
            scoreBadge.style.backgroundColor = city.color;

            item.appendChild(left);
            item.appendChild(scoreBadge);

            item.addEventListener('click', (e) => {
                e.stopPropagation();
                selectCity(city);
            });

            dropdown.appendChild(item);
        });
    };

    const selectCity = (city) => {
        activeCity = city;
        input.value = city.name;
        toggleDropdown(false);
        input.blur();
        renderAll(city);
    };

    input.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        filtered = CITIES.filter(c => c.name.toLowerCase().includes(val) || c.country.toLowerCase().includes(val));
        focusObj = -1;
        renderDropdown();
    });

    input.addEventListener('focus', () => {
        input.value = ''; // clears on focus to allow selection
        filtered = CITIES;
        focusObj = -1;
        renderDropdown();
        toggleDropdown(true);
    });

    input.addEventListener('keydown', (e) => {
        if (!dropdown.classList.contains('open')) return;
        const max = Math.min(filtered.length, 8);
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            focusObj = (focusObj + 1) % max;
            renderDropdown();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            focusObj = (focusObj - 1 + max) % max;
            renderDropdown();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (focusObj >= 0 && focusObj < max) {
                selectCity(filtered[focusObj]);
            }
        } else if (e.key === 'Escape') {
            toggleDropdown(false);
            if(activeCity) input.value = activeCity.name;
            input.blur();
        }
    });

    document.addEventListener('click', (e) => {
        if (!wrap.contains(e.target)) {
            toggleDropdown(false);
            if(activeCity) input.value = activeCity.name;
        }
    });
}

// ── RENDER ALL ──
function renderAll(city) {
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
    const co2ValEl = document.getElementById('co2-val');
    const natValEl = document.getElementById('nat-val');
    const topEmitterEl = document.getElementById('top-emitter');
    const gridValEl = document.getElementById('grid-val');
    const gridBarRenEl = document.getElementById('grid-bar-ren');
    const gridBarFosEl = document.getElementById('grid-bar-fos');
    const renTxtEl = document.getElementById('ren-txt');
    const worldDiffEl = document.getElementById('world-diff');
    const worldDiffTextEl = document.getElementById('world-diff-text');
    const cityBar = document.getElementById('world-bar-city');
    const pmValEl = document.getElementById('pm-val');
    const weatherValEl = document.getElementById('weather-val');
    const aqiTextEl = document.getElementById('aqi-text');

    co2ValEl.textContent = city.co2 + "t";
    natValEl.textContent = city.natAvg + "t";
    
    // Calc Top Emitter
    const sData = { "Transport": city.transport, "Energy": city.energy, "Industry": city.industry, "Waste": city.waste };
    const topEmit = Object.keys(sData).reduce((a, b) => sData[a] > sData[b] ? a : b);
    topEmitterEl.textContent = topEmit;

    // Grid details
    gridValEl.textContent = city.grid + " gCO₂/kWh";
    gridBarRenEl.style.width = city.renewable + "%";
    gridBarFosEl.style.width = (100 - city.renewable) + "%";
    renTxtEl.textContent = `Renewable (${city.renewable}%)`;

    // World Avg
    const diff = city.co2 - 4.7;
    const diffText = diff > 0 ? `+${diff.toFixed(1)}t above global avg` : `${diff.toFixed(1)}t below global avg`;
    worldDiffEl.textContent = city.co2 + "t";
    worldDiffTextEl.textContent = diffText;
    
    cityBar.style.width = Math.min((city.co2 / 10) * 100, 100) + "%";
    
    if (diff > 0) {
        cityBar.classList.remove('mini-bar-blue');
        cityBar.classList.add('mini-bar-red');
    } else {
        cityBar.classList.remove('mini-bar-red');
        cityBar.classList.add('mini-bar-blue');
    }

    // Reset PM2.5 while loading
    pmValEl.textContent = "Loading...";
    weatherValEl.textContent = "Loading weather...";
    aqiTextEl.textContent = "AQI Loading...";
}

// ── TREND CHART ──
function renderTrendChart(city, cityHex) {
    const ctxTrend = document.getElementById('trendChart').getContext('2d');
    if (trendChartInst) trendChartInst.destroy();
    
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
    const ctxDonut = document.getElementById('donutChart').getContext('2d');
    if (donutChartInst) donutChartInst.destroy();
    
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
    
    // Match colors against scores exactly
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
        className: 'custom-map-marker-container',
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
