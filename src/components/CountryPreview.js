import { useNavigate } from 'react-router-dom';

export default function CountryPreview({ country }) {
    const navigate = useNavigate();

    return (
        <div className="w-80 bg-white dark:bg-man-dark-blue rounded-md overflow-hidden cursor-pointer drop-shadow-lg" onClick={() => navigate(`/${country.alpha3Code}`)}>
            <img src={country.flag} alt={'Flag'} className="w-full" />
            <div className="p-5 ">
                <h2>
                    { country.name }
                </h2>
                <br />
                <span className="font-bold">Population: </span>{ country.population.toLocaleString('en') }<br />
                <span className="font-bold">Region: </span>{ country.region }<br />
                <span className="font-bold">Capital: </span>{ country.capital }<br />
            </div>
        </div>
    );
}