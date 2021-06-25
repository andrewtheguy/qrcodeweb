import React from 'react';
import { useState,useEffect } from 'react';
import {Col, Form, FormControl, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Canvg, {
    presets, RenderingContext2D
} from 'canvg';

const QRCode = require("qrcode");

function download(dataurl: string, filename: string) {
    var a = document.createElement("a");
    a.href = dataurl;
    a.setAttribute("download", filename);
    a.click();
}

const GenerateQR: React.FC = () => {
    const [qrData,setQrData] = useState<string | null>(null);
    const [text,setText] = useState<string>('');

    const HandleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text=e.target.value;

        setText(text);
    }

    // const downloadPng = () =>{
    //     if(svg !==null) {
    //
    //         //memory leak, should clean up
    //         let canvas = document.getElementById('draw-qr-save') as HTMLCanvasElement;
    //         if (!canvas) {
    //             canvas = document.createElement('canvas');
    //             canvas.width=320;
    //             canvas.height=320;
    //             canvas.id='draw-qr-save';
    //         }
    //         const ctx = canvas.getContext('2d') as RenderingContext2D;
    //
    //
    //         const DOMURL = window.URL || window.webkitURL || window;
    //
    //         const img = new Image();
    //         const svgBlob = new Blob([svg], {type: 'image/svg+xml'});
    //         const url = DOMURL.createObjectURL(svgBlob);
    //         //console.log(svgBlob);
    //
    //         img.onerror = function (e) {
    //             alert("error downloading");
    //         }
    //         // won't work in firefox https://bugzilla.mozilla.org/show_bug.cgi?id=700533
    //         // drawImage() fails silently when drawing an SVG image without @width or @height
    //         img.onload = function () {
    //             ctx.drawImage(img, 0, 0);
    //             DOMURL.revokeObjectURL(url);
    //             const imgURI = canvas
    //                 .toDataURL('image/png');
    //             console.log(imgURI);
    //             download(imgURI, "qrcode.png")
    //         };
    //
    //         img.src = url;
    //
    //     }
    // }


    // useEffect(() => {
    //     if(text!==''){
    //         const svgdata = new QRCode({
    //             //width: 300,
    //             //height: 300,
    //             padding: 1,
    //             content: text,
    //             join: true,
    //             container: "svg-viewbox" //Useful but not required
    //         }).svg();
    //         setSvg(svgdata);
    //     }else{
    //         setSvg(null);
    //     }
    // }, [text]);

    useEffect(() => {
        if(text!=='') {
            QRCode.toDataURL(text, {margin: 1, width: 320},(err: any, url: string) => {
                if (err){
                    console.error(err);
                }else {
                    //console.log(url);
                    setQrData(url);
                }
            });
        } else{
                 setQrData(null);
        }
    }, [text]);

    return (
        <>
            <Row>
                <Col>
                    <div className="form-group">
                        <label htmlFor="qr_text">Enter Text: <button onClick={()=> setText('')}>Clear</button></label>
                        <textarea autoCorrect="off" autoCapitalize="none" className="form-control" id="qr_text" rows={3}  onChange={HandleChangeText}  value={text}></textarea>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div>{typeof qrData === 'string' ?
                        <div>
                        <img src={qrData}/>
                        {/*<button onClick={downloadPng}>Download PNG</button>*/}
                        </div> :<span>No text entered</span>}</div>
                </Col>
            </Row>
        </>
    );
};

export default GenerateQR;
