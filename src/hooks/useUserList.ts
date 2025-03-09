import { useEffect, useState } from "react";
import { getAllUsers } from "../firebase/collections/user";

export const useUserList = (username: string) => {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);

    const movieQuotes = [
        "May the Force be with you. — Star Wars",
        "I'm gonna make him an offer he can't refuse. — The Godfather",
        "You can't handle the truth! — A Few Good Men",
        "I'll be back. — The Terminator",
        "Here's looking at you, kid. — Casablanca",
        "My precious. — The Lord of the Rings: The Two Towers",
        "Houston, we have a problem. — Apollo 13",
        "There's no place like home. — The Wizard of Oz",
        "You talking to me? — Taxi Driver",
        "I feel the need—the need for speed. — Top Gun",
        "To infinity and beyond! — Toy Story",
        "Why so serious? — The Dark Knight",
        "Hasta la vista, baby. — Terminator 2: Judgment Day",
        "Keep your friends close, but your enemies closer. — The Godfather Part II",
        "Just keep swimming. — Finding Nemo",
        "Life is like a box of chocolates. — Forrest Gump",
        "You shall not pass! — The Lord of the Rings: The Fellowship of the Ring",
        "Say hello to my little friend! — Scarface",
        "It's alive! It's alive! — Frankenstein",
        "I see dead people. — The Sixth Sense"
      ];

      

    useEffect(() => {
        const init = () => {
            fetchUsers();
        }
        return init();
    }, [])


    const fetchUsers = async () => {
        let users = await getAllUsers() as any;
        console.log("username", username)
        
        users = users.filter((user: any) => user.username !== username);
        console.log("users", users)
        setUserList(users);
        setLoading(false)
    }

    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * movieQuotes.length);
        return movieQuotes[randomIndex];
      };

    return { userList, loading, getRandomQuote}

}