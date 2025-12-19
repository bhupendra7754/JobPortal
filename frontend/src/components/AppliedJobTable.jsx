import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    if (allAppliedJobs.length <= 0) {
        return (
            <div className="text-center py-6 text-gray-500">
                You haven't applied any job yet.
            </div>
        )
    }

    return (
        <>
            {/* ================= DESKTOP / TABLET VIEW ================= */}
            <div className="hidden sm:block overflow-x-auto">
                <Table className="min-w-full">
                    <TableCaption>A list of your applied jobs</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Job Role</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob.job?.title}</TableCell>
                                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="text-right">
                                    <Badge
                                        className={
                                            appliedJob?.status === "rejected"
                                                ? "bg-red-400"
                                                : appliedJob.status === "pending"
                                                ? "bg-gray-400"
                                                : "bg-green-400"
                                        }
                                    >
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* ================= MOBILE VIEW (CARD / COLUMN LAYOUT) ================= */}
            <div className="sm:hidden flex flex-col gap-4">
                {allAppliedJobs.map((appliedJob) => (
                    <div
                        key={appliedJob._id}
                        className="border rounded-lg p-4 bg-white shadow-sm"
                    >
                        <div className="flex flex-col gap-2 text-sm">
                            <p>
                                <span className="font-semibold">Date:</span>{" "}
                                {appliedJob?.createdAt?.split("T")[0]}
                            </p>
                            <p>
                                <span className="font-semibold">Job Role:</span>{" "}
                                {appliedJob.job?.title}
                            </p>
                            <p>
                                <span className="font-semibold">Company:</span>{" "}
                                {appliedJob.job?.company?.name}
                            </p>
                            <div className="mt-2">
                                <Badge
                                    className={
                                        appliedJob?.status === "rejected"
                                            ? "bg-red-400"
                                            : appliedJob.status === "pending"
                                            ? "bg-gray-400"
                                            : "bg-green-400"
                                    }
                                >
                                    {appliedJob.status.toUpperCase()}
                                </Badge>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default AppliedJobTable

