
import React, { useState, useEffect, useMemo } from 'react';

interface ResearchProps {
  onNavigate?: (page: any) => void;
}

type Phase = 'intro' | 'survey' | 'done';

interface SurveyOption {
  value: string;
  label: string;
  icon: string;
}

interface SurveyQuestion {
  id: string;
  stage: number;
  question: string;
  helper?: string;
  options: SurveyOption[];
}

const STAGES = [
  { id: 1, title: 'Perfil', subtitle: 'Quem responde', icon: 'group' },
  { id: 2, title: 'Rotina', subtitle: 'Como trabalha', icon: 'schedule' },
  { id: 3, title: 'Dores', subtitle: 'Onde dói', icon: 'crisis_alert' },
  { id: 4, title: 'IA', subtitle: 'Onde ajuda', icon: 'auto_awesome' },
];

const QUESTIONS: SurveyQuestion[] = [
  {
    id: 'area',
    stage: 1,
    question: 'Em qual área você atua hoje?',
    helper: 'O objetivo aqui não é vender — é entender quem está respondendo.',
    options: [
      { value: 'financas', label: 'Finanças (FP&A, Controladoria, Tesouraria)', icon: 'account_balance' },
      { value: 'tecnologia', label: 'Tecnologia / Engenharia', icon: 'code' },
      { value: 'comercial', label: 'Comercial / Vendas / Marketing', icon: 'storefront' },
      { value: 'operacoes', label: 'Operações / Supply / Logística', icon: 'settings' },
      { value: 'rh', label: 'Recursos Humanos', icon: 'diversity_3' },
      { value: 'juridico', label: 'Jurídico / Compliance', icon: 'gavel' },
      { value: 'outra', label: 'Outra área', icon: 'more_horiz' },
    ],
  },
  {
    id: 'nivel',
    stage: 1,
    question: 'Qual é o seu nível de atuação?',
    options: [
      { value: 'analista', label: 'Analista', icon: 'badge' },
      { value: 'especialista', label: 'Especialista', icon: 'workspace_premium' },
      { value: 'coordenador', label: 'Coordenador / Gerente', icon: 'supervisor_account' },
      { value: 'diretor', label: 'Diretor / C-Level', icon: 'verified_user' },
    ],
  },
  {
    id: 'rotina',
    stage: 2,
    question: 'O que mais ocupa seu tempo durante a semana?',
    helper: 'Começamos a identificar perfis intensivos em análise.',
    options: [
      { value: 'consolidar', label: 'Consolidar informações', icon: 'merge' },
      { value: 'analisar', label: 'Analisar dados', icon: 'analytics' },
      { value: 'apresentacoes', label: 'Criar apresentações', icon: 'slideshow' },
      { value: 'processos', label: 'Executar processos operacionais', icon: 'sync' },
    ],
  },
  {
    id: 'sistemas',
    stage: 2,
    question: 'Quantos sistemas diferentes você utiliza no trabalho?',
    helper: 'Um dos maiores desafios para IA nas empresas é a fragmentação de dados e sistemas.',
    options: [
      { value: '1-3', label: '1 a 3 sistemas', icon: 'looks_3' },
      { value: '4-6', label: '4 a 6 sistemas', icon: 'looks_6' },
      { value: '7-10', label: '7 a 10 sistemas', icon: 'filter_10' },
      { value: '10+', label: 'Mais de 10 sistemas', icon: 'all_inclusive' },
    ],
  },
  {
    id: 'atraso',
    stage: 3,
    question: 'O que mais atrasa sua tomada de decisão?',
    options: [
      { value: 'dados-espalhados', label: 'Dados espalhados', icon: 'scatter_plot' },
      { value: 'trabalho-manual', label: 'Trabalho manual', icon: 'pan_tool' },
      { value: 'falta-contexto', label: 'Falta de contexto', icon: 'help' },
      { value: 'aprovacoes', label: 'Aprovações internas', icon: 'approval' },
    ],
  },
  {
    id: 'eliminar',
    stage: 3,
    question: 'Qual dessas tarefas você gostaria de eliminar da sua rotina?',
    options: [
      { value: 'buscar', label: 'Buscar informações', icon: 'search' },
      { value: 'consolidar-planilhas', label: 'Consolidar planilhas', icon: 'table_view' },
      { value: 'relatorios', label: 'Criar relatórios', icon: 'description' },
      { value: 'explicar', label: 'Explicar resultados', icon: 'forum' },
    ],
  },
  {
    id: 'agente',
    stage: 4,
    question: 'Se pudesse ter um agente de IA em apenas uma atividade, qual escolheria?',
    options: [
      { value: 'pesquisar', label: 'Pesquisar informações', icon: 'travel_explore' },
      { value: 'gerar-analises', label: 'Gerar análises', icon: 'insights' },
      { value: 'automatizar', label: 'Automatizar processos', icon: 'precision_manufacturing' },
      { value: 'documentos', label: 'Criar documentos', icon: 'edit_document' },
    ],
  },
  {
    id: 'confianca',
    stage: 4,
    question: 'Em qual atividade você confiaria primeiro em uma IA?',
    options: [
      { value: 'resumir', label: 'Resumir informações', icon: 'summarize' },
      { value: 'padroes', label: 'Identificar padrões', icon: 'pattern' },
      { value: 'previsoes', label: 'Fazer previsões', icon: 'trending_up' },
      { value: 'recomendar', label: 'Recomendar decisões', icon: 'lightbulb' },
    ],
  },
  {
    id: 'obstaculo',
    stage: 4,
    question: 'O maior obstáculo para usar IA no seu trabalho hoje é:',
    options: [
      { value: 'seguranca', label: 'Segurança dos dados', icon: 'shield' },
      { value: 'qualidade', label: 'Qualidade dos dados', icon: 'verified' },
      { value: 'expertise', label: 'Falta de expertise interna', icon: 'school' },
      { value: 'tempo', label: 'Falta de tempo para implementar', icon: 'hourglass_empty' },
    ],
  },
];

const RESEARCH_PILLARS = [
  { icon: 'group', title: 'Quem usa IA', desc: 'Quais áreas e níveis já adotam inteligência artificial no dia a dia.' },
  { icon: 'bolt', title: 'Onde gera valor', desc: 'Em quais atividades a IA cria mais valor percebido e impacta resultados.' },
  { icon: 'schedule', title: 'Tempo perdido', desc: 'Quais processos continuam consumindo tempo manual e repetitivo.' },
  { icon: 'block', title: 'Barreiras reais', desc: 'Quais obstáculos impedem a adoção e a escala da IA nas empresas.' },
];

const Research: React.FC<ResearchProps> = () => {
  const [phase, setPhase] = useState<Phase>('intro');
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [openAnswer, setOpenAnswer] = useState('');
  const [email, setEmail] = useState('');
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const totalSteps = QUESTIONS.length + 1;
  const currentQuestion = stepIndex < QUESTIONS.length ? QUESTIONS[stepIndex] : null;

  const progress = useMemo(() => {
    return Math.min(((stepIndex + (phase === 'done' ? 1 : 0)) / totalSteps) * 100, 100);
  }, [stepIndex, phase, totalSteps]);

  const selectAnswer = (questionId: string, value: string) => {
    setAnswers((prev: any) => ({ ...prev, [questionId]: value }));
    setTimeout(() => goNext(), 220);
  };

  const goNext = () => {
    setDirection('forward');
    if (stepIndex < QUESTIONS.length) {
      setStepIndex((i) => i + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const resp = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers,
          openAnswer: openAnswer.trim(),
          email: email.trim(),
        }),
      });
      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data.error || 'Falha ao enviar respostas');
      }
      setPhase('done');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Erro ao enviar. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  const goBack = () => {
    setDirection('back');
    if (stepIndex > 0) {
      setStepIndex((i: number) => i - 1);
    } else {
      setPhase('intro');
    }
  };

  const startSurvey = () => {
    setPhase('survey');
    setStepIndex(0);
    setAnswers({});
    setOpenAnswer('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (phase === 'survey') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [stepIndex, phase]);

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-12">
      {/* ===================== INTRO ===================== */}
      {phase === 'intro' && (
        <>
          <section className="relative pt-24 pb-32 px-6 glow-aura neural-grid overflow-hidden">
            <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-10 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                <span className="material-symbols-outlined text-primary text-sm">insights</span>
                <span className="text-xs font-mono font-bold tracking-[0.2em] text-gray-400 uppercase">Pesquisa de Mercado · 2026</span>
              </div>

              <h1 className="text-white text-4xl md:text-7xl font-extrabold tracking-tighter leading-[0.95] max-w-4xl text-phosphor">
                Panorama da IA no <br />
                <span className="text-primary italic">Trabalho Corporativo</span>
              </h1>

              <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                Não estamos validando um produto. Estamos validando um mercado —
                descobrindo onde a inteligência artificial gera mais valor percebido
                no dia a dia dos profissionais. Sua resposta faz parte de uma pesquisa pública.
              </p>

              <button
                onClick={startSurvey}
                className="bg-primary text-white h-14 px-10 text-xs font-extrabold uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark"
                aria-label="Participar da pesquisa"
              >
                Participar da pesquisa
                <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
              </button>

              <p className="text-gray-600 text-xs font-mono uppercase tracking-[0.2em]">
                {QUESTIONS.length + 1} perguntas · ~3 minutos · 100% anônimo
              </p>
            </div>
          </section>

          {/* Pilares */}
          <section className="py-24 px-6 border-b border-white/5">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tighter text-phosphor">
                  O que queremos <span className="text-primary italic">descobrir.</span>
                </h2>
                <p className="text-gray-500 text-base max-w-2xl mx-auto">
                  Em vez de perguntar &ldquo;você compraria?&rdquo;, validamos três coisas:
                  existe o problema? ele é frequente? vale a pena resolvê-lo?
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {RESEARCH_PILLARS.map((p, i) => (
                  <div
                    key={p.title}
                    className="glass-card rounded-2xl p-6 border border-white/5 hover:border-primary/20 transition-all"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="material-symbols-outlined text-primary text-2xl">{p.icon}</span>
                      <span className="text-xs font-mono text-gray-600">0{i + 1}</span>
                    </div>
                    <h3 className="text-white font-bold text-base uppercase font-mono tracking-wider mb-2">{p.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Metodologia em camadas */}
          <section className="py-24 px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tighter text-phosphor">
                  Pesquisa em <span className="text-primary italic">camadas.</span>
                </h2>
                <p className="text-gray-500 text-base max-w-2xl mx-auto">
                  Reduzimos o risco de escolher um nicho cedo demais e aumentamos a chance
                  de encontrar um problema relevante, recorrente e comum a vários segmentos.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { n: '01', t: 'Quem é o público?', d: 'Perfil profissional e setor de atuação.', icon: 'group' },
                  { n: '02', t: 'Como ele trabalha?', d: 'Rotina, ferramentas e número de sistemas.', icon: 'schedule' },
                  { n: '03', t: 'Onde está a dor?', d: 'Tempo, custo e frequência do problema.', icon: 'crisis_alert' },
                  { n: '04', t: 'Onde a IA ajuda?', d: 'Confiança, obstáculos e oportunidades.', icon: 'auto_awesome' },
                  { n: '05', t: 'A pergunta aberta', d: 'Qual seria a primeira tarefa que você delegaria a um especialista em IA?', icon: 'help' },
                ].map((s) => (
                  <div
                    key={s.n}
                    className="glass-card rounded-2xl p-6 border border-white/5 flex items-center gap-6 hover:border-primary/20 transition-all group"
                  >
                    <span className="text-3xl md:text-4xl font-extrabold text-primary/30 font-mono tracking-tighter w-16 shrink-0">{s.n}</span>
                    <span className="material-symbols-outlined text-primary text-2xl hidden md:block group-hover:scale-110 transition-transform">{s.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-base md:text-lg uppercase font-mono tracking-wider">{s.t}</h3>
                      <p className="text-gray-500 text-sm">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-16">
                <button
                  onClick={startSurvey}
                  className="bg-primary text-white h-14 px-10 text-xs font-extrabold uppercase tracking-widest hover:scale-[1.02] transition-all inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark"
                  aria-label="Começar a pesquisa"
                >
                  Começar agora <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ===================== SURVEY ===================== */}
      {phase === 'survey' && (
        <section className="relative min-h-[80vh] py-12 px-6 neural-grid">
          <div className="max-w-3xl mx-auto relative z-10">
            {/* Top bar: progress + counter */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">insights</span>
                <span className="text-xs font-mono font-bold tracking-[0.2em] text-gray-400 uppercase">
                  {stepIndex < QUESTIONS.length ? `Etapa ${currentQuestion?.stage}` : 'Pergunta aberta'}
                </span>
              </div>
              <span className="text-xs font-mono text-gray-500">
                {Math.min(stepIndex + 1, totalSteps)} / {totalSteps}
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Stage dots */}
            <div className="flex items-center justify-between mb-12">
              {STAGES.map((stage) => {
                const reached = stepIndex < QUESTIONS.length && (currentQuestion?.stage ?? 0) >= stage.id;
                return (
                  <div key={stage.id} className="flex flex-col items-center gap-1 flex-1">
                    <div
                      className={`size-2 rounded-full transition-all duration-300 ${
                        reached ? 'bg-primary scale-125' : 'bg-white/10'
                      }`}
                    />
                    <span className={`text-[10px] font-mono uppercase tracking-wider hidden md:block ${
                      reached ? 'text-primary' : 'text-gray-600'
                    }`}>
                      {stage.title}
                    </span>
                  </div>
                );
              })}
              <div className="flex flex-col items-center gap-1 flex-1">
                <div className={`size-2 rounded-full transition-all duration-300 ${
                  stepIndex >= QUESTIONS.length ? 'bg-primary scale-125' : 'bg-white/10'
                }`} />
                <span className={`text-[10px] font-mono uppercase tracking-wider hidden md:block ${
                  stepIndex >= QUESTIONS.length ? 'text-primary' : 'text-gray-600'
                }`}>
                  Aberta
                </span>
              </div>
            </div>

            {/* Question card */}
            <div
              key={stepIndex}
              className={`transition-all duration-300 ${
                direction === 'forward' ? 'animate-survey-in-fwd' : 'animate-survey-in-back'
              }`}
            >
              {currentQuestion ? (
                <div className="space-y-8">
                  <div className="space-y-3">
                    <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tighter leading-tight text-phosphor">
                      {currentQuestion.question}
                    </h2>
                    {currentQuestion.helper && (
                      <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-xl">
                        {currentQuestion.helper}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentQuestion.options.map((opt) => {
                      const selected = answers[currentQuestion.id] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => selectAnswer(currentQuestion.id, opt.value)}
                          className={`flex items-center gap-4 p-5 rounded-2xl border text-left transition-all group focus:outline-none focus:ring-2 focus:ring-primary ${
                            selected
                              ? 'bg-primary/15 border-primary/50'
                              : 'glass-card border-white/5 hover:border-primary/30 hover:scale-[1.01]'
                          }`}
                          aria-pressed={selected}
                          aria-label={opt.label}
                        >
                          <span className={`material-symbols-outlined text-xl transition-colors ${
                            selected ? 'text-primary' : 'text-gray-500 group-hover:text-primary'
                          }`}>
                            {opt.icon}
                          </span>
                          <span className={`text-sm md:text-base font-medium ${
                            selected ? 'text-white' : 'text-gray-300'
                          }`}>
                            {opt.label}
                          </span>
                          {selected && (
                            <span className="material-symbols-outlined text-primary ml-auto">check_circle</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Pergunta aberta */
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                    <span className="material-symbols-outlined text-primary text-sm">auto_awesome</span>
                    <span className="text-xs font-mono font-bold tracking-[0.2em] text-primary uppercase">
                      A pergunta que mais vale
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tighter leading-tight text-phosphor">
                    Imagine que você tivesse um especialista em IA trabalhando
                    exclusivamente para você.
                  </h2>
                  <p className="text-2xl md:text-3xl font-extrabold text-primary italic tracking-tighter">
                    Qual seria a primeira tarefa que delegaria?
                  </p>
                  <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-xl">
                    É aqui que surgem os insights mais valiosos. Esta resposta vale mais do que
                    dez enquetes — é nela que aparecem as reais oportunidades.
                  </p>

                  <textarea
                    value={openAnswer}
                    onChange={(e) => setOpenAnswer(e.target.value)}
                    rows={5}
                    placeholder="Ex: Consolidar dados do ERP; explicar por que a margem caiu; ler contratos; preparar material para a diretoria..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white text-base placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/30 transition-all resize-none font-medium leading-relaxed"
                    aria-label="Primeira tarefa que delegaria a um especialista em IA"
                  />

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
                    <div className="flex-1">
                      <label htmlFor="research-email" className="block text-xs font-mono uppercase tracking-[0.2em] text-gray-500 mb-2">
                        Quer receber os resultados? (opcional)
                      </label>
                      <input
                        id="research-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/30 transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            {submitError && (
              <div className="mt-8 flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                <span className="material-symbols-outlined text-red-400 text-lg shrink-0">error</span>
                <div>
                  <p className="text-sm text-red-300 font-medium">{submitError}</p>
                  <p className="text-xs text-red-400/70 mt-1">Verifique a conexão e tente novamente.</p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mt-8">
              <button
                onClick={goBack}
                disabled={submitting}
                className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Voltar"
              >
                <span className="material-symbols-outlined text-base">arrow_back</span>
                Voltar
              </button>

              {(!currentQuestion) ? (
                <button
                  onClick={goNext}
                  disabled={submitting}
                  className="bg-primary text-white h-12 px-8 text-xs font-extrabold uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark"
                  aria-label="Finalizar pesquisa"
                >
                  {submitting ? (
                    <>
                      <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar respostas
                      <span className="material-symbols-outlined text-sm">send</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={goNext}
                  disabled={!answers[currentQuestion.id]}
                  className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                  aria-label="Pular pergunta"
                >
                  Pular
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ===================== DONE ===================== */}
      {phase === 'done' && (
        <section className="relative pt-32 pb-32 px-6 glow-aura neural-grid overflow-hidden min-h-[80vh] flex items-center">
          <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-8 relative z-10">
            <div className="size-20 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-4xl">check_circle</span>
            </div>

            <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-tighter leading-[0.95] text-phosphor">
              Obrigado pela <span className="text-primary italic">contribuição.</span>
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
              Você respondeu a {answeredCount} de {QUESTIONS.length} perguntas fechadas
              {openAnswer.trim().length > 0 ? ' e à pergunta aberta' : ''}.
              Sua participação ajuda a mapear onde a IA gera mais valor no trabalho corporativo.
            </p>

            {email.trim().length > 0 && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                <span className="material-symbols-outlined text-primary text-sm">mark_email_read</span>
                <span className="text-xs font-mono text-gray-400">
                  Enviaremos os resultados para {email}
                </span>
              </div>
            )}

            <div className="glass-card rounded-2xl border border-white/5 p-6 w-full text-left space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-gray-400 mb-2">
                Sua resposta aberta
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed italic">
                {openAnswer.trim().length > 0
                  ? `"${openAnswer.trim()}"`
                  : 'Você pulou a pergunta aberta.'}
              </p>
            </div>

            <button
              onClick={startSurvey}
              className="bg-white/5 border border-white/10 text-white h-12 px-8 text-xs font-extrabold uppercase tracking-widest hover:bg-white/10 transition-all inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark"
              aria-label="Responder novamente"
            >
              <span className="material-symbols-outlined text-sm">refresh</span>
              Responder novamente
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Research;
