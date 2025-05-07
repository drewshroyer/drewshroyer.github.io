
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function StyleGuide() {
  return (
    <div className="container-holiday section-spacing content-spacing">
      <h1 className="text-3xl font-bold">Holiday Style Guide</h1>
      
      <Separator className="my-6" />
      
      <h2 className="text-2xl font-semibold mb-4">Colors</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ColorCard name="Holiday Red" colorClass="bg-holiday-red" textClass="text-white" />
        <ColorCard name="Holiday Light" colorClass="bg-holiday-light" textClass="text-holiday-dark" />
        <ColorCard name="Holiday Dark" colorClass="bg-holiday-dark" textClass="text-white" />
        <ColorCard name="Holiday Gray" colorClass="bg-holiday-gray" textClass="text-holiday-dark" />
      </div>
      
      <Separator className="my-6" />
      
      <h2 className="text-2xl font-semibold mb-4">Typography</h2>
      <div className="space-y-4">
        <div>
          <h1 className="text-4xl font-bold">Heading 1</h1>
          <p className="text-sm text-muted-foreground">text-4xl font-bold</p>
        </div>
        <div>
          <h2 className="text-3xl font-semibold">Heading 2</h2>
          <p className="text-sm text-muted-foreground">text-3xl font-semibold</p>
        </div>
        <div>
          <h3 className="text-2xl font-medium">Heading 3</h3>
          <p className="text-sm text-muted-foreground">text-2xl font-medium</p>
        </div>
        <div>
          <p className="text-base">Regular Text</p>
          <p className="text-sm text-muted-foreground">text-base</p>
        </div>
        <div>
          <p className="text-sm">Small Text</p>
          <p className="text-sm text-muted-foreground">text-sm</p>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
      <div className="flex flex-wrap gap-4">
        <button className="btn-holiday">Holiday Button</button>
        <button className="btn-outline-holiday">Outline Button</button>
      </div>
      
      <Separator className="my-6" />
      
      <h2 className="text-2xl font-semibold mb-4">Cards</h2>
      <div className="grid-listings">
        <div className="card-holiday card-hover p-4">
          <h3 className="text-lg font-medium">Card Title</h3>
          <p className="text-muted-foreground">This is a holiday-styled card with hover effect</p>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <h2 className="text-2xl font-semibold mb-4">Animations</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Fade In</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This card fades in when rendered.</p>
            <p className="text-sm text-muted-foreground">animate-fade-in</p>
          </CardContent>
        </Card>
        
        <Card className="animate-slide-in">
          <CardHeader>
            <CardTitle>Slide In</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This card slides in from below.</p>
            <p className="text-sm text-muted-foreground">animate-slide-in</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Hover Scale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="hover-scale p-4 bg-muted rounded-lg">
              <p>Hover over me to see the scale effect.</p>
              <p className="text-sm text-muted-foreground">hover-scale</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ColorCard({ name, colorClass, textClass }: { name: string; colorClass: string; textClass: string }) {
  return (
    <div className={`h-24 rounded-lg flex items-end p-3 ${colorClass}`}>
      <span className={`font-medium ${textClass}`}>{name}</span>
    </div>
  );
}
