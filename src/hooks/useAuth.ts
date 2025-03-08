import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../../config/firebase"
import { useNavigate } from "react-router-dom"
export const useAuth = () => {

    const nav = useNavigate()

    const handleGoogleLogin = async () => {
        try {
          const result = await signInWithPopup(auth, googleProvider)
          console.log('result', result)
          const user: any = result.user
          sessionStorage.setItem("access_token", user.accessToken || "")
          sessionStorage.setItem("user", JSON.stringify(user))
          nav("/") // Redirect to the main page
        } catch (error) {
          console.error("Google Sign-In Error:", error)
        }
      }

    return { handleGoogleLogin }
}