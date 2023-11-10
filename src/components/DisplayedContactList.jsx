import { useState, useEffect } from "react";
import ContactCard from "./ContactCard";

function DisplayedContactList({
  displayedContactList,
  selectedContactId,
  onContactClick,
}) {
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const CONTACTS_PER_PAGE = 20;

  const handleScroll = (contact_list_container) => {
    const isBottomReached = (
      contact_list_container.scrollHeight -
        contact_list_container.scrollTop -
        contact_list_container.clientHeight <=
      100);
    console.log(isBottomReached);
    if (isBottomReached && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    setTotalPages(Math.ceil(displayedContactList.length / CONTACTS_PER_PAGE));
  }, [displayedContactList.length]);

  return (
    <ol onScroll={(e) => handleScroll(e.target)} id="contact-list-container" className="overflow-y-auto grid gap-2 my-2">
      {displayedContactList
        .slice(0, currentPage * CONTACTS_PER_PAGE)
        .map((contact, id) => (
          <ContactCard
            key={id}
            id={id}
            contact={contact}
            isSelectedContact={
              selectedContactId === contact["id"]
            }
            onContactClick={onContactClick}
          />
        ))}
    </ol>
  );
}

export default DisplayedContactList;
