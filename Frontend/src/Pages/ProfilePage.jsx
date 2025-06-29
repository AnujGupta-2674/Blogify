import { useState } from 'react';
import useAuthUser from '../hooks/useAuthUser';
import PageLoader from '../Components/PageLoader.jsx';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserBlogs, postBlog } from '../lib/api.js';
import toast from 'react-hot-toast';

const ProfilePage = () => {
    const queryClient = useQueryClient();

    const { authUser } = useAuthUser();
    const [showModal, setShowModal] = useState(false);
    const [blogData, setBlogData] = useState({
        title: '',
        content: '',
        tags: [],
    });

    const { data = [], isLoading } = useQuery({
        queryKey: ['userBlogs'],
        queryFn: getUserBlogs,
        retry: false
    });

    const { mutate: postBlogMutation, isPending } = useMutation({
        mutationFn: postBlog,
        onSuccess: () => {
            queryClient.invalidateQueries(['userBlogs']);
            setShowModal(false);
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Failed to post blog");
        }
    })

    if (isLoading) return <PageLoader />;

    const handleBlogPost = async (e) => {
        e.preventDefault();
        postBlogMutation(blogData);
        setBlogData({ title: '', content: '', tags: [] });
    }

    return (
        <div className='mt-5'>
            {/* User Information */}
            <div className='flex flex-col md:flex-row justify-evenly items-center gap-6'>
                {/* Left: Profile Image and Info */}
                <div className='flex flex-col items-center md:items-start gap-2'>
                    <img
                        src={authUser?.profilePic || "https://avatar.iran.liara.run/public/30.png"}
                        className='rounded-full w-24 h-24 md:w-28 md:h-28'
                        alt="Profile"
                    />
                    <h1 className='text-2xl font-semibold text-center md:text-left'>{authUser?.fullName}</h1>
                    <h1 className='text-xl font-medium text-center md:text-left'>{authUser?.bio}</h1>
                </div>

                {/* Right: Stats Box */}
                <div className='flex justify-around items-center w-full max-w-sm rounded-lg p-4 text-center bg-base-200 gap-6'>
                    <div>
                        <p className='text-xl font-bold'>{data.blogs?.length}</p>
                        <p className='text-sm text-gray-500'>Blogs Posted</p>
                    </div>
                    <div className="border-l border-gray-300 h-10"></div>
                    <div>
                        <p className='text-xl font-bold'>{authUser?.friends?.length}</p>
                        <p className='text-sm text-gray-500'>Friends</p>
                    </div>
                </div>
            </div>

            {/* Post a blog button */}
            <div className='flex justify-center mt-10 items-center'>
                <button
                    className="btn btn-primary px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => setShowModal((prev) => !prev)}
                >
                    Post Blog
                </button>
            </div>

            {/* Modal for Blog Posting */}
            {showModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Create New Blog</h3>
                        <input type="text" required placeholder="Blog Title" className="input input-bordered w-full mb-3" value={blogData.title} onChange={(e) => {
                            setBlogData({ ...blogData, title: e.target.value })
                        }
                        } />
                        <textarea placeholder="Write your blog here..." required className="textarea textarea-bordered w-full h-32 mb-4" value={blogData.content} onChange={(e) => {
                            setBlogData({ ...blogData, content: e.target.value });
                        }} />
                        <input type="text" placeholder="Tag1, Tag2, Tag3" required className="input input-bordered w-full mb-3" value={blogData.tags}
                            onChange={(e) => {
                                const newTags = e.target.value.split(',').map(tag => tag.trim());
                                setBlogData({ ...blogData, tags: newTags });
                            }}
                        />
                        <div className="modal-action">
                            <button
                                className="btn btn-success"
                                disabled={isPending}
                                onClick={(e) => {
                                    handleBlogPost(e);
                                }}
                            >
                                Post
                            </button>
                            <button className="btn" onClick={() => setShowModal((prev) => !prev)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* User Blogs Information */}
            <div className='h-4 bg-base-200 mt-5'></div>
            <div className='mt-10'>
                <h2 className='text-2xl font-semibold mb-4 text-center'>Your Blogs</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {data?.blogs?.length > 0 ? (
                        data.blogs.map((blog, idx) => (
                            <div key={idx} className='card bg-base-100 shadow-md p-4'>
                                <h3 className='text-xl font-bold mb-2'>{blog.title}</h3>
                                <p className='text-sm text-gray-500'>{blog.content.slice(0, 100)}...</p>
                                <div className='flex flex-wrap mt-4'>
                                    {blog.tags.map((tag, tagIdx) => (
                                        <span key={tagIdx} className='badge p-4 badge-secondary mr-1 mt-2'>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-center col-span-full text-gray-500'>No blogs posted yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
