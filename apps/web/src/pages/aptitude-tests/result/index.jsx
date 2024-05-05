import React, { useEffect, useState } from 'react';
import { useFetch } from "@/hooks/useFetch";
import Layout from '@/Layouts/Layout';
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table";

const AttemptsList = () => {
    const [attempts, setAttempts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch attempts data from the API endpoint using useEffect
    const { get } = useFetch();
    useEffect(() => {
        const fetchAttempts = async () => {
            try {
                const { data } = await get("/aptitude-tests/results");
                console.log(data?.attempts);
                setAttempts(data?.attempts);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch attempts:", error);
                setError(error);
                setLoading(false);
            }
        };

        fetchAttempts();
    }, [get]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Layout>
            <div className="w-full max-w-6xl mx-auto py-8">
                <div className="overflow-x-auto rounded-lg border dark:border-gray-800">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Test</TableHead>
                                <TableHead>Score</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Correct</TableHead>
                                <TableHead>Incorrect</TableHead>
                                <TableHead>Attempted</TableHead>
                                <TableHead>Created At</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {attempts.map((attempt) => (
                                <TableRow key={attempt.id} className={`bg-${attempt.id % 2 === 0 ? 'gray-50' : 'white'} dark:bg-gray-${attempt.id % 2 === 0 ? '900' : '950'}`}>
                                    <TableCell>{attempt.id}</TableCell>
                                    <TableCell>{attempt.user?.name}</TableCell>
                                    <TableCell>{attempt.test?.name}</TableCell>
                                    <TableCell>{attempt.score}</TableCell>
                                    <TableCell>{attempt.total}</TableCell>
                                    <TableCell>{attempt.correct}</TableCell>
                                    <TableCell>{attempt.incorrect}</TableCell>
                                    <TableCell>{attempt.attempted}</TableCell>
                                    <TableCell>{new Date(attempt.createdAt).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </Layout>
    );
};

export default AttemptsList;
