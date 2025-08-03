"use client"
import React from 'react'
import { CurrencyDisplay, CurrencyProvider, CurrencySelector } from '@/registry/new-york/currency-manager/currency-manager'

export default function CurrencyManagerPreview() {

  function ShoppingCartLayout() {
    return (
      <div className="max-w-md mx-auto space-y-4 p-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="font-semibold">Cart Total</h3>
          <CurrencySelector />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Laptop</span>
            <CurrencyDisplay value={1999} />
          </div>
          <div className="flex justify-between text-sm">
            <span>Keyboard</span>
            <CurrencyDisplay value={79} />
          </div>
        </div>

        <div className="border-t pt-3">
          <div className="flex justify-between items-center">
            <span className="font-bold">Total:</span>
            <CurrencyDisplay
              value={2078}
              className="text-lg font-bold text-green-600 dark:text-green-400"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2 italic">
            Note: Rates may vary based on API service used.
          </p>
        </div>
      </div>
    )
  }

  const previewLiveRateFetcher = async (): Promise<Record<string, number>> => {
    const apiKey = process.env.NEXT_PUBLIC_EXCHANGERATE_API_KEY;
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        console.error(`Preview API request failed: ${response.status}`);
        return { USD: 1.0 };
      }
      const data = await response.json();
      if (data.result === "success" && data.base_code === "USD") {
        return data.conversion_rates;
      }
      console.error("Preview API returned non-success or wrong base code");
      return { USD: 1.0 };
    } catch (error) {
      console.error("Error in previewLiveRateFetcher:", error);
      return { USD: 1.0 };
    }
  };
  return (
    <div className='-mt-6!'>
      <CurrencyProvider
        fixedBaseCurrencyCode="USD"
        fetchRatesFunction={previewLiveRateFetcher}
        defaultSelectedCurrencyCode="INR"
        refetchIntervalMs={900000}
      >
        <ShoppingCartLayout />
      </CurrencyProvider>
    </div>
  )
}