import {useEffect, useState} from "react";
import {Product} from "../types/types";

const useFetch = (url: string) => {
    const [data, setData] = useState<Product[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data: Product[]) => {
                setError('');
                setData(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
