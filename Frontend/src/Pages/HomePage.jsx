import { useQuery } from "@tanstack/react-query"
import PageLoader from "../Components/PageLoader.jsx"
import { getRecommendedBlogs } from '../lib/api.js';

const HomePage = () => {
    const { data = [], isLoading, error } = useQuery({
        queryKey: ["blogs"],
        queryFn: getRecommendedBlogs,
        retry: false
    });

    if (isLoading) <PageLoader />;

    return (
        <>
            {data?.blogs?.map((blog) => (
                <div className="card card-side bg-base-100 shadow-xl mt-5 grid grid-cols-12">
                    <figure className='col-span-12 md:col-span-4'>
                        <img
                            className='size-28 md:size-40 lg:size-50 object-cover rounded-full'
                            src={blog.author?.profilePic || `https://picsum.photos/200/300?random=${blog._id}`}
                            alt="user_image" />
                    </figure>
                    <div className="card-body col-span-12 md:col-span-8">
                        <h2 className="card-title">{blog.title}</h2>
                        <p>{blog.content}</p>
                        <div>
                            {blog.tags.map((tag, idx) => (
                                <span key={idx} className="badge badge-secondary mr-2 p-3">{tag}</span>
                            ))}
                        </div>
                        <p className="font-bold text-xl font-serif tracking-wide hover:text-blue-600 transition duration-200">
                            ~{blog.author.fullName}
                        </p>
                        <p className='text-xs text-gray-500'>{new Date(blog.createdAt).toLocaleDateString()}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary" onClick={() => { setLikes((prev) => prev + 1) }}>Likes</button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default HomePage