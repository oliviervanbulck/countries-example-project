import {Fragment, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronDown, faCircleNotch, faSearch} from "@fortawesome/free-solid-svg-icons";
import { getCountries } from "../helpers/countries";
import CountryPreview from "../components/CountryPreview";
import { Menu, Transition } from '@headlessui/react';
import classNames from "classnames";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [countryList, setCountryList] = useState([]);
    const [filter, setFilter] = useState('');
    const [regionFilter, setRegionFilter] = useState('');

    getCountries().then((response) => {
        setCountryList(response.data);
        setLoading(false);
    });

    return (
        <>
            <div className="flex justify-between mb-10">
                <div className="rounded-md bg-white dark:bg-[#2b3743] py-3 px-5 drop-shadow-lg">
                    <FontAwesomeIcon icon={faSearch} className="mr-5" />
                    <input type="text" placeholder="Search..." className="bg-inherit focus:outline-none" value={filter} onChange={e => setFilter(e.target.value)} />
                </div>
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="w-56 inline-flex w-full justify-between rounded-md bg-white dark:bg-[#2b3743] py-3 px-5 drop-shadow-lg text-sm font-medium focus:outline-none">
                            Filter by Region
                            <FontAwesomeIcon icon={faChevronDown} className="-mr-1 ml-2" aria-hidden="true" />
                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-1 w-56 origin-top-right rounded-md bg-white dark:bg-[#2b3743] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                {[...new Set(countryList.map(country => country.region))].map(region => (
                                    <Menu.Item>
                                        {({ active }) => (
                                            <div
                                                onClick={() => region === regionFilter ? setRegionFilter('') : setRegionFilter(region)}
                                                className={classNames(
                                                    active || region === regionFilter ? 'bg-[#4a5f73]' : '',
                                                    'block px-4 py-2 text-sm cursor-pointer'
                                                )}
                                            >
                                                { region }
                                            </div>
                                        )}
                                    </Menu.Item>
                                ))}
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
            { loading ? <div className="flex justify-center">
                <div className="flex flex-col font-bold gap-5">
                    Loading...
                    <FontAwesomeIcon icon={faCircleNotch} spin size="4x" />
                </div>
            </div> : <div className="flex flex-wrap gap-16 justify-left">
                {countryList.filter((country) => country.name.toLowerCase().includes(filter.toLowerCase()) && (regionFilter === '' || regionFilter === country.region)).map((country) => <CountryPreview country={country} />)}
            </div> }
        </>
    );
}