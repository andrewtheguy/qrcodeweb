import React from 'react';
import {useState, useEffect} from 'react';
import {Col, Container, Form, FormControl, FormFile, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import QrScanner from 'qr-scanner';
import DataSection from './DataSection';

type MyProps = {
    // using `interface` is also ok
    onFileChange: Function;
};
type MyState = {
    //count: number; // like this
};

class FileInput extends React.Component<MyProps, MyState> {
    private fileInput: any;

    constructor(props: MyProps) {
        super(props);
        this.fileInput = React.createRef();
    }

    handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        //alert(
        //    `Selected file - ${this.fileInput.current.files[0].name}`);
        this.props.onFileChange(this.fileInput.current.files[0]);
    }

    render() {
        return (
                <div>
                    Upload file:
                    <input type="file" ref={this.fileInput}/>
                <hr/>
                <button onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
            </div>
        );
    }
}

const PictureQR: React.FC = () => {

    //const testPic = 'data:image/png;base64,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';

    const [file,setFile] = useState<File | null>(null);
    const [data,setData] = useState<string | null>(null);

    const changeFile = (file: File) => {
        setFile(file);
    }

    useEffect(() => {
        if(file) {
            QrScanner.scanImage(file)
                .then(result => setData(result))
                .catch(error => alert(error || 'No QR code found, make sure to crop the picture to show qr code only.'));
        }
    }, [file]);

    return (
        <>
        <Row>
            <Col>
                <div>
    {data ? <div id="qr-reader-results"><h1>data:</h1><DataSection data={data}></DataSection>
        <p><button onClick={()=>setData(null)}>Upload Again</button></p>
    </div> : <FileInput onFileChange={changeFile}/>}
                </div>
            </Col>
        </Row>
        </>
            );
};

export default PictureQR;
