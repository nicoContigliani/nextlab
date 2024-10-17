import useSWR from 'swr';
import xml2js from 'xml2js';
import { useState, useEffect } from 'react';
export function useXML(filePath) {
    const fetcher = (url) => fetch(url).then(res => res.text());

    const { data, error } = useSWR(filePath, fetcher);

    // Manejo asincrónico del XML parsing
    const [parsedData, setParsedData] = useState(null);

    useEffect(() => {
        try {
            if (data) {
                xml2js.parseString(data, (err, result) => {
                    if (err) {
                        console.error('Error al parsear el XML:', err);
                        return;
                    }
                    setParsedData(result);
                });
            }

        } catch (error) {
            console.log("🚀 ~ useEffect ~ error:", error)

        }
    }, [data]);

    return {
        data: parsedData,
        isLoading: !error && !data,
        isError: !!error,
    };
}