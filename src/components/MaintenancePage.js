import React from 'react';
import { AlertTriangle, Mail } from 'lucide-react';

const MaintenancePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full text-center">
        <AlertTriangle className="mx-auto mb-4 text-yellow-500" size={64} />
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Site Under Maintenance
        </h1>
        <p className="text-gray-500 mb-6">
          Please check back soon!
        </p>
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Mail className="text-green-500" size={24} />
          <a 
            href="mailto:mohansaisingu23@gmail.com" 
            className="text-blue-600 hover:underline"
          >
            Contact Support
          </a>
        </div>
        <div className="border-t pt-4 text-xs text-gray-400">
          © {new Date().getFullYear()} Mohan Sai Singu
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;