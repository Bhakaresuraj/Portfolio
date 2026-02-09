// Home page specific functionality
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load profile data
        const profile = await api.getProfile();
        
        // Update hero section
        const profileName = document.getElementById('profileName');
        const profileTitle = document.getElementById('profileTitle');
        const profileBio = document.getElementById('profileBio');
        const profileSocial = document.getElementById('profileSocial');

        if (profileName) profileName.textContent = profile.name || 'Your Name';
        if (profileTitle) profileTitle.textContent = profile.title || 'Full Stack Developer';
        if (profileBio) profileBio.textContent = profile.bio || 'A passionate developer...';
        if (profileSocial && profile.socialLinks) {
            utils.renderSocialLinks(profile.socialLinks, 'profileSocial');
        }

        // Load stats
        const [skills, projects] = await Promise.all([
            api.getSkills(),
            api.getProjects(),
        ]);

        const projectsCount = document.getElementById('projectsCount');
        const skillsCount = document.getElementById('skillsCount');

        if (projectsCount) projectsCount.textContent = projects.length || 0;
        if (skillsCount) skillsCount.textContent = skills.length || 0;

        // Load featured projects (first 3)
        const featuredProjects = projects.slice(0, 3);
        const featuredContainer = document.getElementById('featuredProjects');
        
        if (featuredContainer) {
            if (featuredProjects.length === 0) {
                featuredContainer.innerHTML = '<p class="loading">No projects available yet.</p>';
            } else {
                featuredContainer.innerHTML = featuredProjects.map(project => `
                    <div class="project-card">
                        <div class="project-image">
                            ${project.imageUrl ? 
                                `<img src="${project.imageUrl}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;">` :
                                project.title
                            }
                        </div>
                        <div class="project-content">
                            <h3 class="project-title">${project.title}</h3>
                            <p class="project-description">${project.description}</p>
                            <div class="project-tech">
                                ${project.techStack.map(tech => 
                                    `<span class="tech-tag">${tech}</span>`
                                ).join('')}
                            </div>
                            <div class="project-links">
                                ${project.projectLink ? 
                                    `<a href="${project.projectLink}" target="_blank" rel="noopener">Live Demo</a>` : ''
                                }
                                ${project.githubLink ? 
                                    `<a href="${project.githubLink}" target="_blank" rel="noopener">GitHub</a>` : ''
                                }
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }

    } catch (error) {
        console.error('Error loading home page data:', error);
        const profileName = document.getElementById('profileName');
        if (profileName) profileName.textContent = 'Error loading profile';
    }
});
