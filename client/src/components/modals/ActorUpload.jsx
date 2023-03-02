import React, { useState } from "react";
import { createActor } from "../../api/actor";
import { useNotification } from "../../hooks";
import ActorForm from "../form/ActorForm";
import ModalContainer from "./ModalContainer";

const ActorUpload = ({ visible, onClose, maxContainer }) => {
  const { updateNotification } = useNotification();
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (actorInfo) => {
    setBusy(true);

    const { error, actor } = await createActor(actorInfo);
    setBusy(false);
    if (error) return updateNotification("error", error);
    updateNotification("success", "Actor created successfully!");
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} maxContainer={false}>
      <ActorForm
        onSubmit={handleSubmit}
        title="Create New Actor"
        btnTitle="Create"
        loading={busy}
      />
    </ModalContainer>
  );
};

export default ActorUpload;
