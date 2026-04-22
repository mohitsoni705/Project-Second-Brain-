import axios from "axios"
import { BACKEND_URL } from "../config"
import { useParams } from "react-router-dom"
import { Card } from "../components/ui/Card";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";

interface Content {
    _id: string;
    type: string;
    title: string;
    link: string;
}


export const SharedBrain = () => {
    const [data, setData] = useState<Content[]>([]);
    const [name , setName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { sharelink } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${sharelink}`);
                setData(response.data.content);
                setName(response.data.username);
            } catch (err) {
                console.error("Error fetching shared brain:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [sharelink])
    console.log(data);
    

    return (
        <div className="flex flex-col">
            <div className="flex-1 p-4 md:ml-72 min-h-screen bg-gray-200">

                {/* Shared Brain Banner */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-xl p-5 mb-4 shadow-md">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold tracking-tight">🧠 Shared Brain</h1>
                        <p className="text-purple-100 text-sm">
                            <span className="font-bold ">{name.toUpperCase()} </span> shared their Second Brain with you — explore their saved content below.
                        </p>
                        <div className="mt-2 inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1 text-sm w-fit">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            {data.length} item{data.length !== 1 ? "s" : ""} shared
                        </div>
                    </div>
                </div>

                {/* Top Actions (disabled) */}
                <div className="flex flex-col sm:flex-row justify-between sm:justify-end gap-3 mb-4">
                    <Button
                        variant="primary"
                        startIcon={<PlusIcon size="md" />}
                        size="sm"
                        text="Add Content"
                        disabled={true}
                    />
                    <Button
                        variant="secondary"
                        startIcon={<ShareIcon size="lg" />}
                        size="sm"
                        text="Share Brain"
                        disabled={true}
                    />
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center h-48">
                        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="flex flex-col items-center justify-center h-48 text-gray-500">
                        <span className="text-5xl mb-3">😕</span>
                        <p className="text-lg font-medium">Could not load shared brain.</p>
                        <p className="text-sm">The link may be invalid or expired.</p>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && data.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-48 text-gray-500">
                        <span className="text-5xl mb-3">🗂️</span>
                        <p className="text-lg font-medium">This brain is empty.</p>
                        <p className="text-sm">No content has been shared yet.</p>
                    </div>
                )}

                {/* Cards Grid */}
                {!loading && !error && data.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {data.map(({ _id, type, title, link }) => (
                            <Card
                                key={_id}
                                contentId={_id}
                                type={type}
                                title={title}
                                link={link}
                            />
                        ))}
                    </div>
                )}

            </div>
        </div>
    )
}
