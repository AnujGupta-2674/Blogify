import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getRecommendedUsers, getOutgoingFriendReqs, sendFriendRequest } from "../lib/api.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UsersIcon, UserPlusIcon, CheckCircleIcon } from "lucide-react";

const FriendsPage = () => {
    const queryClient = useQueryClient();
    const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

    const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
        queryKey: ["users"],
        queryFn: getRecommendedUsers,
    });

    const { data: outgoingFriendReqs = [] } = useQuery({
        queryKey: ["outgoingFriendReqs"],
        queryFn: getOutgoingFriendReqs
    })

    const { mutate: sendRequestMutation, isPending } = useMutation({
        mutationFn: sendFriendRequest,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] })
    })

    useEffect(() => {
        const outgoingIds = new Set();
        if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
            outgoingFriendReqs.forEach((req) => {
                outgoingIds.add(req.recipient._id);
            });
            setOutgoingRequestsIds(outgoingIds);
        }
    }, [outgoingFriendReqs]);

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto space-y-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Explore New Friends</h2>
                    <Link to="/notifications" className="btn btn-outline btn-sm">
                        <UsersIcon className="mr-2 size-4" />
                        Friend Requests
                    </Link>
                </div>

                <section>
                    {loadingUsers ? (
                        <div className="flex justify-center py-12">
                            <span className="loading loading-spinner loading-lg" />
                        </div>
                    ) : recommendedUsers.length === 0 ? (
                        <div className="card bg-base-200 p-6 text-center">
                            <h3 className="font-semibold text-lg mb-2">No recommendations available</h3>
                            <p className="text-base-content opacity-70">
                                Check back later for new partners!
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recommendedUsers.map((user) => {
                                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);
                                return (
                                    <div
                                        key={user._id}
                                        className="card bg-base-200 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="card-body p-5 space-y-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <div className="avatar size-16 rounded-full">
                                                    <img src={user.profilePic} alt={user.fullName} />
                                                </div>
                                            </div>
                                            {user.fullName && <p className="text-sm opacity-70">{user.fullName}</p>}
                                            {user.bio && <p className="text-sm opacity-70">{user.bio}</p>}

                                            {/* Action button */}
                                            <button
                                                className={`btn w-full mt-2 ${hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                                                    } `}
                                                onClick={() => sendRequestMutation(user._id)}
                                                disabled={hasRequestBeenSent || isPending}
                                            >
                                                {hasRequestBeenSent ? (
                                                    <>
                                                        <CheckCircleIcon className="size-4 mr-2" />
                                                        Request Sent
                                                    </>
                                                ) : (
                                                    <>
                                                        <UserPlusIcon className="size-4 mr-2" />
                                                        Send Friend Request
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

export default FriendsPage;