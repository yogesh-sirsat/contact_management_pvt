import { useEffect, useState } from "react";

function CustomInput({ inputLabel, className, placeholder, value, onChange }) {
    const [type, setType] = useState("");

    useEffect(() => {
        if (inputLabel === "E-mail Address" || inputLabel === "E-main 2 Address" || inputLabel === "E-main 3 Address") {
            setType("email");
        } else if (inputLabel === "Home Phone" || inputLabel === "Mobile Phone" || inputLabel === "Business Phone") {
            setType("tel");
        } else if (inputLabel === "Home Postal Code" || inputLabel === "Business Postal Code") {
            setType("number");
        } else if (inputLabel === "Birthday") {
            setType("date");
        } else {
            setType("text");
        }
    }, [inputLabel]);

    return (
        <input
            type={type}
            className={className}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
}

export default CustomInput;