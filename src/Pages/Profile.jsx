import { useState } from "react"
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function Profile() {
  const auth  = getAuth()
  const navigate = useNavigate();
  const [changeDetail, SetChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,

  });
  const {name, email} =formData
  function onLogout(){
    auth.signOut()
    navigate("/")
  }
  function onChange(e) {
    setFormData((prevState) =>( {
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit(){
    try {
      if(auth.currentUser.displayName !== name){
        //update display name from firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        })
        // update name in the firebase
        const docRef = doc(db) 
        await updateDoc(docRef,{
          name
        });
      }
      toast.success("Profile details updated");
    } catch (error) {
      toast.error("Could not update the profile details");
    }
  }
  return (
    <>
    
    <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
      <h1 className="text-3xl text-center text-bold text-white mt-6">My Profile</h1>
      <div className="w-full md:w-[50%] mt-6 px-3">
        <form>
          {/*Name Input */}

          <input 
              type="text" 
              id="name" 
              value={name}
              disabled={!changeDetail}
              onChange={onChange}
              className={`w-full px-4 py-2 text-xl text-gray-700
               bg-white border border-gray-300 rounded transition ease-in-out mb-6
               ${changeDetail && "bg-red-200 focus:bg-red-200"}`}/>
              
            

           {/*Email Input */}

           <input type="text" id="email" value={email}
          disabled className="w-full px-4 py-2 text-xl text-gray-700
           bg-white border border-gray-300 rounded transition ease-in-out mb-6" />

          <div className="flex justify-between text-white whitespace-nowrap
          text-sm sm:text-lg mb-6">
            <p className="flex items-center">Do you want to change your name?
              <span 
              onClick={() => {
                changeDetail && onSubmit();
                SetChangeDetail((prevState) => !prevState);
              }}
              className="text-red-600 hover:text-red-700 transition ease-in-out
              duration-200 ml-1 cursor-pointer"
              >
                {changeDetail ? "Apply change" : "Edit"}
              </span>
            </p>
            <p onClick={onLogout} className="text-sensato-blue hover:text-blue-300 transition ease-in-out
              duration-200 cursor-pointer">Sign Out</p>
          </div>
        </form>
      </div>
    </section>

    </>
  )
}
