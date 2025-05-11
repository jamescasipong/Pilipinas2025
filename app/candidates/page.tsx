"use client"
import Link from "next/link"
import { getAllCandidates, getAllParties } from "@/lib/candidates-data"
import { PhFlag } from "@/components/ph-flag"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/header";
import {useState} from "react";

export default function CandidatesPage() {
  const candidates = getAllCandidates()
  const parties = getAllParties()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}></Header>


      <main className="container mx-auto py-12 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-ph-blue mb-2">
              Senate <span className="text-ph-red">Candidates</span>
            </h1>
            <div className="h-1 w-32 bg-ph-yellow mx-auto mb-4 rounded-full"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Meet the candidates running for the Philippine Senate in the 2025 elections. Learn about their
              backgrounds, positions, and advocacies to make an informed decision.
            </p>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {candidates.map((candidate) => (
                    <Link href={`/candidates/${candidate.balotaNumber}`} key={candidate.balotaNumber}>
                      <Card className="overflow-hidden border-2 border-ph-yellow hover:shadow-lg transition-all hover:-translate-y-1">
                        <div className="relative">
                          <img
                              src={candidate.profileLink || "/placeholder.svg"}
                              alt={candidate.fullName}
                              className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-2 left-2 bg-ph-red text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
                            {candidate.balotaNumber}
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                            <h3 className="text-white font-bold">{candidate.lastName}</h3>
                            <p className="text-white/90 text-sm">{candidate.fullName}</p>
                          </div>
                        </div>
                        <CardContent className="p-3">
                          <Badge variant="outline" className="bg-blue-50 border-ph-blue text-ph-blue">
                            {/* Extract party name from partyList */}
                            {candidate.partyList.match(/\(([^)]+)\)/)
                                ? candidate.partyList.match(/\(([^)]+)\)/)[1]
                                : candidate.partyList}
                          </Badge>
                        </CardContent>
                        <CardFooter className="p-3 pt-0 flex justify-end">
                          <span className="text-xs text-ph-blue font-medium">View Profile →</span>
                        </CardFooter>
                      </Card>
                    </Link>
                ))}
              </div>
            </TabsContent>

            {parties.slice(0, 5).map((party) => (
              <TabsContent key={party} value={party} className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {candidates
                      .filter((candidate) =>
                          candidate.partyList.includes("IND")
                      )
                      .map((candidate) => (
                          <Link href={`/candidates/${candidate.balotaNumber}`} key={candidate.balotaNumber}>
                            <Card className="overflow-hidden border-2 border-ph-yellow hover:shadow-lg transition-all hover:-translate-y-1">
                              <div className="relative">
                                <img
                                    src={candidate.profileLink || "/placeholder.svg"}
                                    alt={candidate.fullName}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-2 left-2 bg-ph-red text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
                                  {candidate.balotaNumber}
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                                  <h3 className="text-white font-bold">{candidate.lastName}</h3>
                                  <p className="text-white/90 text-sm">{candidate.fullName}</p>
                                </div>
                              </div>
                              <CardContent className="p-3">
                                <Badge variant="outline" className="bg-blue-50 border-ph-blue text-ph-blue">
                                  {candidate.partyList}
                                </Badge>
                              </CardContent>
                              <CardFooter className="p-3 pt-0 flex justify-end">
                                <span className="text-xs text-ph-blue font-medium">View Profile →</span>
                              </CardFooter>
                            </Card>
                          </Link>
                      ))}

                </div>
              </TabsContent>
            ))}

            <TabsContent value="others" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {candidates
                    .filter((candidate) =>
                         !candidate.partyList.toUpperCase().includes("IND")
                    )
                    .map((candidate) => (
                        <Link href={`/candidates/${candidate.balotaNumber}`} key={candidate.balotaNumber}>
                          <Card className="overflow-hidden border-2 border-ph-yellow hover:shadow-lg transition-all hover:-translate-y-1">
                            <div className="relative">
                              <img
                                  src={candidate.profileLink || "/placeholder.svg"}
                                  alt={candidate.fullName}
                                  className="w-full h-48 object-cover"
                              />
                              <div className="absolute top-2 left-2 bg-ph-red text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
                                {candidate.balotaNumber}
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                                <h3 className="text-white font-bold">{candidate.lastName}</h3>
                                <p className="text-white/90 text-sm">{candidate.fullName}</p>
                              </div>
                            </div>
                            <CardContent className="p-3">
                              <Badge variant="outline" className="bg-blue-50 border-ph-blue text-ph-blue">
                                {candidate.partyList}
                              </Badge>
                            </CardContent>
                            <CardFooter className="p-3 pt-0 flex justify-end">
                              <span className="text-xs text-ph-blue font-medium">View Profile →</span>
                            </CardFooter>
                          </Card>
                        </Link>
                    ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="bg-white p-6 rounded-lg border-2 border-ph-yellow shadow-lg mt-12">
            <h2 className="text-xl font-bold text-ph-blue mb-4 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-ph-red"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
              Important Voting Information
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                The 2025 Philippine Senate election will be held on May 12, 2025. Voters will elect 12 senators to serve
                in the Senate of the Philippines.
              </p>
              <p>To be eligible to vote, you must:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Be a Filipino citizen</li>
                <li>Be at least 18 years old on Election Day</li>
                <li>Have resided in the Philippines for at least one year</li>
                <li>Have resided in the place where you intend to vote for at least six months</li>
                <li>Not be disqualified by law</li>
                <li>Be registered to vote</li>
              </ul>
              <p>Make sure to check your voter registration status and polling location before Election Day.</p>
            </div>
          </div>
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
