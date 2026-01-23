
import React, { useState } from 'react';

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

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    interest: 'Automação de Leads e Funil',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
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

    if (!formData.company.trim()) {
      newErrors.company = 'Empresa é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
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
      // Setup: Create account at https://formspree.io and replace YOUR_FORM_ID with your form ID
      // See docs/development/FORM_SETUP.md for detailed instructions
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          interest: formData.interest,
          message: formData.message || '(Sem mensagem)',
          _subject: `Nova consulta - ${formData.company}`,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          interest: 'Automação de Leads e Funil',
          message: ''
        });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        throw new Error('Erro ao enviar formulário');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-24 px-6 technical-grid">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-12">
          <div className="space-y-6">
            <span className="text-xs font-mono font-bold text-primary uppercase tracking-[0.4em]">Consulta Inicial</span>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none text-phosphor">
              Vamos <br/><span className="text-primary italic">conversar.</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-lg leading-relaxed font-mono">
              Agende uma consulta inicial gratuita. Vamos entender seus desafios e apresentar como nossa consultoria em inteligência agêntica pode transformar sua operação.
            </p>
          </div>

          <div className="space-y-6 pt-6">
            <a href="mailto:growth@sanset.ai" className="flex items-center gap-4 text-gray-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-primary">mail</span>
              <span className="text-sm font-mono">growth@sanset.ai</span>
            </a>
            <div className="flex items-center gap-4 text-gray-400">
              <span className="material-symbols-outlined text-primary">location_on</span>
              <span className="text-sm font-mono">Salvador | Atendimento Remoto</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-10 md:p-14 border border-white/10 relative rounded-[2rem]">
          <div className="absolute top-0 right-0 p-4 font-mono text-xs text-gray-700 tracking-widest">CONSULTANCY_FORM_V1</div>
          
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-primary/20 border border-primary/50 rounded-lg flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">check_circle</span>
              <p className="text-primary text-sm font-mono">Mensagem enviada com sucesso! Entraremos em contato em breve.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-3">
              <span className="material-symbols-outlined text-red-500">error</span>
              <p className="text-red-500 text-sm font-mono">Erro ao enviar. Tente novamente ou envie um email direto.</p>
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
                Empresa <span className="text-red-500">*</span>
              </label>
              <input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`w-full bg-transparent border-b py-3 text-white focus:outline-none focus:border-primary transition-all font-mono text-base ${
                  errors.company ? 'border-red-500/50' : 'border-white/10'
                }`}
                placeholder="Nome da sua startup"
                type="text"
                required
                aria-required="true"
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
                Área de Interesse
              </label>
              <select
                id="interest"
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/10 py-3 text-gray-500 focus:outline-none focus:border-primary transition-all font-mono text-base appearance-none"
                aria-label="Área de interesse"
              >
                <option>Automação de Leads e Funil</option>
                <option>Inteligência de Receita (MRR)</option>
                <option>Retenção e Customer Success</option>
                <option>Operações e Backoffice</option>
                <option>Outro - Vamos conversar</option>
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
                placeholder="Conte-nos sobre seus desafios atuais..."
                rows={3}
                aria-label="Mensagem opcional"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-6 bg-primary text-background-dark font-extrabold uppercase tracking-[0.3em] text-sm transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_20px_rgba(74,222,128,0.2)] flex items-center justify-center gap-4"
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                  Enviando...
                </>
              ) : (
                <>
                  Agendar Consulta Inicial
                  <span className="material-symbols-outlined text-sm">calendar_month</span>
                </>
              )}
            </button>
            
            <p className="text-xs text-center text-gray-600 uppercase tracking-widest leading-loose">
              Consulta inicial gratuita. Entraremos em contato em até 24h.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
