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
                        <DataReveal.Button text="Show Details" className="py-2 px-4 bg-black text-white dark:bg-white dark:text-black" />
                        <DataReveal.Container className="gap-2">
                            <DataReveal.Item content="john@example.com" className="py-2 px-3 text-sm" />
                            <DataReveal.Item content="+1 234-567-8900" className="py-2 px-3 text-sm" />
                            <DataReveal.Item content="#12345" className="py-2 px-3 text-sm" />
                        </DataReveal.Container>
                    </DataReveal>
                </div>
            </Card>
        </div>
    );
}
