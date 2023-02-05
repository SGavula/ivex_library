import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  validateEditAdminData,
  validateChangeAdminPassword,
} from "../../../../helpers/validators/adminforms.validator";

import Button from "../../../../utils/Button/Button.util";
import Heading from "../../../../utils/Heading/Heading.util";

const EditAdminProfileComponent = ({
  getAdmin = (f) => f,
  editAdmin = (f) => f,
  authData,
}) => {
  const [credentials, setCredentials] = useState({});
  const [passwords, setPasswords] = useState({});
  const [defaultData, setDefaultData] = useState({});
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(1);
  const history = useHistory();

  useEffect(async () => {
    console.log(authData.user.user_id);
    const res = await getAdmin(authData.user.user_id);
    console.log(res);
    if (res) {
      setDefaultData(res.data.data);
      setCredentials(res.data.data);
    } else {
      console.log("error");
    }
  }, [authData]);

  async function editData() {
    // TODO: Validation
    const validationResults = validateEditAdminData({ ...credentials });
    console.log(validationResults);
    // TODO: Send data
    if (!validationResults) {
      const res = await editAdmin({ ...credentials });
    } else {
      setErrors(validationResults);
    }
  }

  async function editPassword() {
    // TODO: Validation
    const validationResults = validateChangeAdminPassword({ ...passwords });
    console.log(validationResults);
    // TODO: Send data
    if (!validationResults) {
      const data = {
        password: passwords.password1,
        _id: defaultData._id,
      };
      const res = await editAdmin({ ...data });
    } else {
      setErrors(validationResults);
    }
  }

  const handleClickProfile = () => {
    history.push("/profile");
  };

  return (
    <div className="admin-edit-profile">
      <div className="container-lg px-0 space">
        <div>
          <Heading
            title={
              page == 1 ? "Update your informations" : "Update your password"
            }
            subtitle={page == 1 ? "Edit your profile" : "Change your password"}
          />
          <div className="pt-4">
            {page == 1 ? (
              <span
                className="text-small text-odkaz uprava pointer"
                onClick={() => setPage(2)}
              >
                Change your password
              </span>
            ) : (
              <span
                className="text-small text-odkaz uprava pointer"
                onClick={handleClickProfile}
              >
                Back to profile
              </span>
            )}
          </div>
        </div>

        {page == 1 ? (
          <div className="py-5">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="text-normal text-small" htmlFor="name">
                  First Name
                </label>
                <input
                  className="form-control"
                  id="name"
                  type="text"
                  defaultValue={defaultData.first_name}
                  onChange={(e) =>
                    setCredentials((data) => ({
                      ...data,
                      first_name: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-group">
                <label
                  className="text-normal text-small pb-2"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  className="form-control"
                  id="lastName"
                  type="text"
                  defaultValue={defaultData.last_name}
                  onChange={(e) =>
                    setCredentials((data) => ({
                      ...data,
                      last_name: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-group">
                <label className="text-normal text-small" htmlFor="email">
                  Email
                </label>
                <input
                  className="form-control"
                  id="email"
                  type="email"
                  defaultValue={defaultData.email}
                  onChange={(e) =>
                    setCredentials((data) => ({
                      ...data,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
              <span onClick={editData}>
                <Button color="yellow" text="Send" />
              </span>
            </form>
          </div>
        ) : (
          <div className="py-5">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="text-normal text-small" htmlFor="password1">
                  New password
                </label>
                <input
                  className="form-control"
                  id="password1"
                  type="password"
                  placeholder="**********"
                  onChange={(e) =>
                    setPasswords((data) => ({
                      ...data,
                      password1: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="form-group">
                <label className="text-normal text-small" htmlFor="password2">
                  Password confirmation
                </label>
                <input
                  className="form-control"
                  id="password2"
                  type="password"
                  placeholder="**********"
                  onChange={(e) =>
                    setPasswords((data) => ({
                      ...data,
                      password2: e.target.value,
                    }))
                  }
                />
              </div>
              <span onClick={editPassword}>
                <Button color="yellow" text="Submit" />
              </span>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditAdminProfileComponent;
