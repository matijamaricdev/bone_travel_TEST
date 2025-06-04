"use client";
import { useRouter } from "next/navigation";
import SideBar from "./SideBar";
import Pagination from "../common/Pagination";
import { cars, features } from "@/data/cars";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import DatePickerComponent from "@/components/common/DatePicker";
import PlacePicker from "@/components/common/PlacePicker";
import TimePickerComponent from "@/components/common/TimePicker";
import PlaceFinderBlank from "@/components/common/PlaceFinderBlank";

export default function PassengerDetails() {
  const [passengerDetails, setPassengerDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    passengersCount: "",
    luggageCount: "",
    notes: "",
  });

    const [distance, setDistance] = useState("0.00");  
    const [placeInput, setPlaceInput] = useState("");
    const [origin, setOrigin] = useState(null); // Optional: could be from PlacePicker
    const [destination, setDestination] = useState(null);
    const BASE_PRICE = 40;
  const PER_KM_PRICE = 1.2;
  const totalPrice = Math.max(BASE_PRICE, distance * PER_KM_PRICE).toFixed(2);

  const router = useRouter(); // Initialize router for programmatic navigation

  useEffect(() => {
    // Focus event
    document
      .querySelectorAll(
        ".form-comment input, .form-comment textarea, .form-comment select"
      )
      ?.forEach(function (element) {
        element?.addEventListener("focus", function () {
          this?.closest(".form-group").classList.add("focused");
        });
      });

      // Set default origin ONLY
    setOrigin({
      lat: 45.8150, // e.g., Zagreb center
      lng: 15.9819,
    });
  
    // Keep this part for preserving the input
    const params = new URLSearchParams(window.location.search);
    const inputValue = params.get("input");
    if (inputValue) {
      setPlaceInput(inputValue);
    };
  

    // Blur event
    document
      .querySelectorAll(
        ".form-comment input, .form-comment textarea, .form-comment select"
      )
      ?.forEach(function (element) {
        element.addEventListener("blur", function () {
          var inputValue = this.value;
          if (inputValue === "") {
            this.classList.remove("filled");
            this.closest(".form-group").classList.remove("focused");
          } else {
            this.classList.add("filled");
          }
        });
      });

    // Check for pre-filled inputs
    document
      .querySelectorAll(
        ".form-comment input, .form-comment textarea, .form-comment select"
      )
      ?.forEach(function (element) {
        if (element?.value !== "") {
          element?.closest(".form-group").classList.add("focused");
          element.classList.add("filled");
        }
      });
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setPassengerDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  // Handle form submission and navigation
  const handleContinue = () => {
    // Construct the query parameters from the form data
    const queryParams = new URLSearchParams(passengerDetails).toString();

    // Navigate to the booking-payment page with the query parameters
    router.push(`/booking-payment?${queryParams}`);
  };

  return (
    <div className="box-row-tab mt-50">
      <div className="box-tab-left">
        <div className="box-content-detail">
          <h3 className="heading-24-medium color-text mb-30 wow fadeInUp">
            Passenger Details
          </h3>
          <div className="form-contact form-comment wow fadeInUp">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="fullname">
                      Name
                    </label>
                    <input
                      className="form-control"
                      id="firstName"
                      type="text"
                      value={passengerDetails.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="lastname">
                      Last Name
                    </label>
                    <input
                      className="form-control"
                      id="lastName"
                      type="text"
                      value={passengerDetails.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      className="form-control"
                      id="email"
                      type="text"
                      value={passengerDetails.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      className="form-control"
                      id="phone"
                      type="text"
                      value={passengerDetails.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="mt-30"></div>
          <h3 className="heading-24-medium color-text mb-30 wow fadeInUp">
            Options
          </h3>
          <div className="form-contact form-comment wow fadeInUp">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="passengers">
                      Passengers
                    </label>
                    <select
                      className="form-control"
                      id="passengersCount"
                      value={passengerDetails.passengersCount}
                      onChange={handleInputChange}
                    >
                      <option value=""></option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="luggage">
                      Luggage
                    </label>
                    <select
                      className="form-control"
                      id="luggageCount"
                      value={passengerDetails.luggageCount}
                      onChange={handleInputChange}
                    >
                      <option value=""></option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="notes">
                      Notes to driver
                    </label>
                    <textarea
                      className="form-control"
                      id="notes"
                      rows="5"
                      value={passengerDetails.notes}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="mt-30 mb-120 wow fadeInUp">
            <button
              className="btn btn-primary btn-primary-big w-100"
              onClick={handleContinue}
            >
              Continue
              <svg
                className="icon-16 ml-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="box-tab-right">
      <div className="sidebar">
        <div className="d-flex align-items-center justify-content-between wow fadeInUp">
          <h6 className="text-20-medium color-text">Ride Summary</h6>
        </div>
        <div className="mt-20 wow fadeInUp">
          <ul className="list-routes">
            <li>
              <span className="location-item">A </span>
              <span className="info-location text-14-medium">
              <PlacePicker onSelect={setOrigin} />
              </span>
            </li>
            <li>
              <span className="location-item">B </span>
              <span className="info-location text-14-medium"><PlaceFinderBlank 
                    onSelect={setDestination}
                    defaultValue={placeInput}
                  /></span>
            </li>
          </ul>
        </div>
        <div className="mt-20 wow fadeInUp">
          <ul className="list-icons">
            <li>
              <span className="icon-item icon-plan"> </span>
              <span className="info-location text-14-medium">
                <DatePickerComponent />
              </span>
            </li>
            <li>
              <span className="icon-item icon-time"></span>
              <span className="info-location text-14-medium"><TimePickerComponent /></span>
            </li>
          </ul>
        </div>
        <div className="mt-20 wow fadeInUp">
          <div className="box-map-route">
          <iframe
                className="map-contact"
                src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d11120.727283665392!2d16.142688!3d45.827642000000004!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDXCsDQ5JzM3LjAiTiAxNsKwMDgnMzIuNiJF!5e0!3m2!1sen!2sus!4v1744805782391!5m2!1sen!2sus"
                style={{ border: "0px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
             ></iframe>
          </div>
          <div className="box-info-route">
            <div className="info-route-left">
              <span className="text-14 color-grey">Total Distance</span>
              <span className="text-14-medium color-text">
                {totalPrice} €
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
}
