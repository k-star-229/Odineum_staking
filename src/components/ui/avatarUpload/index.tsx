import React from 'react';
import { IconClose } from '../../../utils/Icons';
import styles from './AvatarUpload.module.scss';


declare type PageProps = {
  imageType: string;
  image: File | Blob | null;
  setAvatar: (item: File | Blob) => void;
  deleteAvatar: () => void;
};

const AvatarUpload = ({
  imageType,
  image,
  setAvatar,
  deleteAvatar,
}: PageProps) => (
    <div className='flex justify-center flex-col'>
      <div className={`mt-28 ${styles.avatarContainer}`}>
        <div className={styles.avatarArea}>
          {image && <img src={URL.createObjectURL(image)} alt="avatar" />}
          <div className={styles.btnRemove} onClick={deleteAvatar}>
            <IconClose />
          </div>
        </div>
        <p className="text-white text-center mt-2">
          We recommend an image of at least 400x400.
          <br />
          GIFs work too!
        </p>
      </div>
      <div className={styles.forUpload}>
        <div
          className={`${styles.btnChoose} bg-choose dark:bg-choose-dark rounded-full`}
        >
          {!image && (
            <>
              <input
                type="file"
                id="avatar"
                accept=".jpg, .jpeg, .png, .gif"
                onChange={(e) => {
                  if (e.target.files && e.target.files?.length > 0)
                    setAvatar(e.target.files[0]);
                }}
              />
              <label htmlFor="avatar">Choose file...</label>
            </>
          )}
        </div>
      </div>
    </div>
  );

export default AvatarUpload;
