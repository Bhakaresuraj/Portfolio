// Skills page specific functionality
let allSkills = [];

document.addEventListener('DOMContentLoaded', async () => {
    try {
        allSkills = await api.getSkills();
        renderSkills(allSkills);

        // Filter functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter skills
                const category = btn.dataset.category;
                const filtered = category === 'all' 
                    ? allSkills 
                    : allSkills.filter(skill => skill.category === category);
                
                renderSkills(filtered);
            });
        });

    } catch (error) {
        console.error('Error loading skills:', error);
        const container = document.getElementById('skillsContainer');
        if (container) {
            container.innerHTML = '<p class="loading">Error loading skills. Please try again later.</p>';
        }
    }
});

function renderSkills(skills) {
    const container = document.getElementById('skillsContainer');
    if (!container) return;

    if (skills.length === 0) {
        container.innerHTML = '<p class="loading">No skills available yet.</p>';
        return;
    }

    container.innerHTML = skills.map(skill => `
        <div class="skill-card">
            <div class="skill-header">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-category">${skill.category}</span>
            </div>
            <div class="skill-progress">
                <div class="skill-progress-bar" style="width: ${skill.proficiencyLevel}%"></div>
            </div>
            
        </div>
    `).join('');

    // Animate progress bars
    setTimeout(() => {
        const progressBars = container.querySelectorAll('.skill-progress-bar');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }, 100);
}
