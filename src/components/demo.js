import {Button, Form, Upload} from "antd";
import FormItem from "antd/es/form/FormItem";
import React, {useState} from "react";
import axios from "axios";
import styled from "styled-components";
import {UploadOutlined} from "@ant-design/icons";
import 'antd/dist/antd.css';
import tw from "twin.macro";

const StyledDiv = styled.div`
  border: none;
`

const Div = styled.div`
  ${tw`
    flex
  
  `}
  
`
const PdfDemo = () =>{

    const [files,setFiles] = useState(null);
    const [imgId , setImgId] = useState("");
    const FormData = require('form-data');


    const beforeUpload = (file) =>{
        setFiles(file);
        console.log(files)
        return false
    }

    const handleSubmit = () => {
        if (files !== null) {
            const formData = new FormData();
            console.log('file', files);
            formData.append('pdf', files)
            console.log("formdata is ", formData.get('pdf'))
            axios.post('https://b7d9-203-88-144-98.in.ngrok.io/api/v1/compress', formData,
            ).then((res) => {
                console.log("response is", res.data.FilePath)
                setImgId(res.data.FilePath)
            })
        }
    }

    return(
        <FormItem>

            <Div>
                <StyledDiv>
                <Upload
                    action="http://localhost:3000/"
                    accept={"image/*"}
                    className="avatar-uploader"
                    listType="picture"
                    beforeUpload={beforeUpload}
                >

                        <Button  title = 'Upload File' icon={<UploadOutlined />} >Click to Upload</Button>
                </Upload>
                </StyledDiv>
                <Button onClick={handleSubmit}>Compress</Button>
            </Div>
        </FormItem>
    )
}

export default PdfDemo;