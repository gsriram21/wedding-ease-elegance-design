import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

interface GoogleConsentModalProps {
  isOpen: boolean;
  onComplete: (granted: boolean) => void;
  onCancel: () => void;
  appName?: string;
}

const GoogleConsentModal: React.FC<GoogleConsentModalProps> = ({
  isOpen,
  onComplete,
  onCancel,
  appName = "Wedding Ease"
}) => {
  const [currentStep, setCurrentStep] = useState<'account' | 'consent' | 'permissions' | 'success'>('account');
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [grantedPermissions, setGrantedPermissions] = useState({
    email: true,
    profile: true,
    openid: true
  });

  const mockAccounts = [
    {
      id: 'account1',
      email: 'john.doe@gmail.com',
      name: 'John Doe',
      avatar: 'https://via.placeholder.com/40x40/4285F4/FFFFFF?text=JD'
    },
    {
      id: 'account2', 
      email: 'john.doe@company.com',
      name: 'John Doe',
      avatar: 'https://via.placeholder.com/40x40/34A853/FFFFFF?text=JD'
    }
  ];

  const permissions = [
    {
      id: 'profile',
      title: 'See your personal info',
      description: 'See your personal info, including any personal info you\'ve made publicly available',
      icon: '👤',
      required: true
    },
    {
      id: 'email',
      title: 'See your primary Google Account email address',
      description: 'See your primary Google Account email address',
      icon: '📧',
      required: true
    },
    {
      id: 'openid',
      title: 'Associate you with your personal info on Google',
      description: 'Associate you with your personal info on Google',
      icon: '🔗',
      required: true
    }
  ];

  const handleAccountSelect = (accountId: string) => {
    setSelectedAccount(accountId);
    setTimeout(() => setCurrentStep('consent'), 800);
  };

  const handleContinue = () => {
    if (currentStep === 'consent') {
      setCurrentStep('permissions');
    } else if (currentStep === 'permissions') {
      setCurrentStep('success');
      setTimeout(() => {
        onComplete(true);
      }, 1500);
    }
  };

  const handlePermissionToggle = (permissionId: string) => {
    if (permissions.find(p => p.id === permissionId)?.required) return;
    
    setGrantedPermissions(prev => ({
      ...prev,
      [permissionId]: !prev[permissionId as keyof typeof prev]
    }));
  };

  const handleCancel = () => {
    onCancel();
    // Reset state for next time
    setTimeout(() => {
      setCurrentStep('account');
      setSelectedAccount('');
    }, 100);
  };

  const selectedAccountData = mockAccounts.find(acc => acc.id === selectedAccount);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">G</span>
            </div>
            <h2 className="text-lg font-medium text-gray-900">
              {currentStep === 'account' ? 'Choose an account' :
               currentStep === 'consent' ? 'Sign in to continue to Wedding Ease' :
               currentStep === 'permissions' ? 'Wedding Ease wants to access your Google Account' :
               'Success!'}
            </h2>
          </div>
          <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Account Selection Step */}
          {currentStep === 'account' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                to continue to {appName}
              </p>
              
              {mockAccounts.map((account) => (
                <button
                  key={account.id}
                  onClick={() => handleAccountSelect(account.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <img 
                    src={account.avatar} 
                    alt={account.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">{account.name}</div>
                    <div className="text-sm text-gray-500">{account.email}</div>
                  </div>
                </button>
              ))}
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button className="w-full flex items-center justify-center gap-2 p-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <span className="text-xl">👤</span>
                  <span className="text-sm font-medium">Use another account</span>
                </button>
              </div>
            </div>
          )}

          {/* Consent Step */}
          {currentStep === 'consent' && selectedAccountData && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <img 
                  src={selectedAccountData.avatar} 
                  alt={selectedAccountData.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-medium text-gray-900">{selectedAccountData.name}</div>
                  <div className="text-sm text-gray-500">{selectedAccountData.email}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">💐</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">{appName}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      This app is requesting access to your Google Account. {appName} will be able to see and download your personal info, including any personal info you've made publicly available.
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Make sure you trust {appName}</p>
                      <p>You may be sharing sensitive info with this site or app. Learn about how {appName} will handle your data by reviewing its privacy policy.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleContinue}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Permissions Step */}
          {currentStep === 'permissions' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💐</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">{appName} wants to:</h3>
              </div>

              <div className="space-y-3">
                {permissions.map((permission) => (
                  <div key={permission.id} className="flex items-start gap-3 p-3 rounded-lg border border-gray-200">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm">{permission.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">{permission.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">{permission.description}</p>
                        </div>
                        {!permission.required && (
                          <label className="flex items-center ml-2">
                            <input
                              type="checkbox"
                              checked={grantedPermissions[permission.id as keyof typeof grantedPermissions]}
                              onChange={() => handlePermissionToggle(permission.id)}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-600 leading-relaxed">
                  By clicking "Allow," you allow this app to use your information in accordance with their{' '}
                  <span className="text-blue-600 underline cursor-pointer">terms of service</span> and{' '}
                  <span className="text-blue-600 underline cursor-pointer">privacy policy</span>. You can change this and other Account Permissions at any time.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleContinue}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Allow
                </button>
              </div>
            </div>
          )}

          {/* Success Step */}
          {currentStep === 'success' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">You're all set!</h3>
                <p className="text-sm text-gray-600">
                  You can now use your Google account with {appName}
                </p>
              </div>

              <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoogleConsentModal; 