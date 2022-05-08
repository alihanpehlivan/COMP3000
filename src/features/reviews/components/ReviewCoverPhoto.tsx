import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useUploadFile } from 'react-firebase-hooks/storage';

import { db, storage } from '@/providers/firebase';

import { useReviewCoverPhoto } from '../api/getReviewCoverPhoto';

export interface ReviewCoverPhotoProps {
  reviewId: string;
  isOwner: boolean;
}

export const ReviewCoverPhoto = ({
  reviewId,
  isOwner,
}: ReviewCoverPhotoProps) => {
  const coverPhotoData = useReviewCoverPhoto(reviewId);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const { enqueueSnackbar } = useSnackbar();

  // It would be a good idea to move this function under api folder in the future.
  const uploadCoverPhoto = async (selectedFile: File | undefined) => {
    if (selectedFile) {
      const fileStorageRef = storageRef(
        storage,
        `reviews/${reviewId}/cover.jpg`
      );

      await uploadFile(fileStorageRef, selectedFile, {
        contentType: 'image/jpeg',
      });

      if (error) {
        enqueueSnackbar('Error:' + error.message, {
          variant: 'error',
        });
      } else {
        // Now, get download URL and update the collection's "coverImageURI" field.
        await getDownloadURL(fileStorageRef)
          .then((downloadURI) => {
            const ref = doc(db, `reviews/${reviewId}`);
            updateDoc(ref, { coverImageURI: downloadURI })
              .then(() => {
                // Everything went okay.
                enqueueSnackbar('Cover photo has been uploaded!', {
                  variant: 'success',
                });
              })
              .catch((e) => {
                enqueueSnackbar('Error:' + e.message, {
                  variant: 'error',
                });
              });
          })
          // Rollback the upload on error?
          .catch((e) => {
            enqueueSnackbar('Error:' + e.message, {
              variant: 'error',
            });
          });
      }
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (coverPhotoData.loading) {
    return (
      <Box
        component="img"
        src="https://via.placeholder.com/1920x200.png?text=Loading..."
        width="100%"
        loading="lazy"
      />
    );
  }

  if (coverPhotoData.coverImageURI) {
    if (isOwner) {
      return (
        <React.Fragment>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="cover-photo"
            type="file"
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : undefined;
              uploadCoverPhoto(file);
            }}
          />
          <label htmlFor="cover-photo">
            <Box
              component="img"
              src={coverPhotoData.coverImageURI}
              width="100%"
              sx={{ cursor: 'pointer' }}
              loading="lazy"
            />
          </label>
          <Typography
            variant="subtitle1"
            sx={{ fontSize: '50%', textAlign: 'right' }}
          >
            You can click on the cover photo to update it.
          </Typography>
        </React.Fragment>
      );
    } else {
      return (
        <Box
          component="img"
          src={coverPhotoData.coverImageURI}
          width="100%"
          loading="lazy"
        />
      );
    }
  } else {
    if (isOwner) {
      return (
        <React.Fragment>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="cover-photo"
            type="file"
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : undefined;
              uploadCoverPhoto(file);
            }}
          />
          <label htmlFor="cover-photo">
            <Box
              component="img"
              src="https://via.placeholder.com/1920x200.png?text=Click+to+upload+Cover+Photo"
              width="100%"
              sx={{ cursor: 'pointer' }}
              loading="lazy"
            />
          </label>
          <Typography
            variant="subtitle1"
            sx={{ fontSize: '50%', textAlign: 'right' }}
          >
            You can click on the cover photo to update it.
          </Typography>
        </React.Fragment>
      );
    } else {
      return (
        <Box
          component="img"
          src="https://via.placeholder.com/1920x200.png?text=No+Cover+Photo"
          width="100%"
          loading="lazy"
        />
      );
    }
  }
};
