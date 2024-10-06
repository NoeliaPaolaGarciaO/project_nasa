const apiKey = 'oR4YYaC55O5YEnrt3vIRGiaxkuuMhG16iOqzFH2X'; // Reemplaza con tu clave API de NASA

document.getElementById('loadData').addEventListener('click', loadCelestialData);

function loadCelestialData() {
    fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            data.near_earth_objects.forEach(body => {
                const bodyInfo = {
                    name: body.name,
                    estimatedDiameter: (body.estimated_diameter.kilometers.estimated_diameter_max).toFixed(2), // en km
                    isPotentiallyHazardous: body.is_potentially_hazardous_asteroid,
                    color: body.is_potentially_hazardous_asteroid ? "#ff0000" : "#00ff00", // Rojo si es peligroso, verde si no
                    radius: 10 + Math.random() * 30, // Tamaño aleatorio
                    distance: Math.random() * 100 + 100, // Distancia aleatoria
                };
                createPlanet(bodyInfo);
            });
        })
        .catch(error => console.error('Error al cargar los datos de la API:', error));
}

function createPlanet(body) {
    const planet = document.createElement('div');
    planet.classList.add('planet');
    planet.style.backgroundColor = body.color;
    planet.style.width = `${body.radius}px`;
    planet.style.height = `${body.radius}px`;
    planet.style.animationDuration = `${body.distance / 10}s`; // Ajustar la velocidad según la distancia

    // Agregar un evento de clic para mostrar información
    planet.addEventListener('click', () => {
        alert(`Nombre: ${body.name}\nDiámetro Estimado: ${body.estimatedDiameter} km\nPotencialmente Peligroso: ${body.isPotentiallyHazardous ? "Sí" : "No"}`);
    });

    document.getElementById('orrery').appendChild(planet);
}
