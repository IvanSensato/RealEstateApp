import { useEffect, useState } from "react"
import { getAuth, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { collection, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import {FcHome  } from "react-icons/fc";
import ListingItem from "../components/ListingItem";

export default function Profile() {
  const auth  = getAuth()
  const navigate = useNavigate();
  const [changeDetail, SetChangeDetail] = useState(false);
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
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
  useEffect(()=>{
    async function fetchUserListings(){
      setLoading(true);
      const listingRef = collection(db, "listings");
      const q =query(listingRef, where("userRef", "==",auth.currentUser.uid),
      orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc)=> {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);

    }
    fetchUserListings();
  }, [auth.currentUser.uid])

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
        <button className="text-white w-full bg-sensato-blue
        uppercase px-7 py-3 text-sm font-medium rounded shadow-md
        hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800" type="submit">
          <Link className="flex justify-center items-center" to ="/create-listing">
          <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />
          Sell or rent your home
          </Link>
        </button>
      </div>
    </section>
    <div className="text-white max-w-6xl px-3 mt-6 mx-auto">
      {!loading && listings.length > 0 && (
        <>
        <h2 className="text 2xl text-center font-semibold">My Listings</h2>
        <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl-:grid-cols-4
        2xl-grid-cols-5 mt-6 mb-6">
          {listings.map((listings)=>(
            < ListingItem 
            key={listings.id}
            id={listings.id}
            listing={listings.data}
            />
          ))}
        </ul>
        </>
      )}
    </div>
    </>
    
  )
}
