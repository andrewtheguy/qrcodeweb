import React, {useRef} from 'react';
import { useState,useEffect } from 'react';
import {Col, Form, FormControl, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import QrReader from 'modern-react-qr-reader';
import DataSection from './DataSection';
import { useHistory } from "react-router-dom";
import {QR_TEXT_STORAGE_KEY} from "./Constants";
import Dexie from "dexie";

const ScanQR: React.FC = () => {
    const [data,setData] = useState<string | null>(null);
    const [db,setDb] = useState<Dexie | null>(null);
    const [scanTimedOut,setScanTimedOut] = useState(false);
    const [qrHistory,setQrHistory] = useState([]);
    const history = useHistory();

    useEffect(() => {
        console.log('init db')
        const db = new Dexie('qr_history');
        // Declare tables, IDs and indexes
        db.version(1).stores({
            qr_histories: '++id, ts, data'
        });
        async function loadHistory() {
            // @ts-ignore
            const h = await db.qr_histories
                .toArray();
            setQrHistory(h);
        }
        loadHistory();
        setDb(db);
        return function cleanup() {
            console.log('clean up')
            if(db) {
                db.close();
            }
        }
    }, []);



    useEffect(() => {

//         async function dbTest() {
// // Find some old friends
//             // @ts-ignore
//             const oldFriends = await db.friends
//                 .where('age').above(10)
//                 .toArray();
//
//             console.log(oldFriends)
//             // or make a new one
//             // @ts-ignore
//             await db.friends.add({
//                 name: 'Camilla',
//                 age: 25,
//             });
//         }
//         dbTest();
    },[]);

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
            const addEntry = async (d: string) => {
                const h = {
                    ts: Math.floor(new Date().getTime()),
                    data: d,
                };
                // @ts-ignore
                await db.qr_histories.add(h);
                // @ts-ignore
                setQrHistory([...qrHistory,h]);
            }
            addEntry(data);
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
                        <p><button className="btn btn-primary m-1" onClick={()=>setData(null)}>Scan Again</button>
                            <button className="btn btn-success m-1" onClick={()=>copyData(data)}>Copy</button>
                            <button className="btn btn-info m-1" onClick={()=>generate()}>Generate from Result</button></p>
                    </div> : <div style={{backgroundColor: 'yellow'}}>Nothing yet</div>}
                    {/* JSON.stringify({data,scanTimedOut}) */}
                </div>
            </Col>
        </Row>
    );
};

export default ScanQR;
