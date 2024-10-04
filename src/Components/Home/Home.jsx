import { useSelector } from "react-redux";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa"; // Importing icons
import { createRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify"; // Importing toast
import 'react-toastify/dist/ReactToastify.css';
import { BounceLoader } from "react-spinners";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";



const Home = () => {
  // Getting data from redux
  const data = useSelector((state) => state.counter.value);

  // react loader 
  const [loading, setLoading] = useState(false);

  // variables declaration
  const [isEditing, setIsEditing] = useState(false);

  // default img
  const defaultSrc = "https://i.ibb.co.com/8KPHvKM/soniafb.jpg";

  // Updating profile picture function
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef();

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };

  // firebase setup
  const storage = getStorage();
  const auth = getAuth();


  // handle save
  const handleSave = () => {
    if (!cropData || cropData === "#") {
      toast.error("Please crop the image before saving.");
      return;
    }

    setLoading(true); // Show loader spinner
    const storageRef = ref(storage, 'updateProfile/' + data.uid + '.png');
    
    // upload file
    uploadString(storageRef, cropData, 'data_url').then((snapshot) => {
      setLoading(false); // Hide loader spinner after upload

      // Show success toast message
      toast.success("Profile picture updated successfully!");

      console.log('Uploaded a data_url string!');
      
      // Get download URL of updated profile picture
      getDownloadURL(storageRef)
      .then ((url)=>{
          onAuthStateChanged(auth, (user) => {
            updateProfile(auth.currentUser, {
              photoURL: url
            }).then(() => {
              console.log('Profile picture updated successfully')
            })
            location.reload();
        });
        
      })
    }).catch((error) => {
      setLoading(false); // Hide loader spinner in case of error

      // Show error toast message
      toast.error("Failed to upload the image. Please try again.");
      console.error(error);
    });
  }
  

  return (
    <>
      <div className="w-[1400px] sm-[640px] md:[768px] lg:[1024px] xl:[1280px] xxl:[1536px] min-h-screen bg-yellow-200 flex items-center justify-center">
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg text-center w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] relative">
          {/* Profile Picture with Edit Icon */}
          <div className="relative">
            <img
              src={data?.photoURL}
              alt="User"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4"
            />
            {/* Edit Icon */}
            <FaEdit
              onClick={() => setIsEditing(true)}
              className="absolute top-0 right-[260px] bg-white text-gray-600 text-3xl p-1 rounded-full hover:bg-gray-200 cursor-pointer"
            />
          </div>

          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
            {data?.displayName}
          </h1>
          <p className="text-md md:text-lg text-gray-600">{data?.email}</p>
        </div>
      </div>

      {/* Edit Profile Picture */}
      {
        isEditing &&
        <div className="w-full h-screen bg-[rgba(0,0,0,0.36)] absolute top-0 left-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
            {/* Save and Close Icons */}
            <div className="flex justify-between mb-4">
              {/* Loader or Save Icon */}
              {loading ? (
                <div className="text-center mb-4"><BounceLoader size={30} color="#3B82F6" /></div>
              ) : (
                cropData !== "#" && cropData && (
                  <FaSave
                    onClick={handleSave}
                    className="text-blue-500 text-2xl cursor-pointer transition-transform duration-300 hover:rotate-360"
                    title="Save"
                  />
                )
              )}

              <FaTimes
                onClick={() => setIsEditing(false)}
                className="text-red-500 text-2xl cursor-pointer transition-transform duration-300 hover:rotate-360"
                title="Close"
              />
            </div>

            {/* File input and buttons */}
            <div style={{ width: "100%" }}>
              <input type="file" onChange={onChange} className="mb-4" />
              <button className="mb-4">Use default img</button>
              <Cropper
                ref={cropperRef}
                style={{ width: "100%", height: "200px" }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false}
                guides={true}
              />
            </div>

            {/* Cropped image */}
            <div className="box mt-4">
              <h1 className="mb-2 flex justify-between items-center">
                <span>Crop</span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={getCropData}>
                  Crop Image
                </button>
              </h1>
              <img style={{ width: "100px", height: "100px" }} src={cropData} alt="cropped" />
            </div>
          </div>
        </div>
      }

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
};

export default Home;
