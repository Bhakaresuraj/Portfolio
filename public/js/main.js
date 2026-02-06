// API Base URL
const API_BASE_URL = '/api';

// Common API functions
const api = {
    async getProfile() {
        const response = await fetch(`${API_BASE_URL}/profile`);
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        return data.data;
    },

    async getSkills() {
        const response = await fetch(`${API_BASE_URL}/skills`);
        if (!response.ok) throw new Error('Failed to fetch skills');
        const data = await response.json();
        return data.data;
    },

    async getProjects() {
        const response = await fetch(`${API_BASE_URL}/projects`);
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        return data.data;
    },

    async sendContact(formData) {
        const response = await fetch(`${API_BASE_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Failed to send message');
        }
        return data;
    },
};

// Utility functions
const utils = {
    // Set current year in footer
    setCurrentYear() {
        const yearElements = document.querySelectorAll('#currentYear');
        const currentYear = new Date().getFullYear();
        yearElements.forEach(el => {
            if (el) el.textContent = currentYear;
        });
    },

    // Render social links
    renderSocialLinks(socialLinks, containerId) {
        const container = document.getElementById(containerId);
        if (!container || !socialLinks) return;

        container.innerHTML = '';

        const socialMap = {
            github: { icon: '🔗', label: 'GitHub' },
            linkedin: { icon: '🔗', label: 'LinkedIn' },
            twitter: { icon: '🔗', label: 'Twitter' },
            email: { icon: '✉️', label: 'Email' },
        };

        Object.entries(socialLinks).forEach(([key, url]) => {
            if (url && socialMap[key]) {
                const link = document.createElement('a');
                link.href = url;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.textContent = socialMap[key].icon + ' ' + socialMap[key].label;
                link.title = socialMap[key].label;
                container.appendChild(link);
            }
        });
    },

    // Format date
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    },
};

// Navigation toggle for mobile
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Set current year
    utils.setCurrentYear();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { api, utils };
}
