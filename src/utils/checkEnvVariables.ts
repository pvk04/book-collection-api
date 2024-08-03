// Функция для проверки, что все нужные переменные установлены и имеют значения
export function checkEnvVariables() {
	const requiredVariables = ["DATABASE_URL", "PORT", "JWT_SECRET"];
	const missingVariables = [];

	for (const variable of requiredVariables) {
		if (!process.env[variable]) {
			missingVariables.push(variable);
		}
	}

	if (missingVariables.length > 0) {
		console.error(`Missing environment variables: ${missingVariables.join(", ")}`);
		process.exit(1); // Выход с кодом ошибки
	} else {
		console.log("All required environment variables are set.");
	}
}
