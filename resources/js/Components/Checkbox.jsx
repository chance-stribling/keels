export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-background text-background shadow-sm focus:ring-secondary' +
                className
            }
        />
    );
}
