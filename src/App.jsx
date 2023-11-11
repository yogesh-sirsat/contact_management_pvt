import { useEffect, useState } from "react";
import DisplayedContactList from "./components/DisplayedContactList";
import ContactEditForm from "./components/ContactEditForm";
import EditIcon from "./components/Icons/EditIcon";
import SaveIcon from "./components/Icons/SaveIcon";
import CrossIcon from "./components/Icons/CrossIcon";
import ArrowLeft from "./components/Icons/ArrowLeft";
import { themeChange } from "theme-change";
import ThemesIcon from "./components/Icons/ThemesIcons";

function App() {
  const [contactListData, setContactListData] = useState([]);
  const [displayedContactList, setDisplayedContactList] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isContactEdit, setIsContactEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchContactList = async () => {
    try {
      const response = await fetch("/contacts_file.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to load data");
      }
      const data = await response.json();
      // Adding id based on index to uniquely identify each contact
      const dataWithIds = data.map((contact, index) => ({
        ...contact,
        id: index + 1,
      }));
      setContactListData(dataWithIds);
      setDisplayedContactList(dataWithIds);
    } catch (error) {
      console.error("Error getting contacts:", error);
    }
  };

  useEffect(() => {
    themeChange(false);
    fetchContactList();
  }, []);

  useEffect(() => {
    setDisplayedContactList(contactListData);
  }, [contactListData]);

  useEffect(() => {
    const searchContacts = (query) => {
      const lowerCaseQuery = query.toLowerCase();
      setDisplayedContactList(
        contactListData.filter((contact) =>
          Object.values(contact).some((field) =>
            String(field).toLowerCase().includes(lowerCaseQuery)
          )
        )
      );
    };

    // Debounce the search function
    const debounceSearch = setTimeout(() => {
      searchContacts(searchQuery);
    }, 300);

    // Clean up the timeout on each input change
    return () => clearTimeout(debounceSearch);
  }, [searchQuery, contactListData]);

  const onContactClick = (contact) => {
    setSelectedContact(contact);
    setIsContactEdit(false);
  };

  const onArrowLeftClick = () => {
    setSelectedContact(null);
    setIsContactEdit(false);
  };

  const saveEditedContact = (e, editedContact) => {
    e.preventDefault();
    setContactListData((prevContactListData) =>
      prevContactListData.map((contact) =>
        contact["id"] === editedContact["id"] ? editedContact : contact
      )
    );
    setSelectedContact(editedContact);
    setIsContactEdit(false);
  };

  return (
    <main className="container mx-auto grid lg:grid-cols-2 p-3 h-screen">
      <section
        id="contact-list"
        className={`relative ${
          selectedContact ? "hidden lg:flex" : "flex"
        } flex-col bg-base-200 overflow-auto shadow-xl rounded-xl`}
      >
        <header className="flex flex-row shadow-md bg-secondary">
          <h1 className="break-words 2xs:text-xl text-2xl m-2 mr-0">Contacts List</h1>
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-sm mt-2 btn-ghost">
              <ThemesIcon className={"w-6 h-6"} />
            </label>
            <div
              tabIndex={0}
              className="dropdown-content z-[1] menu p-3 shadow bg-base-200 rounded-box 2xs:w-36 w-52"
            >
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Pick the theme!</span>
                </label>
                <select
                  data-choose-theme
                  className="select"
                  defaultValue="forest"
                >
                  <option value="forest">Forest</option>
                  <option value="black">Black</option>
                  <option value="night">Night</option>
                  <option value="business">Bussiness</option>
                  <option value="pastel">Pastel </option>
                  <option value="wireframe">Wireframe </option>
                  <option value="luxury">Luxury </option>
                  <option value="dracula">dracula </option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-row ml-auto mr-2 w-2/5">
            <input
              type="text"
              placeholder="Search Contacts"
              className="input input-sm w-full my-2"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>
        <DisplayedContactList
          displayedContactList={displayedContactList}
          selectedContactId={selectedContact ? selectedContact["id"] : -1}
          onContactClick={onContactClick}
        />
      </section>
      <section
        id="contact-details"
        className={`relative ${
          selectedContact ? "flex" : "hidden lg:flex"
        } flex-col bg-base-200 overflow-auto shadow-xl rounded-xl`}
      >
        <header className="sticky flex flex-row shadow-md bg-secondary">
          <button
            className="lg:hidden btn btn-ghost btn-sm mt-2"
            onClick={onArrowLeftClick}
          >
            <ArrowLeft className={"w-6 h-6"} />
          </button>
          <h1 className="text-2xl my-2 lg:m-2">
            {isContactEdit ? "Edit Contact" : "Contact Details"}
          </h1>
        </header>
        {selectedContact ? (
          <div className="flex flex-col gap-2 my-2 overflow-auto">
            <div className="grid mx-2 p-3 justify-center bg-neutral rounded-lg relative">
              {isContactEdit ? (
                <div className="flex flex-col gap-2 absolute right-0 top-0 m-2 z-10">
                  <button
                    form="contact-edit-form"
                    type="submit"
                    className="btn btn-sm btn-success"
                  >
                    <SaveIcon className="w-6 h-6" />
                    <span className="2xs:hidden">Save</span>
                  </button>
                  <button
                    form="contact-edit-form"
                    type="reset"
                    className="btn btn-sm btn-error"
                    onClick={() => setIsContactEdit(false)}
                  >
                    <CrossIcon className="w-6 h-6" />
                    <span className="2xs:hidden">Cancel</span>
                  </button>
                </div>
              ) : (
                <button
                  className="btn btn-sm btn-info absolute right-0 top-0 m-2 z-10"
                  onClick={() => setIsContactEdit(true)}
                >
                  <EditIcon className="w-6 h-6" />
                  <span className="2xs:hidden">Edit</span>
                </button>
              )}
              <picture className="avatar justify-center">
                <div className="w-28 sm:w-32 md:w-36 rounded-full">
                  <img
                    src={`https://robohash.org/${selectedContact["E-mail Address"]}/set_set1/bgset_bg1/size=36x36.png?ignoreext=true`}
                  />
                </div>
              </picture>
              <h1 className="text-2xl md:text-3xl break-all">
                {selectedContact["First Name"] +
                  " " +
                  selectedContact["Last Name"]}
              </h1>
            </div>
            <div className="grid gap-2 bg-neutral mx-2 rounded-lg overflow-auto">
              {isContactEdit ? (
                <ContactEditForm
                  selectedContact={selectedContact}
                  saveEditedContact={saveEditedContact}
                />
              ) : (
                <ul className="grid gap-2 p-3 text-lg break-all">
                  {Object.entries(selectedContact).map(([key, value]) =>
                    key !== "id" ? (
                      <li
                        key={key}
                        className={value ? null : "text-neutral-500"}
                      >
                        {key}: {value}
                      </li>
                    ) : null
                  )}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl m-2 inset-x-0 bottom-1/2 absolute text-center">
              No Contact Selected
            </h1>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
