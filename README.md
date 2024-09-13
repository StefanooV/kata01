### kata1

##Feature Flags: Son una técnica que permite habilitar o deshabilitar características específicas del software sin necesidad de cambiar el código fuente o realizar un nuevo despliegue. Permiten la activación de funcionalidades de manera dinámica para diferentes usuarios o entornos.

##Round Robin: Es un método de decisión que rota de manera cíclica a través de una lista de opciones. Si tienes opciones A, B y C, el primer cliente obtiene A, el segundo B, el tercero C, y luego el cuarto volverá a A, y así sucesivamente.

##Random Weight: Este método selecciona una opción de manera aleatoria, pero ponderada por un peso asignado a cada opción. Los pesos son valores entre 0 y 1 y la suma de todos los pesos es igual a 1. Cuanto mayor es el peso de una opción, mayor es la probabilidad de que sea seleccionada.

##Constraints: En este contexto, los constraints son restricciones que permiten especificar qué valor específico debe devolverse a ciertos usuarios. Por ejemplo, si al usuario 1 y al usuario 3 se les debe devolver siempre el valor 'A' o 'B', se implementan reglas para asegurar que se cumpla esta condición.

#Plan:
- Definir la estructura de datos para los Feature Flags, los usuarios, y los motores de decisión.
- Implementar el motor de decisión Round Robin.
- Implementar el motor de decisión Random Weight.
- Implementar el sistema de constraints por usuario.
- Desarrollar la lógica para que un cliente siempre reciba el mismo valor si solicita el mismo feature flag dos veces.
- Realizar pruebas con varios usuarios y un mismo flag para demostrar que el sistema funciona.

+ Archivo js: 
 - FeatureFlagSystem: La clase principal que maneja la lógica de los Feature Flags.
    Tiene la capacidad de agregar flags, definir motores de decisión (round-robin o random-weight) y aplicar restricciones a ciertos usuarios.
    Usa dos métodos para tomar decisiones sobre los valores de los flags: uno para round-robin y otro para random-weight.
    Almacena los valores ya devueltos para que si un usuario pide un mismo flag dos veces, siempre obtenga el mismo valor.
+ Interfaz de usuario:
    Hay un input de usuario y un selector de feature flag en el HTML.
    Cuando el usuario ingresa su ID y selecciona un flag, el valor correspondiente al flag se muestra en la pantalla.
    Si el usuario tiene una restricción o constraint (por ejemplo, el usuario 1 siempre recibe el valor 'X' para el flag featureB), el sistema lo toma en cuenta.
+ Ejemplo de funcionamiento:
    Para el flag featureA, que usa el motor round-robin, el primer usuario recibirá 'A', el segundo 'B', el tercero 'C', y luego vuelve a 'A'.
    Para el flag featureB, que usa random-weight, la selección será aleatoria basada en los pesos asignados (70% de probabilidad para 'X', 20% para 'Y', y 10% para 'Z'). Sin embargo, si el usuario tiene restricciones (como el usuario 1 o 3), siempre recibirá el valor correspondiente según la restricción.