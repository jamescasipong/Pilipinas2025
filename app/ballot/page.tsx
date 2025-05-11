"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PhFlag } from "@/components/ph-flag"
import { getAllCandidates } from "@/lib/candidates-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllParties } from "@/lib/candidates-data"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import Header from "@/components/header"
import {toast} from "sonner";
import { Input } from "@/components/ui/input"

export default function BallotPage() {
    const router = useRouter()
    const candidates = getAllCandidates()
    const parties = getAllParties()
    const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    // Reset error and success messages when selection changes
    useEffect(() => {
        setError(null)
        setSuccess(null)

        if (selectedCandidates.length <= 12){

        }

    }, [selectedCandidates])

    const handleCandidateToggle = (candidateId: string) => {
        setSelectedCandidates((prev) => {
            if (prev.includes(candidateId)) {
                return prev.filter((id) => id !== candidateId)
            } else {
                // If already selected 12 candidates, show error
                if (prev.length >= 12) {
                    toast.info("You can only select up to 12 candidates. Please deselect one before adding another or you could submit your ballot.", {
                        action: {
                            label: 'Submit',
                            onClick: async () => {
                                await handleSubmit()
                            }
                        },
                    });

                    setError("You can only select up to 12 candidates. Please deselect one before adding another.")
                    return prev
                }
                return [...prev, candidateId]
            }
        })
    }

    const handleSubmit = async () => {
        if (selectedCandidates.length < 12) {
            setError("Please select at least 12 candidates before submitting your ballot.")
            return
        }

        try {
            toast.loading("Creating ballot...")

            setLoading(true)
            // Create a JWT token with the selected candidates
            const response = await fetch("/api/ballot/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ selectedCandidates }),
            })

            if (!response.ok) {
                throw new Error("Failed to create ballot")
            }

            const { token } = await response.json()

            // Show success message
            setSuccess("Your ballot has been created successfully!")
            toast.dismiss()

            // Redirect to the share page with the token
            router.push(`/ballot/share/${token}`)

            setLoading(false)
        } catch (error) {
            toast.dismiss()
            toast.error("An error occurred while creating your ballot. Please try again.")
            setSuccess(null)
            setLoading(false)
            setError("An error occurred while creating your ballot. Please try again.")
            console.error(error)
        }
    }

    // Filter candidates based on search term
    const filteredCandidates = candidates.filter(candidate =>
        candidate.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.balotaNumber.includes(searchTerm)
    )

    // Filter candidates by party for the tabs
    // const filterCandidatesByParty = (party: string) => {
    //
    //     console.log("party", party)
    //
    //     let partyCandidates = filteredCandidates.filter(candidate =>
    //         candidate.partyList.toUpperCase().includes(party.toUpperCase())
    //     )
    //
    //     if (party === "others") {
    //         partyCandidates = filteredCandidates.filter(candidate =>
    //             !parties.slice(0, 5).some(p =>
    //                 candidate.partyList.toUpperCase().includes(p.toUpperCase())
    //             )
    //         )
    //     }
    //
    //     return partyCandidates
    // }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
            <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}></Header>

            <main className="container mx-auto py-12 px-4 md:px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-ph-blue mb-2">
                            Create Your <span className="text-ph-red">Ballot</span>
                        </h1>
                        <div className="h-1 w-32 bg-ph-yellow mx-auto mb-4 rounded-full"></div>
                        <p className="text-gray-700 max-w-2xl mx-auto">
                            Select at least 12 candidates you plan to vote for in the upcoming Senate election. You can then generate
                            a shareable link, QR code, or save your selections as an image.
                        </p>
                    </div>

                    {error && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {success && (
                        <Alert className="mb-6 border-green-500 text-green-700 bg-green-50">
                            <CheckCircle2 className="h-4 w-4" />
                            <AlertTitle>Success</AlertTitle>
                            <AlertDescription>{success}</AlertDescription>
                        </Alert>
                    )}

                    <div className="bg-white p-4 rounded-lg border-2 border-ph-yellow shadow-lg mb-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-ph-blue">Selected Candidates: {selectedCandidates.length}/12</h2>
                            <Button
                                onClick={handleSubmit}
                                disabled={selectedCandidates.length < 12 || loading}
                                className="bg-ph-red hover:bg-red-700"
                            >
                                Generate Ballot
                            </Button>
                        </div>
                        {selectedCandidates.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {selectedCandidates.map((id) => {
                                    const candidate = candidates.find((c) => c.balotaNumber === id)
                                    return (
                                        <Badge key={id} className="bg-ph-blue text-white py-1 px-2">
                                            {candidate?.balotaNumber}. {candidate?.lastName}
                                            <button
                                                onClick={() => handleCandidateToggle(id)}
                                                className="ml-2 text-white hover:text-red-200"
                                                aria-label={`Remove ${candidate?.lastName}`}
                                            >
                                                ✕
                                            </button>
                                        </Badge>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    {/* Search Input */}
                    <div className="mb-6">
                        <Input
                            type="text"
                            placeholder="Search candidates by name or ballot number..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-4 border-2 border-ph-yellow rounded-lg focus:ring-2 focus:ring-ph-blue focus:border-transparent"
                        />
                    </div>

                    <Tabs defaultValue="all" className="mb-8">
                        <div className="flex justify-center mb-6">
                            <TabsList className="bg-blue-50 p-1 border-2 border-ph-yellow">
                                <TabsTrigger value="all" className="data-[state=active]:bg-ph-blue data-[state=active]:text-white">
                                    All Candidates
                                </TabsTrigger>
                                {parties.slice(0, 5).map((party) => (
                                    <TabsTrigger
                                        key={party}
                                        value={party}
                                        className="data-[state=active]:bg-ph-red data-[state=active]:text-white"
                                    >
                                        {party}
                                    </TabsTrigger>
                                ))}
                                <TabsTrigger
                                    value="others"
                                    className="data-[state=active]:bg-ph-yellow data-[state=active]:text-ph-blue"
                                >
                                    Others
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="all" className="mt-0">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {filteredCandidates.map((candidate) => (
                                    <Card
                                        key={candidate.balotaNumber}
                                        className={`overflow-hidden border-2 hover:shadow-md transition-all ${
                                            selectedCandidates.includes(candidate.balotaNumber)
                                                ? "border-ph-red bg-red-50"
                                                : "border-gray-200"
                                        }`}
                                    >
                                        <CardHeader className="p-3 pb-0 flex flex-row items-start space-y-0 gap-2">
                                            <Checkbox
                                                id={`candidate-${candidate.balotaNumber}`}
                                                checked={selectedCandidates.includes(candidate.balotaNumber)}
                                                onCheckedChange={() => handleCandidateToggle(candidate.balotaNumber)}
                                                className="data-[state=checked]:bg-ph-red data-[state=checked]:border-ph-red"
                                            />
                                            <div className="flex-1">
                                                <CardTitle className="text-base font-bold flex items-center gap-1">
                          <span className="bg-ph-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {candidate.balotaNumber}
                          </span>
                                                    {candidate.lastName}
                                                </CardTitle>
                                                <p className="text-xs text-gray-500">{candidate.fullName}</p>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-3 pt-2">
                                            <div className="flex items-center">
                                                <div className="w-12 h-12 rounded-full overflow-hidden mr-2">
                                                    <img
                                                        src={candidate.profileLink || "/placeholder.svg"}
                                                        alt={candidate.fullName}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <Badge variant="outline" className="bg-blue-50 border-ph-blue text-ph-blue text-xs">
                                                    {candidate.partyList}
                                                </Badge>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="p-3 pt-0 flex justify-end">
                                            <Link
                                                href={`/candidates/${candidate.balotaNumber}`}
                                                className="text-xs text-ph-blue hover:text-ph-red"
                                            >
                                                View Profile →
                                            </Link>
                                        </CardFooter>
                                    </Card>
                                ))}
                                {filteredCandidates.length === 0 && (
                                    <div className="col-span-full text-center py-8">
                                        <p className="text-gray-500">No candidates found matching your search.</p>
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        {parties.slice(0, 5).map((party) => (
                            <TabsContent key={party} value={party} className="mt-0">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {filteredCandidates.filter(a => a.partyList.includes("IND")).map((candidate) => (
                                        <Card
                                            key={candidate.balotaNumber}
                                            className={`overflow-hidden border-2 hover:shadow-md transition-all ${
                                                selectedCandidates.includes(candidate.balotaNumber)
                                                    ? "border-ph-red bg-red-50"
                                                    : "border-gray-200"
                                            }`}
                                        >
                                            <CardHeader className="p-3 pb-0 flex flex-row items-start space-y-0 gap-2">
                                                <Checkbox
                                                    id={`candidate-${candidate.balotaNumber}`}
                                                    checked={selectedCandidates.includes(candidate.balotaNumber)}
                                                    onCheckedChange={() => handleCandidateToggle(candidate.balotaNumber)}
                                                    className="data-[state=checked]:bg-ph-red data-[state=checked]:border-ph-red"
                                                />
                                                <div className="flex-1">
                                                    <CardTitle className="text-base font-bold flex items-center gap-1">
                              <span className="bg-ph-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {candidate.balotaNumber}
                              </span>
                                                        {candidate.lastName}
                                                    </CardTitle>
                                                    <p className="text-xs text-gray-500">{candidate.fullName}</p>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-3 pt-2">
                                                <div className="flex items-center">
                                                    <div className="w-12 h-12 rounded-full overflow-hidden mr-2">
                                                        <img
                                                            src={candidate.profileLink || "/placeholder.svg"}
                                                            alt={candidate.fullName}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <Badge variant="outline" className="bg-blue-50 border-ph-blue text-ph-blue text-xs">
                                                        {candidate.partyList}
                                                    </Badge>
                                                </div>
                                            </CardContent>
                                            <CardFooter className="p-3 pt-0 flex justify-end">
                                                <Link
                                                    href={`/candidates/${candidate.balotaNumber}`}
                                                    className="text-xs text-ph-blue hover:text-ph-red"
                                                >
                                                    View Profile →
                                                </Link>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                    {filteredCandidates.length === 0 && (
                                        <div className="col-span-full text-center py-8">
                                            <p className="text-gray-500">No candidates found matching your search.</p>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>
                        ))}

                        <TabsContent value="others" className="mt-0">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {filteredCandidates.filter(a => !a.partyList.includes("IND")).map((candidate) => (
                                    <Card
                                        key={candidate.balotaNumber}
                                        className={`overflow-hidden border-2 hover:shadow-md transition-all ${
                                            selectedCandidates.includes(candidate.balotaNumber)
                                                ? "border-ph-red bg-red-50"
                                                : "border-gray-200"
                                        }`}
                                    >
                                        <CardHeader className="p-3 pb-0 flex flex-row items-start space-y-0 gap-2">
                                            <Checkbox
                                                id={`candidate-${candidate.balotaNumber}`}
                                                checked={selectedCandidates.includes(candidate.balotaNumber)}
                                                onCheckedChange={() => handleCandidateToggle(candidate.balotaNumber)}
                                                className="data-[state=checked]:bg-ph-red data-[state=checked]:border-ph-red"
                                            />
                                            <div className="flex-1">
                                                <CardTitle className="text-base font-bold flex items-center gap-1">
                            <span className="bg-ph-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {candidate.balotaNumber}
                            </span>
                                                    {candidate.lastName}
                                                </CardTitle>
                                                <p className="text-xs text-gray-500">{candidate.fullName}</p>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-3 pt-2">
                                            <div className="flex items-center">
                                                <div className="w-12 h-12 rounded-full overflow-hidden mr-2">
                                                    <img
                                                        src={candidate.profileLink || "/placeholder.svg"}
                                                        alt={candidate.fullName}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <Badge variant="outline" className="bg-blue-50 border-ph-blue text-ph-blue text-xs">
                                                    {candidate.partyList}
                                                </Badge>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="p-3 pt-0 flex justify-end">
                                            <Link
                                                href={`/candidates/${candidate.balotaNumber}`}
                                                className="text-xs text-ph-blue hover:text-ph-red"
                                            >
                                                View Profile →
                                            </Link>
                                        </CardFooter>
                                    </Card>
                                ))}
                                {filteredCandidates.filter(a => !a.partyList.includes("IND")).length === 0 && (
                                    <div className="col-span-full text-center py-8">
                                        <p className="text-gray-500">No candidates found matching your search.</p>
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            <footer className="bg-gradient-to-r from-ph-blue to-ph-red text-white py-12 px-4 md:px-6">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <PhFlag className="h-6 w-6" />
                                <h3 className="text-xl font-bold">PiliPinas 2025</h3>
                            </div>
                            <p className="text-white/80">
                                Helping voters make informed decisions by matching them with candidates who share their values.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-ph-yellow">Quick Links</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/" className="text-white/80 hover:text-ph-yellow">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/questionnaire" className="text-white/80 hover:text-ph-yellow">
                                        Questionnaire
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/candidates" className="text-white/80 hover:text-ph-yellow">
                                        Candidates
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/chatbot" className="text-white/80 hover:text-ph-yellow">
                                        AI Assistant
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/ballot" className="text-white/80 hover:text-ph-yellow">
                                        Ballot
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-ph-yellow">Disclaimer</h3>
                            <p className="text-white/80">
                                This tool is designed to help inform your voting decision, but should not be the only factor in your
                                choice. Always research candidates thoroughly.
                            </p>
                        </div>
                    </div>
                    <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
                        <p>&copy; {new Date().getFullYear()} PiliPinas 2025. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}