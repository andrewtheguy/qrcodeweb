import React from 'react';
import { useState,useEffect } from 'react';
import {Col, Form, FormControl, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";

const QRCode = require('qrcode');

function download(dataurl: string, filename: string) {
    var a = document.createElement("a");
    a.href = dataurl;
    a.setAttribute("download", filename);
    a.click();
}

const GenerateQR: React.FC = () => {
    const [svg,setSvg] = useState<string | null>(null);
    const [text,setText] = useState('');

    const HandleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text=e.target.value;

        setText(text);
    }


    const downloadPng = () =>{
        if(text !==''){
            QRCode.toDataURL(text, {type: 'image/png'}, function (err: Error, url: string) {
                if (err) throw err;
                download(url,'qr.png')
            })
        }
    }


    useEffect(() => {
        if(text!==''){
            QRCode.toString(text,{type:'svg'},function (err: Error, svgdata: string) {
                if (err) throw err;
                setSvg(svgdata);
            });
        }else{
            setSvg(null);
        }
    }, [text]);


    return (
        <Container>
            <Row>
                <Col>
                    <div className="form-group">
                        <label htmlFor="qr_text">Enter Text: <button onClick={()=> setText('')}>Clear</button></label>
                        <textarea className="form-control" id="qr_text" rows={3}  onChange={HandleChangeText}  value={text}></textarea>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div>{typeof svg === 'string' ?
                        <div style={{maxWidth: 320}}><div dangerouslySetInnerHTML={{ __html: svg!}}></div>
                            <button onClick={downloadPng}>Download PNG</button>
                        </div> :<span>No text entered</span>}</div>
                </Col>
            </Row>
        </Container>
    );
};

export default GenerateQR;
