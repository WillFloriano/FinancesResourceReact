import { useState, useEffect } from "react";
import { db } from "../firebase/config"
import { collection, query, onSnapshot, where } from "firebase/firestore";

export const useFetchDocuments = (docCollection, mesLancamento, uid) => {

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
                if(mesLancamento)
                {
                    if(uid === 'wjuppa1J53bsHiZIhlbAqrCuic03')
                    {
                        q = await query(collectionRef, where("mes", "==", mesLancamento), where("comprador", "==", 'Mis'), where("comprador", "==", "Ambos"))  

                    }
                    else
                    {
                        q = await query(collectionRef, where("mes", "==", mesLancamento), where("comprador", "==", 'Mis'), where("comprador", "==", "Ambos"))  
                    }                                                        
                }                           

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
    }, [docCollection, cancelled, mesLancamento, uid]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { documents, loading, error }

};