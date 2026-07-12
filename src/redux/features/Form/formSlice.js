  import { createSlice } from "@reduxjs/toolkit";

  const initialState = {
    title: "",
    description: "",
    category: "",
    images:[],

    // Location
    street: "",
    city: "",
    state: "",
    pincode: "",

    // Availability
    availableImmediately: true,
    availableFrom: "2026-07-15",
    availableUntil: "2026-12-31",

    // Rental
    minDuration: "1 Month",
    maxDuration: "12 Months",
    price: "2500",
    securityDeposit: "5000",
    lateFee: "250",

    // Policies
    cancellationPolicy: "moderate",

    bookingPrefs: {
      instantBooking: true,
      manualApproval: false,
      weekendBookings: true,
      longTermOnly: false,
      recurringRentals: true,
      autoRenewal: true,
    },

    // Space Details
    area: "",
    unit: "sq ft",
    accessHours: "",
    rules: "",

    amenities: {
      climateControlled: true,
      cctvSurveillance: true,
      lockAvailable: true,
      lighting: true,
      electricity: false,
      fireSafety: true,
      insurance: false,
      loadingAssistance: false,
    },
  };

  const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
      updateField: (state, action) => {
        const { name, value } = action.payload;
        state[name] = value;
      },

      updateAmenity: (state, action) => {
        const { name, value } = action.payload;
        state.amenities[name] = value;
      },

      updateBookingPref: (state, action) => {
        const { name, value } = action.payload;
        state.bookingPrefs[name] = value;
      },

      resetForm: () => initialState,
    },
  });

  export const {
    updateField,
    updateAmenity,
    updateBookingPref,
    resetForm,
  } = formSlice.actions;

  export default formSlice.reducer;