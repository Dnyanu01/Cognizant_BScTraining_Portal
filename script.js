function showSection(section) {
    const sections = [
        'greeting', 'profile', 'logout', 'features', 'about', 'contact',
        'dashboard', 'training', 'application-access', 'settings', 'help'
    ];
    sections.forEach(s => {
        document.getElementById(s + '-section').classList.add('hidden');
    });
    document.getElementById(section + '-section').classList.remove('hidden');

    // Navbar active state
    document.querySelectorAll('.navbar a').forEach(a => a.classList.remove('active'));
    if (document.getElementById('nav-' + section)) {
        document.getElementById('nav-' + section).classList.add('active');
    }
    // Sidebar active state
    document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
    if (document.getElementById('side-' + section)) {
        document.getElementById('side-' + section).classList.add('active');
    }

    // Reset Home tabs if switching to Home
    if (section === 'greeting') {
        // Show welcome tab content since we removed the tab switcher
        document.getElementById('welcome-tab').classList.remove('hidden');
    }
    // Reset Training tabs if switching to Training
    if (section === 'training') {
        showTrainingTab('automation');
    }
    // Reset Dashboard tabs if switching to Dashboard
    if (section === 'dashboard') {
        showDashboardTab('training-progress');
    }
}

// Tab switching in Home section (no longer needed since we removed tabs)
// function showTab(tab) {
//     document.getElementById('welcome-tab').classList.add('hidden');
//     document.getElementById('tips-tab').classList.add('hidden');
//     document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
//     if (tab === 'welcome') {
//         document.getElementById('welcome-tab').classList.remove('hidden');
//         document.querySelectorAll('.tab-btn')[0].classList.add('active');
//     } else {
//         document.getElementById('tips-tab').classList.remove('hidden');
//         document.querySelectorAll('.tab-btn')[1].classList.add('active');
//     }
// }

// Tab switching in Training section
function showTrainingTab(tab) {
    document.getElementById('training-automation-tab').classList.add('hidden');
    document.getElementById('training-configuration-tab').classList.add('hidden');
    document.getElementById('training-unit-testing-tab').classList.add('hidden');
    document.getElementById('training-tab-automation').classList.remove('active');
    document.getElementById('training-tab-configuration').classList.remove('active');
    document.getElementById('training-tab-unit-testing').classList.remove('active');
    if (tab === 'automation') {
        document.getElementById('training-automation-tab').classList.remove('hidden');
        document.getElementById('training-tab-automation').classList.add('active');
    } else if (tab === 'configuration') {
        document.getElementById('training-configuration-tab').classList.remove('hidden');
        document.getElementById('training-tab-configuration').classList.add('active');
    } else if (tab === 'unit-testing') {
        document.getElementById('training-unit-testing-tab').classList.remove('hidden');
        document.getElementById('training-tab-unit-testing').classList.add('active');
    }
}

// Tab switching in Dashboard section
function showDashboardTab(tab) {
    document.getElementById('dashboard-training-progress-tab').classList.add('hidden');
    document.getElementById('dashboard-app-access-progress-tab').classList.add('hidden');
    document.getElementById('dashboard-tab-training-progress').classList.remove('active');
    document.getElementById('dashboard-tab-app-access-progress').classList.remove('active');
    if (tab === 'training-progress') {
        document.getElementById('dashboard-training-progress-tab').classList.remove('hidden');
        document.getElementById('dashboard-tab-training-progress').classList.add('active');
    } else if (tab === 'app-access-progress') {
        document.getElementById('dashboard-app-access-progress-tab').classList.remove('hidden');
        document.getElementById('dashboard-tab-app-access-progress').classList.add('active');
    }
}

// Greeting
function greetUser() {
    const name = document.getElementById('nameInput').value.trim();
    const output = document.getElementById('outputBox');
    if (name) {
        output.textContent = `Hello, ${name}! Welcome to the interactive webpage.`;
    } else {
        output.textContent = "Please enter your name to get a greeting.";
    }
}

// Login
function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('emailInput').value.trim();
    const password = document.getElementById('passwordInput').value;
    const output = document.getElementById('loginOutput');
    if (email && password) {
        output.textContent = `Logged in as ${email}`;
    } else {
        output.textContent = "Please enter both email and password.";
    }
}

// Toggle functions for each section
function toggleExtraInfo() {
    const checked = document.getElementById('extraInfoToggle').checked;
    document.getElementById('extraInfo').classList.toggle('hidden', !checked);
}
function toggleRememberMe() {
    const checked = document.getElementById('rememberMeToggle').checked;
    document.getElementById('rememberInfo').classList.toggle('hidden', !checked);
}
function toggleAboutInfo() {
    const checked = document.getElementById('aboutToggle').checked;
    document.getElementById('aboutExtraInfo').classList.toggle('hidden', !checked);
}
function toggleContactInfo() {
    const checked = document.getElementById('contactToggle').checked;
    document.getElementById('contactExtraInfo').classList.toggle('hidden', !checked);
}
function toggleDashboardInfo() {
    const checked = document.getElementById('dashboardToggle').checked;
    document.getElementById('dashboardExtraInfo').classList.toggle('hidden', !checked);
}
function toggleProfileInfo() {
    const checked = document.getElementById('profileToggle').checked;
    document.getElementById('profileExtraInfo').classList.toggle('hidden', !checked);
}
function toggleSettingsInfo() {
    const checked = document.getElementById('settingsToggle').checked;
    document.getElementById('settingsExtraInfo').classList.toggle('hidden', !checked);
}
function toggleHelpInfo() {
    const checked = document.getElementById('helpToggle').checked;
    document.getElementById('helpExtraInfo').classList.toggle('hidden', !checked);
}

// Logout functionality
function confirmLogout() {
    document.getElementById('logoutMessage').textContent = 'You have been logged out successfully.';
    setTimeout(() => {
        showSection('greeting');
        document.getElementById('logoutMessage').textContent = '';
    }, 2000);
}

function cancelLogout() {
    showSection('greeting');
}

// Dropdown functionality
function toggleDropdown() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('show');
}

// Close dropdown when clicking outside
window.onclick = function(event) {
    if (!event.target.matches('.dropdown a')) {
        const dropdowns = document.getElementsByClassName('dropdown-content');
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.parentElement.classList.contains('show')) {
                openDropdown.parentElement.classList.remove('show');
            }
        }
    }
}

// Render pie chart
function renderPieChart(canvasId, data, colors) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let total = data.reduce((a, b) => a + b, 0);
    let startAngle = 0;
    for (let i = 0; i < data.length; i++) {
        let sliceAngle = 2 * Math.PI * data[i] / total;
        ctx.beginPath();
        ctx.moveTo(100, 100);
        ctx.arc(100, 100, 80, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = colors[i];
        ctx.fill();
        startAngle += sliceAngle;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    renderPieChart('trainingPieChart', [30, 40, 30], ['#e53935', '#ffb300', '#43a047']);
    renderPieChart('appAccessPieChart', [20, 50, 30], ['#e53935', '#ffb300', '#43a047']);
});
