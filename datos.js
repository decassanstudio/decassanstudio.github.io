// ===== Servicios y cursos de D'Cassan Studio =====
// Para cambiar un precio, edita "precio" (oferta) y "normal" (precio tachado).
// "reserva" es el abono para tomar el cupo (se descuenta del total).

window.DCASSAN_DATOS = {

  /* ------------------------- SERVICIOS ------------------------- */
  servicios: [
    {
      id: "clasicas",
      grupo: "pestanas",
      nombre: "Extensiones de Pestañas Clásicas",
      corto: "Clásicas",
      precio: 30000, normal: null,
      duracion: null,
      efecto: "Natural, pelo a pelo",
      foto: "img/foto-clasicas.webp", afiche: "img/afiche-clasicas.webp",
      gancho: "Pestañas más largas, definidas y elegantes con un efecto natural, sin necesidad de usar máscara.",
      tituloIncluye: "En qué consiste",
      incluye: [
        "Técnica pelo a pelo: una extensión sobre cada pestaña natural",
        "Respeta la forma y características de tus pestañas",
        "Acabado delicado, ligero y armonioso"
      ],
      beneficios: ["Efecto natural", "Más largas y definidas", "Sin necesidad de máscara", "Resultado elegante y sofisticado"],
      ideal: ["Quienes desean una mirada más expresiva", "Un resultado natural y sofisticado"]
    },
    {
      id: "rimel",
      grupo: "pestanas",
      nombre: "Extensiones de Pestañas Efecto Rímel",
      corto: "Efecto Rímel",
      precio: 35000, normal: null,
      duracion: "2 horas aprox.",
      efecto: "Más negro y definido",
      foto: "img/foto-rimel.webp", afiche: "img/afiche-rimel.webp",
      gancho: "Pestañas más negras, largas y definidas, como con tu máscara favorita, pero sin maquillarte.",
      tituloIncluye: "En qué consiste",
      incluye: [
        "Abanicos cerrados sobre cada pestaña natural",
        "Efecto más oscuro, marcado y con mayor volumen visual",
        "Acabado elegante, prolijo y uniforme"
      ],
      beneficios: ["Mirada más intensa y definida", "Pestañas más negras y largas", "Sin necesidad de máscara", "Resultado elegante y duradero"],
      ideal: ["Deseas una mirada más intensa y llamativa", "Prefieres un efecto similar a la máscara de pestañas", "Buscas un resultado definido sin volumen demasiado cargado"],
      nota: "Retiro y mantenimiento cada 2 a 3 semanas."
    },
    {
      id: "volumen",
      grupo: "pestanas",
      nombre: "Extensiones de Pestañas Volumen Tecnológico",
      corto: "Volumen Tecnológico",
      precio: 37000, normal: null,
      destacado: "Máximo volumen",
      duracion: "2 horas aprox.",
      efecto: "Máximo volumen y definición",
      foto: "img/foto-volumen.webp", afiche: "img/afiche-volumen.webp",
      gancho: "Pestañas abundantes, oscuras y perfectamente definidas para una mirada intensa y sofisticada.",
      tituloIncluye: "En qué consiste",
      incluye: [
        "Abanicos tecnológicos ultrafinos y ligeros sobre cada pestaña natural",
        "Mayor densidad, volumen y profundidad sin sobrecargar tus pestañas",
        "Diseño adaptado a la forma de tus ojos y al resultado que deseas"
      ],
      beneficios: ["Mirada más intensa y expresiva", "Mayor volumen y definición", "Ligeras y cómodas", "Resultado sofisticado y duradero"],
      ideal: ["Amas las pestañas voluminosas", "Quieres una mirada más llamativa", "Buscas un efecto denso pero ligero"],
      nota: "Retiro y mantenimiento cada 2 a 3 semanas."
    },
    {
      id: "lifting",
      grupo: "pestanas",
      nombre: "Lifting de Pestañas",
      corto: "Lifting de Pestañas",
      precio: 25000, normal: null, desde: true,
      tituloVariantes: "Elige tu lifting",
      variantes: [
        { id: "tradicional", nombre: "Lifting Tradicional", precio: 25000, txt: "Curvatura elegante y natural para una mirada abierta, fresca y definida." },
        { id: "coreano", nombre: "Lifting Coreano", precio: 30000, txt: "Elevación y curvatura con productos acondicionadores que hidratan y cuidan tus pestañas." }
      ],
      duracion: "1 hora aprox.",
      efecto: "Tus pestañas naturales, elevadas",
      foto: "img/foto-lifting.webp", afiche: "img/afiche-lifting.webp",
      gancho: "Eleva, curva y define tus pestañas naturales desde la raíz, sin extensiones. Resultados de 6 a 8 semanas.",
      tituloIncluye: "En qué consiste",
      incluye: [
        "Moldes y productos especiales que moldean tus pestañas desde la raíz",
        "Tradicional: curvatura elegante y natural",
        "Coreano: además hidrata y acondiciona la fibra de la pestaña"
      ],
      beneficios: ["Mirada más abierta y expresiva", "Pestañas visiblemente más largas", "Resultados de 6 a 8 semanas", "Sin extensiones y con bajo mantenimiento"],
      ideal: ["Pestañas rectas o con poca curvatura", "Prefieres un resultado natural, sin extensiones", "Buscas algo práctico y de bajo mantenimiento"],
      nota: "La duración del resultado depende del ciclo natural de tus pestañas."
    },
    {
      id: "limpieza",
      grupo: "limpiezas",
      nombre: "Limpieza Facial Profunda",
      corto: "Clásica",
      precio: 24990, normal: 35000,
      duracion: "90 min aprox.",
      foto: "img/foto-limpieza.webp", afiche: "img/afiche-limpieza.webp",
      gancho: "Adiós puntos negros y piel opaca: tu piel limpia, suave y luminosa en una sesión relajante.",
      incluye: [
        "Higienización de la piel",
        "Vapor de ozono para abrir los poros",
        "Exfoliación con peeling ultrasónico",
        "Desincrustación de comedones (puntos negros)",
        "Microdermoabrasión",
        "Masaje facial relajante con vitamina E",
        "Mascarilla blanqueadora, hidratante y nutritiva con bioactivo según tu piel",
        "Alta frecuencia",
        "Crema hidratante/nutritiva y protector solar"
      ],
      beneficios: ["Elimina impurezas y células muertas", "Mejora la apariencia de los poros", "Suaviza y revitaliza la piel", "Aporta hidratación y luminosidad"],
      ideal: ["Piel opaca o congestionada", "Puntos negros"]
    },
    {
      id: "coreana",
      grupo: "limpiezas",
      nombre: "Limpieza Facial Profunda Coreana",
      corto: "Coreana",
      precio: 39990, normal: 45000,
      duracion: "2 horas aprox.",
      regalo: "Hydralips de regalo",
      foto: "img/foto-coreana.webp", afiche: "img/afiche-coreana.webp",
      gancho: "Inspirada en el skincare coreano: limpieza profunda, gua sha y rodillo de cuarzo, y tus labios hidratados de regalo.",
      incluye: [
        "Doble limpieza facial",
        "Vapor de ozono",
        "Peeling enzimático o químico según tu piel",
        "Peeling ultrasónico",
        "Extracción manual de puntos negros",
        "Mascarilla descongestiva",
        "Masaje relajante con piedra gua sha y rodillo de cuarzo",
        "Mascarilla personalizada con bioactivos",
        "Hidratación profunda",
        "Alta frecuencia (cuando está indicada)",
        "Crema hidratante y protector solar",
        "🎁 Hydralips: hidratación profunda de labios"
      ],
      beneficios: ["Elimina puntos negros e impurezas", "Mejora la textura", "Piel más suave y luminosa", "Una experiencia de autocuidado de 2 horas"],
      ideal: ["Puntos negros y poros congestionados", "Falta de hidratación"]
    },
    {
      id: "hydrafacial",
      grupo: "limpiezas",
      nombre: "Hydrafacial Signature Coreana",
      corto: "Hydrafacial",
      precio: 49990, normal: 65000,
      etiqueta: "Precio de lanzamiento",
      destacado: "La más completa",
      duracion: "90 min aprox.",
      foto: "img/foto-hydrafacial.webp", afiche: "img/afiche-hydrafacial.webp",
      gancho: "Nuestro protocolo más completo: hidrodermoabrasión H2O2 + aparatología + cosmética coreana en una sola sesión.",
      incluye: [
        "Diagnóstico facial personalizado",
        "Doble limpieza profesional",
        "Peeling enzimático o químico",
        "Peeling ultrasónico (skin scrubber)",
        "Hydrafacial H2O2: exfolia, extrae e hidrata",
        "Extracción manual de comedones (si es necesario)",
        "Ultrasonido para aplicación de activos",
        "Radiofrecuencia facial",
        "Martillo frío calmante",
        "Biomicrocorrientes (efecto lifting)",
        "Spray de oxígeno con activos",
        "Máscara LED",
        "Sérum profesional, crema hidratante y protector solar"
      ],
      beneficios: ["Limpieza profunda sin maltratar la piel", "Hidratación intensa", "Piel más luminosa", "Cuidado de la firmeza"],
      ideal: ["Piel apagada o deshidratada", "Quienes buscan la experiencia más tecnológica"],
      nota: "Cada etapa se adapta a tu piel tras la evaluación; algunas tecnologías pueden omitirse si no están indicadas.",
      faq: [
        ["¿Es lo mismo que una limpieza facial tradicional?", "No exactamente. Ambas limpian, pero la Hydrafacial suma hidrodermoabrasión H2O2 y aparatología para hidratar y cuidar la firmeza."],
        ["¿Duele?", "Generalmente es bien tolerada. La extracción manual puede producir molestias leves y adaptamos la intensidad a tu sensibilidad."],
        ["¿Puedo hacérmela si tengo piel sensible?", "Depende de la evaluación previa. Podemos adaptar u omitir etapas; si hay irritación activa, es mejor posponerla."]
      ]
    },
    {
      id: "glow",
      grupo: "tratamientos",
      nombre: "Peeling Glow Effect Filter",
      corto: "Glow Effect",
      precio: 39990, normal: 45000,
      duracion: null,
      foto: "img/foto-glow.webp", afiche: "img/afiche-glow.webp",
      gancho: "Peeling con ácido mandélico para devolverle a tu piel el glow: más suave, uniforme y luminosa.",
      incluye: [
        "Evaluación facial personalizada",
        "Higienización profesional",
        "Peeling con ácido mandélico",
        "Neutralización o retiro del peeling",
        "Mascarilla calmante e hidratante",
        "Hidratación facial",
        "Protector solar y recomendaciones de cuidado"
      ],
      beneficios: ["Efecto glow", "Textura más suave", "Tono más uniforme", "Poros menos visibles"],
      ideal: ["Piel opaca o sin luminosidad", "Textura áspera o irregular", "Tono poco uniforme", "Piel grasa o con imperfecciones"],
      nota: "Algunas personas notan la piel más luminosa desde la primera sesión; manchas y textura suelen requerir varias sesiones. Evaluamos tu piel para confirmar que el peeling es adecuado para ti."
    },
    {
      id: "clearskin",
      grupo: "tratamientos",
      nombre: "Clear Skin Effect",
      corto: "Clear Skin",
      precio: 39990, normal: 45000,
      duracion: null,
      foto: "img/foto-clearskin.webp", afiche: "img/afiche-clearskin.webp",
      gancho: "Peeling antiacné con ácido azelaico para una piel más limpia, calmada y uniforme.",
      incluye: [
        "Evaluación facial personalizada",
        "Higienización profesional",
        "Preparación de la piel",
        "Peeling con ácido azelaico",
        "Neutralización o retiro del peeling",
        "Mascarilla calmante e hidratante",
        "Hidratación facial y protector solar"
      ],
      beneficios: ["Ayuda a reducir imperfecciones", "Atenúa marcas postacné", "Mejora rojeces", "Equilibra la piel grasa"],
      ideal: ["Piel grasa o mixta con tendencia al acné", "Marcas postacné", "Rojeces y tono desigual"],
      nota: "Los resultados en marcas y brotes son progresivos y pueden requerir varias sesiones. Puede producir enrojecimiento, sensibilidad o descamación temporal según tu piel."
    },
    {
      id: "radiofrecuencia",
      grupo: "tratamientos",
      nombre: "Radiofrecuencia Facial",
      corto: "Radiofrecuencia",
      precio: 35000, normal: null, desde: true,
      destacado: "Promo pack 3 sesiones",
      duracion: "40 a 60 min",
      foto: "img/foto-radiofrecuencia.webp", afiche: "img/afiche-radiofrecuencia.webp",
      gancho: "Reafirma, ilumina y rejuvenece sin agujas ni cirugía. Incluye limpieza facial.",
      tituloVariantes: "Elige tu plan",
      variantes: [
        { id: "1sesion", nombre: "1 sesión", precio: 35000, txt: "Incluye limpieza facial." },
        { id: "pack3", nombre: "Pack 3 sesiones", precio: 60000, normal: 105000, txt: "Ahorras $45.000. Incluye limpieza facial express de regalo." }
      ],
      incluye: [
        "Limpieza facial",
        "Radiofrecuencia facial con energía térmica controlada",
        "Tratamiento cómodo, sin agujas ni cirugía"
      ],
      beneficios: ["Mejora la firmeza y elasticidad", "Atenúa líneas finas de expresión", "Piel más luminosa y revitalizada", "Mejora la apariencia del contorno facial", "Estimula la producción de colágeno"],
      ideal: ["Prevenir los primeros signos de envejecimiento", "Pérdida de firmeza o líneas finas", "Pieles maduras que buscan un cuidado reafirmante"],
      nota: "Los resultados son progresivos y varían según cada piel. Servicio sujeto a evaluación previa y contraindicaciones."
    },
    {
      id: "dermapen",
      grupo: "tratamientos",
      nombre: "Microneedling con Dermapen",
      corto: "Dermapen",
      precio: 39990, normal: 45000,
      duracion: "90 min aprox.",
      foto: "img/foto-dermapen.webp", afiche: "img/afiche-dermapen.webp",
      gancho: "Estimula tu colágeno y elastina para mejorar marcas de acné, líneas finas y firmeza.",
      incluye: [
        "Higienización profesional",
        "Exfoliación según tu piel",
        "Microneedling con Dermapen",
        "Vial o activo personalizado",
        "Mascarilla calmante e hidratante",
        "Alta frecuencia (solo cuando es apropiada)",
        "Crema reparadora y protección solar"
      ],
      beneficios: ["Atenúa líneas finas", "Mejora cicatrices y marcas de acné", "Textura más uniforme", "Estimula colágeno y elastina"],
      ideal: ["Marcas o cicatrices de acné", "Líneas de expresión", "Poros dilatados", "Falta de firmeza"],
      nota: "Se realiza previa evaluación de tu piel. Los resultados son progresivos y naturales."
    }
  ],

  /* ------------------------- TEST DE PIEL ------------------------- */
  test: [
    { id: "negros", txt: "Puntos negros o poros tapados", rec: ["coreana", "limpieza", "hydrafacial"] },
    { id: "opaca", txt: "Piel opaca, sin brillo", rec: ["glow", "hydrafacial"] },
    { id: "acne", txt: "Granitos o exceso de grasa", rec: ["clearskin", "limpieza"] },
    { id: "marcas", txt: "Marcas o cicatrices de acné", rec: ["dermapen", "clearskin"] },
    { id: "lineas", txt: "Líneas finas o falta de firmeza", rec: ["radiofrecuencia", "dermapen", "hydrafacial"] },
    { id: "seca", txt: "Piel deshidratada o tirante", rec: ["hydrafacial", "coreana"] },
    { id: "relax", txt: "Quiero consentirme y relajarme", rec: ["coreana", "hydrafacial"] },
    { id: "mirada", txt: "Quiero una mirada más expresiva", rec: ["rimel", "lifting", "clasicas"] },
    { id: "natural", txt: "Pestañas naturales, sin extensiones", rec: ["lifting"] },
    { id: "volumen", txt: "Pestañas con mucho volumen", rec: ["volumen", "rimel"] }
  ],

  /* ------------------------- CURSOS ------------------------- */
  cursos: [
    {
      id: "c-intensivo",
      area: "Pestañas",
      nombre: "Taller Intensivo de Extensiones de Pestañas",
      corto: "Taller Intensivo Pestañas",
      precio: 95000, normal: 125000, reserva: 30000,
      formato: "1 día intensivo",
      horario: "10:00 a 19:00 aprox. (1 h de colación)",
      foto: "img/foto-c-intensivo.webp", afiche: "img/afiche-c-intensivo.webp",
      gancho: "Aprende técnica clásica pelo a pelo y volumen tecnológico en 1 día, con práctica en modelo real.",
      chips: ["Desde cero", "Práctica en modelo real", "3 meses de asesoría"],
      incluye: [
        "Formación teórica y práctica presencial",
        "Manual y guía de apoyo",
        "Todos los materiales para las prácticas",
        "Práctica en maniquí",
        "Práctica supervisada en modelo real",
        "Orientación sobre proveedores",
        "Coffee break",
        "Certificado de participación",
        "3 meses de asesoría personalizada por WhatsApp"
      ],
      programa: [
        ["10:00 – 11:30", "Introducción, anatomía, bioseguridad y materiales"],
        ["11:30 – 12:30", "Adhesivos, mapping y diseños (Natural, Cat Eye, Dolly, Ardilla)"],
        ["12:30 – 13:30", "Técnica clásica y volumen tecnológico"],
        ["13:30 – 14:30", "Colación"],
        ["14:30 – 15:30", "Demostración y práctica en maniquí"],
        ["15:30 – 18:30", "Práctica supervisada en modelo real"],
        ["18:30 – 19:00", "Mantenimiento, retiro, dudas y certificado"]
      ],
      modelo: true,
      reagenda: "1 cambio de fecha sin costo avisando con 48 h; desde el segundo, $10.000 por cambio.",
      faq: [
        ["¿Necesito experiencia previa?", "No. Está diseñado para aprender desde cero."],
        ["¿Debo comprar materiales?", "No. Los materiales para las prácticas están incluidos."],
        ["¿Puedo atender clientas al terminar?", "El taller te da la base y una primera práctica real. Recomendamos seguir practicando hasta lograr dominio y seguridad; para eso tienes 3 meses de asesoría."]
      ]
    },
    {
      id: "c-formacion",
      area: "Pestañas",
      nombre: "Formación Profesional en Extensiones de Pestañas",
      corto: "Formación Profesional Pestañas",
      precio: 159000, normal: 180000, reserva: 30000,
      destacado: "Más completa",
      formato: "3 encuentros",
      horario: "Fechas y horarios a coordinar contigo",
      foto: "img/foto-c-formacion.webp", afiche: "img/afiche-c-formacion.webp",
      gancho: "La formación completa para trabajar como lashista: 3 encuentros, 2 prácticas en modelos reales y asesoría ilimitada.",
      chips: ["Máx. 2 alumnas", "2 modelos reales", "Asesoría ilimitada"],
      incluye: [
        "Manual de apoyo",
        "Todos los materiales para la práctica",
        "Práctica en maniquí",
        "Dos prácticas completas en modelos reales",
        "Demostraciones profesionales",
        "Evaluación y corrección individualizada",
        "Certificado de formación",
        "Coffee break",
        "Asesoría ilimitada por WhatsApp"
      ],
      programa: [
        ["Encuentro 1", "Teoría completa (anatomía, bioseguridad, materiales, adhesivos, mapping y diseños), técnicas clásica, efecto rímel y volumen tecnológico, demostración y práctica en maniquí."],
        ["Encuentro 2", "Primera práctica completa en modelo real con supervisión personalizada y corrección de errores."],
        ["Encuentro 3", "Segunda práctica en modelo real, mantenimiento y retiro, primeros pasos para trabajar, evaluación final y certificado."]
      ],
      modelo: true,
      reagenda: "1 cambio de fecha sin costo avisando con 48 h; desde el segundo, $10.000 por cambio.",
      faq: [
        ["¿Cuántas alumnas hay por grupo?", "Máximo dos, para que la enseñanza sea realmente personalizada."],
        ["¿Hay práctica con personas reales?", "Sí, dos aplicaciones completas en modelos reales, además del maniquí."],
        ["¿Qué técnicas aprendo?", "Clásica pelo a pelo, efecto rímel y volumen tecnológico, con estudio de la mirada, mapping y diseños personalizados."],
        ["¿Tendré apoyo al terminar?", "Sí, asesoría ilimitada por WhatsApp sobre lo aprendido."]
      ]
    },
    {
      id: "c-lifting",
      area: "Pestañas",
      nombre: "Taller Intensivo Lash Lifting + Laminado de Keratina",
      corto: "Lash Lifting + Laminado",
      precio: 60000, normal: null, reserva: 30000,
      formato: "1 día intensivo",
      horario: "10:00 a 17:00 (1 h de colación)",
      foto: "img/foto-c-lifting.webp", afiche: "img/afiche-c-lifting.webp",
      gancho: "Aprende lifting, ondulación y laminado de keratina para realzar la pestaña natural: un servicio de alta demanda.",
      chips: ["Desde cero", "100% práctico", "Certificado"],
      incluye: [
        "Materiales e insumos profesionales para la práctica",
        "Guía digital de estudio con protocolo paso a paso",
        "Práctica supervisada",
        "Certificado de participación",
        "Coffee break",
        "Orientación sobre productos y materiales"
      ],
      temario: [
        "Qué es el lash lifting y cómo funciona",
        "Diferencias entre lifting y ondulación",
        "Tipos de pestañas e indicaciones",
        "Selección de moldes y bigudíes",
        "Función de cada producto",
        "Tiempos de exposición según grosor",
        "Protocolo profesional paso a paso",
        "Laminado de keratina",
        "Higiene, bioseguridad y contraindicaciones",
        "Cuidados posteriores"
      ],
      reagenda: "Cambio de fecha avisando con 48 h, sujeto a disponibilidad, con costo administrativo de $10.000.",
      saldo: true
    },
    {
      id: "c-limpieza",
      area: "Facial",
      nombre: "Taller de Limpieza Facial Profunda",
      corto: "Taller Limpieza Facial",
      precio: 65000, normal: 85000, reserva: 30000,
      formato: "1 jornada",
      horario: "11:00 a 15:00",
      foto: "img/foto-c-limpieza.webp", afiche: "img/afiche-c-limpieza.webp",
      gancho: "Aprende a realizar limpiezas faciales profesionales y empieza a ofrecer este servicio con seguridad.",
      chips: ["Desde cero", "Práctica en modelo real", "Asesoría ilimitada"],
      incluye: [
        "Insumos profesionales durante la práctica",
        "Guía de estudio y protocolo paso a paso",
        "Práctica supervisada en modelo real",
        "Certificado de participación",
        "Asesoría personalizada ilimitada por WhatsApp",
        "Orientación sobre productos y dónde comprarlos"
      ],
      temario: [
        "Fundamentos de la limpieza facial profesional",
        "Conceptos básicos de cosmetología",
        "Higiene, asepsia y preparación de la piel",
        "Desmaquillado, exfoliación y tonificación",
        "Uso correcto del vaporizador",
        "Extracción y desincrustación de impurezas",
        "Mascarillas según tipo de piel",
        "Aplicación de productos y activos",
        "Aparatología portátil: peeling ultrasónico y máscara LED",
        "Protocolo completo de limpieza facial profunda"
      ],
      reagenda: "Cambio de fecha avisando con 48 h, sujeto a disponibilidad, con costo administrativo de $10.000.",
      saldo: true
    },
    {
      id: "c-dermapen",
      area: "Facial",
      nombre: "Formación Dermapen Microneedling + Radiofrecuencia Facial",
      corto: "Dermapen + Radiofrecuencia",
      precio: 145000, normal: 160000, reserva: 30000,
      formato: "1 día intensivo",
      horario: "10:00 a 17:00 (1 h de colación)",
      foto: "img/foto-c-dermapen.webp", afiche: "img/afiche-c-dermapen.webp",
      gancho: "Dos de los tratamientos más pedidos en estética facial en una sola formación, con 2 modelos reales.",
      chips: ["2 técnicas", "2 modelos reales", "Uso de equipos"],
      incluye: [
        "Todos los insumos profesionales para las prácticas",
        "Uso de equipos de aparatología profesional",
        "Práctica supervisada con 2 modelos reales (una por técnica)",
        "Guía de estudio y protocolos paso a paso",
        "Certificado de participación",
        "Asesoría personalizada posterior por WhatsApp",
        "Orientación sobre viales, equipos y proveedores"
      ],
      programa: [
        ["Módulo 1 · Dermapen", "Qué es el microneedling, anatomía de la piel, indicaciones y contraindicaciones, cartuchos y pines, profundidades por zona, activos y viales, protocolo paso a paso y cuidados posteriores."],
        ["Módulo 2 · Radiofrecuencia", "Cómo funciona, tipos de radiofrecuencia facial, indicaciones y contraindicaciones, parámetros y seguridad, técnicas de aplicación y protocolo paso a paso."]
      ],
      reagenda: "Cambio de fecha avisando con 48 h, sujeto a disponibilidad, con costo administrativo de $10.000.",
      saldo: true
    }
  ]
};
