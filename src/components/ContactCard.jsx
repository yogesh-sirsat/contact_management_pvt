function ContactCard({ contact, id, isSelectedContact, onContactClick }) {
  return (
    <li
      key={id}
      className={`flex flex-row mx-2 p-3 gap-3 ${
        isSelectedContact ? "bg-neutral-focus" : "bg-neutral"
      } rounded-md hover:bg-neutral-focus`}
      onClick={() => {
        onContactClick(contact);
      }}
    >
      <picture className="avatar">
        <div className="w-12 h-12 rounded-full">
          <img
            src={`https://robohash.org/${contact["E-mail Address"]}/set_set1/bgset_bg1/size=36x36.png?ignoreext=true`}
          />
        </div>
      </picture>
      <summary className="break-all">
        <p>
          {contact["First Name"] + " " + contact["Last Name"]}{" "}
          {contact["Display Name"] ? " (" + contact["Display Name"] + ")" : ""}
        </p>
        <p>{contact["Home Phone"]}</p>
        <p>{contact["E-mail Address"]}</p>
      </summary>
    </li>
  );
}

export default ContactCard;
