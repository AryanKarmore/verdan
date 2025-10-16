import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Phone, MessageSquare, Users, Calendar, Mail, MapPin } from 'lucide-react';

const TechnicalSupport = () => {
  const navigate = useNavigate();

  const supportChannels = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: '24/7 Helpline',
      description: 'Call our agricultural experts anytime',
      contact: '+254-700-FARM-HELP',
      action: 'Call Now',
      actionFn: () => window.location.href = 'tel:+254700327643'
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'WhatsApp Support',
      description: 'Quick responses via WhatsApp',
      contact: '+254-722-SUPPORT',
      action: 'Open WhatsApp',
      actionFn: () => window.open('https://wa.me/254722787767', '_blank')
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Field Officer Visit',
      description: 'Schedule a visit from extension officer',
      contact: 'Available in your region',
      action: 'Request Visit',
      actionFn: () => navigate('/chat')
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'AI Chat Assistant',
      description: 'Get instant answers to farming questions',
      contact: 'Available 24/7',
      action: 'Start Chat',
      actionFn: () => navigate('/chat')
    }
  ];

  const faqItems = [
    {
      q: 'How do I prevent aflatoxin in my maize?',
      a: 'Ensure proper drying (below 14% moisture), use clean storage, handle crops carefully, and consider aflatoxin-resistant varieties.'
    },
    {
      q: 'What moisture level is safe for storage?',
      a: 'Maize should be dried to below 13% moisture content before storage to prevent mold and aflatoxin growth.'
    },
    {
      q: 'How often should I check stored grain?',
      a: 'Inspect stored grain weekly for the first month, then bi-weekly. Check for moisture, pests, and unusual odors.'
    },
    {
      q: 'Where can I get my grain tested for aflatoxin?',
      a: 'Contact KALRO labs, Kenya Bureau of Standards, or use our AI scanning feature for preliminary assessment.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl font-bold text-primary">Technical Support</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Support Channels */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {supportChannels.map((channel, index) => (
            <Card key={index} className="hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    {channel.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{channel.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{channel.description}</p>
                    <p className="text-sm font-medium text-primary">{channel.contact}</p>
                  </div>
                </div>
                <Button onClick={channel.actionFn} className="w-full">
                  {channel.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Regional Offices */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Regional Extension Offices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold">Western Kenya Office</h4>
                <p className="text-sm text-muted-foreground mt-1">Kisumu, Kakamega, Bungoma</p>
                <p className="text-sm mt-2">Contact: +254-700-WEST-AG</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold">Central Kenya Office</h4>
                <p className="text-sm text-muted-foreground mt-1">Nairobi, Kiambu, Murang'a</p>
                <p className="text-sm mt-2">Contact: +254-700-CENT-AG</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold">Rift Valley Office</h4>
                <p className="text-sm text-muted-foreground mt-1">Nakuru, Eldoret, Narok</p>
                <p className="text-sm mt-2">Contact: +254-700-RIFT-AG</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">{item.q}</h4>
                  <p className="text-sm text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card className="bg-primary/5">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Email Support
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              For non-urgent inquiries, email us at: <strong>support@verdan-ag.ke</strong>
            </p>
            <p className="text-xs text-muted-foreground">
              Response time: Within 24 hours
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TechnicalSupport;
