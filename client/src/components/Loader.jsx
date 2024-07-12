import React,{useState} from 'react'
import ClipLoader from "react-spinners/ClipLoader";


function Loader() {
    let [loading, setLoading] = useState(true);

    return (
        <div style={{marginTop:'200px'}}>
            <div className="sweet-loading text-center">
            <ClipLoader
                color='#000'
                loading={loading}
                css=''
                size={40}
            />
        </div>
        </div>

       
    )
}

export default Loader