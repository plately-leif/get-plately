'use client';

import { useState } from 'react';
import { Title, Text } from '@tremor/react';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);
  
  // Define a consistent card style class
  const cardStyle = "bg-white p-6 rounded-xl border border-gray-100 shadow-sm";
  
  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={cardStyle}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Title className="text-xl font-bold text-gray-900">Settings</Title>
            <Text className="mt-1 text-sm text-gray-500">Configure your marketing dashboard preferences</Text>
          </div>
        </div>
      </div>
      
      {/* General Settings */}
      <div className={cardStyle}>
        <Title className="text-lg font-semibold text-gray-900 mb-4">General Settings</Title>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
              Site Name
            </label>
            <input
              type="text"
              id="siteName"
              name="siteName"
              defaultValue="Plately Marketing"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div>
            <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Admin Email
            </label>
            <input
              type="email"
              id="adminEmail"
              name="adminEmail"
              defaultValue="admin@plately.ai"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Notifications
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="emailNotifications"
                name="emailNotifications"
                defaultChecked
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-700">
                Receive email notifications for new waitlist signups
              </label>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70"
          >
            {saving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* API Settings */}
      <div className={cardStyle}>
        <Title className="text-lg font-semibold text-gray-900 mb-4">API Settings</Title>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
              API Key
            </label>
            <div className="flex">
              <input
                type="password"
                id="apiKey"
                name="apiKey"
                defaultValue="••••••••••••••••••••••••••••••"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                readOnly
              />
              <button
                type="button"
                className="px-4 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-700 text-sm rounded-r-md hover:bg-gray-100"
              >
                Regenerate
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              This key provides access to the Plately Marketing API.
            </p>
          </div>
          
          <div>
            <label htmlFor="webhookUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Webhook URL
            </label>
            <input
              type="text"
              id="webhookUrl"
              name="webhookUrl"
              placeholder="https://your-app.com/webhook"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
            <p className="mt-1 text-xs text-gray-500">
              We'll send waitlist signup notifications to this URL.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
