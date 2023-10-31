interface typeInputComponent {
    name: string,
    control: Control,
    errors?: FieldError,
    label?: string,
    placeholder?: string,
    className?: string,
    icon?: React.ReactNode,
    type?: string,
}