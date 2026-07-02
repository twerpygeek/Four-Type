export type LocaleCode = 'zh-CN' | 'es'
export type LocalizedPageKey = 'home' | 'temperament-test' | 'four-temperaments-test' | 'quiz'

export const localizedLocales: Record<LocaleCode, { label: string; nativeLabel: string; pathPrefix: string }> = {
  'zh-CN': { label: 'Chinese', nativeLabel: '中文', pathPrefix: '/zh-CN' },
  es: { label: 'Spanish', nativeLabel: 'Español', pathPrefix: '/es' },
}

export const localizedPagePaths: Record<LocalizedPageKey, string> = {
  home: '',
  'temperament-test': '/temperament-test',
  'four-temperaments-test': '/four-temperaments-test',
  quiz: '/quiz',
}

export function localizedPath(locale: LocaleCode, page: LocalizedPageKey) {
  return `${localizedLocales[locale].pathPrefix}${localizedPagePaths[page]}`
}

export const localizedPages: Record<LocaleCode, Record<LocalizedPageKey, {
  title: string
  description: string
  eyebrow: string
  cta: string
  ctaHref: string
  sections: { title: string; body: string[] }[]
  cards: { title: string; body: string }[]
  faq: { question: string; answer: string }[]
}>> = {
  'zh-CN': {
    home: {
      title: 'FourType 免费气质测试',
      description: '用 FourType 免费气质测试了解你更接近胆汁质、多血质、抑郁质、黏液质，或混合型气质。',
      eyebrow: '免费四气质测试',
      cta: '开始免费测试',
      ctaHref: '/quiz',
      sections: [
        {
          title: '用中文了解你的气质模式',
          body: [
            'FourType 帮你比较四种经典气质：胆汁质、多血质、抑郁质、黏液质。测试关注真实行为、压力反应、沟通方式和关系模式。',
            '现在中文入口、题目流程和核心结果摘要都已经本地化，你可以直接用中文完成测试。',
          ],
        },
      ],
      cards: [
        { title: '胆汁质', body: '目标感强、行动快、直接、喜欢挑战和掌控。' },
        { title: '多血质', body: '外向、热情、善于连接他人，容易被新鲜感激发。' },
        { title: '抑郁质', body: '重视深度、意义、细节和质量，思考更谨慎。' },
        { title: '黏液质', body: '稳定、温和、重视和平、信任和长期关系。' },
      ],
      faq: [
        { question: 'FourType 有中文测试吗？', answer: '有。中文入口、40 题测试流程和核心结果摘要已经加入。' },
        { question: '这个气质测试免费吗？', answer: '是的，核心 FourType 气质测试可以免费开始。' },
      ],
    },
    'temperament-test': {
      title: '免费气质测试：找到你的胆汁质、多血质、抑郁质或黏液质模式',
      description: '参加免费的 FourType 气质测试，比较胆汁质、多血质、抑郁质和黏液质，并理解你的主要模式和混合倾向。',
      eyebrow: '中文气质测试指南',
      cta: '开始免费测试',
      ctaHref: '/quiz',
      sections: [
        {
          title: '气质测试测量什么？',
          body: [
            '气质测试不是医学诊断，而是帮助你观察自己在压力、目标、情绪和人际关系中的默认反应模式。',
            'FourType 会比较四种气质的得分，并帮助你理解主要气质、分数分布和可能的副气质方向。',
          ],
        },
        {
          title: '如何更准确地回答？',
          body: [
            '请按照你平时反复出现的行为作答，而不是理想中的自己，也不是某一次特殊情境里的自己。',
            '如果两个最高分很接近，结果往往更像混合型，而不是单一标签。',
          ],
        },
      ],
      cards: [
        { title: '40 个问题', body: '围绕行为、压力反应、沟通、动力和恢复方式。' },
        { title: '四气质分数', body: '比较胆汁质、多血质、抑郁质和黏液质的强弱。' },
        { title: '混合型方向', body: '用最高两项得分理解更细的气质组合。' },
        { title: '免费开始', body: '无需先阅读复杂理论，也可以直接开始测试。' },
      ],
      faq: [
        { question: '气质测试和人格测试一样吗？', answer: '气质测试更关注压力下的第一反应、沟通节奏、能量来源和关系模式。' },
        { question: '测试需要多久？', answer: 'FourType 测试有 40 个问题，通常 10 分钟以内可以完成。' },
      ],
    },
    'four-temperaments-test': {
      title: '四气质测试：胆汁质、多血质、抑郁质、黏液质',
      description: '了解四气质模型，并用 FourType 免费测试比较你的胆汁质、多血质、抑郁质和黏液质倾向。',
      eyebrow: '四气质测试',
      cta: '参加四气质测试',
      ctaHref: '/quiz',
      sections: [
        {
          title: '四种气质分别代表什么？',
          body: [
            '胆汁质倾向行动和掌控，多血质倾向表达和连接，抑郁质倾向意义和质量，黏液质倾向和平和稳定。',
            '大多数人不是纯粹一种气质，因此 FourType 也关注第二高分带来的混合型差异。',
          ],
        },
      ],
      cards: [
        { title: '胆汁质', body: '行动、目标、挑战。' },
        { title: '多血质', body: '表达、社交、热情。' },
        { title: '抑郁质', body: '深度、分析、标准。' },
        { title: '黏液质', body: '平和、稳定、忠诚。' },
      ],
      faq: [
        { question: '四气质测试免费吗？', answer: 'FourType 的核心测试可以免费开始，并显示主要模式和分数分布。' },
        { question: '我可以是两种气质的混合吗？', answer: '可以。很多人的主要气质和副气质都很明显。' },
      ],
    },
    quiz: {
      title: '开始 FourType 免费气质测试',
      description: '开始 40 题 FourType 气质测试，了解你的四气质分数和混合型方向。',
      eyebrow: '开始测试',
      cta: '开始中文测试',
      ctaHref: '/quiz',
      sections: [
        {
          title: '测试前你需要知道',
          body: [
            '请按照你平时的行为作答，特别是普通压力下的反应。不要选择听起来最理想的答案。',
            '中文题目和核心结果摘要已经加入。请按照第一直觉选择最自然的答案。',
          ],
        },
      ],
      cards: [
        { title: '免费', body: '核心测试免费开始。' },
        { title: '40 题', body: '快速比较四种气质。' },
        { title: '分数分布', body: '不只给单一标签。' },
        { title: '混合型', body: '关注最高两项分数。' },
      ],
      faq: [
        { question: '测试题目现在是中文吗？', answer: '是的。中文版本包含 40 题测试流程和主要结果摘要。' },
      ],
    },
  },
  es: {
    home: {
      title: 'FourType Test de Temperamento Gratis',
      description: 'Descubre si tu patrón principal es Colérico, Sanguíneo, Melancólico, Flemático o una mezcla de temperamentos.',
      eyebrow: 'Test gratis de los cuatro temperamentos',
      cta: 'Empezar el test gratis',
      ctaHref: '/quiz',
      sections: [
        {
          title: 'Entiende tu patrón de temperamento',
          body: [
            'FourType compara los cuatro temperamentos clásicos: Colérico, Sanguíneo, Melancólico y Flemático. El objetivo es observar conducta real, respuesta al estrés, comunicación y relaciones.',
            'El flujo de preguntas y el resumen principal de resultados ya están localizados en español para que puedas completar el test directamente.',
          ],
        },
      ],
      cards: [
        { title: 'Colérico', body: 'Directo, decidido, orientado a metas y desafíos.' },
        { title: 'Sanguíneo', body: 'Expresivo, social, optimista y conectado con las personas.' },
        { title: 'Melancólico', body: 'Analítico, profundo, cuidadoso y orientado a la calidad.' },
        { title: 'Flemático', body: 'Calmo, estable, leal y orientado a la paz.' },
      ],
      faq: [
        { question: '¿FourType está disponible en español?', answer: 'Sí. La entrada, las 40 preguntas y el resumen principal de resultados ya están en español.' },
        { question: '¿El test de temperamento es gratis?', answer: 'Sí. El test principal de FourType se puede empezar gratis.' },
      ],
    },
    'temperament-test': {
      title: 'Test de Temperamento Gratis: Colérico, Sanguíneo, Melancólico o Flemático',
      description: 'Haz un test de temperamento gratis para comparar patrones Colérico, Sanguíneo, Melancólico y Flemático con orientación de subtipo.',
      eyebrow: 'Guía en español',
      cta: 'Empezar el test gratis',
      ctaHref: '/quiz',
      sections: [
        {
          title: 'Qué mide un test de temperamento',
          body: [
            'Un test de temperamento no es un diagnóstico médico. Es una herramienta para observar cómo respondes ante presión, metas, emociones y relaciones.',
            'FourType compara tus respuestas entre los cuatro temperamentos y muestra patrón principal, distribución de puntuaciones y posible subtipo.',
          ],
        },
        {
          title: 'Cómo responder con más precisión',
          body: [
            'Responde según tu conducta habitual, especialmente bajo presión normal. No respondas como tu yo ideal ni como una versión temporal de ti.',
            'Si tus dos puntuaciones más altas están cerca, probablemente tu resultado sea una mezcla de temperamentos.',
          ],
        },
      ],
      cards: [
        { title: '40 preguntas', body: 'Conducta, estrés, comunicación, motivación y recuperación.' },
        { title: 'Cuatro puntuaciones', body: 'Compara Colérico, Sanguíneo, Melancólico y Flemático.' },
        { title: 'Subtipo', body: 'Interpreta la mezcla de tus dos patrones más fuertes.' },
        { title: 'Gratis', body: 'Puedes empezar sin pago inicial.' },
      ],
      faq: [
        { question: '¿Es igual a un test de personalidad?', answer: 'Es más específico: observa tu primera reacción bajo presión, tu energía social, conflicto y ritmo de trabajo.' },
        { question: '¿Cuánto tarda?', answer: 'El test de FourType tiene 40 preguntas y suele tomar menos de 10 minutos.' },
      ],
    },
    'four-temperaments-test': {
      title: 'Test de los Cuatro Temperamentos: Colérico, Sanguíneo, Melancólico, Flemático',
      description: 'Compara los cuatro temperamentos clásicos y descubre tu patrón principal con FourType.',
      eyebrow: 'Cuatro temperamentos',
      cta: 'Hacer el test',
      ctaHref: '/quiz',
      sections: [
        {
          title: 'Los cuatro temperamentos',
          body: [
            'Colérico se orienta a acción y control, Sanguíneo a expresión y conexión, Melancólico a significado y calidad, Flemático a paz y estabilidad.',
            'Muchas personas no son un tipo puro, por eso FourType también interpreta la segunda puntuación más fuerte.',
          ],
        },
      ],
      cards: [
        { title: 'Colérico', body: 'Acción, meta, desafío.' },
        { title: 'Sanguíneo', body: 'Expresión, energía social, entusiasmo.' },
        { title: 'Melancólico', body: 'Profundidad, análisis, estándares.' },
        { title: 'Flemático', body: 'Paz, estabilidad, lealtad.' },
      ],
      faq: [
        { question: '¿El test de los cuatro temperamentos es gratis?', answer: 'Sí, puedes empezar el test principal gratis.' },
        { question: '¿Puedo ser mezcla de dos temperamentos?', answer: 'Sí. Muchas personas tienen un temperamento principal y otro secundario.' },
      ],
    },
    quiz: {
      title: 'Empezar el test de temperamento FourType',
      description: 'Empieza el test de 40 preguntas para descubrir tu distribución entre los cuatro temperamentos.',
      eyebrow: 'Empezar test',
      cta: 'Empezar el test en español',
      ctaHref: '/quiz',
      sections: [
        {
          title: 'Antes de empezar',
          body: [
            'Responde según tu conducta normal, especialmente bajo presión. Evita elegir la respuesta que suena más ideal.',
            'Las preguntas y el resumen principal de resultados ya están en español. Elige la respuesta que más se parezca a tu conducta natural.',
          ],
        },
      ],
      cards: [
        { title: 'Gratis', body: 'Puedes empezar gratis.' },
        { title: '40 preguntas', body: 'Compara los cuatro temperamentos.' },
        { title: 'Puntuación', body: 'Muestra distribución, no solo etiqueta.' },
        { title: 'Subtipo', body: 'Usa tus dos puntuaciones más altas.' },
      ],
      faq: [
        { question: '¿Las preguntas ya están en español?', answer: 'Sí. La versión en español incluye las 40 preguntas y el resumen principal del resultado.' },
      ],
    },
  },
}
