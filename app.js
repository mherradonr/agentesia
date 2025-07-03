// Datos de la aplicación
const appData = {
    tiposAgentes: [
        {
            nombre: "Agente Reflejo Simple",
            complejidad: "Baja",
            autonomia: "Mínima",
            memoria: false,
            casoUso: "Termostatos, sensores simples",
            descripcion: "Responde directamente a estímulos del entorno sin memoria de estados anteriores",
            ventajas: ["Rápido", "Simple", "Confiable"],
            desventajas: ["Sin memoria", "Limitado", "No adaptativo"],
            icon: "🤖"
        },
        {
            nombre: "Agente Reflejo Basado en Modelo",
            complejidad: "Media",
            autonomia: "Baja",
            memoria: true,
            casoUso: "Robots de limpieza, sistemas de navegación",
            descripcion: "Mantiene un modelo interno del mundo para tomar mejores decisiones",
            ventajas: ["Memoria de estado", "Mejor navegación", "Más flexible"],
            desventajas: ["Más complejo", "Mayor costo computacional", "Requiere modelado"],
            icon: "🧠"
        },
        {
            nombre: "Agente Basado en Objetivos",
            complejidad: "Media",
            autonomia: "Media",
            memoria: true,
            casoUso: "Planificación de rutas, sistemas de recomendación",
            descripcion: "Planifica acciones para alcanzar objetivos específicos",
            ventajas: ["Orientado a objetivos", "Planificación", "Flexible"],
            desventajas: ["Requiere definición clara de objetivos", "Computacionalmente intensivo", "Puede ser lento"],
            icon: "🎯"
        },
        {
            nombre: "Agente Basado en Utilidad",
            complejidad: "Alta",
            autonomia: "Alta",
            memoria: true,
            casoUso: "Sistemas financieros, optimización de recursos",
            descripcion: "Optimiza sus acciones basándose en una función de utilidad",
            ventajas: ["Optimización", "Manejo de trade-offs", "Decisiones informadas"],
            desventajas: ["Complejo", "Requiere función de utilidad bien definida", "Computacionalmente costoso"],
            icon: "⚖️"
        },
        {
            nombre: "Agente de Aprendizaje",
            complejidad: "Muy Alta",
            autonomia: "Muy Alta",
            memoria: true,
            casoUso: "Asistentes personales, sistemas adaptativos",
            descripcion: "Aprende y mejora su comportamiento basándose en la experiencia",
            ventajas: ["Adaptativo", "Mejora continua", "Aprendizaje automático"],
            desventajas: ["Muy complejo", "Requiere grandes datasets", "Impredecible durante aprendizaje"],
            icon: "🚀"
        }
    ],
    frameworks: [
        {
            nombre: "LangChain",
            tipo: "Propósito General",
            facilidadUso: 7,
            flexibilidad: 9,
            soporteEmpresarial: 8,
            comunidad: 10,
            documentacion: 9,
            descripcion: "Framework más popular para construir aplicaciones con LLMs",
            ventajas: ["Gran ecosistema", "Excelente documentación", "Comunidad activa"],
            desventajas: ["Curva de aprendizaje", "Puede ser excesivo para proyectos simples"],
            color: "var(--accent-purple)"
        },
        {
            nombre: "AutoGen",
            tipo: "Multi-Agente",
            facilidadUso: 6,
            flexibilidad: 8,
            soporteEmpresarial: 7,
            comunidad: 8,
            documentacion: 7,
            descripcion: "Framework de Microsoft para sistemas multi-agente",
            ventajas: ["Conversaciones multi-agente", "Soporte de Microsoft", "Flexible"],
            desventajas: ["Menos maduro", "Documentación limitada", "Curva de aprendizaje empinada"],
            color: "var(--accent-cyan)"
        },
        {
            nombre: "CrewAI",
            tipo: "Colaborativo",
            facilidadUso: 9,
            flexibilidad: 7,
            soporteEmpresarial: 6,
            comunidad: 7,
            documentacion: 8,
            descripcion: "Framework simple para agentes colaborativos",
            ventajas: ["Muy fácil de usar", "Setup rápido", "Buena para prototipos"],
            desventajas: ["Menos flexible", "Comunidad pequeña", "Funcionalidades limitadas"],
            color: "var(--accent-green)"
        },
        {
            nombre: "Semantic Kernel",
            tipo: "Empresarial",
            facilidadUso: 7,
            flexibilidad: 8,
            soporteEmpresarial: 9,
            comunidad: 6,
            documentacion: 8,
            descripcion: "Framework de Microsoft para aplicaciones empresariales",
            ventajas: ["Orientado a empresa", "Seguridad robusta", "Integración con Azure"],
            desventajas: ["Ecosistema limitado", "Menos community-driven", "Enfocado en Microsoft"],
            color: "var(--accent-orange)"
        }
    ]
};

// Prompts de ejemplo para PartyRock
const samplePrompts = {
    text: [
        "Escribe un poema sobre la inteligencia artificial",
        "Genera una historia corta de ciencia ficción",
        "Crea un resumen ejecutivo para una startup",
        "Escribe un email profesional de seguimiento"
    ],
    image: [
        "Un robot futurista en una ciudad cyberpunk",
        "Paisaje alienígena con dos soles",
        "Retrato artístico estilo acuarela",
        "Logo minimalista para una app de IA"
    ],
    chat: [
        "Asistente de cocina especializado en comida italiana",
        "Tutor de matemáticas para estudiantes de secundaria",
        "Consejero de viajes para destinos exóticos",
        "Experto en fitness y nutrición"
    ],
    audio: [
        "Música relajante para meditación",
        "Efectos de sonido para videojuegos",
        "Narración de audiolibro",
        "Jingle publicitario pegadizo"
    ],
    code: [
        "Función de Python para análisis de datos",
        "Componente React para un dashboard",
        "Script de automatización en JavaScript",
        "Algoritmo de ordenamiento optimizado"
    ]
};

// Estado global de la aplicación
let currentTab = 'inicio';
let partyRockComponents = [];
let selectedComponent = null;
let isRunning = false;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    renderContent();
});

function initializeApp() {
    console.log('🚀 Inicializando Dashboard de Agentes de IA...');
}

function setupEventListeners() {
    // Navegación por tabs
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });

    // PartyRock Builder
    setupPartyRockListeners();
    
    // Métricas sliders
    setupMetricsListeners();
}

function switchTab(tabName) {
    // Actualizar navegación
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Actualizar contenido
    document.querySelectorAll('.tab-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');

    currentTab = tabName;
}

function renderContent() {
    renderAgents();
    renderFrameworks();
}

function renderAgents() {
    const container = document.getElementById('agentsGrid');
    if (!container) return;

    container.innerHTML = appData.tiposAgentes.map(agente => `
        <div class="card agent-card" data-complejidad="${agente.complejidad}" data-autonomia="${agente.autonomia}">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <div style="font-size: 2rem;">${agente.icon}</div>
                    <div>
                        <h3 class="card-title">${agente.nombre}</h3>
                        <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                            <span class="badge ${getBadgeClass(agente.complejidad)}">${agente.complejidad}</span>
                            <span class="badge ${getBadgeClass(agente.autonomia)}">${agente.autonomia}</span>
                        </div>
                    </div>
                </div>
            </div>
            <p class="card-content">${agente.descripcion}</p>
            <div style="margin: 1rem 0;">
                <p><strong style="color: var(--accent-cyan);">Caso de uso:</strong> ${agente.casoUso}</p>
                <p><strong style="color: var(--accent-purple);">Memoria:</strong> ${agente.memoria ? '✅ Sí' : '❌ No'}</p>
            </div>
            <div class="agent-details" style="display: none;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 1rem;">
                    <div>
                        <h4 style="color: var(--accent-green); margin-bottom: 0.5rem;">
                            <i class="fas fa-check-circle"></i> Ventajas
                        </h4>
                        <ul style="list-style: none; padding: 0;">
                            ${agente.ventajas.map(v => `<li style="margin-bottom: 0.25rem;"><span style="color: var(--accent-green);">▶</span> ${v}</li>`).join('')}
                        </ul>
                    </div>
                    <div>
                        <h4 style="color: var(--accent-red); margin-bottom: 0.5rem;">
                            <i class="fas fa-times-circle"></i> Desventajas
                        </h4>
                        <ul style="list-style: none; padding: 0;">
                            ${agente.desventajas.map(d => `<li style="margin-bottom: 0.25rem;"><span style="color: var(--accent-red);">▶</span> ${d}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Agregar event listeners para expandir/contraer
    container.querySelectorAll('.agent-card').forEach(card => {
        card.addEventListener('click', function() {
            const details = this.querySelector('.agent-details');
            const isVisible = details.style.display !== 'none';
            
            if (isVisible) {
                details.style.display = 'none';
                this.style.transform = '';
            } else {
                details.style.display = 'block';
                this.style.transform = 'scale(1.02)';
            }
        });
    });
}

function renderFrameworks() {
    const container = document.getElementById('frameworksGrid');
    if (!container) return;

    container.innerHTML = appData.frameworks.map(framework => `
        <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                <h3 class="card-title" style="color: ${framework.color};">${framework.nombre}</h3>
                <span class="badge badge-primary">${framework.tipo}</span>
            </div>
            <p class="card-content">${framework.descripcion}</p>
            
            <div style="margin: 1.5rem 0;">
                ${['facilidadUso', 'flexibilidad', 'comunidad'].map(metric => `
                    <div style="margin-bottom: 1rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                            <span style="color: var(--text-secondary); text-transform: capitalize;">${metric.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                            <span style="color: var(--text-primary); font-weight: bold;">${framework[metric]}/10</span>
                        </div>
                        <div style="height: 6px; background: #374151; border-radius: 3px; overflow: hidden;">
                            <div style="height: 100%; width: ${framework[metric] * 10}%; background: linear-gradient(45deg, ${framework.color}, ${framework.color}); transition: width 0.5s ease;"></div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
                <div>
                    <h4 style="color: var(--accent-green); font-size: 0.9rem; margin-bottom: 0.5rem;">✅ Ventajas</h4>
                    <ul style="list-style: none; padding: 0; font-size: 0.8rem;">
                        ${framework.ventajas.map(v => `<li style="margin-bottom: 0.25rem; color: var(--text-secondary);">${v}</li>`).join('')}
                    </ul>
                </div>
                <div>
                    <h4 style="color: var(--accent-red); font-size: 0.9rem; margin-bottom: 0.5rem;">❌ Desventajas</h4>
                    <ul style="list-style: none; padding: 0; font-size: 0.8rem;">
                        ${framework.desventajas.map(d => `<li style="margin-bottom: 0.25rem; color: var(--text-secondary);">${d}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `).join('');
}

function getBadgeClass(value) {
    const classes = {
        'Baja': 'badge-success',
        'Media': 'badge-warning',
        'Alta': 'badge-danger',
        'Muy Alta': 'badge-danger',
        'Mínima': 'badge-primary',
        'Muy Alta': 'badge-secondary'
    };
    return classes[value] || 'badge-primary';
}

// PartyRock Builder Functions
function setupPartyRockListeners() {
    // Botones de componentes
    document.querySelectorAll('.component-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            addComponent(this.dataset.type);
        });
    });

    // Botón ejecutar app
    document.getElementById('runApp').addEventListener('click', runPartyRockApp);
}

function addComponent(type) {
    const newComponent = {
        id: `comp-${Date.now()}`,
        type: type,
        title: `${getComponentTypeName(type)} ${partyRockComponents.length + 1}`,
        prompt: samplePrompts[type][Math.floor(Math.random() * samplePrompts[type].length)],
        output: '',
        completed: false
    };

    partyRockComponents.push(newComponent);
    updatePartyRockUI();
}

function getComponentTypeName(type) {
    const names = {
        text: 'Generador de Texto',
        image: 'Generador de Imagen',
        chat: 'Chatbot',
        audio: 'Generador de Audio',
        code: 'Generador de Código'
    };
    return names[type] || 'Componente';
}

function updatePartyRockUI() {
    updateComponentCount();
    renderComponents();
    updateCanvasVisibility();
}

function updateComponentCount() {
    document.getElementById('componentCount').textContent = partyRockComponents.length;
}

function updateCanvasVisibility() {
    const canvasEmpty = document.getElementById('canvasEmpty');
    const componentsList = document.getElementById('componentsList');
    
    if (partyRockComponents.length === 0) {
        canvasEmpty.style.display = 'block';
        componentsList.style.display = 'none';
    } else {
        canvasEmpty.style.display = 'none';
        componentsList.style.display = 'block';
    }
}

function renderComponents() {
    const container = document.getElementById('componentsList');
    if (!container) return;

    container.innerHTML = partyRockComponents.map(component => `
        <div class="component-item ${selectedComponent === component.id ? 'selected' : ''}" 
             data-id="${component.id}" 
             onclick="selectComponent('${component.id}')">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <div style="padding: 0.5rem; border-radius: 8px; background: ${getComponentColor(component.type)};">
                        <i class="${getComponentIcon(component.type)}" style="color: #000;"></i>
                    </div>
                    <div>
                        <h4 style="margin: 0; color: var(--text-primary);">${component.title}</h4>
                        <span class="badge badge-primary" style="font-size: 0.7rem;">${getComponentTypeName(component.type)}</span>
                    </div>
                </div>
                <button onclick="removeComponent('${component.id}')" 
                        style="background: none; border: none; color: var(--accent-red); cursor: pointer; padding: 0.25rem;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div style="margin-bottom: 1rem;">
                <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem;">Prompt:</p>
                <p style="font-size: 0.9rem; color: var(--text-secondary); background: rgba(15, 23, 42, 0.5); padding: 0.75rem; border-radius: 6px; margin: 0;">
                    ${component.prompt}
                </p>
            </div>
            ${component.output ? `
                <div>
                    <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem;">Output:</p>
                    <p style="font-size: 0.9rem; color: var(--accent-green); background: rgba(16, 185, 129, 0.1); padding: 0.75rem; border-radius: 6px; margin: 0;">
                        ${component.output}
                    </p>
                </div>
            ` : ''}
        </div>
    `).join('');
}

function getComponentColor(type) {
    const colors = {
        text: 'linear-gradient(45deg, var(--accent-cyan), var(--accent-purple))',
        image: 'linear-gradient(45deg, var(--accent-purple), var(--accent-pink))',
        chat: 'linear-gradient(45deg, var(--accent-green), #22c55e)',
        audio: 'linear-gradient(45deg, var(--accent-orange), var(--accent-red))',
        code: 'linear-gradient(45deg, var(--accent-pink), var(--accent-purple))'
    };
    return colors[type] || 'var(--accent-cyan)';
}

function getComponentIcon(type) {
    const icons = {
        text: 'fas fa-file-text',
        image: 'fas fa-image',
        chat: 'fas fa-comments',
        audio: 'fas fa-music',
        code: 'fas fa-code'
    };
    return icons[type] || 'fas fa-cog';
}

function selectComponent(componentId) {
    selectedComponent = componentId;
    renderComponents();
    renderConfigPanel();
}

function removeComponent(componentId) {
    event.stopPropagation();
    partyRockComponents = partyRockComponents.filter(comp => comp.id !== componentId);
    if (selectedComponent === componentId) {
        selectedComponent = null;
    }
    updatePartyRockUI();
    renderConfigPanel();
}

function renderConfigPanel() {
    const panel = document.getElementById('configPanel');
    if (!panel) return;

    if (!selectedComponent) {
        panel.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
                <i class="fas fa-cog" style="font-size: 2rem; opacity: 0.5; margin-bottom: 1rem;"></i>
                <p>Selecciona un componente para configurarlo</p>
            </div>
        `;
        return;
    }

    const component = partyRockComponents.find(c => c.id === selectedComponent);
    if (!component) return;

    panel.innerHTML = `
        <div style="space-y: 1rem;">
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text-secondary);">
                    Título del Componente
                </label>
                <input type="text" 
                       class="input" 
                       value="${component.title}" 
                       onchange="updateComponentTitle('${component.id}', this.value)">
            </div>

            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text-secondary);">
                    Prompt
                </label>
                <textarea class="textarea" 
                          onchange="updateComponentPrompt('${component.id}', this.value)"
                          placeholder="Describe lo que quieres que haga este componente...">${component.prompt}</textarea>
            </div>

            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text-secondary);">
                    Prompts Sugeridos
                </label>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    ${samplePrompts[component.type].slice(0, 3).map(prompt => `
                        <button onclick="updateComponentPrompt('${component.id}', '${prompt.replace(/'/g, "\\'")}'); renderConfigPanel();" 
                                style="background: none; border: 1px solid var(--border-primary); color: var(--text-muted); padding: 0.5rem; border-radius: 6px; text-align: left; cursor: pointer; font-size: 0.8rem; transition: all 0.3s ease;"
                                onmouseover="this.style.color='var(--text-primary)'; this.style.borderColor='var(--accent-cyan)'"
                                onmouseout="this.style.color='var(--text-muted)'; this.style.borderColor='var(--border-primary)'">
                            ${prompt}
                        </button>
                    `).join('')}
                </div>
            </div>

            <div style="padding: 1rem; background: rgba(6, 182, 212, 0.1); border-radius: 8px; border-left: 4px solid var(--accent-cyan);">
                <h4 style="margin: 0 0 0.5rem 0; color: var(--accent-cyan); font-size: 0.9rem;">
                    <i class="fas fa-info-circle"></i> Estadísticas del Componente
                </h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; font-size: 0.8rem;">
                    <div>
                        <span style="color: var(--text-muted);">Tipo:</span>
                        <span style="color: var(--text-primary); font-weight: bold;">${getComponentTypeName(component.type)}</span>
                    </div>
                    <div>
                        <span style="color: var(--text-muted);">Estado:</span>
                        <span style="color: ${component.completed ? 'var(--accent-green)' : 'var(--accent-orange)'}; font-weight: bold;">
                            ${component.completed ? 'Completado' : 'Pendiente'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function updateComponentTitle(componentId, newTitle) {
    const component = partyRockComponents.find(c => c.id === componentId);
    if (component) {
        component.title = newTitle;
        renderComponents();
    }
}

function updateComponentPrompt(componentId, newPrompt) {
    const component = partyRockComponents.find(c => c.id === componentId);
    if (component) {
        component.prompt = newPrompt;
        renderComponents();
    }
}

async function runPartyRockApp() {
    if (isRunning || partyRockComponents.length === 0) return;

    isRunning = true;
    const runButton = document.getElementById('runApp');
    runButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Ejecutando...';
    runButton.disabled = true;

    // Simular procesamiento de IA para cada componente
    for (let i = 0; i < partyRockComponents.length; i++) {
        const component = partyRockComponents[i];
        
        // Agregar clase loading al componente
        const componentElement = document.querySelector(`[data-id="${component.id}"]`);
        if (componentElement) {
            componentElement.classList.add('loading');
        }

        // Simular tiempo de procesamiento
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Generar output simulado
        let simulatedOutput = '';
        switch (component.type) {
            case 'text':
                simulatedOutput = `✨ Texto generado basado en: "${component.prompt.substring(0, 30)}..."`;
                break;
            case 'image':
                simulatedOutput = `🎨 Imagen creada: "${component.prompt.substring(0, 30)}..."`;
                break;
            case 'chat':
                simulatedOutput = `💬 Chatbot configurado como: "${component.prompt.substring(0, 30)}..."`;
                break;
            case 'audio':
                simulatedOutput = `🎵 Audio generado: "${component.prompt.substring(0, 30)}..."`;
                break;
            case 'code':
                simulatedOutput = `💻 Código generado: "${component.prompt.substring(0, 30)}..."`;
                break;
        }

        component.output = simulatedOutput;
        component.completed = true;

        // Remover clase loading y actualizar UI
        if (componentElement) {
            componentElement.classList.remove('loading');
        }
        
        renderComponents();
        if (selectedComponent === component.id) {
            renderConfigPanel();
        }
    }

    // Restaurar botón
    isRunning = false;
    runButton.innerHTML = '<i class="fas fa-play"></i> Ejecutar App';
    runButton.disabled = false;

    // Mostrar mensaje de éxito
    showNotification('🎉 ¡App ejecutada exitosamente!', 'success');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'var(--accent-green)' : 'var(--accent-cyan)'};
        color: #000;
        border-radius: 8px;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Métricas Functions
function setupMetricsListeners() {
    const precisionSlider = document.getElementById('precisionSlider');
    const tiempoSlider = document.getElementById('tiempoSlider');
    const satisfaccionSlider = document.getElementById('satisfaccionSlider');

    if (precisionSlider) {
        precisionSlider.addEventListener('input', updateMetrics);
    }
    if (tiempoSlider) {
        tiempoSlider.addEventListener('input', updateMetrics);
    }
    if (satisfaccionSlider) {
        satisfaccionSlider.addEventListener('input', updateMetrics);
    }

    // Inicializar valores
    updateMetrics();
}

function updateMetrics() {
    const precisionSlider = document.getElementById('precisionSlider');
    const tiempoSlider = document.getElementById('tiempoSlider');
    const satisfaccionSlider = document.getElementById('satisfaccionSlider');
    
    const precisionValue = document.getElementById('precisionValue');
    const tiempoValue = document.getElementById('tiempoValue');
    const satisfaccionValue = document.getElementById('satisfaccionValue');
    const overallScore = document.getElementById('overallScore');

    if (!precisionSlider || !tiempoSlider || !satisfaccionSlider) return;

    const precision = parseFloat(precisionSlider.value);
    const tiempo = parseFloat(tiempoSlider.value);
    const satisfaccion = parseFloat(satisfaccionSlider.value);

    // Actualizar valores mostrados
    if (precisionValue) precisionValue.textContent = precision;
    if (tiempoValue) tiempoValue.textContent = tiempo;
    if (satisfaccionValue) satisfaccionValue.textContent = satisfaccion.toFixed(1);

    // Calcular puntuación general
    const precisionScore = precision; // Ya está en porcentaje
    const tiempoScore = Math.max(0, 100 - (tiempo / 10)); // Mejor tiempo = mayor puntuación
    const satisfaccionScore = (satisfaccion / 5) * 100;

    const score = Math.round((precisionScore + tiempoScore + satisfaccionScore) / 3);

    if (overallScore) {
        overallScore.textContent = score;
        
        // Cambiar color según puntuación
        const scoreElement = overallScore.parentElement;
        if (score >= 80) {
            scoreElement.style.background = 'linear-gradient(45deg, var(--accent-green), #22c55e)';
        } else if (score >= 60) {
            scoreElement.style.background = 'linear-gradient(45deg, var(--accent-orange), #f97316)';
        } else {
            scoreElement.style.background = 'linear-gradient(45deg, var(--accent-red), #dc2626)';
        }
    }
}

// Animaciones CSS adicionales
const additionalStyles = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;

// Agregar estilos adicionales
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Funciones de utilidad
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Efectos visuales adicionales
function addVisualEffects() {
    // Efecto de partículas en el header (opcional)
    const header = document.querySelector('.header');
    if (header) {
        setInterval(() => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: var(--accent-cyan);
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: sparkle 2s ease-out forwards;
                pointer-events: none;
            `;
            
            header.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 2000);
        }, 500);
    }
}

// Agregar animación de sparkle
const sparkleAnimation = `
    @keyframes sparkle {
        0% {
            opacity: 0;
            transform: scale(0);
        }
        50% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
`;

styleSheet.textContent += sparkleAnimation;

// Inicializar efectos visuales
setTimeout(addVisualEffects, 1000);

console.log('🎉 Dashboard de Agentes de IA cargado completamente!');