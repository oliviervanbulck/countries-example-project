import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {getCountry, getCountryList} from "../helpers/countries";
import {Link, useParams} from "react-router-dom";
import CountryProperty from "../components/CountryProperty";
import LoadingComponent from "../components/LoadingComponent";

export default function Detail() {
    const [loading, setLoading] = useState(true);
    const [country, setCountry] = useState();
    const [borderCountries, setBorderCountries] = useState([]);
    const { country: countryId } = useParams();

    useEffect(() => {
        setLoading(true);
        getCountry(countryId).then(async (response) => {
            setCountry(response.data);
            await getCountryList(response.data.borders).then((response) => {
                setBorderCountries(response.data);
                console.log(response.data);
            });
            setLoading(false);
        }).catch((err) => {
            console.error('Er is een fout gebeurd tijdens het laden: ', err.message);
            setLoading(false);
        });
    }, [countryId]);

    return (
        <>
            <div className="mb-10">
                <Link to="/" className="inline-block cursor-pointer rounded-md bg-white dark:bg-man-dark-blue py-2 px-8 drop-shadow-lg dark:text-white">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-3" />
                    Back
                </Link>
            </div>
            { loading ? <LoadingComponent /> : (country ? <div className="flex gap-10 md:gap-32 items-center flex-col md:flex-row">
                <div className="flex-1">
                    <img src={ country.flag } alt={`Flag of ${country.name}`} />
                </div>
                <div className="flex-1">
                    <h1 className="mb-8">{country.name}</h1>
                    <div className="flex mb-20 flex-col md:flex-row">
                        <div className="flex-1">
                            <CountryProperty title={'Native Name'} value={country.nativeName} />
                            <CountryProperty title={'Population'} value={country.population.toLocaleString('en')} />
                            <CountryProperty title={'Region'} value={country.region} />
                            <CountryProperty title={'Sub Region'} value={country.subregion} />
                            <CountryProperty title={'Capital'} value={country.capital} />
                        </div>
                        <div className="flex-1">
                            <CountryProperty title={'Top Level Domain'} value={country.topLevelDomain} />
                            <CountryProperty title={'Currencies'} value={(country.currencies || []).map(c => c.name).join(', ')} />
                            <CountryProperty title={'Languages'} value={(country.languages || []).map(l => l.name).join(', ')} />
                        </div>
                    </div>
                    <div>
                        <span className="font-bold">Border Countries:</span> {borderCountries.map(bc => <Link to={'/' + bc.alpha3Code} className="ml-2 px-6 py-1 drop-shadow bg-white dark:bg-man-dark-blue rounded cursor-pointer inline-block mb-2">{bc.name}</Link>)}
                    </div>
                </div>
            </div> : <div>
                <h1>Er werd geen land gevonden met deze code...</h1>
            </div>) }
        </>
    );
}