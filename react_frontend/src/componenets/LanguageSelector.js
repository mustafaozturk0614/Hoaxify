import React from 'react';
import {changeLanguage} from "../api/apiCalls";
import ReactCountryFlag from "react-country-flag";
import {useTranslation} from 'react-i18next'

const LanguageSelector = (props) => {
    const {i18n} = useTranslation()
    const onChangeLAnguage = language => {

        i18n.changeLanguage(language)
        changeLanguage(language)

    }
    return (
        <div className="container">
            <span><ReactCountryFlag
                className="span"
                onClick={() => onChangeLAnguage('tr')}
                countryCode="TR"
                svg

                style={{
                    margin: '0.5em',
                    cursor: 'pointer',
                    width: '3em',
                    height: '3em',
                }}

            /> </span>

            <span> <ReactCountryFlag
                className='span'
                onClick={() => onChangeLAnguage('en')}
                countryCode="US"
                svg
                style={{
                    cursor: 'pointer',
                    width: '3em',
                    height: '3em',
                }}

            />  </span>


        </div>
    );
};

export default (LanguageSelector);