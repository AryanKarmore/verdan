import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, DollarSign, Shield, CreditCard, TrendingUp, AlertCircle, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const FinancialServices = () => {
  const navigate = useNavigate();

  const insurancePrograms = [
    {
      name: 'Kenya Agricultural Insurance Program (KAIP)',
      coverage: 'Crop loss due to drought, floods, pests',
      premium: 'From 5% of sum insured',
      link: 'https://www.kilimo.go.ke/insurance/'
    },
    {
      name: 'Area Yield Index Insurance',
      coverage: 'Weather-based yield protection',
      premium: 'From KES 2,000 per acre',
      link: 'https://www.agriculture.go.ke'
    }
  ];

  const loanPrograms = [
    {
      provider: 'Agricultural Finance Corporation (AFC)',
      type: 'Production Loans',
      amount: 'Up to KES 5M',
      rate: '12% p.a.',
      contact: '+254-020-2710100'
    },
    {
      provider: 'Kenya Women Finance Trust (KWFT)',
      type: 'Women Farmer Loans',
      amount: 'Up to KES 2M',
      rate: '14% p.a.',
      contact: '+254-020-2730000'
    },
    {
      provider: 'Cooperative Bank',
      type: 'Kilimo Biashara Loan',
      amount: 'Up to KES 10M',
      rate: '13% p.a.',
      contact: '+254-703-093000'
    }
  ];

  const subsidies = [
    {
      title: 'Fertilizer Subsidy Program',
      description: 'Government-subsidized fertilizer at reduced prices',
      benefit: 'Up to 50% discount',
      eligibility: 'Registered farmers with valid ID'
    },
    {
      title: 'Seed Subsidy',
      description: 'Certified seed at subsidized rates',
      benefit: '30-40% discount',
      eligibility: 'Smallholder farmers'
    },
    {
      title: 'Equipment Financing',
      description: 'Leasing and hire-purchase for farm equipment',
      benefit: 'Low-interest rates',
      eligibility: 'All registered farmers'
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
            <h1 className="text-2xl font-bold text-primary">Financial Services</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Crop Insurance */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Crop Insurance Programs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Protect your investment against weather risks and crop failures
            </p>
            <div className="space-y-4">
              {insurancePrograms.map((program, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{program.name}</h4>
                    <Badge variant="outline">Insurance</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Coverage: {program.coverage}
                  </p>
                  <p className="text-sm mb-3">Premium: {program.premium}</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(program.link, '_blank')}
                  >
                    Learn More <ExternalLink className="w-3 h-3 ml-2" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Microfinance Options */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Agricultural Loans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Access affordable financing for your farming operations
            </p>
            <div className="space-y-4">
              {loanPrograms.map((loan, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{loan.provider}</h4>
                      <Badge variant="secondary" className="mt-1">{loan.type}</Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Loan Amount</p>
                      <p className="font-semibold text-primary">{loan.amount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Interest Rate</p>
                      <p className="font-semibold">{loan.rate}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    Contact: {loan.contact}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Government Subsidies */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Government Subsidies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subsidies.map((subsidy, index) => (
                <div key={index} className="p-4 bg-success/5 border border-success/20 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{subsidy.title}</h4>
                    <Badge variant="default" className="bg-success">
                      {subsidy.benefit}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{subsidy.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <AlertCircle className="w-4 h-4 text-info" />
                    <span className="text-muted-foreground">Eligibility: {subsidy.eligibility}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Equipment Financing */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Equipment Financing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Acquire modern farming equipment through flexible payment plans
            </p>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg flex justify-between items-center">
                <span>Storage Silos</span>
                <span className="text-sm text-primary font-medium">Lease from KES 15,000/month</span>
              </div>
              <div className="p-3 border rounded-lg flex justify-between items-center">
                <span>Moisture Meters</span>
                <span className="text-sm text-primary font-medium">From KES 8,000</span>
              </div>
              <div className="p-3 border rounded-lg flex justify-between items-center">
                <span>Grain Dryers</span>
                <span className="text-sm text-primary font-medium">Lease from KES 25,000/month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Literacy */}
        <Card className="bg-info/5">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-info" />
              Financial Tips for Farmers
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Keep detailed records of all farm expenses and income</li>
              <li>• Compare interest rates before taking loans</li>
              <li>• Ensure you understand all terms and conditions</li>
              <li>• Consider insurance to protect against unexpected losses</li>
              <li>• Join farmer cooperatives for better financing terms</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FinancialServices;
