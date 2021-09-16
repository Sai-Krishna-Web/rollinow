import React, { useState } from 'react';
import MediaFilesComponent from './media-files.component';
import { useAddShowFormContext } from 'contexts';
function MediaFiles() {
    const [mediaType, setMediaType] = useState();
    const [uploadProgress, setUploadProgress] = useState(0);
    const { addShowForm, setAddShowForm } = useAddShowFormContext();

    const mediaFiles = {
        backdropUrl: 'Backdrop',
        thumbnailUrl: 'Thumbnail',
        trailerUrl: 'Trailer'
    };

    const afterUpload = (link) => {
        mediaType && setAddShowForm((addShowForm) => ({ ...addShowForm, [mediaType]: link }));
    };

    return (
        <MediaFilesComponent
            mediaFiles={mediaFiles}
            setMediaType={setMediaType}
            uploadProgress={uploadProgress}
            setUploadProgress={setUploadProgress}
            addShowForm={addShowForm}
            afterUpload={afterUpload}
            mediaType={mediaType}
        />
    );
}

export default MediaFiles;
