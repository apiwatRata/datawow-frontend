"use client";

import {Button, Modal} from "@heroui/react";

export default function Default(props : any) {
  const { action, handleConfirm, concert  } = props;
  return (
    <Modal>
      <Button variant={action === "book"? "secondary" : "danger"}>{action === "book"? "Booking": "Cancel"}</Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>{action === "book"? "Booking This?": "Cancel This"}</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button className="w-full" slot="close" onClick={() => handleConfirm(action, concert)}>
                Yes
              </Button>
              <Button className="w-full" slot="close">
                No
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}