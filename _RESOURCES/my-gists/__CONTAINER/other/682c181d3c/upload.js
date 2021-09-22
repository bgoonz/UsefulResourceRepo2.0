const Upload = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [images, setImages] = useState([]);
  // ... rest of the code
  
  
  const handleImageUpload = () => {
    if (!selectedImage) { return; }
    const formData = new FormData();
    formData.append('image', selectedImage);

    uploadImage(formData)
      .then(uploadedImage => {
        setImages([...images, uploadedImage])
      })
    // ... rest of the code
      
  const displayImages = () =>
    images.map(image =>
      <div key={image.cloudinaryId} className="col-md-3">
        <a
          className="d-block mb-4 h-100"
          target="_blank"
          href={image.url} >
          <img className="img-fluid img-thumbnail" src={image.url}/>
        </a>
      </div>
    )
    
    // ... rest of the code
    
    return (
    <>
      <PageTitle text="Upload Image"/>
      // rest of the code ...
      <div className="row text-center text-lg-left">
        { images ? displayImages() : 'There are no images :('}
      </div>
    </>
  )
}

export default Upload;