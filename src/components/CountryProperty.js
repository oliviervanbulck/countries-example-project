export default function CountryProperty({ title, value }) {
    return (
        <div className="mb-2">
            <span className="font-bold">{title}:</span> {value}
        </div>
    );
}