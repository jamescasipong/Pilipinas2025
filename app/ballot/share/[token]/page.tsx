"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PhFlag } from "@/components/ph-flag"
import { getAllCandidates } from "@/lib/candidates-data"
import { QRCodeSVG } from "qrcode.react"
import { toPng } from "html-to-image"
import { AlertCircle, Download, Share2, QrCode } from "lucide-react"
import Header from "@/components/header";

export default function BallotSharePage() {
    const params = useParams()
    const token = typeof params.token === "string" ? params.token : ""
    const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [showQR, setShowQR] = useState(false)
    const ballotRef = useRef<HTMLDivElement>(null)
    const candidates = getAllCandidates()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await fetch("/api/ballot/verify", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token }),
                })

                if (!response.ok) {
                    throw new Error("Invalid or expired ballot")
                }

                const { selectedCandidates } = await response.json()
                setSelectedCandidates(selectedCandidates)
            } catch (error) {
                console.error(error)
                setError("This ballot link is invalid or has expired. Please create a new ballot.")
            } finally {
                setLoading(false)
            }
        }

        if (token) {
            verifyToken()
        } else {
            setError("Invalid ballot link")
            setLoading(false)
        }
    }, [token])

    const shareableUrl = typeof window !== "undefined" ? window.location.href : ""

    const handleCopyLink = () => {
        navigator.clipboard
            .writeText(shareableUrl)
            .then(() => alert("Link copied to clipboard!"))
            .catch((err) => {
                console.error("Failed to copy link:", err)
                alert("Failed to copy link. Please try again.")
            })
    }

    const handleDownloadImage = async () => {
        if (!ballotRef.current) return;

        try {
            // Wait for fonts to load
            await document.fonts.ready;

            const dataUrl = await toPng(ballotRef.current, {
                quality: 1,
                pixelRatio: 2,
                cacheBust: true,
                skipFonts: false,
                fontEmbedCSS: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
        * {
          font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, 
                     Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
        }
      `,
                // Skip all image elements to avoid CORS issues
                filter: (node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const element = node as HTMLElement;
                        if (element.tagName === 'IMG') {
                            return false;
                        }
                    }
                    return true;
                }
            });

            const link = document.createElement("a");
            link.download = "my-pilipinas2025-ballot.png";
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error("Error generating image:", error);
            alert("Failed to download image. Please try again.");
        }
    }

    const toggleQRCode = () => setShowQR(!showQR)

    const selectedCandidateObjects = selectedCandidates
        .map((id) => candidates.find((c) => c.balotaNumber === id))
        .filter((c): c is NonNullable<typeof c> => Boolean(c))

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
            <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}></Header>

            <main className="container mx-auto py-12 px-4 md:px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-ph-blue mb-2">
                            Your <span className="text-ph-red">Ballot</span>
                        </h1>
                        <div className="h-1 w-32 bg-ph-yellow mx-auto mb-4 rounded-full" />
                        <p className="text-gray-700 max-w-2xl mx-auto">
                            Here are your selected candidates for the 2025 Senate election. You can share this ballot or save it as an
                            image for future reference.
                        </p>
                    </div>

                    {error && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {loading ? (
                        <div className="text-center py-12 bg-white rounded-lg border-2 border-ph-yellow shadow-lg">
                            <div className="w-16 h-16 border-4 border-t-ph-red border-r-ph-blue border-b-ph-yellow border-l-ph-blue rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-ph-blue font-medium">Loading your ballot...</p>
                        </div>
                    ) : (
                        !error && (
                            <>
                                <div className="flex flex-wrap gap-4 justify-center mb-6">
                                    <Button onClick={handleCopyLink} className="bg-ph-blue hover:bg-blue-800 flex items-center gap-2">
                                        <Share2 className="h-4 w-4" />
                                        Copy Link
                                    </Button>
                                    <Button onClick={toggleQRCode} className="bg-ph-red hover:bg-red-700 flex items-center gap-2">
                                        <QrCode className="h-4 w-4" />
                                        {showQR ? "Hide QR Code" : "Show QR Code"}
                                    </Button>
                                    <Button
                                        onClick={handleDownloadImage}
                                        className="border-2 border-ph-yellow bg-white text-ph-blue hover:bg-ph-yellow hover:text-ph-blue flex items-center gap-2"
                                    >
                                        <Download className="h-4 w-4" />
                                        Save as Image
                                    </Button>
                                </div>

                                {showQR && (
                                    <div className="mb-8 p-6 bg-white rounded-lg border-2 border-ph-yellow shadow-lg flex flex-col items-center">
                                        <h2 className="text-xl font-bold text-ph-blue mb-4">Scan this QR Code to share your ballot</h2>
                                        <div className="bg-white p-4 rounded-lg border-2 border-ph-yellow">
                                            <QRCodeSVG value={shareableUrl} size={200} />
                                        </div>
                                    </div>
                                )}

                                <div ref={ballotRef} className="bg-white p-6 rounded-lg border-2 border-ph-yellow shadow-lg">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-2">
                                            <PhFlag className="h-8 w-8" />
                                            <h2 className="text-2xl font-bold text-ph-blue">
                                                PiliPinas <span className="text-ph-red">2025</span>
                                            </h2>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">Senate Election Ballot</p>
                                            <p className="text-sm font-bold text-ph-blue">May 12, 2025</p>
                                        </div>
                                    </div>

                                    <div className="border-t-2 border-b-2 border-ph-yellow py-4 mb-6">
                                        <h3 className="text-xl font-bold text-ph-red mb-4">My Selected Candidates</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {selectedCandidateObjects.map((candidate, index) => (
                                                <Card key={candidate.balotaNumber} className="border-2 border-ph-yellow overflow-hidden">
                                                    <div className="h-1 bg-ph-blue w-full" />
                                                    <CardHeader className="p-3 pb-2">
                                                        <CardTitle className="text-base flex items-center gap-2">
              <span className="bg-ph-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {candidate.balotaNumber}
              </span>
                                                            <span className="font-bold">
                {candidate.lastName}, {candidate.fullName}
              </span>
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="p-3 pt-0">
                                                        <div className="flex items-center">
                                                            <div className="mr-2">
                                                                <p className="text-xs text-gray-500">{candidate.partyList}</p>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="text-center text-sm text-gray-500">
                                        <p>This ballot was created using <strong>PiliPinas 2025 Candidate Matcher</strong> at <strong>https://pilipinas2025.vercel.app</strong>.</p>
                                    </div>
                                </div>
                            </>
                        )
                    )}
                </div>
            </main>
        </div>
    )
}
