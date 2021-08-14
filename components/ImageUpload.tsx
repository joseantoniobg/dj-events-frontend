import { useState } from 'react';
import { api } from '@config/index';
import styles from '@styles/Form.module.scss';

export default function ImageUpload({evtId, imageUploaded, token}) {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('files', image);
    formData.append('ref', 'events');
    formData.append('refId', evtId);
    formData.append('field', 'image');

    const res = await api.request({
      url: '/upload',
      data: formData,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })

    if (res.data) {
      imageUploaded()
    }
  }

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  }

  return (
    <div>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        {image && <input type="submit" value="Upload" className="btn" />}
      </form>
    </div>
  )
}
