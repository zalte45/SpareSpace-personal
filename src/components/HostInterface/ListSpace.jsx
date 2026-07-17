import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { updateField, resetForm, loadDraft } from '../../redux/features/Form/formSlice'
import Page1 from './Pages/Page1'
import Page2 from './Pages/Page2'
import Page3 from './Pages/Page3'
import Page4 from './Pages/Page4'
import Page5 from './Pages/Page5'

const ListSpace = () => {
  const dispatch = useDispatch()
  const [ActivePage, setActivePage] = useState(1)
  const [progress, setProgress] = useState(100)
  useEffect(() => {
    console.log(formData)
  }, []);


  const formData = useSelector((state) => state.form)
  const [checkListItems, setCheckListItems] = useState([
    { id: 'title', label: 'Title', completed: false },
    { id: 'description', label: 'Description', completed: false },
    { id: 'category', label: 'Category', completed: false },
    { id: 'address', label: 'Address', completed: false },
    { id: 'images', label: 'Images', completed: false },
    { id: 'details', label: 'Details', completed: false },
    { id: 'availability', label: 'Availability', completed: false },
    { id: 'review', label: 'Review', completed: false }
  ])

  const handleChangeForm = (name, value) => {
    dispatch(
      updateField({
        name,
        value
      })
    )
  }
  // Handle image deletion for interactive demonstration
  const handleFileChange = (e) => {
    try {
      const newfile = Array.from(e.target.files).map((file, index) => ({
        id: formData.images.length + index,
        file
      })
      )
      dispatch(updateField({
        name: "images",
        value: [...formData.images, ...newfile]
      }))
      console.log("img uploaded")
      console.log(formData.images)

    } catch (error) {
      console.error(error)
    }

  }
  useEffect(() => {
    const savedDraft = localStorage.getItem("space_listing_draft");
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        dispatch(loadDraft(parsed));
      } catch (error) {
        console.error("Failed to load draft:", error);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    const titleCompleted = formData.title.trim().length > 0;
    const descCompleted = formData.description.trim().length > 0;
    const categoryCompleted = formData.category !== "";
    const addressCompleted = formData.street.trim().length > 0 &&
      formData.city.trim().length > 0 &&
      formData.state.trim().length > 0 &&
      formData.pincode.trim().length > 0;
    const imagesCompleted = formData.images.length > 0;
    const detailsCompleted = formData.area.trim().length > 0 &&
      formData.price.trim().length > 0 &&
      formData.accessHours !== "";
    const availabilityCompleted = formData.availableFrom !== "" &&
      formData.availableUntil !== "";
    const reviewCompleted = ActivePage === 5;

    const newProgress = (titleCompleted ? 5 : 0) +
      (descCompleted ? 5 : 0) +
      (categoryCompleted ? 5 : 0) +
      (addressCompleted ? 5 : 0) +
      (imagesCompleted ? 20 : 0) +
      (detailsCompleted ? 20 : 0) +
      (availabilityCompleted ? 20 : 0) +
      (reviewCompleted ? 20 : 0);


    setProgress(newProgress);




    setCheckListItems([
      { id: 'title', label: 'Title', completed: titleCompleted },
      { id: 'description', label: 'Description', completed: descCompleted },
      { id: 'category', label: 'Category', completed: categoryCompleted },
      { id: 'address', label: 'Address', completed: addressCompleted },
      { id: 'images', label: 'Images', completed: imagesCompleted },
      { id: 'details', label: 'Details', completed: detailsCompleted },
      { id: 'availability', label: 'Availability', completed: availabilityCompleted },
      { id: 'review', label: 'Review', completed: reviewCompleted }
    ]);
  }, [formData, ActivePage]);


  const handleSaveDraft = () => {
    const draftData = {
      ...formData,
      images: [] // Strip File objects as they cannot be serialized
    };
    localStorage.setItem("space_listing_draft", JSON.stringify(draftData));
    alert("Draft saved to localStorage!");
  };

  const handlePublish = async () => {
    localStorage.removeItem("space_listing_draft");
    dispatch(resetForm());
    alert("Listing published successfully!");
    setActivePage(1);
    const newFormData = new FormData();

    // Images
    formData.images.forEach((img) => {
      newFormData.append("images", img.file);
    });

    // Basic Info
    newFormData.append("title", formData.title);
    newFormData.append("description", formData.description);
    newFormData.append("category", formData.category);

    // Location
    newFormData.append("street", formData.street);
    newFormData.append("city", formData.city);
    newFormData.append("state", formData.state);
    newFormData.append("pincode", formData.pincode);

    // Availability
    newFormData.append("availableImmediately", formData.availableImmediately);
    newFormData.append("availableFrom", formData.availableFrom);
    newFormData.append("availableUntil", formData.availableUntil);

    // Rental
    newFormData.append("minDuration", formData.minDuration);
    newFormData.append("maxDuration", formData.maxDuration);
    newFormData.append("price", formData.price);
    newFormData.append("securityDeposit", formData.securityDeposit);
    newFormData.append("lateFee", formData.lateFee);

    // Policies
    newFormData.append("cancellationPolicy", formData.cancellationPolicy);
    newFormData.append("bookingPrefs", JSON.stringify(formData.bookingPrefs));

    // Space Details
    newFormData.append("area", formData.area);
    newFormData.append("unit", formData.unit);
    newFormData.append("accessHours", formData.accessHours);
    newFormData.append("rules", formData.rules);

    // Amenities
    newFormData.append("amenities", JSON.stringify(formData.amenities));
    try {
      let res = await fetch("http://localhost:3000/api/listing", {
        method: "POST",
        credentials: "include",
        body: newFormData
      })
      if (res.status === 401) {
        let refreshRes = await fetch("http://localhost:3000/api/refreshToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include"
        })
        let res = await fetch("http://localhost:3000/api/listing", {
          method: "POST",
          credentials: "include",
          body: newFormData
        })
        let refreshResData = await refreshRes.json()
        console.log(refreshResData)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteImage = (id) => {
    dispatch(
      updateField({
        name: "images",
        value: formData.images.filter((img) => img.id !== id),
      })
    );
  };

  const commonProps = {
    checkListItems,
    setCheckListItems,
    ActivePage,
    setActivePage,
    progress,
    setProgress,
    formData,
    handleChangeForm,
    handleFileChange,
    handleDeleteImage,
    handleSaveDraft,
    handlePublish
  }


  return (
    <>
      {ActivePage === 1 && <Page1 {...commonProps} />}
      {ActivePage === 2 && <Page2 {...commonProps} />}
      {ActivePage === 3 && <Page3 {...commonProps} />}
      {ActivePage === 4 && <Page4 {...commonProps} />}
      {ActivePage === 5 && <Page5 {...commonProps} />}
    </>
  )
}

export default ListSpace
