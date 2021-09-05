import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import UploadIcon from '@material-ui/icons/CloudUpload';
import moment from 'moment-timezone'
import axios from 'axios';
import {SnackBarAndAlert} from 'components';

import { GET_S3_SIGNED_URL } from 'services/mutations';

const s3BaseUrl = 'https://rollinow-images.s3.amazonaws.com';


function UploadMediaComponent({ maxFiles = 1, afterUpload, location, uploadProgress, setUploadProgress, ...props }) {
    const [error, setError] = useState(false);
    const [link, setLink] = useState('')
    const [file, setFiles] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [getS3SignedURL, { data: s3UrlData }] = useMutation(GET_S3_SIGNED_URL)
    const { getRootProps, getInputProps } = useDropzone({ onDropAccepted, accept: 'image/jpeg, image/png', maxFiles, ...props });

    useEffect(() => {
        if (s3UrlData?.getS3SignedURL && file) {
            setUploading(true)
            axios
                .put(s3UrlData.getS3SignedURL, file, {
                    onUploadProgress: (progress) => setUploadProgress((progress.loaded / progress.total) * 100),
                })
                .then(() => {
                    afterUpload(link)
                })
                .finally(() => {
                    setUploading(false)
                    setUploadProgress(0)
                })
                .catch(function (error) {
                    setError(error);
                })
        }
        // eslint-disable-next-line
    }, [s3UrlData])

    useEffect(() => {
        if (file) {
            const key = `${location}/${moment().format('YYYYMMDD')}-${file.name}`
            const link = s3BaseUrl + `/${key}`
            setLink(link)
            getS3SignedURL({
                variables: {
                    key,
                    contentType: file.type,
                },
            })
        }
        // eslint-disable-next-line
    }, [file])

    function onDropAccepted(files) {
        setFiles(files[0]);
    }

    return (
        <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />

            <IconButton disabled={uploading} className='bg-gradient-1' size='small' >
                {
                    uploading ?
                        <CircularProgress variant='determinate' value={parseInt(uploadProgress)} /> :
                        <UploadIcon style={{ color: 'black', fontSize: 30 }} />
                }
            </IconButton>
            {error && (
                <SnackBarAndAlert
                    open={Boolean(error)}
                    onClose={() => {
                        setError(false);
                    }}
                    type="error"
                >
                    {`Failed:  ${error?.message}`}
                </SnackBarAndAlert>
            )}
        </div>

    );
}

export default UploadMediaComponent;
