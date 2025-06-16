'use client';

import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface CountryData {
    pays: string;
}

interface CountrySelectProps {
    value: CountryData;
    onChange: (data: CountryData) => void;
    error?: boolean;
}

export function CountrySelect({ value, onChange, error }: CountrySelectProps) {
    const handleChange = (value: string, country: any) => {
        console.log('Pays sélectionné:', country.name);
        onChange({
            pays: country.name
        });
    };

    return (
        <div className="country-select">
            <PhoneInput
                country={'ci'}
                value={value.pays ? `+${value.pays}` : ''}
                onChange={handleChange}
                inputProps={{
                    name: 'telephone',
                    required: true,
                    type: 'tel',
                }}
                buttonStyle={{
                    border: error ? '1px solid #ef4444' : '1px solid #d1d5db',
                    borderRight: 'none',
                    borderRadius: '0.375rem 0 0 0.375rem',
                    backgroundColor: 'white',
                    width: '100%',
                }}
                inputStyle={{
                    border: error ? '1px solid #ef4444' : '1px solid #d1d5db',
                    borderRadius: '0 0.375rem 0.375rem 0',
                    width: '100%',
                    height: '42px',
                }}
                dropdownStyle={{
                    width: '300px',
                }}
                buttonClass="country-select-button"
                enableAreaCodes={true}
                countryCodeEditable={false}
            />
        </div>
    );
} 