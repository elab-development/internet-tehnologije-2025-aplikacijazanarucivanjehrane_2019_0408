export default function Input({ label, id, ...props }) {
    return (
        <p className="control">
            <label htmlFor={id}>{label}</label>
            <input id={id} name={id} required {...props}/>
            {/* html for and id connect ecah other in label and input */}
        </p>
    );
}