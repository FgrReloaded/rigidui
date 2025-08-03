/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Eye, Download } from "lucide-react";
import { ContentGrid } from "@/r/new-york/content-grid/content-grid";

export default function ContentGridPreview() {
  const sampleItems = [
    {
      id: 1,
      title: "Dashboard Template",
      description:
        "A comprehensive dashboard template with charts and analytics.",
      category: "Template",
      price: "$49",
      rating: 4.9,
      views: 1234,
      downloads: 892,
    },
    {
      id: 2,
      title: "UI Kit Pro",
      description: "Complete UI kit with modern components and layouts.",
      category: "UI Kit",
      price: "$29",
      rating: 4.8,
      views: 956,
      downloads: 643,
    },
  ];

  const renderCard = (item: any, viewMode: "grid" | "list") => {
    const isListMode = viewMode === "list";

    return (
      <Card
        key={item.id}
        className={`hover:shadow-md transition-shadow ${isListMode ? "flex items-center gap-4" : ""
          }`}
      >
        <div className={`flex-1 ${isListMode ? "mr-4" : ""}`}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-base">{item.title}</CardTitle>
                <Badge variant="outline" className="mt-1 text-xs">
                  {item.category}
                </Badge>
              </div>
              <div className="text-right">
                <div className="font-bold text-primary">{item.price}</div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {item.rating}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
              {item.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {item.views.toLocaleString()}
              </div>
              <div className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                {item.downloads.toLocaleString()}
              </div>
            </div>
            <Button size="sm" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </CardContent>
        </div>
      </Card>
    );
  };

  return (
    <ContentGrid
      items={sampleItems}
      renderCard={renderCard}
      defaultViewMode="grid"
      gridColumns={2}
      className="w-full"
    />
  );
}
