/* eslint-disable react/jsx-key */
import { useState } from "react";
import AnswersList from "./AnswersList";

function Survey() {
  const [open] = useState(false); //Ignore this state

  const [formData, setFormData] = useState({
    colour: "",
    activity: [],
    text: "",
    name: "",
    email: "",
  });

  const [answersList, setAnswerList] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.email === "") {
      console.log("Define your email!");
      return;
    }
    resetForm();
    setAnswerList([...answersList, formData]);
  }

  const handleChange = (event) => {
    const {name, value, type } = event.target;
    if (type === "checkbox") {
      setFormData((prev) => {
        const activity = prev.activity.includes(value) ? prev.activity.filter((item) => item !== value) : [...prev.activity, value];
        return { ...prev, [name] : activity}
      })
    } else {
      setFormData({...formData, [name] : value});
    }
  }

  const resetForm = () => {
    setFormData(formData);
  }

  

  return (
    <main className="survey">
      <section className={`survey__list ${open ? "open" : ""}`}>
        <h2>Answers list</h2>
        <AnswersList answersList={answersList} />
      </section>
      <section className="survey__form">
        <form className="form" onSubmit={handleSubmit}>
        <h2>Tell us what you think about your rubber duck!</h2>
          <div className="form__group radio">
            <h3>How do you rate your rubber duck colour?</h3>
              {[1, 2, 3, 4].map((index) => (
                <label>
                  <input key={index} type="radio" name="colour" value={index} onChange={handleChange} />
                  {index}
                </label>
              ))}
          </div>
          <div className="form__group">
            <h3>How do you like to spend time with your rubber duck</h3>
              {["Bathing", "Playing", "Cooking", "Sleeping"].map((activity) => (
                <label>
                  <input type="checkbox" name="activity" value={activity} onChange={handleChange}/>
                  {activity}
                </label>
              ))}
          </div>
        <label>
        What else have you got to say about your rubber duck?
        <textarea
          name="text"
          cols="30"
          rows="10"
          onChange={handleChange}
          value={formData.text}
        ></textarea>
        </label>
        <label>
          Put your name here (if you feel like it):
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name} />
        </label>
        <label>
          Leave us your email pretty please??
          <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}  />
          </label>
          <input className="form__submit" type="submit" value="Submit Survey!" />
        </form>
      </section>
    </main>
  );
}

export default Survey;
