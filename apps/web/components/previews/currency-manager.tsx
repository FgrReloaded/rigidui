"use client"
import React from 'react'
import { CurrencyDisplay, CurrencyProvider, CurrencySelector } from '@/registry/new-york/currency-manager/currency-manager'

export default function CurrencyManagerPreview() {

  function ShoppingCartLayout() {
    return (
      <div className="max-w-4xl mx-auto space-y-6 px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Currency:</span>
            <CurrencySelector className="w-full sm:w-48" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-3">
            <div className="flex-1">
              <h3 className="font-medium">Laptop Pro X</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Qty: 1</p>
            </div>
            <div className="text-left sm:text-right">
              <div className="font-semibold text-lg">
                <CurrencyDisplay value={1999} />
              </div>
              <div className="text-xs text-gray-500">Originally $1,999 USD</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-3">
            <div className="flex-1">
              <h3 className="font-medium">Wireless Keyboard</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Qty: 1</p>
            </div>
            <div className="text-left sm:text-right">
              <div className="font-semibold text-lg">
                <CurrencyDisplay value={79} />
              </div>
              <div className="text-xs text-gray-500">Originally $79 USD</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-3">
            <div className="flex-1">
              <h3 className="font-medium">Coffee Mug</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Qty: 2</p>
            </div>
            <div className="text-left sm:text-right">
              <div className="font-semibold text-lg">
                <CurrencyDisplay value={24} />
              </div>
              <div className="text-xs text-gray-500">Originally $24 USD</div>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xl font-bold">Estimated Total:</span>
            <CurrencyDisplay
              value={2102}
              sourceCurrency="USD"
              className="text-2xl font-bold text-green-600 dark:text-green-400"
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Individual item prices are converted from their source currency to your selected display currency.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
            <strong>Try it:</strong> Use the searchable currency selector above to quickly find any currency from 180+ options. Type to search by currency code or name (e.g., &quot;USD&quot;, &quot;Euro&quot;, &quot;Indian&quot;).
          </p>
          <div className="pt-2 border-t border-blue-200 dark:border-blue-700">
            <p className="text-xs text-blue-700 dark:text-blue-300 font-medium mb-1">Required data format for fetchRatesFunction:</p>
            <code className="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-blue-800 dark:text-blue-200">
              {'{"EUR": 0.92, "INR": 83.5, "GBP": 0.79}'}
            </code>
          </div>
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