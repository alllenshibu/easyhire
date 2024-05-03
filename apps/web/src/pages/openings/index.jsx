import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/Layouts/Layout';
import { useFetch } from '@/hooks/useFetch';
import { Input } from '@/components/ui/input';
import { Card, CardTitle, CardDescription, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Openings() {
    const router = useRouter();
    const { get } = useFetch();

    // State for holding openings data and search query
    const [openings, setOpenings] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch openings data on component mount
    useEffect(() => {
        const fetchOpenings = async () => {
            try {
                const { data, status } = await get('/openings', {});
                if (status !== 200) {
                    throw new Error('Failed to fetch openings');
                }
                setOpenings(data?.openings);
            } catch (err) {
                console.error(err);
            }
        };
        fetchOpenings();
    }, []);

    // Filtered openings based on search query
    const filteredOpenings = openings.filter((opening) =>
        opening.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opening.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opening.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Layout>
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-6 lg:space-y-10">
                        <div className="w-full max-w-xl">
                            <form className="relative">
                                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5" />
                                <Input
                                    className="w-full rounded-md border border-gray-200 bg-white px-12 py-3 text-white shadow-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900  "
                                    placeholder="Search job openings..."
                                    type="search"
                                    // Update search query state on input change
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </form>
                        </div>

                        <div className="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                            {filteredOpenings.map((opening) => (
                                <Card
                                    key={opening.id}
                                    onClick={() => router.push(`/openings/${opening.id}`)}
                                >
                                    <CardHeader>
                                        <CardTitle>{opening.role}</CardTitle>
                                        <CardDescription>
                                            {opening.company.name} is hiring for {opening.role} role. {opening.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button size="sm" variant="outline">More Info</Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

// SearchIcon component
function SearchIcon(props) {
    return (
        <svg {...props}
             xmlns="http://www.w3.org/2000/svg"
             width="24"
             height="24"
             viewBox="0 0 24 24"
             fill="none"
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.3-4.3" />
        </svg>
    );
}
