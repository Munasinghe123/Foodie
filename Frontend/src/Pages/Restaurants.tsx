import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

function Restaurants() {

    const [users, setUsers] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    useEffect(() => {

        const fetchStats = async () => {
            try {
                const response = await axios.get('http://localhost:7000/api/allUsers', { withCredentials: true });
                setUsers(response.data.users);

                const restaurantsResponse = await axios.get('http://localhost:7000/api/restaurant/allRestaurants', { withCredentials: true });
                const allRestaurants = restaurantsResponse.data.restaurants;

                const approved = allRestaurants.filter((rest: any) => rest.status === "approved");
                setRestaurants(approved);

            } catch (error) {
                console.error("Error fetching admin stats:", error);
            }
        };
        fetchStats();
    }, [])
    return (
        <div className='h-screen'>
            restaurants

            {restaurants.map((data: any) => {
                return (
                    <div key={data.id}>
                        <h1> name {data.restaurantName}</h1>
                        <p>category {data.category}</p>
                        <p>phone {data.phone}</p>
                        <p>address{data.address}</p>

                    </div>
                )
            })}

        </div>
    )
}

export default Restaurants
