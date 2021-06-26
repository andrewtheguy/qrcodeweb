import React, {useEffect, useState} from "react";

const isValidUrl = (url: string) => {
    try {
        new URL(url);
    } catch (e) {
        console.error(e);
        return false;
    }
    return true;
};

interface Props {
    data: string;
}

const DataSection: React.FC<Props> = (props) =>{


    const { data } = props;
    const [urlInfo,setUrlInfo] = useState<any | null>(null);


    useEffect(() => {
        setUrlInfo({validUrl: isValidUrl(data)})
    },[data]);

    if(!urlInfo){
        return <div>Loading url info</div>;
    }else{
        return <div>{urlInfo.validUrl ? <p><a href={data} target="_blank" rel="noreferrer">{data}</a></p> :
            <div className="form-group">
            <textarea className="form-control" rows={6} cols={40} readOnly onClick={(e) => { (e.target as HTMLTextAreaElement).select() } }>{data}</textarea>
            </div>
                }</div>;
    }

}

export default DataSection;
