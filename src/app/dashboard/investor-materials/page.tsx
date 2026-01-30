import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Presentation, AreaChart, Share2, Download } from 'lucide-react';

const materials = [
  {
    icon: <Presentation className="h-6 w-6 text-primary" />,
    name: 'Pitch Deck V2.pdf',
    description: 'Updated presentation for seed round.',
    size: '12.5 MB',
  },
  {
    icon: <AreaChart className="h-6 w-6 text-primary" />,
    name: 'Financial Projections.xlsx',
    description: '3-year revenue and cost forecast.',
    size: '2.1 MB',
  },
  {
    icon: <FileText className="h-6 w-6 text-primary" />,
    name: 'Business Plan.docx',
    description: 'Comprehensive company strategy.',
    size: '5.8 MB',
  },
   {
    icon: <FileText className="h-6 w-6 text-primary" />,
    name: 'One-Pager.pdf',
    description: 'Concise summary for quick review.',
    size: '850 KB',
  },
];

export default function InvestorMaterialsPage() {
  return (
    <div className="animate-in fade-in-50 duration-500">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <CardTitle className="font-headline text-2xl">Investor Kit</CardTitle>
              <CardDescription>
                Your compiled package of materials, ready to share with potential investors.
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button>
                <Share2 className="mr-2 h-4 w-4" /> Share Package
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Download All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <ul className="divide-y">
              {materials.map((material) => (
                <li key={material.name} className="flex items-center justify-between p-4 hover:bg-secondary">
                  <div className="flex items-center gap-4">
                    {material.icon}
                    <div>
                      <p className="font-medium">{material.name}</p>
                      <p className="text-sm text-muted-foreground">{material.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{material.size}</span>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download {material.name}</span>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
