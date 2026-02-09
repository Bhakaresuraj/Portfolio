// Projects page specific functionality
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const projects = await api.getProjects();
        renderProjects(projects);
    } catch (error) {
        console.error('Error loading projects:', error);
        const container = document.getElementById('projectsGrid');
        if (container) {
            container.innerHTML = '<p class="loading">Error loading projects. Please try again later.</p>';
        }
    }
});

function renderProjects(projects) {
    const container = document.getElementById('projectsGrid');
    if (!container) return;

    if (projects.length === 0) {
        container.innerHTML = '<p class="loading">No projects available yet.</p>';
        return;
    }

    container.innerHTML = projects.map(project => `
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
