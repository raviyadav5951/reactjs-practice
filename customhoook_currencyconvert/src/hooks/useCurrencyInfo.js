import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    console.log("currency", currency);
    const [data, setData] = useState({})

    useEffect(() => {
        const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`
        console.log("req url", url);

        fetch(url)
            .then((res) => {
                const test = res.json()
                console.log("test", test);
                return test
            })
            .then((res) => setData(res[currency]))

        console.log(data);
    }, [currency])

    console.log("last data ", data);
    return data;

}

export default useCurrencyInfo;