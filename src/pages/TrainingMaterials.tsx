import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BookOpen, Video, FileText, Download, ExternalLink } from 'lucide-react';

const TrainingMaterials = () => {
  const navigate = useNavigate();

  const materials = [
    {
      title: 'Aflatoxin Prevention Best Practices',
      type: 'PDF Guide',
      duration: '15 min read',
      icon: <FileText className="w-5 h-5" />,
      link: 'https://www.fao.org/3/i8270en/I8270EN.pdf'
    },
    {
      title: 'Proper Storage Techniques',
      type: 'Video Tutorial',
      duration: '12 min',
      icon: <Video className="w-5 h-5" />,
      link: 'https://www.youtube.com/results?search_query=corn+storage+techniques+aflatoxin'
    },
    {
      title: 'Crop Rotation Strategies',
      type: 'PDF Guide',
      duration: '10 min read',
      icon: <FileText className="w-5 h-5" />,
      link: 'https://www.fao.org/3/ca2079en/CA2079EN.pdf'
    },
    {
      title: 'Post-Harvest Handling Guidelines',
      type: 'Interactive Course',
      duration: '30 min',
      icon: <BookOpen className="w-5 h-5" />,
      link: 'https://www.kalro.org/aflatoxin-management'
    },
    {
      title: 'Moisture Management in Grain Storage',
      type: 'Video Tutorial',
      duration: '8 min',
      icon: <Video className="w-5 h-5" />,
      link: 'https://www.youtube.com/results?search_query=grain+moisture+management'
    },
    {
      title: 'Identifying Aflatoxin Contamination',
      type: 'PDF Guide',
      duration: '8 min read',
      icon: <FileText className="w-5 h-5" />,
      link: 'https://www.cabi.org/isc/FullTextPDF/2018/20183045180.pdf'
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
            <h1 className="text-2xl font-bold text-primary">Training Materials</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Agricultural Training Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Access comprehensive training materials on aflatoxin prevention, crop management, 
              and post-harvest handling. Click on any resource to view or download.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {materials.map((material, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => window.open(material.link, '_blank')}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    {material.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{material.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{material.type}</span>
                      <span>•</span>
                      <span>{material.duration}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-primary/5">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Need More Help?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Contact our agricultural extension officers for personalized training and support.
            </p>
            <Button onClick={() => navigate('/chat')}>
              Chat with AI Assistant
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TrainingMaterials;
