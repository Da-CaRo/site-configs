// control.js
(async function() {
    // 1. Buscamos el script que nos está ejecutando para leer su "data-web"
    const selfScript = document.currentScript;
    const webId = selfScript.getAttribute('data-web');
    
    // 2. URL de tu JSON de configuración (usa el tuyo)
    const JSON_URL = 'https://raw.githubusercontent.com/Da-CaRo/site-configs/main/sites.json?t=' + Date.now();

    try {
        const res = await fetch(JSON_URL);
        const config = await res.json();

        // 3. Si esta web específica está en mantenimiento...
        if (config[webId] && config[webId].maintenance) {
            window.stop(); // Detiene la carga del resto de la web
            
            document.documentElement.innerHTML = `
                <style>
                    body { margin: 0; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: system-ui; background: #f4f4f4; color: #333; }
                    .card { text-align: center; padding: 2rem; background: white; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); max-width: 400px; }
                    h1 { color: #e74c3c; }
                </style>
                <div class="card">
                    <h1>Mantenimiento</h1>
                    <p>${config[webId].msg}</p>
                </div>
            `;
        }
    } catch (e) {
        console.error("Error en el sistema de control:", e);
    }
})();