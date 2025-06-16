'use client';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useRef } from 'react';

interface CountryData {
    name: string;
    countryCode: string;
    dialCode: string;
}

interface PhoneData {
    pays: string;
}

interface CountrySelectProps {
    value?: PhoneData;
    onChange?: (data: PhoneData) => void;
    error?: boolean;
}

export function CountrySelect({ value, onChange, error }: CountrySelectProps) {
    const phoneInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (phoneValue: string, country: CountryData) => {
        onChange?.({
            pays: country.name,
            // indicatif: `+${country.dialCode}`
        });

        // Focus sur l'input après la sélection du pays
        if (phoneInputRef.current) {
            phoneInputRef.current.focus();
        }
    };

    return (
        <div className="w-full">
            <PhoneInput
                country={'ci'}
                value=""
                onChange={handleChange}
                inputClass={`w-full p-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                buttonClass={`border ${error ? 'border-red-500' : 'border-gray-300'} rounded-l-md bg-white hover:bg-gray-50`}
                dropdownClass="border border-gray-300 rounded-md shadow-lg"
                searchClass="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                containerClass="w-full"
                preferredCountries={['ci', 'fr', 'be', 'ch', 'ca', 'ma', 'tn', 'sn', 'cm', 'dz']}
                searchPlaceholder="Rechercher un pays..."
                enableSearch={true}
                searchNotFound="Aucun pays trouvé"
                inputProps={{
                    required: true,
                    name: 'pays',
                    placeholder: 'Sélectionner un pays',
                    type: 'text',
                    ref: phoneInputRef,
                    readOnly: true
                }}
                buttonStyle={{
                    borderRight: 'none',
                    backgroundColor: 'white',
                    borderColor: error ? '#ef4444' : '#d1d5db',
                    width: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 5px'
                }}
                inputStyle={{
                    width: '10%',
                    height: '42px',
                    fontSize: '16px',
                    borderColor: error ? '#ef4444' : '#d1d5db',
                    backgroundColor: 'white',
                    paddingLeft: '50px'
                }}
                dropdownStyle={{
                    width: '200px',
                    maxHeight: '300px',
                    overflowY: 'auto'
                }}
                countryCodeEditable={false}
                enableAreaCodes={true}
                disableDropdown={false}
            />
            <style jsx global>{`
                .country-select-button {
                    width: 120px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: space-between !important;
                    padding: 0 10px !important;
                }
                .country-select-button .flag {
                    margin-right: 8px !important;
                }
                .country-select-button .arrow {
                    margin-left: 8px !important;
                }
                .react-tel-input .selected-flag {
                    width: 120px !important;
                    padding: 0 10px !important;
                }
                .react-tel-input .selected-flag .arrow {
                    margin-left: 8px !important;
                }
                .react-tel-input .selected-flag .flag {
                    margin-right: 8px !important;
                }
                .react-tel-input .selected-flag .country-code {
                    display: none !important;
                }
            `}</style>
        </div>
    );
} 