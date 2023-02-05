import React, { useEffect, useState } from "react";
import { validateScriptChangeInfo } from "../../../helpers/validators/scriptforms.validator";
import Button from "../../../utils/Button/Button.util";
import SuccesAlert from "../../../utils/Alerts/SuccessAlert/SuccessAlert.util";
import ErrorAlert from "../../../utils/Alerts/ErrorAlert/ErrorAlert.util";
import LineChart from "../../../utils/LineChart/LineChart";
import Spinner from "../../../utils/Spinner/Spinner.util";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";

const AdminScriptPage = ({
  editScriptInfo = (f) => f,
  setScriptInfo = (f) => f,
  getAllPublishers = (f) => f,
  getAnalyticsForScript = (f) => f,
  deleteScript = (f) => f,
  scriptInfo,
}) => {
  const [errors, setErrors] = useState({});
  const [files, setFiles] = useState({});
  const [publishers, setPublishers] = useState([]);
  const [authors, setAuthors] = useState();
  const [keyword, setKeywords] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [graphData, setGraphData] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const handleCancel = () => setShowModal(false);
  const handleConfirm = async () => {
    setShowModal(false);
    try {
      if (scriptInfo._id) {
        const req = await deleteScript({ script_id: scriptInfo._id });
        if (req.data.status == 200) {
          history.push("/admin/get-all-scripts");
        } else {
          console.log("Some errors");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    const res = await getAllPublishers();
    if (res.status == 200) {
      setPublishers(res.data.data);
    }
  }, []);

  useEffect(async () => {
    if (scriptInfo) {
      setAuthors(scriptInfo.author);
      setKeywords(scriptInfo.keywords);
      const analytics_request = await getAnalyticsForScript({
        publisher_id: scriptInfo.publisher,
        script_id: scriptInfo._id,
      });
      if (analytics_request.data.data) {
        setGraphData(analytics_request.data.data.reverse());
      }
    }
  }, [scriptInfo]);

  async function saveScript() {
    const validationErrors = validateScriptChangeInfo(scriptInfo, files);
    if (!validationErrors) {
      let authorsArray, keywordsArray;
      if (authors.includes(",")) {
        authorsArray = authors.split(",");
        //console.log(authorsArray);
        authorsArray = authorsArray.map(
          Function.prototype.call,
          String.prototype.trim
        );
        //console.log(authorsArray);
      } else if (typeof authors == "object") {
        authorsArray = [...authors];
      } else {
        authorsArray = [authors];
      }
      if (keyword.includes(";")) {
        keywordsArray = keyword.split(";");
        keywordsArray = keywordsArray.map(
          Function.prototype.call,
          String.prototype.trim
        );
      } else if (typeof keyword == "object") {
        keywordsArray = [...keyword];
      } else {
        keywordsArray = [keyword];
      }
      scriptInfo.author = authorsArray;
      scriptInfo.keywords = keywordsArray;
      try {
        const response = await editScriptInfo({
          data: { ...scriptInfo },
          file: { ...files },
        });
        console.log("response Admin: ", response);
        if (response.data.status == 200) {
          setShowSuccessAlert(true);
        } else {
          setShowErrorAlert(true);
        }
      } catch (error) {
        if (error) {
          setShowErrorAlert(true);
        }
      }
    } else {
      setErrors(validationErrors);
    }
  }

  return (
    <div>
      <div className="admin-script-bottom">
        <Modal
          show={showModal}
          onHide={handleCancel}
          backdrop="static"
          keyboard={false}
          dialogClassName="custom-modal"
        >
          <Modal.Header>
            <Modal.Title>Do you want to delete this e-book?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <span onClick={handleConfirm}>
              <Button color="cancel" text="Yes" />
            </span>
            <span onClick={handleCancel}>
              <Button color="agree" text="No" />
            </span>
          </Modal.Footer>
        </Modal>
        <div className="container-lg px-0">
          <div className="row g-0">
            <div className="col-12 col-lg-4 px-0 d-flex flex-column align-items-center align-items-lg-start">
              <div className="img pb-3 pt-4">
                <img
                  src={
                    files.image
                      ? URL.createObjectURL(files.image)
                      : "/img/empty_script.png"
                  }
                  alt="Default script Image"
                />
              </div>
              <div>
                <label htmlFor="file-upload" className="custom-file-upload">
                  Add picture
                </label>
                <input
                  type="file"
                  id="file-upload"
                  onChange={(e) =>
                    setFiles((data) => ({
                      ...data,
                      image: e.target.files.item(0),
                    }))
                  }
                />
                {/* Validator message */}
                {errors.image ? (
                  <span className="error-message">{errors.image}</span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="col-12 col-lg-8 px-0 space">
              <h1 className="text-title text-32 text-bold my-0 pb-3 pt-4">
                Edit e-book
              </h1>
              {/* e.preventDefault() */}
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label className="text-normal text-small pb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="form-control"
                    id="name"
                    type="text"
                    defaultValue={scriptInfo.name}
                    onChange={(e) => {
                      setScriptInfo((info) => ({
                        ...info,
                        name: e.target.value,
                      }));
                    }}
                  />
                  {/* Validator message */}
                  {errors.name ? (
                    <span className="error-message">{errors.name}</span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <label
                    className="text-normal text-small pb-2"
                    htmlFor="author"
                  >
                    Author/s separated by commas:
                  </label>
                  {/* {scriptInfo.author.map((authorName) => {
										return (
											<input
											disabled
											type="text"
											defaultValue={authorName}
											className="form-control"
											id="autor"
											/>
											);
										})} */}
                  <input
                    className="form-control"
                    id="author"
                    type="text"
                    defaultValue={scriptInfo.author}
                    onChange={(e) => {
                      setAuthors(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="text-normal text-small pb-2" htmlFor="year">
                    Publication year
                  </label>
                  <input
                    type="text"
                    id="year"
                    className="form-control"
                    defaultValue={scriptInfo.year}
                    onChange={(e) => {
                      setScriptInfo((info) => ({
                        ...info,
                        year: e.target.value,
                      }));
                    }}
                  />
                </div>

                <div className="form-group">
                  <label
                    className="text-normal text-small pb-2"
                    htmlFor="about"
                  >
                    About e-book
                  </label>
                  <textarea
                    className="form-control"
                    id="about"
                    cols="30"
                    rows="10"
                    defaultValue={scriptInfo.info}
                    onChange={(e) => {
                      setScriptInfo((info) => ({
                        ...info,
                        info: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="form-group">
                  <label
                    className="text-normal text-small pb-2"
                    htmlFor="theme"
                  >
                    Theme
                  </label>
                  <input
                    className="form-control"
                    id="theme"
                    type="text"
                    defaultValue={scriptInfo.category}
                    onChange={(e) => {
                      setScriptInfo((info) => ({
                        ...info,
                        category: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="text-normal text-small pb-2" htmlFor="isbn">
                    ISBN
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="isbn"
                    defaultValue={scriptInfo.isbn}
                    onChange={(e) => {
                      setScriptInfo((info) => ({
                        ...info,
                        isbn: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="text-normal text-small" htmlFor="city">
                    City
                  </label>
                  <input
                    className="form-control"
                    id="city"
                    placeholder="Umpalovicovo"
                    value={scriptInfo.city}
                    onChange={(e) => {
                      setScriptInfo((info) => ({
                        ...info,
                        city: e.target.value,
                      }));
                    }}
                  />
                  {errors.city ? (
                    <span className="error-message">{errors.city}</span>
                  ) : (
                    ""
                  )}
                </div>

                <div className="form-group">
                  <label className="text-normal text-small" htmlFor="keywords">
                    Tags
                  </label>
                  <input
                    className="form-control"
                    id="keywords"
                    placeholder="Managment; marketing; finance"
                    defaultValue={scriptInfo.keywords}
                    onChange={(e) => {
                      setKeywords(e.target.value);
                    }}
                  />
                  {errors.keywords ? (
                    <span className="error-message">{errors.keywords}</span>
                  ) : (
                    ""
                  )}
                </div>

                <div className="form-group">
                  <label
                    className="text-normal text-small"
                    htmlFor="publisher-company"
                  >
                    Publisher's company
                  </label>
                  <input
                    className="form-control"
                    id="publisher-company"
                    placeholder="Umpalovic a spol"
                    value={scriptInfo.publishing}
                    onChange={(e) => {
                      setScriptInfo((info) => ({
                        ...info,
                        publishing: e.target.value,
                      }));
                    }}
                  />
                  {errors.publishing ? (
                    <span className="error-message">{errors.publishing}</span>
                  ) : (
                    ""
                  )}
                </div>

                <div className="form-group">
                  <label
                    className="text-normal text-small"
                    htmlFor="publisher-link"
                  >
                    Website address of publisher (link)
                  </label>
                  <input
                    className="form-control"
                    id="publisher-link"
                    placeholder="https://www.umpalovicaspol.sk"
                    defaultValue={scriptInfo.publishing_link}
                    onChange={(e) => {
                      setScriptInfo((info) => ({
                        ...info,
                        publishing_link: e.target.value,
                      }));
                    }}
                  />
                  {errors.publishing ? (
                    <span className="error-message">{errors.publishing}</span>
                  ) : (
                    ""
                  )}
                </div>

                <div className="form-group">
                  <label
                    className="text-normal text-small pb-2"
                    htmlFor="publisher"
                  >
                    Publisher
                  </label>
                  <select
                    className="form-select"
                    onChange={(e) =>
                      setScriptInfo((data) => ({
                        ...data,
                        publisher: e.target.value,
                      }))
                    }
                  >
                    {publishers.map((publisher) => (
                      <option
                        value={publisher._id}
                        selected={
                          scriptInfo.publisher == publisher._id ? true : false
                        }
                      >
                        {publisher.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Type of Book */}
                <div className="form-group">
                  <label className="text-normal text-small" htmlFor="type">
                    Type of book
                  </label>
                  <div className="radios-wrapper">
                    <div className="d-flex align-items-center position-relative custom-radio">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="free"
                        id="priced"
                        value="true"
                        defaultChecked={!scriptInfo.free}
                        onChange={(e) => {
                          setScriptInfo((data) => ({
                            ...data,
                            free: false,
                          }));
                        }}
                      />
                      <label
                        className="text-odkaz text-small text-medium"
                        htmlFor="priced"
                      >
                        Paid
                      </label>
                    </div>

                    <div className="d-flex align-items-center position-relative custom-radio">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="free"
                        id="freemium"
                        value="true"
                        defaultChecked={scriptInfo.free}
                        onChange={(e) => {
                          setScriptInfo((data) => ({
                            ...data,
                            free: true,
                          }));
                        }}
                      />
                      <label
                        className="text-odkaz text-small text-medium"
                        htmlFor="freemium"
                      >
                        Freemium
                      </label>
                    </div>
                  </div>
                </div>
                {!scriptInfo.free ? (
                  <div className="form-group">
                    <label className="text-normal text-small" htmlFor="price">
                      Price
                    </label>
                    <input
                      className="form-control"
                      id="price"
                      placeholder="Umpalovic a spol"
                      value={scriptInfo.pricing}
                      onChange={(e) => {
                        setScriptInfo((data) => ({
                          ...data,
                          pricing: e.target.value,
                        }));
                      }}
                    />
                    {errors.pricing ? (
                      <span className="error-message">{errors.pricing}</span>
                    ) : (
                      ""
                    )}
                  </div>
                ) : null}

                <div className="form-group">
                  <label className="text-normal text-small" htmlFor="language">
                    Language
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="language"
                    value={scriptInfo.lang}
                    onChange={(e) =>
                      setScriptInfo((data) => ({
                        ...data,
                        lang: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="form-group">
                  <label
                    className="text-normal text-small pb-2"
                    htmlFor="license"
                  >
                    Name of license
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="license"
                    defaultValue={scriptInfo.licence}
                    onChange={(e) => {
                      setScriptInfo((info) => ({
                        ...info,
                        licence: e.target.value,
                      }));
                    }}
                  />
                </div>

                <div className="form-group">
                  <label
                    className="text-normal text-small pb-2"
                    htmlFor="license-link"
                  >
                    Website address of license (link)
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="license-link"
                    defaultValue={scriptInfo.licence_link}
                    onChange={(e) => {
                      setScriptInfo((info) => ({
                        ...info,
                        licence_link: e.target.value,
                      }));
                    }}
                  />
                </div>

                <div className="form-check-wrapper">
                  <div className="d-flex align-items-center position-relative custom-radio">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="published"
                      id="published"
                      value="true"
                      checked={scriptInfo.published}
                      onChange={(e) =>
                        setScriptInfo((data) => ({
                          ...data,
                          published: true,
                        }))
                      }
                    />
                    <label
                      className="text-odkaz text-small text-medium"
                      htmlFor="published"
                    >
                      Published
                    </label>
                  </div>

                  <div className="d-flex align-items-center position-relative custom-radio">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="published"
                      id="unpublished"
                      value="true"
                      checked={!scriptInfo.published}
                      onChange={(e) =>
                        setScriptInfo((data) => ({
                          ...data,
                          published: false,
                        }))
                      }
                    />
                    <label
                      className="text-odkaz text-small text-medium"
                      htmlFor="unpublished"
                    >
                      Unpublished
                    </label>
                  </div>
                </div>

                <div className="change-script-btns">
                  <span onClick={saveScript} className="change-script-btn">
                    <Button color="yellow" text="Save" />
                  </span>
                  <span onClick={(e) => setShowModal(true)}>
                    <Button color="grey" text="Delete" />
                  </span>
                </div>

                {/* {errors.script_edit ? (
									<span>{errors.script_edit}</span>
								) : null} */}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Line Graph */}
      <div className="container-lg">
        {graphData == false ? (
          <Spinner />
        ) : (
          <LineChart chartData={graphData} title="Reading summary" />
        )}
      </div>
    </div>
  );
};

export default AdminScriptPage;
