// Contact page specific functionality
document.addEventListener('DOMContentLoaded', async () => {
    // Load profile for contact info
    try {
        const profile = await api.getProfile();
        
        const contactEmail = document.getElementById('contactEmail');
        const contactSocial = document.getElementById('contactSocial');

        if (contactEmail && profile.socialLinks?.email) {
            contactEmail.textContent = profile.socialLinks.email;
            contactEmail.href = `mailto:${profile.socialLinks.email}`;
        }
        if (contactSocial && profile.socialLinks) {
            utils.renderSocialLinks(profile.socialLinks, 'contactSocial');
        }
    } catch (error) {
        console.error('Error loading contact info:', error);
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Real-time validation
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        if (nameInput) {
            nameInput.addEventListener('blur', () => validateField(nameInput, 'name'));
        }
        if (emailInput) {
            emailInput.addEventListener('blur', () => validateField(emailInput, 'email'));
        }
        if (messageInput) {
            messageInput.addEventListener('blur', () => validateField(messageInput, 'message'));
        }
    }
});

function validateField(field, fieldName) {
    const errorElement = document.getElementById(`${fieldName}Error`);
    let isValid = true;
    let errorMessage = '';

    switch (fieldName) {
        case 'name':
            if (field.value.trim().length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters';
            } else if (field.value.trim().length > 100) {
                isValid = false;
                errorMessage = 'Name cannot exceed 100 characters';
            }
            break;
        case 'email':
            const emailRegex = /^\S+@\S+\.\S+$/;
            if (!emailRegex.test(field.value.trim())) {
                isValid = false;
                errorMessage = 'Please provide a valid email address';
            }
            break;
        case 'message':
            if (field.value.trim().length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters';
            } else if (field.value.trim().length > 1000) {
                isValid = false;
                errorMessage = 'Message cannot exceed 1000 characters';
            }
            break;
    }

    if (errorElement) {
        if (isValid) {
            errorElement.classList.remove('show');
            field.style.borderColor = '';
        } else {
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
            field.style.borderColor = 'var(--error-color)';
        }
    }

    return isValid;
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const submitLoader = document.getElementById('submitLoader');
    const formMessage = document.getElementById('formMessage');

    // Get form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        message: document.getElementById('message').value.trim(),
    };

    // Validate all fields
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const isNameValid = validateField(nameInput, 'name');
    const isEmailValid = validateField(emailInput, 'email');
    const isMessageValid = validateField(messageInput, 'message');

    if (!isNameValid || !isEmailValid || !isMessageValid) {
        showFormMessage('Please fix the errors in the form.', 'error');
        return;
    }

    // Disable submit button
    if (submitBtn) submitBtn.disabled = true;
    if (submitText) submitText.style.display = 'none';
    if (submitLoader) submitLoader.style.display = 'inline-block';

    try {
        const response = await api.sendContact(formData);
        
        // Show success message
        showFormMessage(response.message || 'Thank you for your message! I will get back to you soon.', 'success');
        
        // Reset form
        form.reset();
        
        // Clear error messages
        ['name', 'email', 'message'].forEach(fieldName => {
            const errorElement = document.getElementById(`${fieldName}Error`);
            const field = document.getElementById(fieldName);
            if (errorElement) errorElement.classList.remove('show');
            if (field) field.style.borderColor = '';
        });

    } catch (error) {
        console.error('Error sending message:', error);
        showFormMessage(error.message || 'Failed to send message. Please try again later.', 'error');
    } finally {
        // Re-enable submit button
        if (submitBtn) submitBtn.disabled = false;
        if (submitText) submitText.style.display = 'inline';
        if (submitLoader) submitLoader.style.display = 'none';
    }
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type} show`;
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide message after 5 seconds for success
        if (type === 'success') {
            setTimeout(() => {
                formMessage.classList.remove('show');
            }, 5000);
        }
    }
}
