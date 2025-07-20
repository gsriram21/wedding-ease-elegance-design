import React, { useState, forwardRef } from 'react';
import { ChevronDown, Flag } from 'lucide-react';

// Common country codes for international phone input
const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸', dialCode: '+1' },
  { code: 'IN', name: 'India', flag: '🇮🇳', dialCode: '+91' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '+1' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', dialCode: '+61' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', dialCode: '+49' },
  { code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '+33' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', dialCode: '+81' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', dialCode: '+82' },
  { code: 'CN', name: 'China', flag: '🇨🇳', dialCode: '+86' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', dialCode: '+55' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', dialCode: '+52' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺', dialCode: '+7' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', dialCode: '+39' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', dialCode: '+34' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', dialCode: '+31' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', dialCode: '+46' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', dialCode: '+47' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', dialCode: '+41' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', dialCode: '+43' },
];

interface PhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onCountryChange?: (country: typeof countries[0]) => void;
  placeholder?: string;
  className?: string;
  defaultCountry?: string;
  disabled?: boolean;
  required?: boolean;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ 
    value = '', 
    onChange, 
    onCountryChange,
    placeholder = "Enter your phone number", 
    className = "",
    defaultCountry = "IN",
    disabled = false,
    required = false,
    ...props 
  }, ref) => {
    const [selectedCountry, setSelectedCountry] = useState(() => 
      countries.find(c => c.code === defaultCountry) || countries[1] // Default to India
    );
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCountries = countries.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.dialCode.includes(searchTerm)
    );

    const handleCountrySelect = (country: typeof countries[0]) => {
      setSelectedCountry(country);
      setIsDropdownOpen(false);
      setSearchTerm('');
      onCountryChange?.(country);
      
      // Keep only the number part, remove any existing country code
      const numberOnly = value.replace(/^\+\d+\s*/, '').trim();
      const newValue = `${country.dialCode} ${numberOnly}`.trim();
      onChange?.(newValue);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      
      // Combine country code with the user input (which should be just the number)
      const fullPhoneNumber = `${selectedCountry.dialCode} ${inputValue}`.trim();
      onChange?.(fullPhoneNumber);
    };

    const getDisplayValue = () => {
      if (!value) return '';
      
      // Extract just the number part (remove country code for display in input)
      const numberPart = value.replace(selectedCountry.dialCode, '').trim();
      return numberPart;
    };

    return (
      <div className={`relative ${className}`}>
        <div className="flex">
          {/* Country Code Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              disabled={disabled}
              className="flex items-center gap-2 px-3 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100 focus:ring-2 focus:ring-luxury-maroon focus:border-luxury-maroon transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-lg" title={selectedCountry.name}>
                {selectedCountry.flag}
              </span>
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                {selectedCountry.dialCode}
              </span>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-hidden">
                {/* Search */}
                <div className="p-3 border-b border-gray-200">
                  <input
                    type="text"
                    placeholder="Search countries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-luxury-maroon focus:border-luxury-maroon"
                  />
                </div>
                
                {/* Country List */}
                <div className="max-h-48 overflow-y-auto">
                  {filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200"
                    >
                      <span className="text-lg">{country.flag}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{country.name}</div>
                        <div className="text-xs text-gray-500">{country.dialCode}</div>
                      </div>
                    </button>
                  ))}
                  
                  {filteredCountries.length === 0 && (
                    <div className="px-4 py-3 text-sm text-gray-500 text-center">
                      No countries found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Phone Number Input */}
          <input
            ref={ref}
            type="tel"
            value={getDisplayValue()}
            onChange={handlePhoneChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-luxury-maroon focus:border-luxury-maroon text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            {...props}
          />
        </div>

        {/* Overlay to close dropdown when clicking outside */}
        {isDropdownOpen && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsDropdownOpen(false)}
          />
        )}
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput; 