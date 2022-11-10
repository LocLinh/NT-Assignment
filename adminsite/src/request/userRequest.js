import axios from "axios";

const GetAllUser = () => {
    axios.get("https://localhost:7151/account/Users");
};

export { GetAllUser };
