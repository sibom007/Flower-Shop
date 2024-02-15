import { Form, Select } from 'antd';
import { Controller } from 'react-hook-form';

type TPHSelectProps = {
    label: string;
    name: string;
    options: { value: string; label: string; disabled?: boolean }[] | undefined;
    disabled?: boolean;
    mode?: 'multiple' | undefined;
    loading?: boolean
};

const PHSelect = ({ label, name, options, disabled, mode, loading }: TPHSelectProps) => {
    return (
        <Controller
            name={name}
            render={({ field, fieldState }) => (
                <Form.Item label={label}>
                    <Select
                        mode={mode}
                        style={{ width: '100%' }}
                        {...field}
                        options={options}
                        size="large"
                        disabled={disabled}
                        loading={loading}
                    />
                    {fieldState?.error && <small style={{ color: 'red' }}>{fieldState.error.message}</small>}
                </Form.Item>
            )}
        />
    );
};

export default PHSelect;
