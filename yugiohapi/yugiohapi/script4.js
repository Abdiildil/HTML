document.addEventListener('DOMContentLoaded', () => {
    const pseudoInput = document.getElementById('pseudo');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('mdp');
    const toggleDarkModeButton = document.getElementById('mode');
    const pseudoError = document.getElementById('erreur-pseudo');
    const emailError = document.getElementById('erreur-email');
    const passwordError = document.getElementById('erreur-mdp');

    // fonction pour les erreurs
    const handleValidationError = (input, errorElement, condition, errorMessage) => {
        if (condition) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
            errorElement.classList.add('erreur-flash');
        } else {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            errorElement.classList.remove('erreur-flash');
        }
    };

    // Validation pour le pseudo (8 lettres)
    pseudoInput.addEventListener('input', () => {
        handleValidationError(
            pseudoInput,
            pseudoError,
            pseudoInput.value.length < 8,
            "8 lettres minimum"
        );
    });

    // validation pour l'email avec l'@
    emailInput.addEventListener('input', () => {
        handleValidationError(
            emailInput,
            emailError,
            !emailInput.value.includes('@'),
            "Faut mettre un @"
        );
    });

    // verifier le mot de passe
    passwordInput.addEventListener('input', () => {
        const passwordPattern = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        handleValidationError(
            passwordInput,
            passwordError,
            !passwordPattern.test(passwordInput.value),
            "Chef, tu as oublié le caractère spécial (!@#$%^&*)."
        );
    });

    // bouton DARK mode
    toggleDarkModeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});
