
import React from 'react';
import { CASE_STUDIES } from '../constants';

const Cases: React.FC = () => {
  return (
    <div className="pb-32">
      <section className="px-8 pt-24 pb-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4 text-phosphor">Growth <span className="text-primary italic">Logs</span></h1>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Resultados reais em métricas de North Star.</p>
        </div>
      </section>

      <section className="px-8 mt-16 max-w-7xl mx-auto">
        <div className="space-y-24">
          {CASE_STUDIES.map((item, idx) => (
            <div key={item.id} className={`flex flex-col lg:flex-row gap-16 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="flex-1 space-y-8">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 border border-primary/20">{item.tag}</span>
                  <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">{item.industry}</span>
                </div>
                <h3 className="text-3xl font-bold text-white tracking-tight">{item.title}</h3>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Desafio de Escala</p>
                    <p className="text-gray-400 leading-relaxed text-sm">{item.problem}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Solução Agêntica</p>
                    <p className="text-gray-400 leading-relaxed text-sm">{item.withdrawal}</p>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex items-end gap-10">
                  <div className="space-y-1">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Métrica North Star</p>
                    <p className="text-6xl font-bold text-primary tracking-tighter text-phosphor">{item.result}</p>
                  </div>
                  <p className="text-xs text-gray-600 pb-2 italic font-mono">{item.resultSub}</p>
                </div>
              </div>
              
              <div className="flex-1 w-full aspect-video grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700 bg-cover bg-center border border-white/10 rounded-xl" style={{ backgroundImage: `url(${item.imageUrl})` }}></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Cases;
