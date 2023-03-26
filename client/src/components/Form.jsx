import React, { useState } from "react";
const monthList = ["January","February","March","April","May","June","July","August","September","October","November","December"]

function Form() {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [appointmentDate, setAppointmentDate] = useState();

  const [bookState,setBookState]=useState("none");

  function handleChange(event) {
    let field = event.target.name;
    let val = event.target.value;
    setDetails((prevValue) => {
      return { ...prevValue, [field]: val };
    });
  }

  function handleChangeDate(event) {
    let val = event.target.value;
    let appointment = new Date(Date.parse(val + " EDT"));
    console.log(appointment);
    // console.log(typeof(appointment));
    setAppointmentDate(appointment);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(details, appointmentDate);
    setDetails({ name: "", email: "", phone: "" });
    // setAppointmentDate("")
    const nameOfUser = details.name;
    const emailOfUser = details.email;
    const phoneOfUser = details.phone;
    const parameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nameOfUser,
        emailOfUser,
        phoneOfUser,
        appointmentDate,
      }),
    };

    const res = await fetch("http://localhost:5000/register", parameters);
    const data = await res.json();
    if (res.status === 400 || !data) {
      console.log("booking failed");
      setBookState("fail");
    //   alert("booking failed");
    } else {
      console.log("booking successful");
      setBookState("done");
    //   alert("booking successful");
    }
  }

  function handleAlertMessage(event){
    setBookState("none");
  }

  return (
    <>
    {
        bookState!=="none" && 
        <div className={bookState==="fail" ? "alert fail" : "alert done"}>
            <span className="closebtn" onClick={handleAlertMessage}>&times;</span> 
            {bookState==="fail" && "Booking Failed! Try Again"}
            {bookState==="done" && `Congrats! you have scheduled an appointment on ${appointmentDate.getDate()} ${monthList[appointmentDate.getMonth()]}`}
        </div>
    }
    <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <form onSubmit={handleSubmit}>

            <div className="formbold-mb-5">
              <label htmlFor="name" className="formbold-form-label">{" "}Full Name{" "}</label>
              <input type="text" name="name" onChange={handleChange} value={details.name} id="name" placeholder="Full Name" className="formbold-form-input" required/>
            </div>

            <div className="formbold-mb-5">
              <label htmlFor="phone" className="formbold-form-label">{" "}Phone Number{" "}</label>
              <input id="phone" placeholder="Enter your phone number" className="formbold-form-input" type="number" name="phone" onChange={handleChange} value={details.phone} required/>
            </div>

            <div className="formbold-mb-5">
              <label htmlFor="email" className="formbold-form-label">{" "}Email Address{" "}</label>
              <input type="email" name="email" id="email" placeholder="Enter your email" className="formbold-form-input" onChange={handleChange} value={details.email} required/>
            </div>

            <div className="flex flex-wrap formbold--mx-3">
                <div className="w-full sm:w-half formbold-px-3">
                    <div className="formbold-mb-5 w-full">
                        <label htmlFor="date" className="formbold-form-label">{" "}Choose Date{" "}</label>
                        <input id="date" className="formbold-form-input" type="date" name="date" onChange={handleChangeDate} required/>
                    </div>
                </div>
            </div>

            <div>
              <button className="formbold-btn">Book Appointment</button>
            </div>

          </form>
        </div>
    </div>
    </>
  );
}

export default Form;
