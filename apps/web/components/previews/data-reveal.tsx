"use client";
import { DataReveal } from "@/r/new-york/data-reveal/data-reveal";
import { Card } from "@/components/ui/card";

export default function DataRevealPreview() {
    return (
        <div className="space-y-6">
            <Card className="p-6">
                <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground">Basic Usage</h4>
                    <DataReveal>
                        <DataReveal.Button text="Show Details" className="py-2 px-4" />
                        <DataReveal.Container className="gap-2">
                            <DataReveal.Item content="john@example.com" index={0} className="py-2 px-3 text-sm" />
                            <DataReveal.Item content="+1 234-567-8900" index={1} className="py-2 px-3 text-sm" />
                            <DataReveal.Item content="#12345" index={2} className="py-2 px-3 text-sm" />
                        </DataReveal.Container>
                    </DataReveal>
                </div>
            </Card>
        </div>
    );
}
