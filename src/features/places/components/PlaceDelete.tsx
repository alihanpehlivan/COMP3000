import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { doc, deleteDoc } from 'firebase/firestore';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { db } from '@/providers/firebase';

interface PlaceDeleteProps {
  placeId: string;
  isWindowOpen: boolean;
  setCurrentOpenDialogName: React.Dispatch<React.SetStateAction<string>>;
  setWindowLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PlaceDelete = ({
  placeId,
  isWindowOpen,
  setCurrentOpenDialogName,
  setWindowLoading,
}: PlaceDeleteProps) => {
  const [isFormLoading, setFormLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  async function onSubmit(placeId: string) {
    setFormLoading(true);
    setWindowLoading(true);

    const ref = doc(db, 'places', placeId);

    await deleteDoc(ref)
      .then(() => {
        navigate('/app/places');
        enqueueSnackbar('Place has been deleted successfully.', {
          variant: 'success',
        });
      })
      .catch((error) => {
        window.location.reload();
        enqueueSnackbar('Place deletion failed with: ' + error.code, {
          variant: 'error',
        });
      });

    setFormLoading(false);
    setWindowLoading(false);
    setCurrentOpenDialogName('');
  }

  return (
    <Dialog
      open={isWindowOpen}
      onClose={() => {
        setCurrentOpenDialogName('');
      }}
    >
      <DialogTitle>Delete this place?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This is an irreversible action. Do you want to continue?
        </DialogContentText>
        <DialogActions>
          <Button
            onClick={() => {
              setCurrentOpenDialogName('');
            }}
            variant="outlined"
          >
            Cancel
          </Button>
          <LoadingButton
            loading={isFormLoading}
            type="submit"
            color="primary"
            variant="contained"
            onClick={() => onSubmit(placeId)}
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
