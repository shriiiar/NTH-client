import { useEffect, useState } from "react"

const useAdmin = user => {
    const [admin, setAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);
    useEffect( () =>{
        const email = user?.email;
        if(email){
            fetch(`${process.env.REACT_APP_URL}/admin/${email}`, {
                method:'GET',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            })
            .then(res=>res.json())
            .then(data => {
                setAdmin(data.admin);
                setAdminLoading(false);
            })
        }
    }, [user])

    return [admin, adminLoading]
}

export default useAdmin;