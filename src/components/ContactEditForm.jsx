import { useState } from "react";
import CustomInput from "./CustomInput";

function ContactEditForm({ selectedContact, saveEditedContact }) {
  const [editedContact, setEditedContact] = useState(selectedContact);

  return (
    <>
      <form
        id="contact-edit-form"
        onSubmit={(e) => saveEditedContact(e, editedContact)}
        className="p-3"
      >
        {Object.entries(editedContact).map(([key, value]) =>
          key === "id" ? null : (
            <div key={key} className="form-control">
              <label className="label">
                <span className="label-text">{key}</span>
              </label>
              {key === "Gender" ? (
                <select
                  defaultValue="Not Selected"
                  className="select"
                  onChange={(e) => {
                    setEditedContact({
                      ...editedContact,
                      [key]: e.target.value,
                    });
                  }}
                >
                  <option disabled value="Not Selected">
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : key === "Notes" ? (
                <textarea
                  className="textarea"
                  placeholder={`Type ${key} here...`}
                  value={value}
                  onChange={(e) => {
                    setEditedContact({
                      ...editedContact,
                      [key]: e.target.value,
                    });
                  }}
                />
              ) : (
                <CustomInput
                  inputLabel={key}
                  placeholder={`Type ${key} here...`}
                  className="input w-full"
                  value={value}
                  onChange={(e) => {
                    setEditedContact({
                      ...editedContact,
                      [key]: e.target.value,
                    });
                  }}
                />
              )}
            </div>
          )
        )}
      </form>
    </>
  );
}

export default ContactEditForm;
