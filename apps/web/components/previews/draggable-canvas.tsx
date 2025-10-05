"use client";

import { DraggableCanvas } from "@/r/new-york/draggable-canvas/draggable-canvas";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DraggableCanvasPreview() {
  const items = [
    { src: '/image/1.jpg', top: '20%', left: '35%' },
    { src: '/image/2.jpg', top: '40%', left: '45%' },
    { src: '/image/3.jpg', top: '30%', left: '63%' }
  ]


  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-muted-foreground">Interactive Canvas</h4>
            <Badge variant="outline" className="text-xs">Drag & Explore</Badge>
          </div>
          <div className="w-full h-96 relative overflow-hidden border-2 border-dashed border-muted-foreground/20 rounded-lg bg-muted/20">
            <DraggableCanvas
              items={items}
              width="300vw"
              height="200vh"
              showBoundary={false}
              showCornerLabels={false}
              friction={0.92}
              elasticity={0.2}
              reboundDamping={0.8}
              initialCenter={true}
              className="bg-gradient-to-br from-muted/10 to-muted/30"
            />
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Drag the canvas to explore • Items have hover effects • Physics-based momentum
          </p>
        </div>
      </Card>
    </div>
  );
}
