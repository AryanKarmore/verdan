import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, TrendingUp, DollarSign, Users, Globe, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const MarketInfo = () => {
  const navigate = useNavigate();

  const currentPrices = [
    { crop: 'Maize (Quality Grade A)', price: '$180-200', unit: 'per ton', trend: 'up' },
    { crop: 'Maize (Grade B)', price: '$150-170', unit: 'per ton', trend: 'stable' },
    { crop: 'Maize (Feed Grade)', price: '$120-140', unit: 'per ton', trend: 'down' },
    { crop: 'Contaminated Grain (Disposal)', price: '$25-30', unit: 'per ton', trend: 'stable' }
  ];

  const buyers = [
    { name: 'National Cereals Board', type: 'Government', contact: '+254-700-CEREALS' },
    { name: 'East Africa Grain Council', type: 'Regional Network', contact: 'info@eagc.org' },
    { name: 'Premium Exports Ltd', type: 'Export', contact: '+254-722-EXPORT' },
    { name: 'Local Cooperative Union', type: 'Cooperative', contact: '+254-700-COOP' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl font-bold text-primary">Market Information</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Current Prices */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Current Market Prices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentPrices.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">{item.crop}</h4>
                    <p className="text-sm text-muted-foreground">{item.unit}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-primary">{item.price}</span>
                    {item.trend === 'up' && (
                      <Badge variant="default" className="bg-success">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Up
                      </Badge>
                    )}
                    {item.trend === 'stable' && (
                      <Badge variant="secondary">Stable</Badge>
                    )}
                    {item.trend === 'down' && (
                      <Badge variant="destructive">Down</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quality Premiums */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Quality Premiums
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-success/10 rounded-lg">
                <span>Aflatoxin-free certification</span>
                <span className="font-semibold text-success">+15-20%</span>
              </div>
              <div className="flex justify-between p-3 bg-success/10 rounded-lg">
                <span>Moisture content {'<'} 13%</span>
                <span className="font-semibold text-success">+10%</span>
              </div>
              <div className="flex justify-between p-3 bg-success/10 rounded-lg">
                <span>Organic certification</span>
                <span className="font-semibold text-success">+25-30%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certified Buyers */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Certified Buyer Network
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {buyers.map((buyer, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{buyer.name}</h4>
                      <Badge variant="outline" className="mt-1">{buyer.type}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Contact: {buyer.contact}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Export Opportunities */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Export Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-muted-foreground">
                Kenya exports maize to several countries in the region. Quality standards must be met:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                  <span className="text-sm">Aflatoxin levels must be below 10 ppb for export</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                  <span className="text-sm">Moisture content must not exceed 13.5%</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                  <span className="text-sm">Phytosanitary certificates required</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Market Forecast */}
        <Card className="bg-info/5">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-info" />
              Market Forecast
            </h3>
            <p className="text-sm text-muted-foreground">
              Prices are expected to remain stable through the harvest season. Quality grain demand 
              is high due to increased export opportunities. Farmers are advised to invest in proper 
              storage and aflatoxin prevention to maximize returns.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default MarketInfo;
