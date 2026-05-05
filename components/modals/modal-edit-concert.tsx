"use client";

import {Button, Modal} from "@heroui/react";
import ConcertForm  from "@/components/forms/concert-form";
export default function Default(props : any) {
    const {concert} = props;
  return (
    <Modal>
      <Button variant="secondary">EDIT</Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Edit</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
                <ConcertForm concert={concert} />
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}