class FeatureFlagSystem {
    constructor() {
        this.flags = {}; // Almacena los feature flags con sus motores y usuarios asignados
        this.userFlags = {}; // Almacena qué valor se ha devuelto previamente para cada usuario
    }

    // Agregar un nuevo flag con opciones, motor y constraints
    addFlag(flagName, options, engine, constraints = {}) {
        this.flags[flagName] = {
            options: options,
            engine: engine, // Puede ser 'round-robin' o 'random-weight'
            constraints: constraints, // Reglas específicas por usuario
            currentIndex: 0 // Solo se usa para round-robin
        };
    }

    // Obtener el valor de un flag para un usuario dado
    getFlagForUser(flagName, userId) {
        if (!this.flags[flagName]) {
            throw new Error(`Flag ${flagName} no existe`);
        }

        const flag = this.flags[flagName];

        // Si el usuario ya ha solicitado este flag, devolvemos el valor anterior
        if (this.userFlags[`${userId}-${flagName}`]) {
            return this.userFlags[`${userId}-${flagName}`];
        }

        // Si existen restricciones para este usuario (constraints)
        if (flag.constraints[userId]) {
            const value = flag.constraints[userId];
            this.userFlags[`${userId}-${flagName}`] = value;
            return value;
        }

        // Selección basada en el motor de decisión
        let value;
        if (flag.engine === 'round-robin') {
            value = this.getRoundRobinValue(flag);
        } else if (flag.engine === 'random-weight') {
            value = this.getRandomWeightValue(flag);
        }

        // Guardamos el valor devuelto para este usuario
        this.userFlags[`${userId}-${flagName}`] = value;
        return value;
    }

    // Motor de decisión round-robin
    getRoundRobinValue(flag) {
        const value = flag.options[flag.currentIndex];
        flag.currentIndex = (flag.currentIndex + 1) % flag.options.length;
        return value;
    }

    // Motor de decisión random-weight
    getRandomWeightValue(flag) {
        const options = flag.options;
        const random = Math.random();
        let accumulatedWeight = 0;

        for (let i = 0; i < options.length; i++) {
            accumulatedWeight += options[i].weight;
            if (random <= accumulatedWeight) {
                return options[i].value;
            }
        }
    }
}

// Creamos una instancia del sistema de Feature Flags
const featureFlags = new FeatureFlagSystem();

// Agregar un flag con motor de round-robin
featureFlags.addFlag('featureA', ['A', 'B', 'C'], 'round-robin');

// Agregar un flag con motor random-weight
featureFlags.addFlag('featureB', [
    { value: 'X', weight: 0.7 },
    { value: 'Y', weight: 0.2 },
    { value: 'Z', weight: 0.1 }
], 'random-weight', { 1: 'X', 3: 'Y' });

// Obtener referencias a los elementos de la UI
const userIdInput = document.getElementById('userId');
const flagSelect = document.getElementById('flagName');
const resultText = document.getElementById('result');
const getFlagButton = document.getElementById('getFlag');

// Evento al hacer clic en el botón para obtener el valor del flag
getFlagButton.addEventListener('click', () => {
    const userId = parseInt(userIdInput.value);  // Tomamos el ID del usuario
    const flagName = flagSelect.value;  // Tomamos el flag seleccionado

    if (!isNaN(userId) && flagName) {
        // Obtener el valor del flag para el usuario
        const result = featureFlags.getFlagForUser(flagName, userId);
        // Mostrar el resultado en la página
        resultText.textContent = `Usuario ${userId} recibe el valor: ${result}`;
    } else {
        // Si no se ha ingresado un usuario válido, mostramos un mensaje de error
        resultText.textContent = 'Por favor, ingrese un ID de usuario válido y seleccione un flag.';
    }
});

