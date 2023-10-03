import {Modal, Box} from '@mui/material';
import './ModalComponent.css'; 

export default function ModalComponent({time, onClose, open, turns}){
    return(
      <div>
        <Modal open={open} onClose={onClose}>
        <Box className="box">
          <div className="modal-title" variant="h6" component="h2">
          Congratulation!!
          </div>
          <div className="modal-description">
            Time:{" "}
            {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
            {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
            {("0" + ((time / 60000) % 60)).slice(-2)}
            <br/>
            Turns: {turns}
          </div>
          <button className="button-modal" onClick={onClose}>OK</button>
        </Box>
      </Modal>
      </div>
    )
}