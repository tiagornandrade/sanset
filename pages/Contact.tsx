
import React, { useState, useEffect } from 'react';

export type LeadType = 'consultoria' | 'mentoria';

interface FormData {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
}

const CONSULTORIA_INTERESTS = [
  'Business Intelligence (BI)',
  'Modern Data Stack',
  'Engenharia de Dados',
  'Data Lake & Lakehouse',
  'Governança de Dados',
  'Arquitetura de Dados',
  'Estruturação de Time de Dados',
  'Outro - Vamos conversar',
];

const MENTORIA_INTERESTS = [
  'Analista de Dados',
  'Engenharia de Dados',
  'Analytics Engineering',
  'BI Developer',
  'Plataforma de Dados',
  'Ainda não sei - Quero conversar',
];

interface ContactProps {
  contactMode?: 'mentoria' | null;
}

const Contact: React.FC<ContactProps> = ({ contactMode = null }) => {
  const [leadType, setLeadType] = useState<LeadType>('consultoria');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    interest: CONSULTORIA_INTERESTS[0],
    message: '',
  });

  useEffect(() => {
    if (contactMode === 'mentoria') {
      setLeadType('mentoria');
      setFormData((prev) => ({
        ...prev,
        interest: MENTORIA_INTERESTS[0],
      }));
    }
  }, [contactMode]);

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (leadType === 'consultoria' && !formData.company.trim()) {
      newErrors.company = 'Empresa é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLeadTypeChange = (type: LeadType) => {
    setLeadType(type);
    setErrors((prev) => ({ ...prev, company: undefined }));
    setFormData((prev) => ({
      ...prev,
      interest: type === 'consultoria' ? CONSULTORIA_INTERESTS[0] : MENTORIA_INTERESTS[0],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/consultancy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: leadType,
          name: formData.name,
          email: formData.email,
          company: leadType === 'consultoria' ? formData.company : (formData.company.trim() || undefined),
          interest: formData.interest,
          message: formData.message || '',
        }),
      });

      const errorBody = response.ok ? null : await response.json().catch(() => ({}));

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitErrorMessage('');
        setFormData({
          name: '',
          email: '',
          company: '',
          interest: leadType === 'consultoria' ? CONSULTORIA_INTERESTS[0] : MENTORIA_INTERESTS[0],
          message: '',
        });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitErrorMessage((errorBody?.error as string) || 'Erro ao enviar formulário');
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitErrorMessage('Erro ao enviar. Tente novamente.');
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isMentoria = leadType === 'mentoria';
  const interests = isMentoria ? MENTORIA_INTERESTS : CONSULTORIA_INTERESTS;

  return (
    <div className="min-h-screen py-24 px-6 technical-grid">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-12">
          <div className="space-y-6">
            <span className="text-xs font-mono font-bold text-primary uppercase tracking-[0.4em]">
              {isMentoria ? 'Interesse em mentoria' : 'Consulta Inicial'}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none text-phosphor">
              Vamos <br /><span className="text-primary italic">conversar.</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-lg leading-relaxed font-mono">
              {isMentoria
                ? 'Conte um pouco sobre você e qual trilha te interessa. Responderemos em até 24h para alinharmos expectativas.'
                : 'Agende uma consulta inicial gratuita. Vamos entender seus desafios de dados e apresentar como nossa consultoria pode estruturar ou evoluir sua plataforma de dados.'}
            </p>
          </div>

          <div className="space-y-6 pt-6">
            <a href="mailto:contato@sanset.io" className="flex items-center gap-4 text-gray-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-primary">mail</span>
              <span className="text-sm font-mono">contato@sanset.io</span>
            </a>
            <div className="flex items-center gap-4 text-gray-400">
              <span className="material-symbols-outlined text-primary">location_on</span>
              <span className="text-sm font-mono">Salvador | Atendimento Remoto</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-10 md:p-14 border border-white/10 relative rounded-[2rem]">
          <div className="absolute top-0 right-0 p-4 font-mono text-xs text-gray-700 tracking-widest">
            {isMentoria ? 'MENTORIA_FORM_V1' : 'CONSULTANCY_FORM_V1'}
          </div>

          <div className="mb-8 flex rounded-lg border border-white/10 p-1 bg-white/[0.02]">
            <button
              type="button"
              onClick={() => handleLeadTypeChange('consultoria')}
              className={`flex-1 py-3 px-4 text-sm font-mono uppercase tracking-wider rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark ${
                leadType === 'consultoria'
                  ? 'bg-white/10 text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
              aria-pressed={leadType === 'consultoria'}
              aria-label="Sou empresa, quero consultoria"
            >
              Consultoria (empresa)
            </button>
            <button
              type="button"
              onClick={() => handleLeadTypeChange('mentoria')}
              className={`flex-1 py-3 px-4 text-sm font-mono uppercase tracking-wider rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark ${
                leadType === 'mentoria'
                  ? 'bg-white/10 text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
              aria-pressed={leadType === 'mentoria'}
              aria-label="Sou pessoa física, quero mentoria"
            >
              Mentoria (pessoa física)
            </button>
          </div>

          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-primary/20 border border-primary/50 rounded-lg flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">check_circle</span>
              <p className="text-primary text-sm font-mono">Mensagem enviada com sucesso! Entraremos em contato em breve.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-3">
              <span className="material-symbols-outlined text-red-500">error</span>
              <p className="text-red-500 text-sm font-mono">{submitErrorMessage || 'Erro ao enviar. Tente novamente ou envie um email direto.'}</p>
            </div>
          )}

          <form className="space-y-10" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <label htmlFor="name" className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Nome <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b py-3 text-white focus:outline-none focus:border-primary transition-all font-mono text-base ${
                    errors.name ? 'border-red-500/50' : 'border-white/10'
                  }`}
                  placeholder="Seu nome"
                  type="text"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-red-500 text-xs font-mono mt-1" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <label htmlFor="email" className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b py-3 text-white focus:outline-none focus:border-primary transition-all font-mono text-base ${
                    errors.email ? 'border-red-500/50' : 'border-white/10'
                  }`}
                  placeholder="seu@email.com"
                  type="email"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-xs font-mono mt-1" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="company" className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                {isMentoria ? 'Onde você atua (opcional)' : <>Empresa <span className="text-red-500">*</span></>}
              </label>
              <input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`w-full bg-transparent border-b py-3 text-white focus:outline-none focus:border-primary transition-all font-mono text-base ${
                  errors.company ? 'border-red-500/50' : 'border-white/10'
                }`}
                placeholder={isMentoria ? 'Ex.: empresa atual, área, ou em transição' : 'Nome da sua startup'}
                type="text"
                required={!isMentoria}
                aria-required={!isMentoria}
                aria-invalid={!!errors.company}
                aria-describedby={errors.company ? 'company-error' : undefined}
              />
              {errors.company && (
                <p id="company-error" className="text-red-500 text-xs font-mono mt-1" role="alert">
                  {errors.company}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="interest" className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                {isMentoria ? 'Trilha de interesse' : 'Área de Interesse'}
              </label>
              <select
                id="interest"
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/10 py-3 text-gray-500 focus:outline-none focus:border-primary transition-all font-mono text-base appearance-none"
                aria-label={isMentoria ? 'Trilha de interesse' : 'Área de interesse'}
              >
                {interests.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="message" className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Mensagem (Opcional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-primary transition-all font-mono text-base resize-none"
                placeholder={isMentoria ? 'Conte um pouco sobre sua trajetória e objetivo...' : 'Conte-nos sobre seus desafios atuais...'}
                rows={3}
                aria-label="Mensagem opcional"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-6 bg-primary text-white font-extrabold uppercase tracking-[0.3em] text-sm transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_20px_rgba(48,209,88,0.1)] flex items-center justify-center gap-4"
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                  Enviando...
                </>
              ) : (
                <>
                  {isMentoria ? 'Quero saber mais sobre a mentoria' : 'Agendar Consulta Inicial'}
                  <span className="material-symbols-outlined text-sm">{isMentoria ? 'school' : 'calendar_month'}</span>
                </>
              )}
            </button>

            <p className="text-xs text-center text-gray-600 uppercase tracking-widest leading-loose">
              {isMentoria ? 'Resposta em até 24h. Sem compromisso.' : 'Consulta inicial gratuita. Entraremos em contato em até 24h.'}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
