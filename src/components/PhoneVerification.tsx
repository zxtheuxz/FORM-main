import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { QrCode, Phone } from 'lucide-react';
import { FormLayout } from './FormLayout';
import { FormField } from './FormField';

export default function PhoneVerification() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validatePhone = (phone: string) => {
    const phoneRegex = /^55[0-9]{10,11}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhone(phone)) {
      toast.error('Número de telefone inválido. Use o formato: 55 + DDD + número');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('phone_numbers')
        .select(`
          id,
          verified,
          assessments (id),
          nutritional_assessments (id)
        `)
        .eq('phone', phone)
        .single();

      if (error) throw error;

      if (!data?.verified) {
        toast.error('Número não verificado. Entre em contato com o suporte.');
        return;
      }

      // Verificar formulários existentes
      const hasGymAssessment = data.assessments?.length > 0;
      const hasNutritionalAssessment = data.nutritional_assessments?.length > 0;

      navigate('/form-selection', { 
        state: { 
          phoneId: data.id,
          hasGymAssessment,
          hasNutritionalAssessment
        } 
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao verificar o número. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormLayout
      title="Avaliação Fitness Personalizada"
      currentStep={1}
      totalSteps={1}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div>
          <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8">
            Comece sua jornada fitness com uma avaliação personalizada. 
            Insira seu número para continuar.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <FormField
              label="Número de Telefone"
              description="Digite seu número no formato: 55 + DDD + número"
            >
              <div className="relative">
                <Phone className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="55 + DDD + número"
                  className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-xl 
                    bg-white/10 border border-white/20
                    focus:border-[#FF5733] focus:ring-2 focus:ring-[#FF5733]/20
                    transition-all duration-300 text-white placeholder-white/30
                    text-sm sm:text-base"
                  required
                />
              </div>
            </FormField>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#FF5733] to-[#ff6242] text-white 
                py-2.5 sm:py-3 rounded-xl font-semibold hover:scale-105 transition-all transform 
                disabled:opacity-50 disabled:hover:transform-none
                text-sm sm:text-base
                flex items-center justify-center gap-2"
            >
              {loading ? 'Verificando...' : 'Começar Avaliação'}
            </button>
          </form>
        </div>

        <div className="hidden md:flex flex-col items-center justify-center">
          <div className="bg-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 backdrop-blur-lg border border-white/10">
            <QrCode size={100} className="text-white mb-4" />
            <div className="text-white/90 text-center">
              <p className="font-semibold mb-2">Avaliação Digital</p>
              <p className="text-sm">Processo 100% online e personalizado</p>
            </div>
          </div>
        </div>
      </div>
    </FormLayout>
  );
}