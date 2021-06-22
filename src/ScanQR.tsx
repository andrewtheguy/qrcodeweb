import React from 'react';
import { useState,useEffect } from 'react';
import {Col, Form, FormControl, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import QrReader from 'modern-react-qr-reader';

const ScanQR: React.FC = () => {
    const [data,setData] = useState<string | null>(null);
    const [scanTimedOut,setScanTimedOut] = useState(false);


    useEffect(() => {
            if(data === null && !scanTimedOut) {
                let timer1 = setTimeout(() => setScanTimedOut(true), 60*1000); // 1 minute

                // this will clear Timeout
                // when component unmount like in willComponentUnmount
                // and show will not change to true
                return () => {
                    clearTimeout(timer1);
                };
            }
        },
        // useEffect will run only one time with empty []
        // if you pass a value to array,
        // like this - [data]
        // than clearTimeout will run every time
        // this value changes (useEffect re-run)
        [data,scanTimedOut]
    );


    const handleScan = (data: string | null) => {
        if (data) {
            console.log(data);
            setData(data);
        }
    }

    const handleError = (err: any) => {
        console.error(err)
    }

    const isValidUrl = (url: string) => {
        try {
            new URL(url);
        } catch (e) {
            console.error(e);
            return false;
        }
        return true;
    };


    function DataSection(props: {data: string}){
        const { data } = props;
        const [urlInfo,setUrlInfo] = useState<any | null>(null);


        useEffect(() => {
            setUrlInfo({validUrl: isValidUrl(data)})
        },[data]);

        if(!urlInfo){
            return <div>Loading url info</div>;
        }else{
            return <div>{urlInfo.validUrl ? <a href={data} target="_blank">{data}</a> : <textarea rows={6} cols={40} readOnly onClick={(e) => { (e.target as HTMLTextAreaElement).select() } }>{data}</textarea>}</div>;
        }

    }

    return (
        <Row>
            <Col>
                <div>
                    {scanTimedOut && <span>timed out <p><button onClick={()=>setScanTimedOut(false)}>Scan Again</button></p></span>}
                    {!scanTimedOut && !data && <QrReader
                        delay={500}
                        facingMode={"environment"}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: '100%', maxWidth: 600, padding: 10 }}
                    />}
                    {data ? <div id="qr-reader-results"><h1>data:</h1><DataSection data={data}></DataSection>
                        <p><button onClick={()=>setData(null)}>Scan Again</button></p>
                    </div> : <div style={{backgroundColor: 'yellow'}}>Nothing yet</div>}
                    {/* JSON.stringify({data,scanTimedOut}) */}
                </div>
            </Col>
        </Row>
    );
};

export default ScanQR;
