import { useState } from "react"
import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai"
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import {useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const[formData, setFormData] = useState({
    name:"",
    email: "",
    password: "",
  })
  const{name, email, password} = formData;
  const navigate = useNavigate();
  function onChange(e){
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  async function onSubmit(e){
    e.preventDefault()

    try {
      const auth = getAuth()
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.updateCurrentUser, {
        displayName: name
      })
      const user = userCredentials.user;
      const formDataCopy = {...formData};
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db,"users", user.uid), formDataCopy);
     // toast.success("Sign Up was successful");
      navigate("/")

    } catch (error) {
      toast.error("Something went wrong with the registration")
    }
  }
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold text-white">Sign Up</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto ">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img src="https://images.unsplash.com/photo-1609770231080-e321deccc34c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80"
          alt="key"
          className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
         <form onSubmit={onSubmit}>
         <input type="text" id="name" 
          value={name} onChange={onChange}
          placeholder="Full name"
          className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
          />
          <input type="email" id="email" 
          value={email} onChange={onChange}
          placeholder="Email address"
          className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
          />
          <div className="relative">
           <input type={showPassword ? "text" : "password" }
           id="password"
          value={password} onChange={onChange}
          placeholder="Password"
          className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
          />
          {showPassword ?(
            <AiFillEyeInvisible className="absolute right-3 top-3 text-xl cursor-pointer"
            onClick={()=>setShowPassword((prevState)=>!prevState)}/>
          ): <AiFillEye className="absolute right-3 top-3 text-xl cursor-pointer"
          onClick={()=>setShowPassword((prevState)=>!prevState)}/> }
          </div>
          <div className="mb-6 flex justify-between whitespace-nowrap text-sm sm:text-lg text-white">
            <p>Have a account ?
              <Link className="text-green-300 hover:text-green-600
              transition duration-200 ease-in-out ml-1" to="/sign-in">Sign in</Link>
            </p>
            <p>
              <Link className="text-sensato-blue hover:text-blue-800
              transition duration-200 ease-in-out ml-1" to="/forgot-password"> Forgot password?
              </Link>
            </p>
          </div>
          <button className="text-white w-full bg-[#103FD5] px-7 py-3 text-sm font-medium
          uppercase rounded shadow-md hover:bg-blue-800 transition duration-150 ease-in-out
          hover:shadow-lg active:bg-blue-800" type="submit">Sign Up</button>
           <div className="my-4 flex items-center before:border-t before:flex-1 before:border-gray-300
            after:border-t after:flex-1 after:border-gray-300">
          <p className="text-white text-center font-semibold mx-4"> OR </p>
          </div>
          <OAuth />
          </form> 
        </div>
      </div>
    </section>
  )
}
