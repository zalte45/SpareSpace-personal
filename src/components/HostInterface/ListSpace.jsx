import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { updateField } from '../../redux/features/Form/formSlice'
import Page1 from './Pages/Page1'
import Page2 from './Pages/Page2'
import Page3 from './Pages/Page3'
import Page4 from './Pages/Page4'
import Page5 from './Pages/Page5'

const ListSpace = () => {
  const dispatch = useDispatch()
  const [ActivePage, setActivePage] = useState(1)
  const [progress, setProgress] = useState(0)
 
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
    console.log(formData)
  }, [formData])
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
    handleDeleteImage
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
