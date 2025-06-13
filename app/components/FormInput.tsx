import { InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export default function FormInput({
    label,
    error,
    type = 'text',
    className = '',
    ...props
}: FormInputProps) {
    return (
        <div className="input-box">
            <label htmlFor={props.id || props.name}>
                {label}
                {props.required && <span className="required">*</span>}
            </label>
            <input
                type={type}
                className={`input ${error ? 'error' : ''} ${className}`}
                {...props}
            />
            {error && <span className="error-message">{error}</span>}
        </div>
    );
} 