// Validaciones para formulario de registro / login
function validateEmail(email){
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(String(email).trim());
}

function validatePassword(pass){
	return typeof pass === 'string' && pass.length >= 8;
}

function passwordsMatch(p1,p2){
	return p1 === p2;
}

// Opcional: exportar globalmente (ya están en ámbito global en navegador)
window.validateEmail = validateEmail;
window.validatePassword = validatePassword;
window.passwordsMatch = passwordsMatch;

