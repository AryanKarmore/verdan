import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { authService } from '@/lib/auth';
import { t } from '@/lib/i18n';
import { Wheat } from 'lucide-react';

const PhoneAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');

  const handleSubmit = async () => {
    if (isLogin) {
      // Login
      if (!name.trim() || !pin.trim()) {
        toast({
          variant: "destructive",
          title: t('error.generic'),
          description: t('auth.fillAllFields'),
        });
        return;
      }

      if (pin.length < 4) {
        toast({
          variant: "destructive",
          title: t('error.generic'),
          description: t('auth.pinMinLength'),
        });
        return;
      }

      setIsLoading(true);
      try {
        const { session, error } = await authService.login(name, pin);
        
        if (error) {
          toast({
            variant: "destructive",
            title: t('error.generic'),
            description: error,
          });
          return;
        }

        if (session) {
          toast({
            title: t('auth.loginSuccess'),
            description: `${t('auth.welcomeBack')}, ${session.user?.full_name}!`,
          });
          
          // Navigate to dashboard based on stored role or default to farmer
          const role = localStorage.getItem('verdan-role') || 'farmer';
          navigate(`/${role}`);
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: t('error.generic'),
          description: error.message || t('error.generic'),
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      // Sign up
      if (!name.trim() || !phone.trim() || !pin.trim()) {
        toast({
          variant: "destructive",
          title: t('error.generic'),
          description: t('auth.fillAllFields'),
        });
        return;
      }

      if (pin.length < 4) {
        toast({
          variant: "destructive",
          title: t('error.generic'),
          description: t('auth.pinMinLength'),
        });
        return;
      }

      setIsLoading(true);
      try {
        const { user: newUser, error } = await authService.register(name, phone, pin);

        if (error) {
          toast({
            variant: "destructive",
            title: t('error.generic'),
            description: error,
          });
          return;
        }

        if (newUser) {
          toast({
            title: t('auth.signupSuccess'),
            description: t('auth.accountCreated'),
          });
          
          // Auto-login after signup
          const { session, error: loginError } = await authService.login(name, pin);
          if (!loginError && session) {
            const role = localStorage.getItem('verdan-role') || 'farmer';
            navigate(`/${role}`);
          }
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: t('error.generic'),
          description: error.message || t('error.generic'),
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-3">
          <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mx-auto shadow-lg">
            <Wheat className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-primary">{t('app.name')}</h1>
          <p className="text-muted-foreground text-lg">{t('app.tagline')}</p>
        </div>

        <Card className="p-6 shadow-xl space-y-6">
          {/* Toggle between Login and Sign Up */}
          <div className="flex gap-2 p-1 bg-muted rounded-lg">
            <Button
              variant={isLogin ? "default" : "ghost"}
              className="flex-1"
              onClick={() => {
                setIsLogin(true);
                setName('');
                setPhone('');
                setPin('');
              }}
            >
              {t('auth.login')}
            </Button>
            <Button
              variant={!isLogin ? "default" : "ghost"}
              className="flex-1"
              onClick={() => {
                setIsLogin(false);
                setName('');
                setPhone('');
                setPin('');
              }}
            >
              {t('auth.signup')}
            </Button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('auth.name')}</Label>
              <Input
                id="name"
                type="text"
                placeholder={t('auth.enterName')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="phone">{t('auth.phone')}</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+254712345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="pin">{t('auth.pin')}</Label>
              <Input
                id="pin"
                type="password"
                placeholder={t('auth.enterPin')}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                maxLength={6}
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">{t('auth.pinHelper')}</p>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            className="w-full"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : (isLogin ? t('auth.login') : t('auth.signup'))}
          </Button>

          {/* Back Link */}
          <div className="text-center">
            <Button
              variant="link"
              onClick={() => navigate('/language')}
              className="text-sm text-muted-foreground"
            >
              ← {t('action.back')}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PhoneAuth;
