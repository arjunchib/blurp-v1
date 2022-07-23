/** @jsx h */

import { ActionRow, h, Modal, TextInput } from "blurp";

export default function create() {
  return (
    <Modal title="New recipe">
      <ActionRow>
        <TextInput style="short" label="Name"></TextInput>
      </ActionRow>
      <ActionRow>
        <TextInput style="paragraph" label="Recipe"></TextInput>
      </ActionRow>
    </Modal>
  );
}
