import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Pagination from "./components/Pagination";
import Posts from "./components/Posts";

function App() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(10);

	useEffect(() => {
		const fetchPost = async () => {
			setLoading(true);
			const { data } = await axios.get(
				"https://jsonplaceholder.typicode.com/posts"
			);
			setPosts(data);
			setLoading(false);
		};
		fetchPost();
	}, []);

	// Get Current Posts
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div className="container mt-5">
			<h1 className="text-primary mb-3 text-center">My Blog</h1>
			<Posts posts={currentPosts} loading={loading} />
			<Pagination
				postsPerPage={postsPerPage}
				totalPosts={posts.length}
				paginate={paginate}
			/>
		</div>
	);
}

export default App;
