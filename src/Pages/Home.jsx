import React, { useEffect, useState } from 'react';
import styles from '../Styles/Home.module.css';
import Navbar from '../Component/Navbar';
import BlogCard from '../Component/BlogCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const nav = useNavigate()
    const [blogs, setBlogs] = useState([])

    axios.defaults.withCredentials = true
    const tokenChecker = async () => {

        try {
            const res = await axios.get(`http://localhost:7500/getallblogs`)

            if (!res.data.Token) {
                nav('/')
                localStorage.clear()
            }
            else setBlogs(res.data.AllBlogs)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        tokenChecker()
    })

    return (
        <div>
            <Navbar isLogin={false} />
            <div className={styles.container}>
                <h1>Welcome to BlogApp!</h1>
                <p>Share your thoughts and read amazing content from others.</p>
                <div className={styles.blogs}>
                    {blogs.map((blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;