import { useState, useEffect } from "react";
import { db } from "../firebase/config"
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export const useFetchInvestimentos = (docCollection) => {

    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    useEffect(() => {

        async function loadData() {
          

            setLoading(true)

            const collectionRef = await collection(db, docCollection)

            try {

                let q

                //busca
                //dashboard
                                
                q = await query(collectionRef, orderBy('vencimento'))                                       
                                           

                await onSnapshot(q, (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    )
                })

                setLoading(false);

            } catch (error) {
                console.log(error);
                setError(error.message);
                setLoading(false);
            }
        }
        loadData();
        return () => clearTimeout(loadData)
    }, [docCollection, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { documents, loading, error }

};