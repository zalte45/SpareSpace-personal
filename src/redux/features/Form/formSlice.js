  import { createSlice } from "@reduxjs/toolkit";

  const initialState = {
    images:[],
    title: "",
    description: "",
    category: "",

    // Location
    street: "",
    city: "",
    state: "",
    pincode: "",

    // Availability
    availableImmediately: false,
    availableFrom: "",
    availableUntil: "",

    // Rental
    minDuration: "1 Month",
    maxDuration: "12 Months",
    price: "",
    securityDeposit: "",
    lateFee: "",

    // Policies
    cancellationPolicy: "moderate",

    bookingPrefs: {
      instantBooking: false,
      manualApproval: false,
      weekendBookings: false,
      longTermOnly: false,
      recurringRentals: false,
      autoRenewal: false,
    },

    // Space Details
    area: "",
    unit: "sq ft",
    accessHours: "",
    rules: "",

    amenities: {
      climateControlled: false,
      cctvSurveillance: false,
      lockAvailable: false,
      lighting: false,
      electricity: false,
      fireSafety: false,
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

      loadDraft: (state, action) => {
        return {
          ...state,
          ...action.payload,
          images: []
        };
      },

      resetForm: () => initialState,
    },
  });

  export const {
    updateField,
    updateAmenity,
    updateBookingPref,
    loadDraft,
    resetForm,
  } = formSlice.actions;

  export default formSlice.reducer;