import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, User } from "firebase/auth";
import { auth } from "./firebaseConfig";

export default class FirebaseService {
    private provider: GoogleAuthProvider;

    constructor() {
        this.provider = new GoogleAuthProvider();
    }

    signIn = async (credentials: { email: string, password: string }): Promise<User | null> => {
        try {
            const { email, password } = credentials;
            const result = await signInWithEmailAndPassword(auth, email, password);
            return result.user;
        } catch (error: any) {
            const firebaseErrors = [
                'auth/user-not-found',
                'auth/invalid-email',
                'auth/invalid-credential'];
            if (firebaseErrors.includes(error.code)) throw error.code;
            throw error;
        }
    };

    signInGoogle = async (): Promise<User | null> => {
        try {
            const result = await signInWithPopup(auth, this.provider);
            return result.user;
        } catch (error: any) {
            //const errorCode = error.code;
            //const errorMessage = error.message;
            //const email = error.customData.email;
            //const credential = GoogleAuthProvider.credentialFromError(error);
            throw error;
        }
    };

    logOut = async (): Promise<boolean> => {
        try {
            await signOut(auth);
            return true;
        } catch (error) {
            throw error;
        }
    };
}
