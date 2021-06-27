import React from 'react';
import { useState,useEffect } from 'react';
import {Col, Form, FormControl, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import QrReader from 'modern-react-qr-reader';
import DataSection from './DataSection';
import { useHistory } from "react-router-dom";
import {QR_TEXT_STORAGE_KEY} from "./Constants";

const ScanQR: React.FC = () => {
    const [data,setData] = useState<string | null>(null);
    const [scanTimedOut,setScanTimedOut] = useState(false);
    const history = useHistory();

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


    const copyData = (data: string) => {
        navigator.clipboard.writeText(data).then(function() {
            /* clipboard successfully set */
            alert("copied successfully");
        }, function() {
            /* clipboard write failed */
            alert("failed to copy to clipboard");
        });
    }

    const generate = () => {
        if(data && data.length > 0){
            sessionStorage.setItem(QR_TEXT_STORAGE_KEY, data);
            history.push("/");
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
                        <p><button className="btn btn-success" onClick={()=>copyData(data)}>Copy</button>
                            &nbsp;&nbsp;<button className="btn btn-primary" onClick={()=>setData(null)}>Scan Again</button>
                            &nbsp;&nbsp;<button className="btn btn-info" onClick={()=>generate()}>Generate from Data</button></p>
                    </div> : <div style={{backgroundColor: 'yellow'}}>Nothing yet</div>}
                    {/* JSON.stringify({data,scanTimedOut}) */}
                </div>
            </Col>
        </Row>
    );
};

export default ScanQR;
