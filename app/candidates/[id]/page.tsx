"use client"

import Link from "next/link"
import { getCandidateById } from "@/lib/candidates-data"
import { PhFlag } from "@/components/ph-flag"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams } from "next/navigation"
import Header from "@/components/header";
import {useState} from "react";

export default function CandidateProfilePage() {
  const params = useParams()
  const id = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : ""
  const candidate = getCandidateById(id)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


  if (!candidate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-ph-red mb-4">Candidate Not Found</h1>
          <p className="text-gray-700 mb-6">The candidate you are looking for does not exist.</p>
          <Button asChild className="bg-ph-blue hover:bg-blue-800">
            <Link href="/candidates">Back to Candidates</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Define position labels for display
  const positionLabels: Record<string, string> = {
    abortion: "In favor of abortion",
    "death-penalty": "In favor of death penalty",
    "same-sex-unions": "In favor of same-sex unions",
    divorce: "In favor of legalizing divorce",
    "impeach-sara-duterte": "In favor of impeaching VP Sara Duterte",
    "defend-ph-sea": "In favor of defending the West PH Sea against China",
    "icc-cooperation": "In favor of cooperating with the ICC",
    "sexuality-education": "In favor of mandatory sexuality education",
    "mandatory-rotc": "In favor of mandatory ROTC",
    mining: "In favor of promoting mining in the Philippines",
    "sogie-bill": "In favor of passing the SOGIE Equality Bill",
    "charter-change": "In favor of charter change",
    "political-dynasties": "In favor of political dynasties",
  }

  // Define position value colors
  const positionValueColors: Record<string, string> = {
    Pabor: "bg-green-500",
    "Di Pabor": "bg-red-500",
    Wala: "bg-yellow-400",
  }

  // Define position value percentages for visualization
  const positionValuePercentages: Record<string, number> = {
    Pabor: 100,
    "Di Pabor": 0,
    Wala: 50,
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}></Header>

      <main className="container mx-auto py-12 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <Link href="/candidates" className="text-ph-blue hover:text-ph-red flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to Candidates
            </Link>
          </div>

          <div className="bg-white rounded-lg border-2 border-ph-yellow shadow-lg overflow-hidden mb-8">
            <div className="h-2 bg-gradient-to-r from-ph-blue via-ph-red to-ph-yellow w-full"></div>
            <div className="md:flex">
              <div className="md:w-1/3 p-6 flex flex-col items-center">
                <div className="relative mb-4">
                  <img
                    src={candidate.profileLink || "/placeholder.svg"}
                    alt={candidate.fullName}
                    className="w-48 h-48 object-cover rounded-full border-4 border-ph-yellow"
                  />
                  <div className="absolute -top-2 -right-2 bg-ph-red text-white font-bold rounded-full w-10 h-10 flex items-center justify-center border-2 border-white">
                    {candidate.balotaNumber}
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-ph-blue text-center">{candidate.fullName}</h1>
                <Badge className="mt-2 bg-ph-blue text-white">{candidate.partyList.includes("IND") ? "Independent" : "Alliance"}</Badge>
                <div className="mt-6 w-full">
                  <a
                    href={candidate.aboutCandidateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-ph-red hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    Official Profile
                  </a>
                </div>
              </div>
              <div className="md:w-2/3 p-6 border-t md:border-t-0 md:border-l border-gray-200">
                <Tabs defaultValue="bio">
                  <TabsList className="bg-blue-50 p-1 border-2 border-ph-yellow">
                    <TabsTrigger value="bio" className="data-[state=active]:bg-ph-blue data-[state=active]:text-white">
                      Biography
                    </TabsTrigger>
                    <TabsTrigger
                      value="positions"
                      className="data-[state=active]:bg-ph-red data-[state=active]:text-white"
                    >
                      Positions
                    </TabsTrigger>
                    {/*<TabsTrigger*/}
                    {/*  value="achievements"*/}
                    {/*  className="data-[state=active]:bg-ph-yellow data-[state=active]:text-ph-blue"*/}
                    {/*>*/}
                    {/*  Achievements*/}
                    {/*</TabsTrigger>*/}
                  </TabsList>
                  <TabsContent value="bio" className="mt-4">
                    <h2 className="text-xl font-bold text-ph-blue mb-3">About {candidate.fullName}</h2>
                    <p className="text-gray-700">{candidate.bio}</p>

                    {/*<h3 className="text-lg font-bold text-ph-red mt-6 mb-3">Key Advocacies</h3>*/}
                    {/*<ul className="space-y-2">*/}
                    {/*  {candidate.advocacies?.map((advocacy, index) => (*/}
                    {/*    <li key={index} className="flex items-start gap-2">*/}
                    {/*      <div className="h-5 w-5 rounded-full bg-ph-yellow flex items-center justify-center mt-0.5">*/}
                    {/*        <svg*/}
                    {/*          xmlns="http://www.w3.org/2000/svg"*/}
                    {/*          width="12"*/}
                    {/*          height="12"*/}
                    {/*          viewBox="0 0 24 24"*/}
                    {/*          fill="none"*/}
                    {/*          stroke="currentColor"*/}
                    {/*          strokeWidth="3"*/}
                    {/*          strokeLinecap="round"*/}
                    {/*          strokeLinejoin="round"*/}
                    {/*          className="text-ph-blue"*/}
                    {/*        >*/}
                    {/*          <path d="M20 6 9 17l-5-5" />*/}
                    {/*        </svg>*/}
                    {/*      </div>*/}
                    {/*      <span>{advocacy}</span>*/}
                    {/*    </li>*/}
                    {/*  ))}*/}
                    {/*</ul>*/}
                  </TabsContent>
                  <TabsContent value="positions" className="mt-4">
                    <h2 className="text-xl font-bold text-ph-blue mb-4">Positions on Key Issues</h2>
                    <div className="space-y-6">
                      {candidate.positions &&
                        Object.entries(candidate.positions).map(([key, value]) => (
                          <div key={key} className="border-b border-gray-200 pb-4 last:border-0">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">{positionLabels[key] || key}</span>
                              <span
                                className={`text-sm font-bold ${
                                  value === "Pabor"
                                    ? "text-green-600"
                                    : value === "Di Pabor"
                                      ? "text-red-600"
                                      : "text-yellow-600"
                                }`}
                              >
                                {value}
                              </span>
                            </div>
                            <Progress
                              value={positionValuePercentages[value]}
                              className="h-2 bg-gray-100"
                              indicatorClassName={positionValueColors[value]}
                            />
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                  {/*<TabsContent value="achievements" className="mt-4">*/}
                  {/*  <h2 className="text-xl font-bold text-ph-blue mb-4">Notable Achievements</h2>*/}
                  {/*  <div className="space-y-4">*/}
                  {/*    {candidate.achievements?.map((achievement, index) => (*/}
                  {/*      <Card key={index} className="border-2 border-ph-yellow">*/}
                  {/*        <CardHeader className="py-3 px-4 bg-blue-50">*/}
                  {/*          <CardTitle className="text-base font-medium text-ph-blue flex items-center gap-2">*/}
                  {/*            <svg*/}
                  {/*              xmlns="http://www.w3.org/2000/svg"*/}
                  {/*              width="18"*/}
                  {/*              height="18"*/}
                  {/*              viewBox="0 0 24 24"*/}
                  {/*              fill="none"*/}
                  {/*              stroke="currentColor"*/}
                  {/*              strokeWidth="2"*/}
                  {/*              strokeLinecap="round"*/}
                  {/*              strokeLinejoin="round"*/}
                  {/*              className="text-ph-red"*/}
                  {/*            >*/}
                  {/*              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />*/}
                  {/*            </svg>*/}
                  {/*            Achievement {index + 1}*/}
                  {/*          </CardTitle>*/}
                  {/*        </CardHeader>*/}
                  {/*        <CardContent className="py-3 px-4">*/}
                  {/*          <p className="text-gray-700">{achievement}</p>*/}
                  {/*        </CardContent>*/}
                  {/*      </Card>*/}
                  {/*    ))}*/}
                  {/*  </div>*/}
                  {/*</TabsContent>*/}
                </Tabs>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Button asChild className="bg-ph-blue hover:bg-blue-800">
              <Link href="/questionnaire">Take Questionnaire to Match</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-ph-yellow text-ph-blue hover:bg-ph-yellow hover:text-ph-blue"
            >
              <Link href="/candidates">View All Candidates</Link>
            </Button>
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
