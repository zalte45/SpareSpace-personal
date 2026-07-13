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
    console.log(progress)
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

    console.log(detailsCompleted)
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

  const handlePublish = () => {
    localStorage.removeItem("space_listing_draft");
    dispatch(resetForm());
    alert("Listing published successfully!");
    setActivePage(1);
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
