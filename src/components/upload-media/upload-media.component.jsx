import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import UploadIcon from '@material-ui/icons/CloudUpload';
import Typography from '@material-ui/core/Typography';
import moment from 'moment-timezone';
import axios from 'axios';
import { SnackBarAndAlert } from 'components';
import { S3BaseUrl } from 'utilities/constants';
import { GET_S3_SIGNED_URL } from 'services/mutations';

function UploadMediaComponent({
    maxFiles = 1,
    afterUpload,
    location,
    uploadProgress,
    setUploadProgress,
    disabled = false,
    ...props
}) {
    const [error, setError] = useState(false);
    const [link, setLink] = useState('');
    const [file, setFiles] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [getS3SignedURL, { data: s3UrlData }] = useMutation(GET_S3_SIGNED_URL, {
        onError: (error) => {
            setError(error);
        }
    });
    const { getRootProps, getInputProps } = useDropzone({
        onDropAccepted,
        accept: ['image/*', 'video/*'],
        maxFiles,
        disabled,
        ...props
    });

    useEffect(() => {
        if (s3UrlData?.getS3SignedURL && file) {
            setUploading(true);
            axios
                .put(s3UrlData.getS3SignedURL, file, {
                    onUploadProgress: (progress) => setUploadProgress((progress.loaded / progress.total) * 100)
                })
                .then(() => {
                    afterUpload(link);
                })
                .finally(() => {
                    setUploading(false);
                    setUploadProgress(0);
                })
                .catch(function (error) {
                    setError(error);
                });
        }
        // eslint-disable-next-line
    }, [s3UrlData]);

    useEffect(() => {
        if (file) {
            const key = `${location}/${moment().format('YYYYMMDD')}-${file.name}`;
            const link = S3BaseUrl + `/${key}`;
            setLink(link);
            getS3SignedURL({
                variables: {
                    key,
                    contentType: file.type
                }
            });
        }
        // eslint-disable-next-line
    }, [file]);

    function onDropAccepted(files) {
        setFiles(files[0]);
    }

    return (
        <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />

            <IconButton disabled={uploading || disabled} className="bg-gradient-1" size="small">
                {uploading ? (
                    <CircularProgress variant="determinate" value={parseInt(uploadProgress)} />
                ) : (
                    <UploadIcon color={disabled ? 'disabled' : 'primary'} />
                )}
            </IconButton>
            {disabled && (
                <Typography variant="subtitle2" color="textSecondary">
                    please select an option
                </Typography>
            )}
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
