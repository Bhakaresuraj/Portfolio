// About page specific functionality
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const profile = await api.getProfile();
        
        const aboutName = document.getElementById('aboutName');
        const aboutTitle = document.getElementById('aboutTitle');
        const aboutBio = document.getElementById('aboutBio');
        const aboutSocial = document.getElementById('aboutSocial');

        if (aboutName) aboutName.textContent = profile.name || 'Your Name';
        if (aboutTitle) aboutTitle.textContent = profile.title || 'Full Stack Developer';
        if (aboutBio) {
            aboutBio.innerHTML = `<p>${(profile.bio || 'A passionate developer...').replace(/\n/g, '</p><p>')}</p>`;
        }
        if (aboutSocial && profile.socialLinks) {
            utils.renderSocialLinks(profile.socialLinks, 'aboutSocial');
        }

    } catch (error) {
        console.error('Error loading about page data:', error);
    }
});
