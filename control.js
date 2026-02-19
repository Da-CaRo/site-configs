// control.js
(async function () {
    // 1. Buscamos el script que nos está ejecutando para leer su "data-web"
    const selfScript = document.currentScript;
    const webId = selfScript.getAttribute('data-web');

    // 2. URL de tu JSON de configuración
    const JSON_URL = 'https://api.npoint.io/03144058aa3a6263fb8c'

    try {
        const res = await fetch(JSON_URL, { cache: "no-store" });
        const config = await res.json();

        console.log(config[webId])

        // 3. Si esta web específica está en mantenimiento...
        if (config[webId] && config[webId].maintenance) {
            window.stop(); // Detiene la carga del resto de la web

            document.documentElement.innerHTML = `
                <style>
                    body { margin:0; background:#1a1a1a; color:white; font-family:sans-serif; }
                    .m-container { height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:20px; }
                    h1 { font-size: 2.5rem; margin: 10px 0; }
                </style>
                <div class="m-container">
                    <div style="font-size:4rem;">🚧</div>
                    <h1>Modo Mantenimiento</h1>
                    <p style="font-size:1.2rem; color:#ccc; max-width:600px;">${config[webId].msg}</p>
                </div>
            `;
        }
    } catch (e) {
        console.error("Error en el sistema de control:", e);
    }
})();