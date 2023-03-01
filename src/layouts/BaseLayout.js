import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMoon} from "@fortawesome/free-solid-svg-icons";
import {faMoon as faMoonRegular} from "@fortawesome/free-regular-svg-icons";
import {useEffect, useState} from "react";

export default function BaseLayout(props) {
    const [ darkMode, setDarkMode ] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);

    const toggleDarkMode = () => setDarkMode(!darkMode);
    useEffect(() => {
        document.documentElement.className = darkMode && 'dark';
    }, [darkMode]);

    return (
        <div className="text-black dark:text-white">
            <div className="w-full bg-white dark:bg-[#2b3743] h-20 drop-shadow-lg">
                <div className="container mx-auto flex justify-between items-center h-full font-bold">
                    <h1>Where in the world?</h1>
                    <span onClick={toggleDarkMode} className="cursor-pointer">
                            <FontAwesomeIcon icon={darkMode ? faMoon : faMoonRegular} className="mr-2" />
                            Dark Mode
                        </span>
                </div>
            </div>
            <div className="container mx-auto my-10">
                { props.children }
            </div>
        </div>
    );
}