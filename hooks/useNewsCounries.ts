import CountryList from "@/constants/CountryList";
import { useCallback, useState } from "react";


export const useNewsCountry = () => {
    const [country, setCountry] = useState(CountryList);

    const toggleCountry = useCallback((id: number) => {
        setCountry(prevState => {
            return prevState.map((country, index) => {
                if (index === id) {
                    return {
                        ...country,
                        selected: !country.selected
                    }
                }
                return country;
            })
        })
    }, []);

    return{
        country,
        toggleCountry
    }
}